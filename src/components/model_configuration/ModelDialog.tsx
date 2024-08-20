// src/components/model_configuration/ModelDialog.tsx

import { ModelConfigs } from "@/api";
import { ModelConfig } from "@/api/types";
import { useConfigurationManager } from "@/hooks/useConfigurationManager";
import { Button } from "@cn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@cn/ui/dialog";
import { useMemo } from "react";
import { ConfigForm } from "./ConfigForm";
import { ConfigList } from "./ConfigList";
import { SearchConfigs } from "./ConfigSearch";

interface ModelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ModelConfig) => void;
}

export function ModelDialog({ isOpen, onClose, onSave }: ModelDialogProps) {
  const {
    configs,
    selectedConfig,
    searchTerm,
    setSearchTerm,
    handleConfigSelect,
    handleUpdateConfig,
    handleAddConfig,
    handleDeleteConfig,
  } = useConfigurationManager(ModelConfigs);

  const filteredConfigs = useMemo(() => {
    return configs.filter((config) =>
      config.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [configs, searchTerm]);

  const handleSave = () => {
    if (selectedConfig) {
      onSave(selectedConfig);
      onClose();
    }
  };

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
              selectedConfig={selectedConfig}
              onConfigSelect={handleConfigSelect}
            />
            <Button onClick={handleAddConfig}>Add New</Button>
          </div>
          <div className="w-2/3 space-y-4">
            {selectedConfig && (
              <ConfigForm
                config={selectedConfig}
                onUpdate={(field, value) => handleUpdateConfig(field, value)}
              />
            )}
            <div className="flex justify-end gap-2">
              <Button
                onClick={() =>
                  selectedConfig?.modelId &&
                  handleDeleteConfig(selectedConfig.modelId)
                }
                disabled={!selectedConfig}
              >
                Delete
              </Button>
              <Button
                onClick={handleSave}
                disabled={!selectedConfig}
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
