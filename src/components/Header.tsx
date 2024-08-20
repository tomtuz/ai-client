import { APIConfig } from "@/api/types";
import React from "react";
import { APIConfigDialog } from "./APIConfigDialog";
import { Button } from "./cn/ui/button";
import { DarkModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";

interface HeaderProps {
  onSave: (config: APIConfig) => void;
}

export function Header({ onSave }: HeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <nav className="flex items-center justify-center w-full gap-4 py-2 border-b-2">
        <NavMenu />
        <DarkModeToggle />
        <div className="flex gap-4">
          <Button className="hover:underline">List</Button>
          <Button
            className="hover:underline"
            onClick={() => setIsDialogOpen(true)}
          >
            Option1
          </Button>
          <Button className="hover:underline">Option2</Button>
        </div>
      </nav>
      <APIConfigDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={() => onSave}
      />
    </>
  );
}
