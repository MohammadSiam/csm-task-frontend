import MainNav from './MainNav';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="flex h-18 items-center">
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
