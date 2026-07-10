"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Mail, Settings, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogClose,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const links = [
  {
    name: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/";
  };

  return (
    <aside className="sticky top-0 z-40 flex bg-[#2C2C2C] text-white lg:h-screen lg:w-67.5 lg:flex-col lg:justify-between lg:border-r lg:border-[#3B3B3B]">
      {/* TOP */}
      <div className="flex w-full items-center justify-between gap-3 px-4 py-3 lg:block lg:px-0 lg:py-0">
        {/* logo */}
        <div className="lg:border-b lg:border-[#3A3A3A] lg:px-6 lg:py-7">
          <div className="flex items-center gap-3">
            <Link className="block size-10" href={"/"}>
              <Image
                src={"/logo.svg"}
                alt="Bora-land logo"
                width={40}
                height={40}
              />
            </Link>
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold">Boraland</h2>
              <p className="font-mono text-xs text-gray-400">ADMIN</p>
            </div>
          </div>
        </div>

        {/* nav links */}
        <nav className="flex min-w-0 flex-1 justify-end gap-2 overflow-x-auto lg:mt-8 lg:block lg:space-y-3 lg:px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex shrink-0 items-center justify-between rounded-full px-3 py-2 text-sm transition lg:px-4 lg:py-3 lg:text-base ${
                  active ? "bg-[#E4CC72] text-[#2C2C2C]" : "hover:bg-[#3A3A3A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} />
                  <span className="hidden sm:inline">{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="hidden space-y-4 p-4 lg:block">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#E4CC72] flex items-center justify-center font-semibold text-[#2C2C2C]">
              BH
            </div>

            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">bisa@boraland.com</p>
            </div>
          </div>

          <AlertDialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
            <AlertDialogTrigger className="flex size-9 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-[#3A3A3A] hover:text-white">
              <LogOut size={17} />
            </AlertDialogTrigger>

            <AlertDialogPopup>
              <div className="px-7 pt-8 pb-7 text-center">
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription className="mt-3">
                  Are you sure you want to sign out? You&apos;ll need to log in
                  again to access the admin panel.
                </AlertDialogDescription>

                <div className="mt-7 flex items-center gap-3 justify-center">
                  <AlertDialogClose>Cancel</AlertDialogClose>
                  <AlertDialogAction onClick={handleLogout}>
                    Log Out
                  </AlertDialogAction>
                </div>
              </div>
            </AlertDialogPopup>
          </AlertDialog>
        </div>
      </div>
    </aside>
  );
}
