import { AgentBuilder } from '@/features/agent_builder/components/AgentBuilder';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/builder/')({
  component: () => <RagComponent />,
});

export function RagComponent() {
  return <AgentBuilder />;
}
