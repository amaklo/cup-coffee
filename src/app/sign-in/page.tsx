"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

export default function AdminSignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.user);
      router.push("/admin");
    } else {
      setError(data.message || "Invalid login details");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <Link href="/" className="flex flex-col items-center gap-2">
        <Image
          src="/images/logo.jpg"
          alt="COFFEE CUP Logo"
          width={80} 
          height={80} 
          className="rounded-full"
        />
        <span className="font-display text-2xl font-semibold text-coffee-800">
          COFFEE CUP
        </span>
      </Link>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Admin Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="space-y-1">
              <Label>Email</Label>
              <Input name="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
