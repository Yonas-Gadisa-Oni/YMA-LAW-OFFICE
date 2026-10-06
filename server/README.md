# Blog server

Run `npm run dev` from the project root to start Vite and the API together.
The API uses port 3001 when available, then tries the next available ports;
Vite forwards `/api` requests to the selected API port. Vite uses port 3000
when available and selects another port if needed.

Copy `.env.example` to `.env` and set `BLOG_ADMIN_PASSWORD` to the private
admin password. `BLOG_ADMIN_EMAIL` defaults to `ymalawoffice@blog.com`.
Credentials are checked only by the server and must not be added to frontend
code or committed. Without a configured password, public blog reading still
works, but admin login is disabled.

The API provides public published-post reads and admin-authenticated post
creation, editing, and deletion. Posts are stored in `database/blogs.json`;
uploaded JPEG, PNG, WebP, and GIF images are stored in `database/blog-images/`
(maximum 5 MB each). The Render deployment stores both under the persistent
data directory configured by `BLOG_DATA_DIR`.

## Deploy on Render

The root `render.yaml` blueprint builds the Vite site and starts the same Node
server to serve the site and API. It mounts a persistent disk at `/var/data`
for blog posts and image uploads. Create a Render Blueprint from the connected
Git repository, then enter the admin password as the private
`BLOG_ADMIN_PASSWORD` environment variable when Render prompts for it. Never
commit `.env` or put the password in `render.yaml`.

The blueprint uses a paid Starter web service because Render's free web
services do not support persistent disks. Connect a custom domain in the
Render dashboard after the first successful deploy if you have one.
