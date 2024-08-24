import { ProviderConfig } from '@/types/modelConfig';
import { Input, Label, Select } from '@cn/ui';
import { HeadersForm } from './HeadersForm';

interface ConfigFormProps {
  config: ProviderConfig;
  onUpdate: (field: keyof ProviderConfig, value: any) => void;
}

export function ConfigForm({ config, onUpdate }: ConfigFormProps) {
  const handleHeadersUpdate = (newHeaders: Record<string, string>) => {
    onUpdate('headers' as keyof ProviderConfig, newHeaders);
  };

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          value={config.displayName}
          onChange={(e) => onUpdate('displayName', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="modelName">Model Name</Label>
        <Input
          id="modelName"
          value={config.modelName}
          onChange={(e) => onUpdate('modelName', e.target.value)}
        />
      </div>
      <div>
        <Select
          value={config.apiProvider}
          onValueChange={(value) =>
            onUpdate('apiProvider' as keyof ProviderConfig, value)
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
          value={config.baseURL}
          onChange={(e) => onUpdate('baseURL', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="apiToken">API Token</Label>
        <Input
          id="apiToken"
          type="password"
          value={config.apiKey || ''}
          onChange={(e) => onUpdate('apiKey', e.target.value)}
        />
      </div>
      <HeadersForm headers={config.headers} onUpdate={handleHeadersUpdate} />
    </form>
  );
}
