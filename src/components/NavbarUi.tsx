"use client"

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { AppLogo } from "@/components/AppLogo";
import { Github } from "lucide-react";
import StatusButton from "@/components/StatusButton";
import { usePathname } from "next/navigation";

export default function NavbarUi() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const [isActive, setIsActive] = React.useState(true);

  const topMenuItems = [
    { name: "Age Calculator", link: "/age-calculator" },
    { name: "Math Calculator", link: "/math-calculator" },
    { name: "Scientific Calculator", link: "/scientific-calculator" }
  ];

  const menuItems = [
    { name: "🎂 Age Calculator", link: "/age-calculator" },
    { name: "🔢 Math Calculator", link: "/math-calculator" },
    { name: "🧮 Scientific Calculator", link: "/scientific-calculator" },
    { name: "📚 Portfolio", link: "https://mukulanand.online"},
    { name: "🌐 App Server", link: "/server" },
    { name: "🌟 Give it a Star", link: "https://github.com/anand-mukul/numerify.git"}
  ];

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AppLogo />
          <Link href="/" color="foreground">
            <p className="font-bold text-inherit">Numerify</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {topMenuItems.map((topMenuItem) => (
          <NavbarItem key={topMenuItem.name} isActive={isActive && pathname === topMenuItem.link}>
            <Button className="bg-transparent hover:bg-orange-50">
              <Link
                color={isActive && pathname === topMenuItem.link ? "primary" : "foreground"}
                href={topMenuItem.link}
                aria-current={isActive && pathname === topMenuItem.link ? "page" : undefined}
              >
                {topMenuItem.name}
              </Link>
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/server">Server<StatusButton /></Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="https://github.com/anand-mukul/numerify.git" variant="flat" target="_blank">
            Github<Github size={16} />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={
                isActive && pathname === item.link
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }

              className="w-full font-inter font-semibold"
              href={item.link}
              size="lg"
            >
              <button className="w-full group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:bg-orange-200 hover:border-orange-300 hover:before:[box-shadow:_20px_20px_20px_30px_#d6602d] duration-500 before:duration-500 hover:duration-500 underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-orange-600 relative border text-left p-3  text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-orange-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-orange-300 after:right-8 after:top-3 after:rounded-full after:blur-lg">
                {item.name}</button>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}