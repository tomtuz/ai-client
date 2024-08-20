import { ModelConfig } from "@/api/types";
import { Input, Label } from "@cn/ui";
import { HeadersForm } from "./HeadersForm";

interface ConfigFormProps {
  config: ModelConfig;
  onUpdate: (field: keyof ModelConfig, value: any) => void;
}

export function ConfigForm({ config, onUpdate }: ConfigFormProps) {
  const handleHeadersUpdate = (newHeaders: Record<string, string>) => {
    onUpdate("headers", newHeaders);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={config.displayName || ""}
          onChange={(e) => onUpdate("displayName", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="modelId">Model ID</Label>
        <Input
          id="modelId"
          value={config.modelId || ""}
          onChange={(e) => onUpdate("modelId", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          value={config.url}
          onChange={(e) => onUpdate("url", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="apiToken">API Token</Label>
        <Input
          id="apiToken"
          type="password"
          value={config.apiToken || ""}
          onChange={(e) => onUpdate("apiToken", e.target.value)}
        />
      </div>
      <HeadersForm
        headers={config.headers || {}}
        onUpdate={handleHeadersUpdate}
      />
    </form>
  );
}
