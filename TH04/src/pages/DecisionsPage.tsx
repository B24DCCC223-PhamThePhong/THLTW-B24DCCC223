
import { useState } from "react";
import { store } from "../store/store";
import { v4 as uuid } from "uuid";

export default function DecisionsPage() {
  const [soQD, setSoQD] = useState("");

  const add = () => {
    if (!store.books.length) return alert("Chưa có sổ");
    store.decisions.push({
      id: uuid(),
      soQD,
      ngayBanHanh: new Date().toISOString(),
      trichYeu: "",
      bookId: store.books[0].id,
      searchCount: 0,
    });
  };

  return (
    <div>
      <h2>Quyết định</h2>
      <input value={soQD} onChange={e => setSoQD(e.target.value)} />
      <button onClick={add}>Thêm</button>
      {store.decisions.map(d => (
        <div key={d.id}>{d.soQD} - {d.searchCount}</div>
      ))}
    </div>
  );
}
