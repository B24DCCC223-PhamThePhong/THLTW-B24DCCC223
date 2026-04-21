import { useEffect, useState } from "react";
import { api } from "../services/mockApi";
import type { Tag } from "../types";
import { v4 as uuid } from "uuid";
import "../styles/admin.css";
export default function AdminTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setTags(api.getTags());
  }, []);

  const addTag = () => {
    const newTag = { id: uuid(), name };
    const updated = [...tags, newTag];
    setTags(updated);
    api.saveTags(updated);
  };

  const deleteTag = (id: string) => {
    const updated = tags.filter(t => t.id !== id);
    setTags(updated);
    api.saveTags(updated);
  };

 return (
  <div className="admin-container">

    <div className="admin-header">
      <h2 className="admin-title">Quản lý thẻ</h2>
      <button className="btn btn-primary" onClick={addTag}>
        + Thêm
      </button>
    </div>

    {/* input thêm tag */}
    <div style={{ marginBottom: 16 }}>
      <input
        placeholder="Nhập tên tag..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </div>

    {/* danh sách tag */}
    <table className="table">
      <thead>
        <tr>
          <th>Tên tag</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {tags.map(t => (
          <tr key={t.id}>
            <td>
              <span className="tag">{t.name}</span>
            </td>

            <td className="actions">
              <button
                className="btn btn-danger"
                onClick={() => deleteTag(t.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {tags.length === 0 && (
      <div className="empty">Chưa có tag</div>
    )}
  </div>
);
}
