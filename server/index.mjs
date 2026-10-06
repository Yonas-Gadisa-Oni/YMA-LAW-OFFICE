import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createServer } from "node:http";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = resolve(process.env.BLOG_DATA_DIR || resolve(projectRoot, "database"));
const databaseFile = resolve(dataDirectory, "blogs.json");
const imageDirectory = resolve(dataDirectory, "blog-images");
const frontendDirectory = resolve(projectRoot, "dist");
const port = Number(process.env.PORT || process.env.BLOG_API_PORT || 3001);
const adminEmail = (process.env.BLOG_ADMIN_EMAIL || "ymalawoffice@blog.com").trim().toLowerCase();
const adminPassword = process.env.BLOG_ADMIN_PASSWORD || "";
const sessions = new Map();
const loginAttempts = new Map();
const sessionLifetime = 8 * 60 * 60 * 1000;
const maxJsonBytes = 1024 * 1024;
const maxImageBytes = 5 * 1024 * 1024;

async function readPosts() {
  try {
    return JSON.parse(await readFile(databaseFile, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await mkdir(dirname(databaseFile), { recursive: true });
    await writeFile(databaseFile, "[]\n", "utf8");
    return [];
  }
}

async function readMultipart(request, { requireImage = true } = {}) {
  const contentType = request.headers["content-type"] || "";
  const boundary = contentType.match(/^multipart\/form-data;\s*boundary=(?:"([^"]+)"|([^;]+))/i)?.slice(1).find(Boolean);
  if (!boundary) {
    const error = new Error("A multipart form with an image file is required.");
    error.status = 400;
    throw error;
  }

  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxImageBytes + 128 * 1024) {
      const error = new Error("Image uploads must be 5 MB or smaller.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  const buffer = Buffer.concat(chunks);
  const delimiter = Buffer.from(`--${boundary}`);
  const fields = {};
  let image;
  let cursor = buffer.indexOf(delimiter);
  if (cursor < 0) {
    const error = new Error("The image upload could not be read.");
    error.status = 400;
    throw error;
  }

  while (cursor >= 0) {
    cursor += delimiter.length;
    if (buffer.subarray(cursor, cursor + 2).equals(Buffer.from("--"))) break;
    if (buffer.subarray(cursor, cursor + 2).equals(Buffer.from("\r\n"))) cursor += 2;

    const headerEnd = buffer.indexOf(Buffer.from("\r\n\r\n"), cursor);
    if (headerEnd < 0) break;
    const nextBoundary = buffer.indexOf(Buffer.concat([Buffer.from("\r\n"), delimiter]), headerEnd + 4);
    if (nextBoundary < 0) break;

    const headers = buffer.subarray(cursor, headerEnd).toString("latin1");
    const disposition = headers.match(/content-disposition:\s*form-data;([^\r\n]+)/i)?.[1] || "";
    const name = disposition.match(/(?:^|;)\s*name="([^"]+)"/i)?.[1];
    const filename = disposition.match(/(?:^|;)\s*filename="([^"]*)"/i)?.[1];
    const value = buffer.subarray(headerEnd + 4, nextBoundary);

    if (name === "image" && filename) {
      const mimeType = headers.match(/content-type:\s*([^\r\n;]+)/i)?.[1]?.trim().toLowerCase();
      image = { bytes: value, mimeType };
    } else if (name && !filename) {
      fields[name] = value.toString("utf8");
    }

    cursor = nextBoundary + 2;
  }

  if (requireImage && (!image || image.bytes.length === 0)) {
    const error = new Error("Choose an image from your computer.");
    error.status = 400;
    throw error;
  }
  if (!image) return { fields };
  if (image.bytes.length > maxImageBytes) {
    const error = new Error("Image uploads must be 5 MB or smaller.");
    error.status = 413;
    throw error;
  }

  const imageTypes = {
    "image/jpeg": { extension: "jpg", signature: (bytes) => bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff },
    "image/png": { extension: "png", signature: (bytes) => bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
    "image/webp": { extension: "webp", signature: (bytes) => bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" },
    "image/gif": { extension: "gif", signature: (bytes) => ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6)) },
  };
  const imageType = imageTypes[image.mimeType];
  if (!imageType || !imageType.signature(image.bytes)) {
    const error = new Error("Use a valid JPEG, PNG, WebP, or GIF image.");
    error.status = 400;
    throw error;
  }

  return {
    fields,
    image: {
      bytes: image.bytes,
      mimeType: image.mimeType,
      filename: `${randomUUID()}.${imageType.extension}`,
    },
  };
}

async function savePosts(posts) {
  const temporaryFile = `${databaseFile}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  await rename(temporaryFile, databaseFile);
}

function respondImage(response, mimeType, image) {
  response.writeHead(200, {
    "content-type": mimeType,
    "cache-control": "public, max-age=31536000, immutable",
    "x-content-type-options": "nosniff",
  });
  response.end(image);
}

async function serveFrontend(request, response, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return false;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    return false;
  }

  const requestedFile = decodedPath === "/"
    ? resolve(frontendDirectory, "index.html")
    : resolve(frontendDirectory, `.${decodedPath}`);
  if (requestedFile !== frontendDirectory && !requestedFile.startsWith(`${frontendDirectory}${sep}`)) {
    return false;
  }

  let file = requestedFile;
  try {
    const contents = await readFile(file);
    const mimeTypes = {
      ".css": "text/css; charset=utf-8",
      ".html": "text/html; charset=utf-8",
      ".ico": "image/x-icon",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".js": "text/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webp": "image/webp",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
    };
    const isHtml = extname(file).toLowerCase() === ".html";
    response.writeHead(200, {
      "content-type": mimeTypes[extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": isHtml ? "no-cache" : "public, max-age=31536000, immutable",
      "x-content-type-options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : contents);
    return true;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    if (pathname !== "/" && !request.headers.accept?.includes("text/html")) return false;
    file = resolve(frontendDirectory, "index.html");
    const contents = await readFile(file);
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff",
    });
    response.end(request.method === "HEAD" ? undefined : contents);
    return true;
  }
}

function respond(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

async function readBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxJsonBytes) {
      const error = new Error("Request body is too large.");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.status = 400;
    throw error;
  }
}

function safeEqual(value, expected) {
  const actualBytes = Buffer.from(value);
  const expectedBytes = Buffer.from(expected);
  return actualBytes.length === expectedBytes.length && timingSafeEqual(actualBytes, expectedBytes);
}

function requireAdmin(request) {
  const token = request.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  const expiresAt = token ? sessions.get(token) : undefined;
  if (!expiresAt || expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return false;
  }
  return true;
}

function getToken(request) {
  return request.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
}

function slugify(title) {
  const base = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 70);
  return `${base || "blog-post"}-${randomUUID().slice(0, 8)}`;
}

async function removeStoredImage(imageUrl) {
  const filename = imageUrl.match(/^\/api\/blog-images\/([0-9a-f-]{36}\.(?:jpg|png|webp|gif))$/i)?.[1];
  if (!filename) return;
  try {
    await unlink(resolve(imageDirectory, filename));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  try {
    if (request.method === "GET" && url.pathname === "/api/health") {
      return respond(response, 200, { status: "ok" });
    }

    const imageMatch = url.pathname.match(/^\/api\/blog-images\/([0-9a-f-]{36}\.(?:jpg|png|webp|gif))$/i);
    if (request.method === "GET" && imageMatch) {
      try {
        const image = await readFile(resolve(imageDirectory, imageMatch[1]));
        const extension = imageMatch[1].split(".").pop().toLowerCase();
        const mimeType = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[extension];
        return respondImage(response, mimeType, image);
      } catch (error) {
        if (error.code === "ENOENT") return respond(response, 404, { error: "Blog image not found." });
        throw error;
      }
    }

    if (request.method === "POST" && url.pathname === "/api/admin/login") {
      const ip = request.socket.remoteAddress || "unknown";
      const attempts = loginAttempts.get(ip);
      if (attempts && attempts.resetAt > Date.now() && attempts.count >= 10) {
        return respond(response, 429, { error: "Too many login attempts. Try again in 15 minutes." });
      }
      if (!adminPassword) {
        return respond(response, 503, { error: "Admin login is not configured on the server." });
      }
      const body = await readBody(request);
      const emailMatches = safeEqual(String(body.email || "").trim().toLowerCase(), adminEmail);
      const passwordMatches = safeEqual(String(body.password || ""), adminPassword);
      if (!emailMatches || !passwordMatches) {
        const nextAttempts = attempts && attempts.resetAt > Date.now()
          ? { count: attempts.count + 1, resetAt: attempts.resetAt }
          : { count: 1, resetAt: Date.now() + 15 * 60 * 1000 };
        loginAttempts.set(ip, nextAttempts);
        return respond(response, 401, { error: "Email or password is incorrect." });
      }
      loginAttempts.delete(ip);
      const token = randomBytes(32).toString("base64url");
      sessions.set(token, Date.now() + sessionLifetime);
      return respond(response, 200, { token, expiresIn: sessionLifetime });
    }

    if (request.method === "POST" && url.pathname === "/api/admin/logout") {
      const token = getToken(request);
      if (token) sessions.delete(token);
      return respond(response, 200, { status: "signed out" });
    }

    if (request.method === "GET" && url.pathname === "/api/blogs") {
      const posts = (await readPosts()).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      return respond(response, 200, posts);
    }

    const postMatch = url.pathname.match(/^\/api\/blogs\/([a-z0-9-]+)$/);
    if (request.method === "GET" && postMatch) {
      const post = (await readPosts()).find((item) => item.slug === postMatch[1]);
      return respond(response, post ? 200 : 404, post || { error: "Blog post not found." });
    }

    if (request.method === "POST" && url.pathname === "/api/blogs") {
      if (!requireAdmin(request)) return respond(response, 401, { error: "Admin login is required." });
      const { fields, image } = await readMultipart(request);
      const title = typeof fields.title === "string" ? fields.title.trim() : "";
      const subtitle = typeof fields.subtitle === "string" ? fields.subtitle.trim() : "";
      const content = typeof fields.content === "string" ? fields.content.trim() : "";
      if (!title || title.length > 160 || !subtitle || subtitle.length > 240 || !content || content.length > 30000) {
        return respond(response, 400, { error: "Add a title (max 160 characters), subtitle (max 240), and article (max 30,000)." });
      }
      await mkdir(imageDirectory, { recursive: true });
      await writeFile(resolve(imageDirectory, image.filename), image.bytes, { flag: "wx" });
      const post = {
        id: randomUUID(),
        slug: slugify(title),
        title,
        subtitle,
        content,
        imageUrl: `/api/blog-images/${image.filename}`,
        createdAt: new Date().toISOString(),
      };
      try {
        const posts = await readPosts();
        posts.push(post);
        await savePosts(posts);
      } catch (error) {
        await unlink(resolve(imageDirectory, image.filename));
        throw error;
      }
      return respond(response, 201, post);
    }

    const adminPostMatch = url.pathname.match(/^\/api\/admin\/blogs\/([a-z0-9-]+)$/);
    if (adminPostMatch && ["PUT", "DELETE"].includes(request.method)) {
      if (!requireAdmin(request)) return respond(response, 401, { error: "Admin login is required." });
      const posts = await readPosts();
      const postIndex = posts.findIndex((item) => item.slug === adminPostMatch[1]);
      if (postIndex < 0) return respond(response, 404, { error: "Blog post not found." });

      if (request.method === "DELETE") {
        const [deletedPost] = posts.splice(postIndex, 1);
        await savePosts(posts);
        await removeStoredImage(deletedPost.imageUrl);
        return respond(response, 200, { status: "deleted" });
      }

      const { fields, image } = await readMultipart(request, { requireImage: false });
      const currentPost = posts[postIndex];
      const title = typeof fields.title === "string" ? fields.title.trim() : "";
      const subtitle = typeof fields.subtitle === "string" ? fields.subtitle.trim() : "";
      const content = typeof fields.content === "string" ? fields.content.trim() : "";
      if (!title || title.length > 160 || !subtitle || subtitle.length > 240 || !content || content.length > 30000) {
        return respond(response, 400, { error: "Add a title (max 160 characters), subtitle (max 240), and article (max 30,000)." });
      }

      let nextImageUrl = currentPost.imageUrl;
      if (image) {
        await mkdir(imageDirectory, { recursive: true });
        await writeFile(resolve(imageDirectory, image.filename), image.bytes, { flag: "wx" });
        nextImageUrl = `/api/blog-images/${image.filename}`;
      }
      const updatedPost = {
        ...currentPost,
        title,
        subtitle,
        content,
        imageUrl: nextImageUrl,
        updatedAt: new Date().toISOString(),
      };
      posts[postIndex] = updatedPost;
      try {
        await savePosts(posts);
      } catch (error) {
        if (image) await unlink(resolve(imageDirectory, image.filename));
        throw error;
      }
      if (image && currentPost.imageUrl !== nextImageUrl) await removeStoredImage(currentPost.imageUrl);
      return respond(response, 200, updatedPost);
    }

    if (url.pathname.startsWith("/api/")) {
      return respond(response, 404, { error: "API route not found." });
    }
    if (await serveFrontend(request, response, url.pathname)) return;
    return respond(response, 404, { error: "Page not found." });
  } catch (error) {
    console.error("Blog API request failed:", error);
    return respond(response, error.status || 500, {
      error: error.status ? error.message : "The server could not complete the request.",
    });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Blog API listening on http://localhost:${port}`);
  if (!adminPassword) console.warn("BLOG_ADMIN_PASSWORD is not set; admin login is disabled.");
});
