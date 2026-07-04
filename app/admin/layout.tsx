"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";

const PUBLIC_ADMIN_PATHS = ["/admin", "/admin/login"];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPath = PUBLIC_ADMIN_PATHS.includes(pathname);

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("admin_authenticated") === "true";

    // Allow access to /admin and /admin/login even if not authenticated.
    // For all other /admin/* pages, redirect to login if not authenticated.
    if (!isAuthenticated && !isPublicPath) {
      router.replace("/login");
    }
  }, [router, pathname, isPublicPath]);

  // Public pages (login, landing) render without sidebar
  if (isPublicPath) {
    return <>{children}</>;
  }

  // Protected pages render with the sidebar
  return (
    <div className="flex min-h-screen bg-[#F8F8F6]">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
