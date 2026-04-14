import { useState, useEffect } from 'react';
import { Course } from './types';
import CourseTable from './components/CourseTable';
import CourseModal from './components/CourseModal';
import { instructors } from './types';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterInstructor, setFilterInstructor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [toast, setToast] = useState<{ message: string; error?: boolean } | null>(null);

  // Load từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('courses');
    if (saved) {
      setCourses(JSON.parse(saved));
    } else {
      const initial: Course[] = [
        { id: 1, name: "React & TypeScript từ A đến Z", instructor: "Nguyễn Văn An", students: 124, description: "<h3>Giới thiệu</h3><p>Khóa học giúp bạn xây dựng ứng dụng web hiện đại với React 19 và TypeScript.</p>", status: "Đang mở" },
        { id: 2, name: "Node.js Backend Masterclass", instructor: "Trần Thị Lan", students: 87, description: "<p>Khóa học chuyên sâu về backend.</p>", status: "Đang mở" },
        { id: 3, name: "UI/UX Design với Figma", instructor: "Lê Minh Hoàng", students: 203, description: "<p>Học thiết kế giao diện chuyên nghiệp.</p>", status: "Đã kết thúc" },
        { id: 4, name: "Machine Learning cơ bản", instructor: "Phạm Thị Hương", students: 45, description: "<p>Nhập môn Machine Learning.</p>", status: "Tạm dừng" },
        { id: 5, name: "Next.js 15 Fullstack", instructor: "Vũ Quang Huy", students: 156, description: "<p>Xây dựng fullstack với Next.js 15.</p>", status: "Đang mở" },
      ];
      setCourses(initial);
      localStorage.setItem('courses', JSON.stringify(initial));
    }
  }, []);

  const saveToLocal = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  // Lọc và sắp xếp
  const filteredCourses = courses
    .filter(c => 
      (!searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterInstructor || c.instructor === filterInstructor) &&
      (!filterStatus || c.status === filterStatus)
    )
    .sort((a, b) => sortAscending ? a.students - b.students : b.students - a.students);

  const showToast = (message: string, error = false) => {
    setToast({ message, error });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (newCourseData: Omit<Course, 'id'>) => {
    // Validation
    if (!newCourseData.name.trim()) return showToast('Tên khóa học không được để trống!', true);
    if (newCourseData.name.length > 100) return showToast('Tên khóa học tối đa 100 ký tự!', true);
    if (!newCourseData.instructor) return showToast('Vui lòng chọn giảng viên!', true);
    if (!newCourseData.description.trim()) return showToast('Mô tả không được để trống!', true);
    if (!newCourseData.status) return showToast('Vui lòng chọn trạng thái!', true);

    // Kiểm tra tên trùng
    const isDuplicate = courses.some(c => 
      c.name.toLowerCase() === newCourseData.name.toLowerCase() && c.id !== editingCourse?.id
    );
    if (isDuplicate) return showToast('Tên khóa học đã tồn tại!', true);

    if (editingCourse) {
      // Edit
      const updated = courses.map(c => 
        c.id === editingCourse.id ? { ...c, ...newCourseData } : c
      );
      saveToLocal(updated);
      showToast('✅ Cập nhật thành công!');
    } else {
      // Add
      const newId = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
      saveToLocal([...courses, { ...newCourseData, id: newId }]);
      showToast('🎉 Thêm khóa học thành công!');
    }

    setModalOpen(false);
    setEditingCourse(null);
  };

  const handleDelete = (id: number) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    if (course.students > 0) return showToast('❌ Không thể xóa khóa học có học viên!', true);

    if (!confirm(`Xóa khóa học "${course.name}"?`)) return;

    saveToLocal(courses.filter(c => c.id !== id));
    showToast('🗑️ Đã xóa khóa học');
  };

  const handleRowClick = (id: number) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    const detailHTML = `
      <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]" onclick="if(event.target.tagName==='DIV')this.remove()">
        <div onclick="event.stopImmediatePropagation()" class="bg-white rounded-3xl max-w-2xl w-full mx-4 overflow-hidden">
          <div class="px-8 py-6 border-b flex justify-between">
            <div>
              <span class="font-mono text-blue-600">#${course.id}</span>
              <h2 class="text-2xl font-semibold mt-1">${course.name}</h2>
            </div>
            <span class="px-6 py-2 rounded-3xl text-sm font-medium ${course.status === 'Đang mở' ? 'bg-emerald-100 text-emerald-700' : course.status === 'Đã kết thúc' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}">${course.status}</span>
          </div>
          <div class="p-8">
            <div class="flex justify-between mb-6">
              <div><p class="text-xs text-slate-500">GIẢNG VIÊN</p><p class="font-medium">${course.instructor}</p></div>
              <div><p class="text-xs text-slate-500">HỌC VIÊN</p><p class="font-semibold text-3xl">${course.students}</p></div>
            </div>
            <div>
              <p class="text-xs text-slate-500 mb-3">MÔ TẢ</p>
              <div class="prose max-h-96 overflow-auto p-4 border rounded-3xl bg-slate-50">${course.description}</div>
            </div>
          </div>
          <div class="px-8 py-6 border-t flex justify-end"><button onclick="this.closest('.fixed').remove()" class="px-10 py-4 bg-slate-900 text-white rounded-3xl">Đóng</button></div>
        </div>
      </div>`;
    
    const temp = document.createElement('div');
    temp.innerHTML = detailHTML;
    document.body.appendChild(temp.firstElementChild!);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl">📚</div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Quản lý Khóa học Online</h1>
              <p className="text-slate-500">React + TypeScript</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingCourse(null); setModalOpen(true); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-3xl font-medium shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Thêm khóa học mới</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khóa học..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-300 rounded-3xl px-5 py-4 outline-none"
            />
          </div>
          <div className="md:col-span-3">
            <select
              value={filterInstructor}
              onChange={e => setFilterInstructor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-300 rounded-3xl px-5 py-4 outline-none"
            >
              <option value="">Tất cả giảng viên</option>
              {instructors.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-blue-300 rounded-3xl px-5 py-4 outline-none"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Đang mở">Đang mở</option>
              <option value="Đã kết thúc">Đã kết thúc</option>
              <option value="Tạm dừng">Tạm dừng</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              onClick={() => setSortAscending(!sortAscending)}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-3xl font-medium"
            >
              <i className={`fa-solid ${sortAscending ? 'fa-arrow-down-a-z' : 'fa-arrow-up-a-z'}`}></i>
              Sắp xếp học viên
            </button>
          </div>
        </div>

        <CourseTable
          courses={filteredCourses}
          onEdit={(id) => {
            const course = courses.find(c => c.id === id);
            if (course) {
              setEditingCourse(course);
              setModalOpen(true);
            }
          }}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
        />

        <div className="text-center text-xs text-slate-400 mt-8">
          React + TypeScript • Dữ liệu lưu trong localStorage
        </div>
      </div>

      <CourseModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingCourse(null); }}
        onSave={handleSave}
        editingCourse={editingCourse}
      />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-3xl text-white flex items-center gap-3 shadow-2xl transition-all ${toast.error ? 'bg-rose-500' : 'bg-slate-900'}`}>
          <i className={`fa-solid ${toast.error ? 'fa-circle-xmark' : 'fa-circle-check'}`}></i>
          <span className="font-medium">{toast.message}</span>
        </div>
      )}
    </>
  );
}

export default App;