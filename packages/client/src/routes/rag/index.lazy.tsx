import { SearchFiles } from '@/components/rag/SearchFiles';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/rag/')({
  component: () => <RagComponent />,
});

export function RagComponent() {
  return <SearchFiles />;
}
