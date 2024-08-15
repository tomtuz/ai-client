import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@cn/ui";

export function NavMenu() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Setting1</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Setting2</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Setting3</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
