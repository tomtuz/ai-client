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

```sh
pnpm dev

# or individually
pnpm run dev:client
pnpm run dev:server
pnpm run dev:chroma
```

## Directory Structure

```
├── packages/
│   ├── chroma/      # Chroma vector DB
│   ├── client/      # React client application
│   └── server/      # Express server application
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## Project Architecture

```
          client
          (React)
             |
             |  [HTTP requests]
             v
  -------------------------
  |        Server         |
  |   (Express or .NET)   |
  -------------------------
             |
             |  [API calls]
             v
       --------------
       | Vector DB  |
       |  (chroma)  |
       --------------
```
