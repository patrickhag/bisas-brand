"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowUpRight, Lock, User } from "lucide-react";

export type LoginFormValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  error?: string;
};

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pb-8 pt-6">
      {/* header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E4CC72]">
          <Lock size={24} className="text-[#2C2C2C]" />
        </div>
        <h2 className="font-mono text-2xl font-bold text-[#2C2C2C]">
          Admin Access
        </h2>
        <p className="mt-2 font-mono text-sm text-[#6A6A6A]">
          Enter your credentials to continue.
        </p>
      </div>

      {/* error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="font-mono text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* username field */}
      <div className="mb-5">
        <label
          htmlFor="username"
          className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-[#6A6A6A]"
        >
          Username
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <User size={16} className="text-[#B0B0B0]" />
          </div>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoFocus
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] py-3.5 pl-11 pr-4 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-[#B0B0B0] focus:border-[#E4CC72] focus:ring-1 focus:ring-[#E4CC72]/30"
          />
        </div>
      </div>

      {/* password field */}
      <div className="mb-8">
        <label
          htmlFor="password"
          className="mb-2 block font-mono text-xs font-medium uppercase tracking-wider text-[#6A6A6A]"
        >
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Lock size={16} className="text-[#B0B0B0]" />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-full border border-gray-200 bg-[#F9F9F9] py-3.5 pl-11 pr-12 font-mono text-sm text-[#2C2C2C] outline-none transition-colors placeholder:text-[#B0B0B0] focus:border-[#E4CC72] focus:ring-1 focus:ring-[#E4CC72]/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#B0B0B0] hover:text-[#6A6A6A]"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#E4CC72] bg-[#E4CC72] px-8 py-4 font-mono text-base font-medium text-[#2C2C2C] transition-all hover:bg-[#D4BC5E]"
      >
        <span>Sign In</span>
        <div className="flex items-center justify-center rounded-full bg-[#2C2C2C] p-1.5 text-[#E4CC72] transition-transform group-hover:translate-x-0.5">
          <ArrowUpRight size={16} />
        </div>
      </button>
    </form>
  );
}
