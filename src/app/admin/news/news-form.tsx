"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// ------------------
// Schema
// ------------------
const NewsSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3),
  content: z.string().min(10, "Content is required and should be at least 10 characters"),
  images: z
    .instanceof(FileList)
    .optional()
});

export type NewsFormValues = z.infer<typeof NewsSchema>;

// ------------------
// Helpers
// ------------------
function generateRandomString(length: number = 6): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

// ------------------
// Component
// ------------------
export default function NewsForm({
  defaultValues,
  onSubmit,
  loading = false,
  onCancel,
}: {
  defaultValues?: Partial<NewsFormValues>;
  onSubmit: (values: NewsFormValues) => Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
}) {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      ...defaultValues,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const title = useWatch({
    control: form.control,
    name: "title",
  });

  useEffect(() => {
    if (!defaultValues?.slug) {
      const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const randomSuffix = generateRandomString(6);

      const finalSlug = baseSlug ? `${baseSlug}-${randomSuffix}` : "";

      setValue("slug", finalSlug);
    }
  }, [title, defaultValues?.slug, setValue]);

  // Submit Handler with strong error handling
  const handleFormSubmit = async (values: NewsFormValues) => {
    try {
      await onSubmit(values);
    } catch (err: unknown) {
      console.error("News Submit Error:", err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{defaultValues ? "Edit News" : "Create News"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Title */}
        <div className="grid gap-2">
          <label>Title</label>
          <Input {...register("title")} placeholder="Enter title" />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="grid gap-2">
          <label>Slug</label>
          <Input {...register("slug")} placeholder="auto-generated" disabled />
          {errors.slug && (
            <p className="text-red-500 text-sm">{errors.slug.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="grid gap-2">
          <label>Content</label>
          <Textarea
            {...register("content")}
            className="min-h-[150px]"
            placeholder="Write your content..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="space-y-1">
          <Label>Images</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
          />

          {errors.images && (
            <p className="text-red-500 text-sm">Invalid image</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-start items-center space-x-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          disabled={loading}
          className="w-24"
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}
