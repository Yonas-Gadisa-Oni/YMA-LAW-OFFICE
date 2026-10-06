import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarBlank, Clock, LockKey, PencilSimple, Plus, SignOut, SpinnerGap, Trash } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt?: string;
}

interface BlogSectionProps {
  route: string;
  onNav: (route: string) => void;
}

const tokenStorageKey = "yma-blog-admin-token";

async function readApiResponse<T>(response: Response): Promise<T> {
  let result: { error?: string } & T;
  try {
    result = await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new Error("The blog server returned an invalid response. Make sure the blog API is running.");
  }
  if (!response.ok) {
    throw new Error(result.error || `The blog server returned an error (${response.status}).`);
  }
  return result;
}

function getRequestError(error: unknown) {
  if (error instanceof TypeError) {
    return "Could not reach the blog server. Start it with npm run dev and try again.";
  }
  return error instanceof Error ? error.message : "The request could not be completed.";
}

function formatDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(undefined, options).format(new Date(date));
}

function BlogMetadata({ date }: { date: string }) {
  return (
    <>
      <time dateTime={date} className="inline-flex items-center gap-1.5 bg-black/85 px-3 py-2 text-xs font-medium text-white">
        <CalendarBlank size={15} />
        {formatDate(date, { month: "short", day: "numeric", year: "numeric" })}
      </time>
      <time dateTime={date} className="inline-flex items-center gap-1.5 bg-black/25 px-3 py-2 text-xs font-semibold uppercase text-white/80 backdrop-blur-sm">
        <Clock size={13} /> {formatDate(date, { hour: "2-digit", minute: "2-digit" })}
      </time>
    </>
  );
}

