import type { Course } from "../models/course";

interface Props {
  courses: Course[];
  onDelete: (id: string) => void;
  onEdit: (course: Course) => void;
}

export default function CourseList({ courses, onDelete, onEdit }: Props) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên</th>
          <th>Giảng viên</th>
          <th>Số học viên</th>
          <th>Trạng thái</th>
          <th>Tác vụ</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.instructor}</td>
            <td>{c.students}</td>
            <td>{c.status}</td>
            <td>
              <button onClick={() => onEdit(c)}>Sửa</button>
              <button
                onClick={() => {
                  if (c.students > 0) {
                    alert("Không thể xóa khóa có học viên");
                    return;
                  }
                  if (confirm("Xác nhận xóa?")) onDelete(c.id);
                }}
              >
                Xóa
              </button>
            </td>
            <td
  dangerouslySetInnerHTML={{ __html: c.description }}
/>
          </tr>
        ))}
      </tbody>
    </table>
  );
}