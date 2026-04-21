import { useEffect, useState } from "react";
import { api } from "../services/mockApi";
import type { Post } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import BlogCard from "../components/BlogCard";

const PAGE_SIZE = 9;

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPosts(api.getPosts().filter(p => p.status === "published"));
  }, []);

  // reset page khi search/tag đổi
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedTag]);

  // lấy tất cả tag từ posts
  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags))
  );

  const filtered = posts.filter(p => {
    const matchSearch = p.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchTag = !selectedTag || p.tags.includes(selectedTag);

    return matchSearch && matchTag;
  });

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <div className="container">

      {/* SEARCH */}
      <input
        placeholder="Search..."
        className="border p-2 w-full mb-4"
        onChange={e => setSearch(e.target.value)}
      />

      {/* TAG FILTER (không cần file riêng) */}
      <div className="tag-filter">

  {/* All */}
  <button
    onClick={() => setSelectedTag(null)}
    className={!selectedTag ? "tag active" : "tag"}
  >
    All
  </button>

  {/* Các tag */}
  {allTags.map(tag => (
    <button
      key={tag}
      onClick={() => setSelectedTag(tag)}
      className={selectedTag === tag ? "tag active" : "tag"}
    >
      {tag}
    </button>
  ))}

</div>

      {/* POSTS */}
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {paginated.map(p => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>

      {/* EMPTY */}
      {paginated.length === 0 && (
        <p className="text-center mt-6">Không có bài viết</p>
      )}

      {/* PAGINATION */}
      <div className="mt-4">
        {Array.from({
          length: Math.ceil(filtered.length / PAGE_SIZE)
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`mr-2 px-2 ${
              page === i + 1 ? "font-bold" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}