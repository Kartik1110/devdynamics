import { NAV_ITEMS } from "@/config/site";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
    return (
        <nav className="top-0 left-0 right-0 z-10 flex justify-between items-center p-3 px-10  backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-800">
            <div className="flex items-center">
                <img src="https://assets-global.website-files.com/642535c7875ea6e60927dd49/65cb115f23533388f1d0b7e2_DevDynamics_Logo.svg" loading="lazy" alt="Untitled UI logotext" className="text-white" />
            </div>
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        {NAV_ITEMS.map((item) => (
                            <NavigationMenuItem key={item.id}>
                                <a href={item.url}>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {item.title}
                                    </NavigationMenuLink>
                                </a>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="default" className="bg-primary">Search</Button>
                <div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </nav>
    )
}