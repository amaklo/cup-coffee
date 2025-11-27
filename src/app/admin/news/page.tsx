"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewsForm from "./news-form";
import { toast } from "sonner";

type NewsType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  images: string[];
  views: number;
  likes: number;
  dislikes: number;
};

type NewsFormData = {
  title: string;
  slug: string;
  content: string;
  images?: FileList;
};

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsType | null>(null);

  // -------------------------------
  // Fetch News
  // -------------------------------
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/news", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to load news");

      const data = await res.json();
      setNewsList(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Failed to load news");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // -------------------------------
  // Add News
  // -------------------------------
  const handleAddNews = async (data: NewsFormData) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("content", data.content);

      // raise error is there is no images
      if (!data.images || data.images.length === 0) {
        throw new Error("At least one image is required");
      }

      // Append image files
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file: File) => {
          formData.append("images", file);
        });
      }

      const res = await fetch("/api/admin/news", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add news");

      await fetchNews();
      setShowForm(false);
      toast.success("News added successfully");
    } catch (error) {
      console.error("Add error:", error);
      // check if error is instance of Error to get message
      if (error instanceof Error) {
        toast.error(error.message);
        return;
      }
      toast.error("Failed to add news");
    }
  };

  // -------------------------------
  // Update News
  // -------------------------------
  const handleUpdateNews = async (data: NewsFormData) => {
    if (!editingNews) return;

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("content", data.content);

      // Append any new images
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await fetch(`/api/admin/news/${editingNews.id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update news");

      await fetchNews();
      setEditingNews(null);
      setShowForm(false);
      toast.success("News updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update news");
    }
  };

  // -------------------------------
  // Click row → edit
  // -------------------------------
  const handleRowClick = (news: NewsType) => {
    setEditingNews(news);
    setShowForm(false);
  };

  const formInitialData: Partial<NewsFormData> | undefined = editingNews
    ? {
        title: editingNews.title,
        slug: editingNews.slug,
        content: editingNews.content,
      }
    : undefined;

  const formSubmitHandler = editingNews ? handleUpdateNews : handleAddNews;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">News Management</h1>
        {!(showForm || editingNews) && (
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingNews(null);
            }}
          >
            Add News
          </Button>
        )}
      </div>

      {/* --------------------------
          Add/Edit Form
      --------------------------- */}
      {(showForm || editingNews) && (
        <Card className="p-4">
          <h2 className="text-xl font-medium mb-4">
            {editingNews ? `Edit: ${editingNews.title}` : "Add New News"}
          </h2>

          <NewsForm
            defaultValues={formInitialData ?? undefined}
            onSubmit={formSubmitHandler}
            loading={loading}
            onCancel={() => {
              setShowForm(false);
              setEditingNews(null);
            }}
          />
        </Card>
      )}

      {/* --------------------------
          News Table
      --------------------------- */}
      <h2 className="text-xl font-medium">News List ({newsList.length})</h2>

      <div className="border rounded-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Views</th>
              <th className="px-6 py-3">Likes</th>
              <th className="px-6 py-3">Dislikes</th>
            </tr>
          </thead>

          <tbody>
            {newsList.map((news) => (
              <tr
                key={news.id}
                onClick={() => handleRowClick(news)}
                className={`border-b cursor-pointer transition
                  ${
                    editingNews?.id === news.id
                      ? "bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-gray-50"
                  }`}
              >
                <td className="px-6 py-4">{news.id}</td>
                <td className="px-6 py-4">{news.title}</td>
                <td className="px-6 py-4">{news.views}</td>
                <td className="px-6 py-4">{news.likes}</td>
                <td className="px-6 py-4">{news.dislikes}</td>
              </tr>
            ))}

            {loading && (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
