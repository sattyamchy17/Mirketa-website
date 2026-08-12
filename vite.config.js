import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import careerApplicationHandler from './api/career-application.js'

// Loads a local .env file (SMTP_HOST/PORT/USER/PASS, see
// api/career-application.js) into process.env for `npm run dev` only.
// Real hosting platforms (Vercel, etc.) set these in their own
// dashboard instead — this never reads/writes anything outside this
// machine, and .env is gitignored so real credentials are never committed.
try {
  process.loadEnvFile('.env')
} catch {
  // No local .env yet — fine, the career-application endpoint will just
  // return a clear "not configured" error until one is added.
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      // `vite dev` only serves files Vite itself understands — it has no
      // idea /api/career-application.js exists at all, unlike Vercel's
      // production runtime which auto-deploys anything under /api as a
      // serverless function. This plugin mounts that exact same handler
      // inside the dev server so the career application form has
      // something real to POST to locally, without needing the Vercel
      // CLI. It has no effect on the production build or on Vercel
      // itself (Vercel never runs this vite.config.js middleware code).
      name: 'career-application-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/api/career-application', (req, res) => {
          careerApplicationHandler(req, res).catch((err) => {
            console.error('career-application dev middleware error:', err)
            if (!res.headersSent) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
            }
            res.end(JSON.stringify({ error: 'Unexpected server error.' }))
          })
        })
      },
    },
  ],
})
