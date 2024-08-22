import { ModelConfig } from "@/api/types";

interface ConfigListProps {
  filteredConfigs: ModelConfig[];
  selectedConfig: ModelConfig | null;
  onConfigSelect: (config: ModelConfig) => void;
}

export function ConfigList({
  filteredConfigs,
  selectedConfig,
  onConfigSelect,
}: ConfigListProps) {
  return (
    <div className="max-h-[640px] overflow-y-auto">
      {filteredConfigs.map((config) => (
        <div
          key={config.id}
          className={`p-2 cursor-pointer ${selectedConfig?.id === config.id ? "bg-blue-100" : ""}`}
          onClick={() => onConfigSelect(config)}
        >
          <div>{config.displayName}</div>
          <div className="text-sm text-gray-500">{config.id}</div>
        </div>
      ))}
    </div>
  );
}
