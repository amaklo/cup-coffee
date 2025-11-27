'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const teamImages = [
  '/images/cp1 (1).jpg',
  '/images/cp3 (1).jpg',
  '/images/cp2 (1).jpg',
  '/images/cpt (1).jpg',
  '/images/cp3 (1).jpg',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf7f3] text-[#2b1d0e]">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cp2 (1).jpg"
          alt="Ethiopian Coffee Culture"
          fill
          className="object-cover brightness-[0.5]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-5xl md:text-6xl font-serif text-white drop-shadow-xl text-center"
        >
          ABOUT
          COFFEE CUP
        </motion.h1>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif mb-6">Our Story</h2>
          <Separator className="bg-[#b79b64] mb-8 mx-auto w-20" />
          <p className="text-lg leading-relaxed text-[#3a2b1a]">
            COFFEE CUP was founded with a single vision — to share Ethiopia’s
            world-renowned coffee with the globe, while preserving its authentic
            roots and cultural soul. From the highlands of Yirgacheffe to the
            hills of Sidamo, our beans are ethically sourced, expertly roasted,
            and passionately crafted for those who appreciate excellence in every sip.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-[#f1ece6] py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif mb-4 text-[#2b1d0e]">Our Mission</h3>
            <p className="text-[#3a2b1a] leading-relaxed">
              To deliver the finest Ethiopian coffee to the world with integrity,
              sustainability, and respect for the farmers who make it possible.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif mb-4 text-[#2b1d0e]">Our Vision</h3>
            <p className="text-[#3a2b1a] leading-relaxed">
              To represent Ethiopia’s coffee heritage as a luxurious, authentic brand
              known for quality, culture, and global excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cultural Warmth Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-serif text-center mb-10"
        >
          The Heart of Ethiopia in Every Bean
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {teamImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden shadow-md rounded-2xl hover:shadow-xl transition">
                <CardContent className="p-0">
                  <Image
                    src={src}
                    alt={`Cultural photo ${index + 1}`}
                    width={500}
                    height={400}
                    className="object-cover h-64 w-full"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
