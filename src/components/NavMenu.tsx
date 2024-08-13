import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  Button,
} from "@cn/ui";

export function NavMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <Button className="hover:underline">
            <MenubarItem>Setting1</MenubarItem>
          </Button>

          <MenubarSeparator />
          <Button className="hover:underline">
            <MenubarItem>Setting2</MenubarItem>
          </Button>

          <MenubarSeparator />
          <Button className="hover:underline">
            <MenubarItem>Setting3</MenubarItem>
          </Button>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
