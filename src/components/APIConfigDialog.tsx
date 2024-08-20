import { ModelConfigs } from "@/api";
import { ModelConfig } from "@/api/types";
import { ConfigForm } from "@/components/ConfigForm";
import { ConfigList } from "@/components/ConfigList";
import { SearchConfigs } from "@/components/ConfigSearch";
import { useModels } from "@/hooks/useModels";
import { useCallback, useMemo, useState } from "react";
import { Button } from "./cn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./cn/ui/dialog";
import { useToast } from "./cn/ui/use-toast";

interface APIConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ModelConfig) => void;
}

export function APIConfigDialog({
  isOpen,
  onClose,
  onSave,
}: APIConfigDialogProps) {
  const ModelConfigArray = useModels();
  const configIds = ModelConfigs.map((config) => config.modelId || "");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConfig, setSelectedConfig] = useState<ModelConfig | null>(
    null,
  );
  const { toast } = useToast();

  const filteredConfigs = useMemo(() => {
    return ModelConfigs.filter(
      (config) =>
        config.modelId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleConfigSelect = useCallback((config: ModelConfig) => {
    setSelectedConfig(config);
  }, []);

  const handleFormUpdate = useCallback(
    (
      field: string,
      value: string | number,
      headerIndex?: number,
      headerField?: string,
    ) => {
      if (selectedConfig) {
        setSelectedConfig((prevConfig) => {
          if (!prevConfig) return null;

          const updatedConfig = { ...prevConfig };

          if (headerIndex !== undefined && headerField) {
            if (!updatedConfig.headers) {
              updatedConfig.headers = [];
            }
            updatedConfig.headers[headerIndex][headerField] = value;
          } else {
            (updatedConfig as any)[field] = value;
          }

          return updatedConfig;
        });
      }
    },
    [selectedConfig],
  );

  const handleSave = useCallback(() => {
    if (selectedConfig) {
      onSave(selectedConfig);
      toast({
        title: "API Config saved",
        description: "Your changes have been saved successfully.",
      });
      onClose();
    }
  }, [selectedConfig, onSave, toast, onClose]);

  const copyToClipboard = useCallback(
    (text: string) => {
      try {
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard",
          description: "The text has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Copy failed",
          description: "Unable to copy the text to clipboard.",
          variant: "destructive",
        });
      }
    },
    [toast],
  );

  const addHeader = useCallback(() => {
    setSelectedConfig((prevConfig) => {
      if (!prevConfig) return null;
      return {
        ...prevConfig,
        headers: [...(prevConfig.headers || []), { name: "", value: "" }],
      };
    });
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an API Configuration</DialogTitle>
          <DialogDescription>
            Search, view, and edit your API configuration.
          </DialogDescription>
        </DialogHeader>
        <SearchConfigs
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ConfigList
          filteredConfigs={filteredConfigs}
          selectedConfig={selectedConfig}
          onConfigSelect={handleConfigSelect}
        />
        {selectedConfig && (
          <ConfigForm
            config={selectedConfig}
            onUpdate={handleFormUpdate}
            onCopy={copyToClipboard}
            onAddHeader={addHeader}
          />
        )}
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
