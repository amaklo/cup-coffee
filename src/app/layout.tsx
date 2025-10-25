import "@/styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "COFFEE CUP",
  description: "From the Ethiopian Highlands to the World's Finest Cups"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-cream text-coffee-900">
        <Navbar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
