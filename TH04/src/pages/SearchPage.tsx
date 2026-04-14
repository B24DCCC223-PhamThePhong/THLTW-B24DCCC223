import { useState } from "react";
import { store } from "../store/store";

export default function SearchPage() {
  const [search, setSearch] = useState<any>({});

  const handleSearch = () => {
    const filled = Object.values(search).filter(v => v);
    if (filled.length < 2) {
      alert("Nhập ít nhất 2 điều kiện");
      return [];
    }

    return store.diplomas.filter(d => {
      return (
        (!search.msv || d.msv.includes(search.msv)) &&
        (!search.hoTen || d.hoTen.includes(search.hoTen))
      );
    });
  };

  const results = handleSearch();

  return (
    <div>
      <h2>Tra cứu</h2>

      <input placeholder="MSV" onChange={e => setSearch({ ...search, msv: e.target.value })} />
      <input placeholder="Họ tên" onChange={e => setSearch({ ...search, hoTen: e.target.value })} />

      {results.map(r => (
        <div key={r.id}>
          {r.hoTen} - {r.soHieu}
        </div>
      ))}
    </div>
  );
}
