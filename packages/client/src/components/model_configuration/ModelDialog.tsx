import { ProviderConfig } from '@/types/modelConfig';

import { useConfiguration } from '@/context/ConfigContext';
import { Button } from '@cn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@cn/ui/dialog';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConfigForm } from './ConfigForm';
import { ConfigList } from './ConfigList';
import { SearchConfigs } from './ConfigSearch';

interface ModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ProviderConfig) => void;
}

export function ModelDialog({ isOpen, onClose, onSave }: ModelDialogProps) {
  const { configManager, activeConfig, setActiveConfig, isLoading } =
    useConfiguration();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConfigs = useMemo(() => {
    if (!configManager) return [];
    return configManager
      .getConfigs()
      .filter((config): config is ProviderConfig => 'displayName' in config)
      .filter((config) =>
        config.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [configManager, searchTerm]);

  const handleConfigSelect = useCallback(
    (config: ProviderConfig) => {
      setActiveConfig(config.id);
    },
    [setActiveConfig]
  );

  const handleUpdateConfig = useCallback(
    (field: keyof ProviderConfig, value: any) => {
      if (activeConfig && configManager) {
        const updatedConfig = {
          ...activeConfig,
          [field]: value,
        } as ProviderConfig;
        configManager.updateConfig(updatedConfig);
      }
    },
    [activeConfig, configManager]
  );

  useEffect(() => {
    if (activeConfig) {
      setActiveConfig(activeConfig.id);
    }
  }, [activeConfig, setActiveConfig]);

  const handleAddConfig = () => {
    if (configManager) {
      const newConfig: ProviderConfig = {
        // .app-scope
        id: `new-model-${Date.now()}`,
        displayName: 'New Model',

        // .app-scope/.logic - changes model interaction
        systemMessage: '',
        apiProvider: 'OpenAI',

        // .essential-scope
        apiKey: '',
        baseURL: '',
        modelName: '',

        // .app-scope/.requests
        headers: {},
        prepareRequest: (message: string) => {
          return {
            url: '',
            method: '',
            headers: {},
            body: null,
          };
        },

        parseResponse: (response: any) => {
          return {
            id: '',
            type: '',
            role: '',
            model: '',
            content: [{ type: '', text: '' }],
            tokens: {
              input: 0,
              output: 0,
            },
          };
        },
      };

      configManager.addConfig(newConfig);
      setActiveConfig(newConfig.id);
    }
  };

  const handleDeleteConfig = (id: string) => {
    if (configManager) {
      configManager.removeConfig(id);
    }
  };

  const handleSave = () => {
    if (activeConfig) {
      onSave(activeConfig);
      onClose();
    }
  };

  if (isLoading) {
    return null; // or return a loading spinner
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background text-foreground sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Edit Configuration</DialogTitle>
          <DialogDescription>
            Manage your API configurations. Add, edit, or remove configurations
            as needed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <div className="w-1/3 space-y-4">
            <SearchConfigs
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <ConfigList
              filteredConfigs={filteredConfigs}
              selectedConfig={activeConfig}
              onConfigSelect={handleConfigSelect}
            />
            <Button onClick={handleAddConfig}>Add New</Button>
          </div>
          <div className="w-2/3 space-y-4">
            {activeConfig && (
              <ConfigForm config={activeConfig} onUpdate={handleUpdateConfig} />
            )}
            <div className="flex justify-end gap-2">
              <Button
                variant="destructive"
                onClick={() =>
                  activeConfig && handleDeleteConfig(activeConfig.id)
                }
                disabled={!activeConfig}
              >
                Delete
              </Button>
              <Button onClick={handleSave} disabled={!activeConfig}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
