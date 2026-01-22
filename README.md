# Daedalus

Next.js 14+ App Router monolith for the Daedalus dashboard, docs, and tools.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## shadcn/ui setup

Initialize shadcn/ui (if you need to re-run):

```bash
npx shadcn@latest init -d
```

Required components:

```bash
npx shadcn@latest add button card input textarea select switch separator sheet toast tabs collapsible
```

## Deploy to Vercel

1. Push the repo to GitHub.
2. In Vercel, import the GitHub repository.
3. Use the default Next.js settings and deploy.
4. Set a custom domain later once DNS is ready.
