import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}
