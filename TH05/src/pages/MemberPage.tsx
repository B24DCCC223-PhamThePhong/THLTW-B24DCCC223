import { useState } from 'react';
import { Table, Button, Modal, Select, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useMemberStore } from '../stores/useMemberStore';
import { useClubStore } from '../stores/useClubStore';
import { Member } from '../types';

const MemberPage = () => {
  const { members, updateMemberClub } = useMemberStore();
  const { clubs } = useClubStore();

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [targetClubId, setTargetClubId] = useState<string>('');

  // Tạo map để hiển thị tên CLB
  const clubMap = new Map(clubs.map((club) => [club.id, club.name]));

  const columns: ColumnsType<Member> = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => {
        if (gender === 'male') return <Tag color="blue">Nam</Tag>;
        if (gender === 'female') return <Tag color="pink">Nữ</Tag>;
        return <Tag color="default">Khác</Tag>;
      },
    },
    {
      title: 'Câu lạc bộ hiện tại',
      dataIndex: 'clubId',
      key: 'clubId',
      render: (clubId: string) => clubMap.get(clubId) || 'Không xác định',
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
  ];

  const rowSelection = {
    selectedRowKeys: selectedMemberIds,
    onChange: (keys: React.Key[]) => {
      setSelectedMemberIds(keys as string[]);
    },
  };

  const handleTransfer = () => {
    if (!targetClubId || selectedMemberIds.length === 0) {
      return;
    }

    updateMemberClub(selectedMemberIds, targetClubId);
    setTransferModalOpen(false);
    setSelectedMemberIds([]);
    setTargetClubId('');
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h2>Danh sách thành viên câu lạc bộ</h2>
      </div>

      {selectedMemberIds.length > 0 && (
        <Button
          type="primary"
          onClick={() => setTransferModalOpen(true)}
          style={{ marginBottom: 16 }}
        >
          Chuyển CLB cho {selectedMemberIds.length} thành viên đã chọn
        </Button>
      )}

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={members}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal chuyển câu lạc bộ */}
      <Modal
        title="Chuyển câu lạc bộ"
        open={transferModalOpen}
        onOk={handleTransfer}
        onCancel={() => {
          setTransferModalOpen(false);
          setTargetClubId('');
        }}
        okText="Xác nhận chuyển"
        cancelText="Hủy"
      >
        <p style={{ marginBottom: 16 }}>
          Chọn câu lạc bộ mới cho <strong>{selectedMemberIds.length}</strong> thành viên:
        </p>
        <Select
          placeholder="Chọn câu lạc bộ muốn chuyển đến"
          style={{ width: '100%' }}
          value={targetClubId}
          onChange={setTargetClubId}
        >
          {clubs.map((club) => (
            <Select.Option key={club.id} value={club.id}>
              {club.name}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};

export default MemberPage;