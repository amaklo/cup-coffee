"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/auth";
import { MobileSidebar } from "./mobile-sidebar";

export function Header() {
  const router = useRouter();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-4">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <h1 className="font-semibold text-lg">
          Welcome, {user?.name || "Admin"}
        </h1>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
