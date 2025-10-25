import Image from "next/image"
import Link from "next/link"
import { newsData } from "@/lib/news-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function NewsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Latest News</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Image
              src={news.image}
              alt={news.title}
              width={400}
              height={250}
              className="w-full h-52 object-cover"
            />
            <CardHeader>
              <CardTitle>{news.title}</CardTitle>
              <Badge variant="outline" className="mt-1 text-xs">
                {new Date(news.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{news.description}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/news/${news.slug}`}
                className="text-primary text-sm font-medium hover:underline"
              >
                Read more →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
