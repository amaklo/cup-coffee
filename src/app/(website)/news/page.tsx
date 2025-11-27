"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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

export default function NewsPage() {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/admin/news");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data: NewsType[] = await res.json();
        setNewsList(data);
      } catch (err) {
        console.error("Fetch news error:", err);

        if (err instanceof Error) {
          toast.error(err.message);
          return;
        }

        toast.error("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest News</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-lg"></div>
            ))
          : newsList.map((news) => {
              const images: string[] = JSON.parse(news.images || "[]");
              const thumbnail = images[0] || "/images/default-news.jpg";

              return (
                <Card
                  key={news.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Image
                    src={thumbnail}
                    alt={news.title}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {new Date(news.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {news.content.slice(0, 100)}...
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/news/${news.id}-${news.slug}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
      </div>
    </div>
  );
}
