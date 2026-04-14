import { useState } from "react";
import type { Course } from "../models/course";
import { initialCourses, instructors } from "../data/mockData";
import CourseList from "../components/CourseList";
import CourseForm from "../components/CourseForm";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editing, setEditing] = useState<Course | null>(null);

  const [search, setSearch] = useState("");
  const [inst, setInst] = useState("");
  const [status, setStatus] = useState("");

  const filtered = courses
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => (inst ? c.instructor === inst : true))
    .filter((c) => (status ? c.status === status : true))
    .sort((a, b) => b.students - a.students);

  const saveCourse = (c: Course) => {
    setCourses((prev) => {
      const exists = prev.find((x) => x.id === c.id);
      if (exists) return prev.map((x) => (x.id === c.id ? c : x));
      return [...prev, c];
    });
    setEditing(null);
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h1>QUẢN LÍ KHÓA HỌC ONLINE</h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        instructor={inst}
        setInstructor={setInst}
        status={status}
        setStatus={setStatus}
        instructors={instructors}
      />

      <CourseForm
        onSave={saveCourse}
        editing={editing}
        instructors={instructors}
        courses={courses}
      />

      <CourseList
        courses={filtered}
        onDelete={deleteCourse}
        onEdit={setEditing}
      />
    </div>
  );
}