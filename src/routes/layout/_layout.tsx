import { Header } from '@components/Header';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/layout/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
