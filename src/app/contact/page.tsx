'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default function ContactPage() {
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
                Contact Us
              </motion.h1>
            </section>

      {/* Contact Info + Form Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-serif mb-4">We’d Love to Hear From You</h2>
          <Separator className="bg-[#b79b64] mb-8 mx-auto w-20" />
          <p className="text-lg text-[#3a2b1a] leading-relaxed mb-12">
            Whether you’re looking to partner with us, import our coffee, or simply
            learn more about our process — our team is here to connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-md bg-[#f1ece6] rounded-2xl">
              <CardContent className="p-8 space-y-6 text-left">
                <div>
                  <h3 className="font-serif text-xl mb-2">Head Office</h3>
                  <p className="text-[#3a2b1a]">
                    Bole, Addis Ababa, Ethiopia<br />
                    PO Box 1234
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">Email</h3>
                  <p className="text-[#3a2b1a]">info@cupcoffeeexport.com</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">Phone</h3>
                  <p className="text-[#3a2b1a]">+251 911 123 456</p>
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-2">Business Hours</h3>
                  <p className="text-[#3a2b1a]">
                    Monday – Friday: 9:00 AM – 6:00 PM<br />
                    Saturday: 10:00 AM – 2:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <Card className="border-0 shadow-md bg-white rounded-2xl">
              <CardContent className="p-8 space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-[#3a2b1a]">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="border-[#b79b64]/30 focus-visible:ring-[#b79b64]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#3a2b1a]">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="border-[#b79b64]/30 focus-visible:ring-[#b79b64]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-[#3a2b1a]">Message</label>
                  <Textarea
                    placeholder="Write your message..."
                    className="border-[#b79b64]/30 focus-visible:ring-[#b79b64] h-32"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-[#2b1d0e] hover:bg-[#3a2b1a] text-white w-full py-3 rounded-full"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.form>
        </div>
      </section>

      {/* Map or Closing Section */}
      <section className="bg-[#f1ece6] py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-serif mb-4">Visit Us in Addis Ababa</h2>
          <p className="text-[#3a2b1a] mb-8">
            Come share a traditional Ethiopian coffee ceremony with us at our head office.
          </p>
          <iframe
            title="Cup Coffee Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.022929372445!2d38.77946997454689!3d8.980603691108289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8fbcfa9a1bb7%3A0xe2331b4b1dfc0ac!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1699557438021!5m2!1sen!2set"
            width="100%"
            height="350"
            className="rounded-2xl border-none shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </section>
    </div>
  )
}