export default function BlogSection({ route, onNav }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem(tokenStorageKey) || "");
  const [email, setEmail] = useState("ymalawoffice@blog.com");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [draft, setDraft] = useState({ title: "", subtitle: "", content: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);
  const [deletingSlug, setDeletingSlug] = useState("");
  const isAdminPage = route === "blog-admin";
  const editSlug = route.startsWith("blog-admin/edit/") ? route.slice("blog-admin/edit/".length) : "";
  const slug = route.startsWith("blog/") ? route.slice("blog/".length) : "";

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }
    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  useEffect(() => {
    if (isAdminPage && !editSlug) return;
    const endpoint = editSlug
      ? `/api/blogs/${encodeURIComponent(editSlug)}`
      : slug ? `/api/blogs/${encodeURIComponent(slug)}` : "/api/blogs";
    let cancelled = false;
    setLoading(true);
    setError("");
    fetch(endpoint)
      .then((response) => readApiResponse<BlogPost | BlogPost[]>(response))
      .then((result: BlogPost | BlogPost[]) => {
        if (cancelled) return;
        if (editSlug) {
          const post = result as BlogPost;
          setEditPost(post);
          setDraft({ title: post.title, subtitle: post.subtitle, content: post.content });
          setImagePreview(post.imageUrl);
        } else if (slug) setSelectedPost(result as BlogPost);
        else setPosts(result as BlogPost[]);
      })
      .catch((requestError: Error) => {
        if (!cancelled) setError(getRequestError(requestError));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [isAdminPage, editSlug, slug]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await readApiResponse<{ token: string }>(response);
      sessionStorage.setItem(tokenStorageKey, result.token);
      setAdminToken(result.token);
      setPassword("");
      toast.success("Signed in.");
      onNav("blog");
    } catch (requestError) {
      setError(getRequestError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!imageFile && !editSlug) {
      setError("Choose a blog image from your computer.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.set("title", draft.title);
      formData.set("subtitle", draft.subtitle);
      formData.set("content", draft.content);
      if (imageFile) formData.set("image", imageFile);
      const response = await fetch(editSlug ? `/api/admin/blogs/${encodeURIComponent(editSlug)}` : "/api/blogs", {
        method: editSlug ? "PUT" : "POST",
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });
      if (response.status === 401) {
        sessionStorage.removeItem(tokenStorageKey);
        setAdminToken("");
      }
      const result = await readApiResponse<BlogPost>(response);
      toast.success(editSlug ? "Blog post updated." : "Blog post published.");
      setDraft({ title: "", subtitle: "", content: "" });
      setImageFile(null);
      setImagePreview("");
      setEditPost(null);
      onNav(`blog/${result.slug}`);
    } catch (requestError) {
      setError(getRequestError(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePost) return;
    const post = deletePost;
    setDeletingSlug(post.slug);
    setError("");
    try {
      const response = await fetch(`/api/admin/blogs/${encodeURIComponent(post.slug)}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${adminToken}` },
      });
      if (response.status === 401) {
        sessionStorage.removeItem(tokenStorageKey);
        setAdminToken("");
      }
      await readApiResponse<{ status: string }>(response);
      setPosts((currentPosts) => currentPosts.filter((item) => item.slug !== post.slug));
      setDeletePost(null);
      toast.success("Blog post deleted.");
    } catch (requestError) {
      setError(getRequestError(requestError));
    } finally {
      setDeletingSlug("");
    }
  };

  const logout = async () => {
    let signedOutOnServer = !adminToken;
    if (adminToken) {
      try {
        const response = await fetch("/api/admin/logout", {
          method: "POST",
          headers: { authorization: `Bearer ${adminToken}` },
        });
        if (!response.ok) throw new Error("The server could not confirm sign out.");
        signedOutOnServer = true;
      } catch (requestError) {
        toast.error(getRequestError(requestError));
      }
    }
    sessionStorage.removeItem(tokenStorageKey);
    setAdminToken("");
    if (signedOutOnServer) toast.success("Signed out.");
    else toast.error("Signed out on this device; the server session will expire automatically.");
  };

  const pageShell = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
  const inputClass = "w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="min-h-[70vh] bg-[#f4f8fc] py-12 md:py-20">
      <AlertDialog open={Boolean(deletePost)} onOpenChange={(open) => { if (!open && !deletingSlug) setDeletePost(null); }}>
        <AlertDialogContent className="max-w-sm border-slate-200 bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#192936]">Delete blog post?</AlertDialogTitle>
            <AlertDialogDescription className="break-words text-slate-600">
              Are you sure you want to delete &quot;{deletePost?.title}&quot;?
            </AlertDialogDescription>
            <p className="text-sm font-semibold text-red-700">After you delete this blog, it cannot be undone.</p>
          </AlertDialogHeader>
          {error && deletingSlug && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={Boolean(deletingSlug)} className="bg-white text-slate-700">No</AlertDialogCancel>
            <button
              type="button"
              onClick={() => { void handleDelete(); }}
              disabled={Boolean(deletingSlug)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-red-700 px-4 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deletingSlug ? <SpinnerGap size={16} className="mr-2 animate-spin" /> : null}
              Yes, delete
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className={pageShell}>
        {isAdminPage || editSlug ? (
          <div className="mx-auto max-w-3xl">
            <button onClick={() => onNav("blog")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950">
              <ArrowLeft size={18} /> Back to Blog
            </button>
            <div className="mb-8">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">YMA Law Office</span>
              <h1 className="mt-2 font-serif text-4xl font-bold text-[#081b2d] md:text-5xl">{adminToken ? (editSlug ? "Edit blog post" : "Publish a blog post") : "Admin sign in"}</h1>
              <p className="mt-3 text-slate-600">{adminToken ? (editSlug ? "Update this article and save your changes." : "Write a new update for the public blog.") : "Sign in with the authorized blog administrator account."}</p>
            </div>

            {error && <p role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

            {!adminToken ? (
              <form onSubmit={handleLogin} className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Admin email
                  <input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
                </label>
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Password
                  <input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} />
                </label>
                <Button type="submit" disabled={submitting} className="gap-2 bg-blue-800 text-white hover:bg-blue-900">
                  {submitting ? <SpinnerGap className="animate-spin" /> : <LockKey size={18} />} Sign in
                </Button>
              </form>
            ) : editSlug && !editPost ? (
              <p className="py-12 text-center text-slate-600">Loading article…</p>
            ) : (
              <form onSubmit={handlePublish} className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <div className="flex justify-end">
                  <button type="button" onClick={logout} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950"><SignOut size={17} /> Sign out</button>
                </div>
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Title
                  <input required maxLength={160} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className={inputClass} placeholder="Article title" />
                </label>
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Subtitle
                  <input required maxLength={240} value={draft.subtitle} onChange={(event) => setDraft({ ...draft, subtitle: event.target.value })} className={inputClass} placeholder="A short summary for the blog list" />
                </label>
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Blog image
                  <input required={!editSlug} type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className={inputClass} />
                  <span className="block text-xs font-normal text-slate-500">{editSlug ? "Choose a new image from your computer to replace the current one (optional)." : "Choose a JPEG, PNG, WebP, or GIF image from your computer (max 5 MB)."}</span>
                </label>
                {imagePreview && <img src={imagePreview} alt="Selected blog image preview" className="max-h-72 w-full rounded-lg border border-slate-200 object-cover" />}
                <label className="block space-y-2 text-sm font-semibold text-slate-800">Full article
                  <textarea required maxLength={30000} rows={12} value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} className={`${inputClass} resize-y leading-7`} placeholder="Write the full blog article here. Separate paragraphs with a blank line." />
                </label>
                <Button type="submit" disabled={submitting} className="gap-2 bg-blue-800 text-white hover:bg-blue-900">
                  {submitting ? <SpinnerGap className="animate-spin" /> : editSlug ? <PencilSimple size={18} /> : <Plus size={18} />} {editSlug ? "Save changes" : "Publish post"}
                </Button>
              </form>
            )}
          </div>
        ) : slug ? (
          <article className="mx-auto max-w-4xl">
            <button onClick={() => onNav("blog")} className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950">
              <ArrowLeft size={18} /> All blog posts
            </button>
            {loading ? <p className="py-20 text-center text-slate-600">Loading article…</p> : error ? (
              <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</p>
            ) : selectedPost && (
              <>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-blue-700"><CalendarBlank size={17} /> {formatDate(selectedPost.createdAt, { month: "long", day: "numeric", year: "numeric" })}</p>
                <h1 className="font-serif text-4xl font-bold leading-tight text-[#081b2d] md:text-5xl">{selectedPost.title}</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{selectedPost.subtitle}</p>
                <p className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Clock size={16} /> {formatDate(selectedPost.createdAt, { hour: "2-digit", minute: "2-digit" })}</p>
                <img src={selectedPost.imageUrl} alt="" className="mt-8 max-h-[520px] w-full rounded-xl object-cover shadow-sm" />
                <div className="prose prose-slate mt-9 max-w-none whitespace-pre-wrap text-[16px] leading-8 text-slate-700">
                  {selectedPost.content}
                </div>
              </>
            )}
          </article>
        ) : (
          <>
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">YMA Law Office</span>
                <h1 className="mt-2 font-serif text-4xl font-bold text-[#081b2d] md:text-5xl">Blog & Legal Insights</h1>
                <p className="mt-3 max-w-2xl text-slate-600">News, perspectives, and updates from our law office.</p>
              </div>
              {adminToken ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Button onClick={() => onNav("blog-admin")} className="gap-2 bg-blue-800 text-white hover:bg-blue-900"><Plus size={18} /> Add a blog post</Button>
                  <button onClick={logout} className="inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-slate-600 hover:text-slate-950"><SignOut size={17} /> Sign out</button>
                </div>
              ) : null}
            </div>

            {error && <p role="alert" className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
            {loading ? <p className="py-20 text-center text-slate-600">Loading blog posts…</p> : posts.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.id} className="group overflow-hidden rounded-lg bg-[#192936] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <button onClick={() => onNav(`blog/${post.slug}`)} className="block w-full text-left">
                      <div className="relative aspect-[1.85/1] overflow-hidden">
                        <img src={post.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between">
                          <BlogMetadata date={post.createdAt} />
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="font-sans text-lg font-bold leading-[1.2] text-white transition group-hover:text-sky-300">{post.title}</h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-5 text-white/60">{post.subtitle}</p>
                      </div>
                    </button>
                    {adminToken && (
                      <div className="flex gap-2 border-t border-white/10 px-4 py-3">
                        <button onClick={() => onNav(`blog-admin/edit/${post.slug}`)} className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/10 hover:text-white">
                          <PencilSimple size={15} /> Edit
                        </button>
                        <button onClick={() => { setError(""); setDeletePost(post); }} disabled={Boolean(deletingSlug)} className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-semibold text-red-200 transition hover:bg-red-500/15 hover:text-red-100 disabled:opacity-50">
                          <Trash size={15} /> Delete
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : !error && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <CalendarBlank className="mx-auto h-10 w-10 text-blue-700" />
                <h2 className="mt-4 font-serif text-2xl font-bold text-[#081b2d]">No blog posts yet</h2>
                <p className="mt-2 text-slate-600">New articles from YMA Law Office will appear here.</p>
                {adminToken && <button onClick={() => onNav("blog-admin")} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 hover:text-blue-950">Create the first post <ArrowRight size={16} /></button>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
