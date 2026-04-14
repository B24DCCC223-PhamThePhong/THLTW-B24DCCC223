export interface Course {
  id: number;
  name: string;
  instructor: string;
  students: number;
  description: string; // HTML string
  status: 'Đang mở' | 'Đã kết thúc' | 'Tạm dừng';
}

export const instructors: string[] = [
  "Nguyễn Văn An",
  "Trần Thị Lan",
  "Lê Minh Hoàng",
  "Phạm Thị Hương",
  "Vũ Quang Huy",
  "Đặng Ngọc Mai",
];