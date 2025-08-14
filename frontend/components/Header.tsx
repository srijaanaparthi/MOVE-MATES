import { WalletSelector } from "./WalletSelector";
import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-4 max-w-screen-xl mx-auto w-full flex-wrap">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600" />
        <h1 className="display">MoveMates</h1>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <Nav />
        <ThemeToggle />
        <WalletSelector />
      </div>
    </div>
  );
}
