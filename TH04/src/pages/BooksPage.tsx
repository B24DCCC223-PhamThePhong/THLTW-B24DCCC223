import { useState } from "react";
import { store } from "../store/store";
import { v4 as uuid } from "uuid";

export default function BooksPage() {
  const [year, setYear] = useState(2026);

  const add = () => {
    store.books.push({ id: uuid(), year, currentNumber: 0 });
    setYear(year + 1);
  };

  return (
    <div>
      <h2>Sổ văn bằng</h2>
      <input value={year} onChange={(e) => setYear(Number(e.target.value))} />
      <button onClick={add}>Thêm</button>
      {store.books.map((b) => (
        <div className="list-item" key={b.id}>
          Năm: {b.year} | Số: {b.currentNumber}
        </div>
      ))}
    </div>
  );
}
