import { useState } from 'react';
import { Table, Button, Space, Tag, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { useClubStore } from '../stores/useClubStore';
import type { Club } from '../types';
import ClubModal from '../components/club/ClubModal';

const ClubListPage = () => {
  const { clubs, deleteClub } = useClubStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClub, setEditingClub] = useState<Club | null>(null);

  const columns: ColumnsType<Club> = [
    {
      title: 'Ảnh',
      dataIndex: 'avatar',
      render: (url?: string) => url ? <Image src={url} width={50} /> : '-',
    },
    { title: 'Tên CLB', dataIndex: 'name' },
    { title: 'Ngày thành lập', dataIndex: 'foundedDate' },
    { title: 'Chủ nhiệm', dataIndex: 'leader' },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      render: (active: boolean) => <Tag color={active ? 'green' : 'red'}>{active ? 'Có' : 'Không'}</Tag>,
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => { setEditingClub(record); setIsModalOpen(true); }} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteClub(record.id)} />
          <Button icon={<EyeOutlined />} onClick={() => alert(`Xem thành viên CLB: ${record.name}`)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => { setEditingClub(null); setIsModalOpen(true); }}>
          + Thêm câu lạc bộ mới
        </Button>
      </div>

      <Table columns={columns} dataSource={clubs} rowKey="id" />

      <ClubModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingClub}
      />
    </>
  );
};

export default ClubListPage;