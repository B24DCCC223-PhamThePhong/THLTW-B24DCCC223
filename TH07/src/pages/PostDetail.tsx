import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/mockApi";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import ReactMarkdown from "react-markdown";

export default function PostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const all = api.getPosts();
    setPosts(all);

    const found = all.find(p => p.slug === slug);
    if (!found) return;

    // tăng view đúng cách (chỉ chạy 1 lần)
    found.views += 1;
    api.savePosts(all);

    setPost({ ...found });
  }, [slug]);

  if (!post) return <p className="p-6">Không tìm thấy bài viết</p>;

  // related posts
  const related = posts.filter(p =>
    p.id !== post.id &&
    p.tags.some(tag => post.tags.includes(tag))
  ).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* BACK */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-500"
      >
        ← Quay lại
      </button>

      {/* TITLE */}
      <h1 className="text-2xl font-bold">{post.title}</h1>

      {/* META */}
      <p className="text-gray-500 text-sm mt-1">
        {new Date(post.createdAt).toLocaleDateString()} • {post.author} • {post.views} views
      </p>

      {/* TAGS */}
      <div className="flex gap-2 mt-3">
        {post.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* IMAGE */}
      <img
        src={post.thumbnail}
        className="w-full h-64 object-cover rounded mt-4"
      />

      {/* MARKDOWN */}
      <div className="prose mt-6">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {/* RELATED */}
      <div className="mt-10">
        <h3 className="font-semibold mb-3">Bài viết liên quan</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {related.map(p => (
            <div
              key={p.id}
              className="border p-3 rounded cursor-pointer"
              onClick={() => navigate(`/post/${p.slug}`)}
            >
              <p className="font-medium">{p.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}