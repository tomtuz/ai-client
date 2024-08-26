import { Header } from '@components/Header';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null // Render nothing in production
  : React.lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  ),
  errorComponent: () => {
    return (
      <div className="flex w-full items-center justify-center text-center">
        <ErrorComponent />
      </div>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="flex w-full items-center justify-center text-center">
        <NotFoundComponent />
      </div>
    );
  },
});

function ErrorComponent() {
  return (
    <div className="flex min-h-[calc(100vh-250px)] flex-col items-center justify-center gap-4">
      <pre className="font-[monospace] text-destructive">
        {`
███████╗    ██████╗     ██████╗      ██████╗     ██████╗ 
██╔════╝    ██╔══██╗    ██╔══██╗    ██╔═══██╗    ██╔══██╗
█████╗      ██████╔╝    ██████╔╝    ██║   ██║    ██████╔╝
██╔══╝      ██╔══██╗    ██╔══██╗    ██║   ██║    ██╔══██╗
███████╗    ██║  ██║    ██║  ██║    ╚██████╔╝    ██║  ██║
╚══════╝    ╚═╝  ╚═╝    ╚═╝  ╚═╝     ╚═════╝     ╚═╝  ╚═╝
`}
      </pre>
      <Link to="/">Go home</Link>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="grid min-h-[calc(100vh-250px)] place-content-center">
      <pre className="font-[monospace] text-primary">
        {`
██╗  ██╗     ██████╗     ██╗  ██╗
██║  ██║    ██╔═████╗    ██║  ██║
███████║    ██║██╔██║    ███████║
╚════██║    ████╔╝██║    ╚════██║
     ██║    ╚██████╔╝         ██║
     ╚═╝     ╚═════╝          ╚═╝
`}
      </pre>
      <Link to="/">Go home</Link>
    </div>
  );
}
