'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const coffees = [
  {
    name: 'Yirgacheffe',
    region: 'Southern Ethiopia',
    description:
      'Renowned for its delicate floral aroma, tea-like body, and bright acidity — a true gem among Ethiopian coffees.',
    image: '/images/cp2 (1).jpg',
  },
  {
    name: 'Sidamo',
    region: 'Southern Highlands',
    description:
      'Balanced and rich with chocolate undertones and subtle citrus notes. A perfect harmony of flavor and aroma.',
    image: '/images/cp1 (1).jpg',
  },
  {
    name: 'Harrar',
    region: 'Eastern Ethiopia',
    description:
      'Full-bodied and exotic with winey blueberry notes and a naturally sweet finish. The pride of the eastern highlands.',
    image: '/images/cp3 (1).jpg',
  },
  {
    name: 'Guji',
    region: 'Oromia Region',
    description:
      'Sweet and clean with hints of jasmine and stone fruit. A modern favorite that bridges tradition and innovation.',
    image: '/images/cpt (1).jpg',
  },
]

export default function CoffeesPage() {
  return (
    <div className="min-h-screen bg-[#faf7f3] text-[#2b1d0e]">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/cp1 (1).jpg"
          alt="Ethiopian coffee beans"
          fill
          className="object-cover brightness-[0.5]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-5xl md:text-6xl font-serif text-white drop-shadow-xl"
        >
          Our Coffees
        </motion.h1>
      </section>

      {/* Coffee Collection */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif mb-6">Crafted by Nature, Perfected by Tradition</h2>
          <Separator className="bg-[#b79b64] mb-10 mx-auto w-20" />
          <p className="text-lg leading-relaxed text-[#3a2b1a]">
            Each bean tells a story of the highlands — grown under the Ethiopian sun,
            hand-picked with care, and roasted to reveal the soul of its origin.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {coffees.map((coffee, index) => (
            <motion.div
              key={coffee.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition bg-white rounded-2xl">
                <div className="relative h-56 w-full">
                  <Image
                    src={coffee.image}
                    alt={coffee.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">{coffee.name}</CardTitle>
                  <p className="text-sm text-[#b79b64]">{coffee.region}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-[#3a2b1a] leading-relaxed">
                    {coffee.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Call-to-Action */}
      <section className="bg-[#f1ece6] py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-serif mb-4">Experience Ethiopian Coffee at Its Finest</h2>
          <p className="text-[#3a2b1a] mb-8">
            Partner with us and bring the authentic taste of Ethiopia to your market.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#2b1d0e] text-white px-8 py-3 rounded-full font-medium hover:bg-[#3a2b1a] transition"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>
    </div>
  )
}
