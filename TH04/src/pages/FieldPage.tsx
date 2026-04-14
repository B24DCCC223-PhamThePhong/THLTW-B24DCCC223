import { useState } from "react";
import { store } from "../store/store";
import { v4 as uuid } from "uuid";

export default function FieldsPage() {
  const [name, setName] = useState("");
  const [type, setType] = useState("string");

  const add = () => {
    store.fields.push({ id: uuid(), name, type: type as any });
    store.saveAll();
  };

  return (
    <div>
      <h2>Cấu hình biểu mẫu</h2>
      <input placeholder="Tên" onChange={e => setName(e.target.value)} />
      <select onChange={e => setType(e.target.value)}>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="date">Date</option>
      </select>
      <button onClick={add}>Thêm</button>

      {store.fields.map(f => (
        <div key={f.id}>{f.name} - {f.type}</div>
      ))}
    </div>
  );
}