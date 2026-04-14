import { useState, useEffect } from 'react';
import { Course, instructors } from '@/types';

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (course: Omit<Course, 'id'>) => void;
  editingCourse?: Course | null;
}

export default function CourseModal({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCourse 
}: CourseModalProps) {

  const [form, setForm] = useState({
    name: '',
    instructor: '',
    students: 0,
    description: '',
    status: '' as Course['status'],
  });

  useEffect(() => {
    if (editingCourse) {
      setForm({
        name: editingCourse.name,
        instructor: editingCourse.instructor,
        students: editingCourse.students,
        description: editingCourse.description,
        status: editingCourse.status,
      });
    } else {
      setForm({ name: '', instructor: '', students: 0, description: '', status: '' as Course['status'] });
    }
  }, [editingCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 pt-6 pb-4 border-b flex justify-between items-center">
          <h3 className="text-2xl font-semibold">
            {editingCourse ? `Chỉnh sửa #${editingCourse.id}` : 'Thêm khóa học mới'}
          </h3>
          <button onClick={onClose} className="text-3xl text-slate-400 hover:text-slate-600">×</button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Tên khóa học <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              maxLength={100}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-slate-200 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Giảng viên <span className="text-red-500">*</span>
              </label>
              <select
                value={form.instructor}
                onChange={e => setForm({ ...form, instructor: e.target.value })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none"
                required
              >
                <option value="">Chọn giảng viên...</option>
                {instructors.map(inst => (
                  <option key={inst} value={inst}>{inst}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Số lượng học viên <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.students}
                onChange={e => setForm({ ...form, students: parseInt(e.target.value) || 0 })}
                className="w-full border border-slate-200 focus:border-blue-500 rounded-2xl px-5 py-4 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Mô tả khóa học (HTML) <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border border-slate-200 focus:border-blue-500 rounded-3xl px-5 py-4 outline-none font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3">
              {(['Đang mở', 'Đã kết thúc', 'Tạm dừng'] as const).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setForm({ ...form, status })}
                  className={`flex-1 py-4 rounded-3xl border-2 font-medium flex items-center justify-center gap-2 transition-all
                    ${form.status === status ? 'border-blue-600 bg-blue-50' : 'border-transparent bg-slate-50 hover:bg-slate-100'}`}
                >
                  <i className={`fa-solid fa-circle ${
                    status === 'Đang mở' ? 'text-emerald-500' : 
                    status === 'Đã kết thúc' ? 'text-orange-500' : 'text-red-500'
                  }`}></i>
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="px-8 py-4 text-slate-500 hover:bg-slate-100 rounded-3xl font-medium">Hủy</button>
            <button type="submit" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-medium">
              {editingCourse ? 'Cập nhật' : 'Tạo khóa học'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}