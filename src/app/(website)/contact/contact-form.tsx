'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

// ------------------
// Schema
// ------------------
const ContactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
})

type ContactFormValues = z.infer<typeof ContactSchema>

// ------------------
// Component inside your ContactPage
// ------------------
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Failed to send message')

      toast.success('Message sent successfully!')
      reset()
    } catch (error) {
      console.error('Contact Submit Error:', error)

      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
      toast.error('Failed to send message')
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm mb-2 text-[#3a2b1a]">Full Name</label>
        <Input
          {...register('name')}
          placeholder="Enter your name"
          className="border-[#b79b64]/30 focus-visible:ring-[#b79b64]"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-2 text-[#3a2b1a]">Email</label>
        <Input
          {...register('email')}
          type="email"
          placeholder="Enter your email"
          className="border-[#b79b64]/30 focus-visible:ring-[#b79b64]"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm mb-2 text-[#3a2b1a]">Message</label>
        <Textarea
          {...register('message')}
          placeholder="Write your message..."
          className="border-[#b79b64]/30 focus-visible:ring-[#b79b64] h-32"
        />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>

      <Button
        type="submit"
        className="bg-[#2b1d0e] hover:bg-[#3a2b1a] text-white w-full py-3 rounded-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
