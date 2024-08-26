import { ProviderConfig } from '@/types/modelConfig';
import { useCallback } from 'react';

interface ConfigListProps {
  filteredConfigs: ProviderConfig[];
  selectedConfig: ProviderConfig | null;
  onConfigSelect: (config: ProviderConfig) => void;
}

export function ConfigList({
  filteredConfigs,
  selectedConfig,
  onConfigSelect,
}: ConfigListProps) {
  const handleConfigClick = useCallback(
    (config: ProviderConfig) => {
      if (selectedConfig?.id !== config.id) {
        onConfigSelect(config);
      }
    },
    [selectedConfig, onConfigSelect]
  );

  return (
    <div className="space-y-2">
      {filteredConfigs.map((config) => (
        <div
          key={config.id}
          className={`cursor-pointer rounded p-2 ${
            selectedConfig?.id === config.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
          onClick={() => handleConfigClick(config)}
        >
          <div className="text-sm">{config.displayName}</div>
        </div>
      ))}
    </div>
  );
}
