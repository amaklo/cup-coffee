import "@/styles/globals.css";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "COFFEE CUP",
  description: "From the Ethiopian Highlands to the World's Finest Cups"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-coffee-900">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
