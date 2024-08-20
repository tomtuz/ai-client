import { ModelConfig } from "@/api/types";
import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";
import { Button } from "./cn/ui";
import { ModelDialog } from "./model_configuration/ModelDialog";

interface HeaderProps {
  onSaveConfig: (config: ModelConfig) => void;
}

export function Header({ onSaveConfig }: HeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <nav className="flex w-full items-center justify-center gap-4 border-b-2 py-2">
        <NavMenu />
        <DarkModeToggle />
        <div className="flex gap-4">
          <Button className="hover:underline">List</Button>
          <Button
            className="hover:underline"
            onClick={() => setIsDialogOpen(true)}
          >
            Models
          </Button>
          <Button className="hover:underline">Option2</Button>
        </div>
      </nav>
      <ModelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={onSaveConfig}
      />
    </>
  );
}
