"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-cream text-coffee-900">

      {/* 🟤 HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-cup.jpeg"
          alt="Ethiopian coffee cup"
          fill
          priority
          className="object-cover object-center brightness-[0.45]"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-white/70 mb-6">
            The Soul of Ethiopian Coffee
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/75">
            Crafted with heritage, exported with excellence — CUP COFFEE brings Ethiopia’s finest beans to the world.
          </p>
          <Link href="/coffees">
            <Button className="bg-[#D0C0AC]/20 text-white/75 hover:bg-[#D0C0AC]/30 text-lg px-6 py-3 rounded-lg font-medium">
              Discover Our Coffees
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 🟤 OUR STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/harrar.jpg"
            alt="Coffee beans texture"
            width={600}
            height={400}
            className="rounded-2xl shadow-md"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="font-display text-4xl text-coffee-800">Our Story</h2>
          <p className="text-lg text-coffee-700 leading-relaxed">
            From the lush Ethiopian highlands, where coffee first blossomed, CUP COFFEE embodies centuries of craftsmanship and authenticity.
            We work directly with local farmers to ensure that every bean tells the story of its origin — rich, pure, and deeply Ethiopian.
          </p>
          <Link href="/about">
            <Button variant="outline" className="border-gold text-coffee-800 hover:bg-gold/10">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* 🟤 SIGNATURE COFFEES */}
      <section className="bg-coffee-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="font-display text-4xl text-coffee-800">Signature Coffees</h2>
          <p className="text-coffee-700 mt-3">Explore our hand-picked, export-grade varieties from Ethiopia’s finest regions.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { name: "Yirgacheffe", img: "/images/yirgacheffe.jpeg", desc: "Floral aroma and vibrant acidity with citrus undertones." },
            { name: "Sidamo", img: "/images/sidamo.jpeg", desc: "Balanced sweetness and smooth body, renowned for its richness." },
            { name: "Harrar", img: "/images/harrar.jpg", desc: "Intense aroma, fruity notes, and a wine-like finish." }
          ].map((coffee, i) => (
            <motion.div
              key={coffee.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
                <Image
                  src={coffee.img}
                  alt={coffee.name}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                <CardContent className="p-6 text-left">
                  <h3 className="font-display text-2xl text-coffee-800 mb-2">{coffee.name}</h3>
                  <p className="text-sm text-coffee-700">{coffee.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟤 CALL TO ACTION */}
      <section className="text-center py-20 px-6 bg-cream">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-display text-4xl text-coffee-800 mb-6"
        >
          Partner with Ethiopia’s Finest Export Brand
        </motion.h2>
        <p className="max-w-2xl mx-auto text-coffee-700 mb-8">
          Whether you’re a global distributor or local partner, CUP COFFEE ensures excellence from crop to cup.
        </p>
        <Link href="/contact">
          <Button className="bg-[#D0C0AC] text-white/80 hover:bg-[#D0C0AC]/70 text-lg px-6 py-3 rounded-lg font-medium">
            Get in Touch
          </Button>
        </Link>
      </section>

    </div>
  );
}
