# Documentation file

# Configuration Database setup

This is only used for application configurations.

```sh
pnpm run db:setup
```

# Embedding Database (SOON)

Advantages:

- Stores codebase context in optimized vector storage.
- Allows requesting codebase context relevant to the user prompts.
- AI agents don't need to re-digest the entire codebase.

Requirements:

- Vector DB (Chroma, Qdrant, Pinecone, LanceDB)
- Embedding & reranking model (jina, MiniLM-L6-v2, APIs)

## Debugging

Debug configurations:

1. 'AI_ClientApp' - Primary debug configuration. Should work out of the box.
2. 'CustomCommand' - If you need to define custom inputs to run the application.

## Why this debug approach?

To run SPAs you have to:

1. Start the development server (Vite)
2. Load the application in the browser (Chrome)
3. Attach the debugger to Vite server\*

\*Attaching debugger for HMR server which reloads code is tricky, consider using in-code 'debugger' with native browser debugger to avoid tricky situations.

---

Path to configuration files:

```ts
const ConfigLinux = '~/.config/manifold'
const ConfigeWindows = '%USERPROFILE%/.config/manifold'
```
