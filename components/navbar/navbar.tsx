"use client";

import { Search } from "@/components/layout/search";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/sidebar-config/mode-toggle";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface UserAvatarProps {}

const UserAvatar: FC<UserAvatarProps> = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
    );
  }

  if (!session) {
    return (
      <Link href="/login">
        <button className="text-sm font-medium text-muted-foreground hover:text-primary">
          Sign In
        </button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage
            src={session.user?.image ?? ""}
            alt={session.user?.name ?? "User avatar"}
          />
          <AvatarFallback className="bg-primary/10">
            {session.user?.name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="w-full cursor-pointer flex items-center"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="w-full cursor-pointer flex items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className="sticky top-4 z-50 mx-2 my-3 bg-green-300 rounded-2xl border bg-background/95 shadow-md backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-14 items-center px-4 ">
        {/* Sidebar Trigger */}
        <SidebarTrigger />

        {/* Search Bar */}
        <div className="flex flex-1 justify-start ml-2">
          <Search />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 px-3 md:px-6">
          <ModeToggle />
          <UserAvatar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
