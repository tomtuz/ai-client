import { ModelConfig } from "@/api/types";
import { Input, Label, Select } from "@cn/ui";
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
          value={config.displayName}
          onChange={(e) => onUpdate("displayName", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="modelName">Model Name</Label>
        <Input
          id="modelName"
          value={config.modelName}
          onChange={(e) => onUpdate("modelName", e.target.value)}
        />
      </div>
      <div>
        {/* <Label htmlFor="idSelectProvider">API Provider</Label> */}
        <Select
          // id="idSelectProvider"
          value={config.apiProvider}
          onValueChange={(e: any) =>
            onUpdate(
              "apiProvider",
              e.target.value as ModelConfig["apiProvider"],
            )
          }
        >
          <option value="OpenAI">OpenAI</option>
          <option value="Native">Native</option>
          <option value="Custom">Custom</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="endpoint">Endpoint</Label>
        <Input
          id="endpoint"
          value={config.endpoint}
          onChange={(e) => onUpdate("endpoint", e.target.value)}
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
        headers={config.headers}
        onUpdate={handleHeadersUpdate}
      />
    </form>
  );
}
