"use client";

import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-coffee-900 text-cream pt-10 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Company */}
          <div>
            <h4 className="font-display text-lg mb-2 text-gold">COFFEE CUP</h4>
            <p className="text-sm opacity-80">
              From the Ethiopian highlands to the world — delivering premium coffee with authenticity and excellence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-2 text-gold">Quick Links</h4>
            <ul className="space-y-1 text-sm opacity-80">
              {["About", "Coffees", "News", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-2 text-gold">Contact</h4>
            <p className="text-sm opacity-80">Addis Ababa, Ethiopia</p>
            <p className="text-sm opacity-80">info@cupcoffee.et</p>
            <p className="text-sm opacity-80">+251 962526633</p>
          </div>
        </motion.div>

        <Separator className="my-6 bg-coffee-700" />
        <p className="text-center text-xs opacity-60">
          © {new Date().getFullYear()} COFFEE CUP — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
