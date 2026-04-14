import type { Club, Application, Member } from '../types';

export const initialClubs: Club[] = [
  {
    id: '1',
    avatar: 'https://picsum.photos/id/1015/200',
    name: 'Câu lạc bộ Lập trình',
    foundedDate: '2023-01-15',
    description: '<p>CLB chuyên về lập trình web, mobile và trí tuệ nhân tạo.</p>',
    leader: 'Nguyễn Văn An',
    isActive: true,
  },
  {
    id: '2',
    avatar: 'https://picsum.photos/id/201/200',
    name: 'Câu lạc bộ Tiếng Anh',
    foundedDate: '2022-09-10',
    description: '<p>Nâng cao kỹ năng tiếng Anh giao tiếp và chuyên ngành.</p>',
    leader: 'Trần Thị Bình',
    isActive: true,
  },
  {
    id: '3',
    avatar: 'https://picsum.photos/id/301/200',
    name: 'Câu lạc bộ Âm nhạc',
    foundedDate: '2024-03-05',
    description: '<p>Chia sẻ đam mê âm nhạc.</p>',
    leader: 'Lê Văn Cường',
    isActive: false,
  },
];

export const initialApplications: Application[] = [
  {
    id: 'app1',
    fullName: 'Phạm Minh Đức',
    email: 'ducpm@gmail.com',
    phone: '0912345678',
    gender: 'male',
    address: 'Quận 1, TP. Hồ Chí Minh',
    skills: 'React, TypeScript, Node.js',
    clubId: '1',
    reason: 'Tôi muốn học thêm về lập trình web.',
    status: 'pending',
    createdAt: '2025-04-08T08:30:00Z',
    history: [],
    note: '',
  },
];

export const initialMembers: Member[] = [];