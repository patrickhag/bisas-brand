"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import type { LoginFormValues } from "@/components/admin/LoginForm";

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = (values: LoginFormValues) => {
    setError("");

    if (
      values.username === ADMIN_USERNAME &&
      values.password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("admin_authenticated", "true");
      router.replace("/admin/projects");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F9F9F9] px-6">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} error={error} />
      </div>
    </section>
  );
}
