# Your Project Name

This is a monorepo project containing a client and a server package.

## Project Structure

```
.
├── packages/
│   ├── client/      # React client application
│   └── server/      # Express server application
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── eslint.config.js
```

## Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

## Development

To run both client and server in development mode:

```
pnpm dev
```

To run only the client:

```
pnpm dev:client
```

To run only the server:

```
pnpm dev:server
```

## Building

To build all packages:

```
pnpm build
```

## Linting

To run linting on all packages:

```
pnpm lint
```

To automatically fix linting issues:

```
pnpm lint:fix
```

## Production

To start the server in production mode:

```
pnpm start
```
