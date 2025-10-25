// lib/news-data.ts
export type NewsItem = {
  id: number
  title: string
  date: string
  image: string
  description: string
  slug: string
  content: string
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Ethiopian Coffee Wins Global Taste Award",
    date: "2025-08-12",
    image: "/images/cp1 (1).jpg",
    description:
      "Our finest Arabica beans take home the Global Coffee Taste Award, showcasing Ethiopia’s unmatched flavor heritage.",
    slug: "ethiopian-coffee-global-award",
    content:
      "In a prestigious event held in Italy, our flagship coffee blend was recognized for its exceptional balance and aroma..."
  },
  {
    id: 2,
    title: "New Sustainable Coffee Farm Opens in Sidama",
    date: "2025-07-22",
    image: "/images/cp2 (1).jpg",
    description:
      "We are proud to launch a new sustainable farm initiative in Sidama, empowering local farmers with eco-friendly practices.",
    slug: "sustainable-farm-sidama",
    content:
      "The initiative will help over 1,000 farmers adopt environmentally friendly farming methods while increasing yield..."
  },
  {
    id: 3,
    title: "Coffee Exports Reach Record High in 2025",
    date: "2025-09-05",
    image: "/images/cp3 (1).jpg",
    description:
      "Ethiopian coffee exports surged this year, marking a milestone for local growers and global recognition.",
    slug: "coffee-export-record-2025",
    content:
      "According to the Ministry of Trade, Ethiopian coffee exports have reached their highest volume in a decade..."
  }
]
