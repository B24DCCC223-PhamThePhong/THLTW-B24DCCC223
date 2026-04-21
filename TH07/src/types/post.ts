export type PostStatus = "draft" | "published";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  tags: string[];
  status: PostStatus;
  createdAt: string;
  author: string;
  views: number;
}