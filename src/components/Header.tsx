import { ProviderConfig } from '@/types/modelConfig';
import { logger } from '@/utils/logger';
import { Link } from '@tanstack/react-router';
import { ChevronDown } from 'lucide-react';
import React from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { NavMenu } from './NavMenu';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './cn/ui';
import { ModelDialog } from './model_configuration/ModelDialog';

export function Header() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSaveConfig = (config: ProviderConfig) => {
    logger.info(`Saving config: ${JSON.stringify(config)}`);
  };

  return (
    <>
      <nav className="flex w-full items-center justify-center gap-4 border-b-2 py-2">
        <Link to="/">Home</Link>
        <NavMenu />
        <DarkModeToggle />
        <div className="flex gap-4">
          <Button
            className="hover:underline"
            onClick={() => setIsDialogOpen(true)}
          >
            Models
          </Button>
          <Button className="hover:underline">
            <Link to="/rag">RAG</Link>
          </Button>
          <Button className="hover:underline">Agent Builder</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hover:underline">
                Pages <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/components/ChatMessage">Components</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <ModelDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveConfig}
      />
      <hr />
    </>
  );
}
