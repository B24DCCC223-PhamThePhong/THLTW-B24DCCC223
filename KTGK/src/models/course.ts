export const CourseStatus = {
  OPEN: "Đang mở",
  CLOSED: "Đã kết thúc",
  PAUSED: "Tạm dừng",
} as const;

export type CourseStatus =
  (typeof CourseStatus)[keyof typeof CourseStatus];

export interface Course {
  id: string;
  name: string;
  instructor: string;
  students: number;
  description: string;
  status: CourseStatus;
}