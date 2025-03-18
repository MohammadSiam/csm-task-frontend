import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function MainNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const storedAuthData = localStorage.getItem("authData");

  const authData = storedAuthData ? JSON.parse(storedAuthData) : null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              <Link className="text-[20px]" to="/content">
                Content
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="ml-auto">
            {authData && authData.email ? (
              <>
                <div className="flex items-center">
                  <NavigationMenuLink asChild>
                    <Link className="text-[20px] mr-4" to="/profile">
                      Profile
                    </Link>
                  </NavigationMenuLink>
                  <Button onClick={handleLogout} variant="outline">
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
