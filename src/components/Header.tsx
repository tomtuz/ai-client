import { ModelConfig } from "@/api/types";
import { logger } from "@/utils/logger";
import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";
import { Button } from "./cn/ui";
import { ModelDialog } from "./model_configuration/ModelDialog";

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSaveConfig = (config: ModelConfig) => {
    logger.info(`Saving config: ${JSON.stringify(config)}`);
  };

  return (
    <>
      <nav className="flex w-full items-center justify-center gap-4 border-b-2 py-2">
        <NavMenu />
        <DarkModeToggle />
        <div className="flex gap-4">
          <Button
            className="hover:underline"
            onClick={() => setIsDialogOpen(true)}
          >
            Models
          </Button>
          <Button className="hover:underline">Agent Builder</Button>
        </div>
      </nav>
      <ModelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveConfig}
      />
    </>
  );
}
