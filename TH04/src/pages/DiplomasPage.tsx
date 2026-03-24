import { useState } from "react";
import { store } from "../store/store";
import { v4 as uuid } from "uuid";

export default function DiplomasPage() {
  const [form, setForm] = useState<any>({});

  const add = () => {
    const decision = store.decisions[0];
    if (!decision) return alert("Chưa có quyết định");

    const book = store.books.find(b => b.id === decision.bookId);
    if (!book) return;

    book.currentNumber++;

    store.diplomas.push({
      id: uuid(),
      soVaoSo: book.currentNumber,
      soHieu: "VB-" + book.currentNumber,
      msv: form.msv,
      hoTen: form.hoTen,
      ngaySinh: form.ngaySinh,
      decisionId: decision.id,
      extraData: form.extraData || {}
    });

    store.saveAll();
  };

  return (
    <div>
      <h2>Văn bằng</h2>

      <input placeholder="MSV" onChange={e => setForm({ ...form, msv: e.target.value })} />
      <input placeholder="Họ tên" onChange={e => setForm({ ...form, hoTen: e.target.value })} />
      <input type="date" onChange={e => setForm({ ...form, ngaySinh: e.target.value })} />

      <h3>Thông tin thêm</h3>
      {store.fields.map(f => (
        <div key={f.id}>
          <label>{f.name}</label>
          <input
            type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
            onChange={e => {
              const val = e.target.value;
              setForm({
                ...form,
                extraData: { ...form.extraData, [f.id]: val }
              });
            }}
          />
        </div>
      ))}

      <button onClick={add}>Thêm</button>
    </div>
  );
}
