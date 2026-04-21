import type { Tag } from "../types";

export default function TagFilter({
  tags,
  active,
  onSelect
}: {
  tags: Tag[];
  active: string | null;
  onSelect: (tag: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`px-3 py-1 border rounded ${!active ? "bg-black text-white" : ""}`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {tags.map(t => (
        <button
          key={t.id}
          className={`px-3 py-1 border rounded ${active === t.name ? "bg-black text-white" : ""}`}
          onClick={() => onSelect(t.name)}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
