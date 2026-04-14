import { CourseStatus } from "../models/course";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  instructor: string;
  setInstructor: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  instructors: string[];
}

export default function FilterBar(props: Props) {
  return (
    <div>
      <input
        placeholder="Tìm kiếm..."
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
      />

      <select onChange={(e) => props.setInstructor(e.target.value)}>
        <option value="">Giảng viên</option>
        {props.instructors.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>

      <select onChange={(e) => props.setStatus(e.target.value)}>
        <option value="">Trạng thái</option>
        {Object.values(CourseStatus).map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}
