"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify, Moon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user, profileInfo }) {
  const { theme, setTheme } = useTheme();

  const menuItems = [
    { label: "Home", path: "/", show: true },
    { label: "Feed", path: "/feed", show: profileInfo },
    { label: "Login", path: "/sign-in", show: !user },
    { label: "Register", path: "/sign-up", show: !user },
    { label: "Activity", path: "/activity", show: profileInfo?.role === "candidate" },
    { label: "Companies", path: "/companies", show: profileInfo?.role === "candidate" },
    { label: "Jobs", path: "/jobs", show: profileInfo },
    { label: "Membership", path: "/membership", show: profileInfo },
    { label: "Account", path: "/account", show: profileInfo },
  ];

  return (
    <header className="flex h-16 w-full items-center px-4 bg-[#faecd2] dark:bg-[#1c3424] shadow-md">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden bg-transparent border-none p-2">
            <AlignJustify className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            <span className="sr-only">Toggle Navigation Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#faecd2] dark:bg-[#1c3424]">
          <Link className="mr-6 hidden lg:flex" href="/">
            <h3 className="text-2xl font-bold text-[#a4c868] dark:text-[#a4c868]">WorkInHrs</h3>
          </Link>
          <div className="grid gap-2 py-6">
            {menuItems.map((menuItem, idx) =>
              menuItem.show ? (
                <Link
                  key={idx}
                  href={menuItem.path}
                  className="flex w-full items-center py-2 text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-[#a4c868]"
                >
                  {menuItem.label}
                </Link>
              ) : null
            )}
            <Moon
              className="cursor-pointer mb-4"
              fill={theme === "dark" ? "#faecd2" : "#1c3424"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <UserButton afterSignOutUrl="/" />
          </div>
        </SheetContent>
      </Sheet>
      <Link className="hidden lg:flex font-bold text-3xl mr-6" href="/">
        <h3 className="text-[#a4c868] dark:text-[#faecd2]">WorkInHrs</h3>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        {menuItems.map((menuItem, idx) =>
          menuItem.show ? (
            <Link
              key={idx}
              href={menuItem.path}
              onClick={() => sessionStorage.removeItem("filterParams")}
              className="group inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-[#a4c868]"
            >
              {menuItem.label}
            </Link>
          ) : null
        )}
        <Moon
          className="cursor-pointer"
          fill={theme === "dark" ? "#faecd2" : "#1c3424"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        <UserButton afterSignOutUrl="/" />
      </nav>
    </header>
  );
}

export default Header;
