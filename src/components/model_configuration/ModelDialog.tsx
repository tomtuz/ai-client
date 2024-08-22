import { ModelConfig } from "@/api/types";
import { useConfiguration } from "@/context/ConfigContext";
import { Button } from "@cn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@cn/ui/dialog";
import { useMemo, useState } from "react";
import { ConfigForm } from "./ConfigForm";
import { ConfigList } from "./ConfigList";
import { SearchConfigs } from "./ConfigSearch";

interface ModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ModelConfig) => void;
}

export function ModelDialog({ isOpen, onClose, onSave }: ModelDialogProps) {
  const { configManager, activeConfig, setActiveConfig, isLoading } =
    useConfiguration();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConfigs = useMemo(() => {
    if (!configManager) return [];
    return configManager
      .getConfigs()
      .filter((config: ModelConfig) =>
        config.displayName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [configManager, searchTerm]);

  const handleConfigSelect = (config: ModelConfig) => {
    setActiveConfig(config.id);
  };

  const handleUpdateConfig = (field: keyof ModelConfig, value: any) => {
    if (activeConfig && configManager) {
      const updatedConfig = { ...activeConfig, [field]: value };
      configManager.updateConfig(updatedConfig);
      setActiveConfig(updatedConfig.id);
    }
  };

  const handleAddConfig = () => {
    if (configManager) {
      const newConfig: ModelConfig = {
        id: `new-model-${Date.now()}`,
        displayName: "New Model",
        modelName: "",
        apiProvider: "Custom",
        endpoint: "",
        headers: {},
        prepareRequest: () => ({
          url: "",
          method: "POST",
          headers: {},
          body: {},
        }),
        parseResponse: (response) => response,
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
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[900px]">
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
              <ConfigForm
                config={activeConfig}
                onUpdate={handleUpdateConfig}
              />
            )}
            <div className="flex justify-end gap-2">
              <Button
                onClick={() =>
                  activeConfig && handleDeleteConfig(activeConfig.id)
                }
                disabled={!activeConfig}
              >
                Delete
              </Button>
              <Button
                onClick={handleSave}
                disabled={!activeConfig}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
