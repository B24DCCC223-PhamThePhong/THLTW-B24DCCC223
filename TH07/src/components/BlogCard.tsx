import type { Post } from "../types";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <div className="card">
      <img src={post.thumbnail} alt={post.title} className="card-img" />

      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>

        <p className="card-meta">
          {new Date(post.createdAt).toLocaleDateString()} • {post.author}
        </p>

        <p className="card-desc">
          {post.content.slice(0, 100)}...
        </p>

        <div className="tag-list">
          {post.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <Link to={`/post/${post.slug}`} className="read-more">
          Read more →
        </Link>
      </div>
    </div>
  );
}