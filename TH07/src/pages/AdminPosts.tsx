import { useState, useEffect } from "react";
import { api } from "../services/mockApi";
import type { Post } from "../types";
import { v4 as uuid } from "uuid";
import "../styles/admin.css";
export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setPosts(api.getPosts());
  }, []);

  const addPost = () => {
    const newPost: Post = {
      id: uuid(),
      title,
      slug: title.toLowerCase().replace(/ /g, "-"),
      content: "# Nội dung markdown",
      thumbnail: `https://picsum.photos/300/200?random=${Math.random()}`,
      tags: [],
      status: "draft",
      createdAt: new Date().toISOString(),
      author: "Admin",
      views: 0
    };

    const updated = [...posts, newPost];
    setPosts(updated);
    api.savePosts(updated);
  };

  const deletePost = (id: string) => {
    if (!confirm("Xóa?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    api.savePosts(updated);
  };

  return (
  <div className="admin-container">

    <div className="admin-header">
      <h2 className="admin-title">Quản lý bài viết</h2>
      <button className="btn btn-primary" onClick={addPost}>
        + Thêm
      </button>
    </div>

    {/* input thêm nhanh */}
    <div style={{ marginBottom: 16 }}>
      <input
        placeholder="Nhập tiêu đề..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </div>

    {/* danh sách */}
    <table className="table">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {posts.map(p => (
          <tr key={p.id}>
            <td>{p.title}</td>

            <td className="actions">
              <button
                className="btn btn-danger"
                onClick={() => deletePost(p.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {posts.length === 0 && (
      <div className="empty">Chưa có bài viết</div>
    )}
  </div>
);
}
