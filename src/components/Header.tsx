import { Button } from "./cn/ui";
import { ModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";

export default function Header() {
  return (
    <>
      <nav className="flex items-center justify-center w-full gap-4 py-2 border-b-2">
        <NavMenu />
        <ModeToggle />
        <div className="flex gap-4">
          <Button className="hover:underline">List</Button>
          <Button className="hover:underline">Option1</Button>
          <Button className="hover:underline">Option2</Button>
        </div>
      </nav>
    </>
  );
}
