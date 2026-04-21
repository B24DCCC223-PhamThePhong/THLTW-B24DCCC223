export default function Pagination({
  total,
  page,
  pageSize,
  onChange
}: {
  total: number;
  page: number;
  pageSize: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
<div style={{ marginTop: 20, display: "flex", gap: 8 }}>
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`px-3 py-1 border rounded ${p === page ? "bg-black text-white" : ""}`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
