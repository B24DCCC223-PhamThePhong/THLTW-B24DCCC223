import { useState, useEffect } from "react";
import { CourseStatus } from "../models/course";
import type { Course } from "../models/course";
interface Props {
  onSave: (c: Course) => void;
  editing?: Course | null;
  instructors: string[];
  courses: Course[];
}

export default function CourseForm({
  onSave,
  editing,
  instructors,
  courses,
}: Props) {
  const [course, setCourse] = useState<Course>({
    id: "",
    name: "",
    instructor: instructors[0] || "",
    students: 0,
    description: "",
    status: CourseStatus.OPEN,
  });

  useEffect(() => {
    if (editing) setCourse(editing);
  }, [editing]);

  const handleSubmit = () => {
    if (!course.name.trim()) {
      alert("Tên không được trống");
      return;
    }

    if (
      courses.some(
        (c) => c.name === course.name && c.id !== course.id
      )
    ) {
      alert("Tên bị trùng");
      return;
    }

    const generateId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

onSave({
  ...course,
  id: course.id || generateId(),
});
  };

  return (
   <div style={{ marginTop: "20px" }}>
  <h2>{editing ? "Sửa khóa học" : "Thêm khóa học"}</h2>

  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    
    <div>
      <label>Tên khóa học</label><br />
      <input
        value={course.name}
        maxLength={100}
        placeholder="Nhập tên khóa học"
        onChange={(e) =>
          setCourse({ ...course, name: e.target.value })
        }
      />
    </div>

    <div>
      <label>Giảng viên</label><br />
      <select
        value={course.instructor}
        onChange={(e) =>
          setCourse({ ...course, instructor: e.target.value })
        }
      >
        {instructors.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>
    </div>

    <div>
      <label>Số học viên</label><br />
      <input
        type="number"
        value={course.students}
        onChange={(e) =>
          setCourse({ ...course, students: Number(e.target.value) })
        }
      />
    </div>

    <div style={{ width: "100%" }}>
      <label>Mô tả khóa học </label><br />
      <textarea
        rows={3}
        placeholder="Mô tả..."
        value={course.description}
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
        style={{ width: "100%" }}
      />
    </div>

    <div>
      <label>Trạng thái</label><br />
      <select
        value={course.status}
        onChange={(e) =>
          setCourse({
            ...course,
            status: e.target.value as any,
          })
        }
      >
        {Object.values(CourseStatus).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>

    <div style={{ alignSelf: "end" }}>
      <button onClick={handleSubmit}>Save</button>
    </div>

  </div>
</div>
  );
}