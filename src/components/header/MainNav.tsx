import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export default function MainNav() {
  const { authState, logout } = useAuth(); // Access auth state and logout function

  return (
    <div className="container mx-auto">
      <NavigationMenu className="mr-4 hidden gap-2 md:flex w-full">
        <NavigationMenuList className="flex w-full items-center">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="text-[20px]" to="/">
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="text-[20px]" to="/about">
                About
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link className="text-[20px]" to="/services">
                Services
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="ml-auto">
            {authState.isAuthenticated ? (
              <>
                <div className="flex items-center">
                  <NavigationMenuLink asChild>
                    <Link className="text-[20px] mr-4" to="/profile">
                      Profile
                    </Link>
                  </NavigationMenuLink>
                  <Button onClick={logout} variant="outline">
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Button asChild>
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
