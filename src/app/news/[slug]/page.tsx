"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ThumbsUp, ThumbsDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { newsData } from "@/lib/news-data"

type Props = {
  params: Promise<{ slug: string }>
}

export default function NewsDetailWrapper({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null)

  // resolve async params
  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  if (!resolvedParams) return null
  return <NewsDetail slug={resolvedParams.slug} />
}

function NewsDetail({ slug }: { slug: string }) {
  const router = useRouter()
  const news = newsData.find((n) => n.slug === slug)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const views = 78

  if (!news) return <div className="text-center py-10">News not found.</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto px-4 md:px-0 py-10 max-w-4xl"
    >
      {/* Back Button */}
      <Button
        onClick={() => router.push("/news")}
        variant="ghost"
        className="flex items-center gap-2 mb-6 hover:bg-coffee-100"
      >
        <ArrowLeft className="w-4 h-4" /> Back to News
      </Button>

      {/* Image */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
        <Image
          src={news.image}
          alt={news.title}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-2">
        {news.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <span>
          {new Date(news.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>

        {/* Views */}
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          <span>{views}</span>
        </div>
      </div>

      <p className="text-base md:text-lg leading-relaxed text-foreground/90 mb-10">
        {news.content}
      </p>

      {/* Like / Dislike Section */}
      <div className="flex items-center gap-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setLikes(likes + 1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition cursor-pointer"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setDislikes(dislikes + 1)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition cursor-pointer"
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{dislikes}</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
