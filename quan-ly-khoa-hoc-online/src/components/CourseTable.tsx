import { Course } from '../types';

interface CourseTableProps {
  courses: Course[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRowClick: (id: number) => void;
}

export default function CourseTable({ courses, onEdit, onDelete, onRowClick }: CourseTableProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-8 py-5 border-b flex items-center justify-between bg-slate-50">
        <h2 className="font-semibold text-lg text-slate-800">
          Danh sách khóa học (<span className="text-blue-600">{courses.length}</span>)
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-50 border-b">
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-500">ID</th>
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-500">Tên khóa học</th>
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-500">Giảng viên</th>
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-500">Học viên</th>
            <th className="px-8 py-5 text-left text-xs font-semibold text-slate-500">Trạng thái</th>
            <th className="px-8 py-5 text-center text-xs font-semibold text-slate-500">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {courses.map(course => {
            const statusColor = 
              course.status === 'Đang mở' ? 'bg-emerald-100 text-emerald-700' :
              course.status === 'Đã kết thúc' ? 'bg-orange-100 text-orange-700' : 
              'bg-red-100 text-red-700';

            return (
              <tr 
                key={course.id}
                onClick={() => onRowClick(course.id)}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <td className="px-8 py-6 font-mono text-slate-400">#{course.id}</td>
                <td className="px-8 py-6 font-semibold text-slate-900">{course.name}</td>
                <td className="px-8 py-6 text-slate-700">{course.instructor}</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    {course.students} <i className="fa-solid fa-user-graduate text-xs text-slate-400"></i>
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1 text-xs font-medium rounded-3xl ${statusColor}`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-center" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => onEdit(course.id)}
                      className="w-9 h-9 flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded-2xl transition-all"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button 
                      onClick={() => onDelete(course.id)}
                      disabled={course.students > 0}
                      className={`w-9 h-9 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-2xl transition-all ${course.students > 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {courses.length === 0 && (
        <div className="px-8 py-16 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4 text-4xl">📭</div>
          <p className="text-slate-400">Không tìm thấy khóa học nào</p>
        </div>
      )}
    </div>
  );
}