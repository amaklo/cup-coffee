"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { getCurrentUser } from "@/lib/auth"; 

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = getCurrentUser();
  const isAuthenticated = !!user;


  useEffect(() => {
    if (!user) router.replace("/sign-in");
  }, [user, router]);

  if (isAuthenticated === false) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}
