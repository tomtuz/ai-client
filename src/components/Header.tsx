import { Button } from "./cn/ui";
import { ModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";

export default function Header() {
  return (
    <>
      <nav className="flex h-12 w-full items-center justify-center gap-4 p-4 shadow-md">
        <NavMenu />
        <ModeToggle />
        <div className="flex gap-4">
          <Button className="hover:underline">List</Button>
          <Button className="hover:underline">Vanilla</Button>
          <Button className="hover:underline">React</Button>
        </div>
      </nav>
    </>
  );
}
