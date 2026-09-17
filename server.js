const { createServer } = require("node:http");
const { execSync } = require("node:child_process");
const next = require("next");

// The hosting platform injects DB_HOST/DB_PORT/DB_NAME/DB_USER/DB_PASSWORD
// automatically but never a combined connection string, so build the one
// Prisma expects here, before any request touches the database.
if (!process.env.DATABASE_URL && process.env.DB_HOST) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  process.env.DATABASE_URL = `mysql://${encodeURIComponent(DB_USER)}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

// This platform gives no shell/console access to run migrations manually,
// so sync the schema to the database on boot. Safe to run every start:
// db push is idempotent and only errors out loud if a change looks
// destructive, rather than silently dropping data.
if (process.env.DATABASE_URL) {
  try {
    execSync("npx prisma db push --skip-generate", { stdio: "inherit" });
  } catch (err) {
    console.error("prisma db push failed, continuing startup anyway:", err.message);
  }
}

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Musa Kicks server ready on port ${port}`);
  });
});
