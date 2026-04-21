import type { Post, Tag } from "../types";

const POSTS_KEY = "posts";
const TAGS_KEY = "tags";

const seedPosts: Post[] = Array.from({ length: 20 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Bài viết ${i + 1}`,
  slug: `bai-viet-${i + 1}`,
  content: `# Bài viết ${i + 1}

Nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1},đây là nội dung cho bài ${i + 1}`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/300/200`,
  tags: ["đời sống", "tin mới"].slice(0, (i % 2) + 1),
  status: "published",
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  author: "Admin",
  views: Math.floor(Math.random() * 100)
}));

const seedTags: Tag[] = [
  { id: "1", name: "đời sống" },
  { id: "2", name: "tin mới" }
];

function init() {
  if (!localStorage.getItem(POSTS_KEY)) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(seedPosts));
  }
  if (!localStorage.getItem(TAGS_KEY)) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(seedTags));
  }
}

init();

export const api = {
  getPosts(): Post[] {
    return JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
  },

  savePosts(posts: Post[]) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  },

  getTags(): Tag[] {
    return JSON.parse(localStorage.getItem(TAGS_KEY) || "[]");
  },

  saveTags(tags: Tag[]) {
    localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
  }
};
