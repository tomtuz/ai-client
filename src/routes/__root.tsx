import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ConfigurationProvider } from "@/context/ConfigContext";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <ConfigurationProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </ConfigurationProvider>
    </ErrorBoundary>
  ),
});
