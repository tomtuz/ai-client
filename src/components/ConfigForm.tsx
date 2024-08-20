import { ModelConfig } from "@/api/types";
import { Copy } from "lucide-react";
import { Button, Input, Label } from "./cn/ui";

interface ConfigFormProps {
  config: ModelConfig;
  onUpdate: (
    field: string,
    value: string | number,
    headerIndex?: number,
    headerField?: string,
  ) => void;
  onCopy: (text: string) => void;
  onAddHeader: () => void;
}

export function ConfigForm({
  config,
  onUpdate,
  onCopy,
  onAddHeader,
}: ConfigFormProps) {
  return (
    <>
      <Label htmlFor="configName">Config Name</Label>
      <Input
        id="configName"
        value={config.displayName || ""}
        onChange={(e) => onUpdate("displayName", e.target.value)}
      />
      <Label htmlFor="configId">Model ID</Label>
      <Input
        id="configId"
        value={config.modelId || ""}
        onChange={(e) => onUpdate("modelId", e.target.value)}
      />
      <Label htmlFor="configEndpoint">URL</Label>
      <div className="relative">
        <Input
          id="configEndpoint"
          value={config.url}
          onChange={(e) => onUpdate("url", e.target.value)}
        />
        <Button
          size="sm"
          variant="ghost"
          className="-translate-y-1/2 absolute top-1/2 right-2 transform"
          onClick={() => onCopy(config.url)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <Label htmlFor="configApiKey">API Key</Label>
      <div className="relative">
        <Input
          id="configApiKey"
          value={config.apiToken || ""}
          onChange={(e) => onUpdate("apiToken", e.target.value)}
          type="password"
        />
        <Button
          size="sm"
          variant="ghost"
          className="-translate-y-1/2 absolute top-1/2 right-2 transform"
          onClick={() => onCopy(config.apiToken || "")}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <Label>Headers</Label>
      {config.headers?.map((header, index) => (
        <div
          key={`header-${index}`}
          className="mb-2 flex gap-2"
        >
          {Object.entries(header).map(([key, value]) => (
            <Input
              key={key}
              placeholder={key}
              value={value}
              onChange={(e) => onUpdate("headers", e.target.value, index, key)}
            />
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onCopy(JSON.stringify(header))}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={onAddHeader}>Add Header</Button>
    </>
  );
}
