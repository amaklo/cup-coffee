"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type NewsType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  images: string;
  views: number;
  likes: number;
  dislikes: number;
  createdAt: string;
};

type Props = { params: Promise<{ slug: string }> };

export default function NewsDetailWrapper({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(
    null
  );

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) return null;
  return <NewsDetail slug={resolvedParams.slug} />;
}

function NewsDetail({ slug }: { slug: string }) {
  const router = useRouter();
  const [news, setNews] = useState<NewsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);

  // sendReaction wrapped in useCallback to fix useEffect dependency
  const sendReaction = useCallback(
    async (type: "LIKE" | "DISLIKE" | "VIEW", newsId?: number) => {
      try {
        const res = await fetch(`/api/admin/news/${newsId}/reaction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send reaction");

        if (type === "LIKE")
          if (data.message.includes("Swapped")) {
            // if it is swapped like removed
            setLikes((prev) => prev + 1);
            setDislikes((prev) => prev - 1);
          } else {
            setLikes((prev) =>
              data.message.includes("removed") ? prev - 1 : prev + 1
            );
          }
        if (type === "DISLIKE")
          if (data.message.includes("Swapped")) {
            setDislikes((prev) => prev + 1);
            setLikes((prev) => prev - 1);
          } else {
            setDislikes((prev) =>
              data.message.includes("removed") ? prev - 1 : prev + 1
            );
          }
        if (type === "VIEW") {
          if (!data.message.includes("Already")) {
            setViews((prev) => prev + 1);
          }
        }
      } catch (error) {
        console.error("Reaction error:", error);

        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }

        toast.error("Failed to send reaction");
      }
    },
    []
  );

  useEffect(() => {
    async function fetchNews() {
      try {
        const id = Number(slug.split("-")[0]);
        const res = await fetch(`/api/admin/news/${id}`);
        if (!res.ok) throw new Error("News not found");
        const data: NewsType = await res.json();
        setNews(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setViews(data.views || 0);
      } catch (error) {
        console.error("Fetch news error:", error);

        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }

        toast.error("Failed to load news");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [slug]);

  useEffect(() => {
    if (!news) return;
    sendReaction("VIEW", news.id);
  }, [news, sendReaction]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!news) return <div className="text-center py-10">News not found.</div>;

  const images: string[] = JSON.parse(news.images || "[]");

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

      {/* Images Carousel */}
      {images.length > 0 ? (
        <Carousel className="mb-6">
          <CarouselContent className="px-2 sm:px-3 md:px-4">
            {images.map((img, idx) => (
              <CarouselItem key={idx}>
                <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={img}
                    alt={news.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex"/>
          <CarouselNext className="hidden md:flex"/>
        </Carousel>
      ) : (
        <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-md mb-6">
          <Image
            src="/images/default-news.jpg"
            alt="Default News"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <h1 className="text-3xl md:text-4xl font-display font-bold mt-6 mb-2">
        {news.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <span>
          {new Date(news.createdAt).toLocaleDateString("en-US", {
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
          onClick={() => sendReaction("LIKE", news.id)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition cursor-pointer"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{likes}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => sendReaction("DISLIKE", news.id)}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 transition cursor-pointer"
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{dislikes}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
