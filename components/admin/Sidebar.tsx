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
    <aside className="sticky top-0 h-screen w-67.5 bg-[#2C2C2C] text-white flex flex-col justify-between border-r border-[#3B3B3B]">
      {/* TOP */}
      <div>
        {/* logo */}
        <div className="border-b border-[#3A3A3A] px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#E4CC72] flex items-center justify-center text-[#2C2C2C] font-bold">
              B
            </div>

            <div>
              <h2 className="text-lg font-semibold">Boraland</h2>
              <p className="font-mono text-xs text-gray-400">ADMIN</p>
            </div>
          </div>
        </div>

        {/* nav links */}
        <nav className="mt-8 px-4 space-y-3">
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between rounded-full px-4 py-3 transition ${
                  active ? "bg-[#E4CC72] text-[#2C2C2C]" : "hover:bg-[#3A3A3A]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} />
                  <span>{link.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="p-4 space-y-4">
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
