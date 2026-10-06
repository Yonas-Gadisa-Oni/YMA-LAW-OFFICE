import { spawn } from "node:child_process";
import { createServer } from "node:net";

const firstPort = Number(process.env.PORT || process.env.BLOG_API_PORT || 3001);
const lastPort = Math.min(firstPort + 20, 65535);

async function isPortAvailable(port) {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        resolve(false);
      } else {
        reject(error);
      }
    });
    probe.listen(port, "0.0.0.0", () => {
      probe.close((error) => {
        if (error) reject(error);
        else resolve(true);
      });
    });
  });
}

async function findApiPort() {
  for (let port = firstPort; port <= lastPort; port += 1) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`No available API port found between ${firstPort} and ${lastPort}.`);
}

const apiPort = await findApiPort();
if (apiPort !== firstPort) {
  console.log(`API port ${firstPort} is in use; using ${apiPort} instead.`);
}

const api = spawn(
  process.execPath,
  ["--env-file-if-exists=.env", "server/index.mjs"],
  {
    env: { ...process.env, PORT: String(apiPort), BLOG_API_PORT: String(apiPort) },
    stdio: "inherit",
  },
);
const vite = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "0.0.0.0", "--port", "3000"],
  {
    env: { ...process.env, BLOG_API_PORT: String(apiPort) },
    stdio: "inherit",
  },
);

let stopping = false;

function stopChildren(signal = "SIGTERM") {
  if (stopping) return;
  stopping = true;
  for (const child of [api, vite]) {
    if (child.exitCode === null && child.signalCode === null) child.kill(signal);
  }
}

for (const child of [api, vite]) {
  child.once("error", (error) => {
    console.error(`Failed to start ${child === api ? "API" : "Vite"}:`, error);
    process.exitCode = 1;
    stopChildren();
  });
  child.once("close", (code) => {
    if (!stopping) {
      process.exitCode = code ?? 1;
      stopChildren();
    }
  });
}

process.once("SIGINT", () => stopChildren("SIGINT"));
process.once("SIGTERM", () => stopChildren("SIGTERM"));
