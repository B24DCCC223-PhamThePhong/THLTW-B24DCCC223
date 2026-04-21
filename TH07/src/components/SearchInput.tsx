import { useState, useEffect } from "react";

export default function SearchInput({
  value,
  onChange,
  delay = 300
}: {
  value: string;
  onChange: (v: string) => void;
  delay?: number;
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => setLocal(value), [value]);

  useEffect(() => {
    const t = setTimeout(() => onChange(local), delay);
    return () => clearTimeout(t);
  }, [local, delay, onChange]);

  return (
    <input
      className="border p-2 w-full mb-4"
      placeholder="Search posts..."
      value={local}
      onChange={e => setLocal(e.target.value)}
    />
  );
}