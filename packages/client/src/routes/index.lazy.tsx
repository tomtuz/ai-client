import { App } from '@/app/App';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

export const Route = createLazyFileRoute('/')({
  component: Root,
});

function Root() {
  return (
    <Suspense>
      <App />
    </Suspense>
  );
}
