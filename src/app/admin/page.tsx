"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Mail, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DashboardStats = {
  totalNews: number;
  totalContacts: number;
  totalViews: number;
};

type NewsType = {
  id: number;
  title: string;
  views: number;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalNews: 0,
    totalContacts: 0,
    totalViews: 0,
  });
  const [recentNews, setRecentNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, newsRes] = await Promise.all([
          fetch("/api/admin/dashboard/stats"),
          fetch("/api/admin/dashboard/recent-news"),
        ]);

        if (!statsRes.ok || !newsRes.ok)
          throw new Error("Failed to fetch dashboard data");

        const statsData: DashboardStats = await statsRes.json();
        const newsData: NewsType[] = await newsRes.json();

        setStats(statsData);
        setRecentNews(newsData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        if (err instanceof Error) {
          toast.error(err.message);
          return;
        }
        toast.error("An error occurred while fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    { label: "Total News", value: stats.totalNews, icon: Newspaper },
    { label: "Contact Messages", value: stats.totalContacts, icon: Mail },
    {
      label: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-semibold tracking-tight">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
          <Card
            key={label}
            className="border shadow-sm hover:shadow-md transition"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {label}
              </CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {loading ? "..." : value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm mt-6">
        <CardHeader>
          <CardTitle>Recent News</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="px-4 py-2 text-left w-12">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2 w-24 text-left">Views</th>
                <th className="px-4 py-2 w-32">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-4 py-2 bg-gray-100 rounded-sm" />
                      <td className="px-4 py-2 bg-gray-100 rounded-sm" />
                      <td className="px-4 py-2 bg-gray-100 rounded-sm" />
                      <td className="px-4 py-2 bg-gray-100 rounded-sm" />
                    </tr>
                  ))
                : recentNews.map((news, idx) => (
                    <tr
                      key={news.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-2 font-medium">{idx + 1}</td>
                      <td className="px-4 py-2">{news.title}</td>
                      <td className="px-4 py-2">{news.views}</td>
                      <td className="px-4 py-2">
                        {new Date(news.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
