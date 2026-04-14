import { useState } from 'react';
import { Table, Button, Modal, Space, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { useApplicationStore } from '../stores/useApplicationStore';
import { useClubStore } from '../stores/useClubStore';
import type { Application } from '../types';

// Import ApplicationModal
import ApplicationModal from '../components/registration/ApplicationModal';

const RegistrationPage = () => {
  const { 
    applications, 
    selectedRowKeys, 
    setSelectedRowKeys, 
    updateManyStatus 
  } = useApplicationStore();

  const { clubs } = useClubStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<Application | null>(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [pendingRejectIds, setPendingRejectIds] = useState<string[]>([]);

  // Tạo map để hiển thị tên CLB
  const clubMap = new Map(clubs.map(c => [c.id, c.name]));

  const columns: ColumnsType<Application> = [
    { 
      title: 'Họ tên', 
      dataIndex: 'fullName', 
      key: 'fullName' 
    },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email' 
    },
    { 
      title: 'SĐT', 
      dataIndex: 'phone', 
      key: 'phone' 
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => 
        gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác',
    },
    {
      title: 'Câu lạc bộ',
      dataIndex: 'clubId',
      key: 'clubId',
      render: (clubId: string) => clubMap.get(clubId) || 'Không xác định',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: Application['status']) => {
        const color = status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            onClick={() => {
              setCurrentApp(record);
              setIsModalOpen(true);
            }}
          >
            Chi tiết
          </Button>

          {record.status === 'pending' && (
            <>
              <Button 
                type="primary" 
                size="small" 
                icon={<CheckCircleOutlined />} 
                onClick={() => updateManyStatus([record.id], 'approved')}
              >
                Duyệt
              </Button>
              <Button 
                danger 
                size="small" 
                icon={<CloseCircleOutlined />} 
                onClick={() => {
                  setPendingRejectIds([record.id]);
                  setRejectModalVisible(true);
                }}
              >
                Từ chối
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Row Selection cho duyệt nhiều
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
    getCheckboxProps: (record: Application) => ({
      disabled: record.status !== 'pending',
    }),
  };

  const handleBulkApprove = () => {
    if (selectedRowKeys.length === 0) return;
    updateManyStatus(selectedRowKeys, 'approved');
    message.success(`Đã duyệt ${selectedRowKeys.length} đơn đăng ký`);
  };

  const handleBulkReject = () => {
    if (selectedRowKeys.length === 0) return;
    setPendingRejectIds(selectedRowKeys);
    setRejectModalVisible(true);
  };

  const confirmReject = () => {
    if (rejectReason.trim() === '') {
      message.error('Vui lòng nhập lý do từ chối!');
      return;
    }

    updateManyStatus(pendingRejectIds, 'rejected', rejectReason);
    setRejectModalVisible(false);
    setRejectReason('');
    setPendingRejectIds([]);
    message.success(`Đã từ chối ${pendingRejectIds.length} đơn`);
  };

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button 
          type="primary" 
          onClick={() => {
            setCurrentApp(null);
            setIsModalOpen(true);
          }}
        >
          + Thêm đơn đăng ký mới
        </Button>

        {selectedRowKeys.length > 0 && (
          <>
            <Button type="primary" onClick={handleBulkApprove}>
              Duyệt {selectedRowKeys.length} đơn đã chọn
            </Button>
            <Button danger onClick={handleBulkReject}>
              Từ chối {selectedRowKeys.length} đơn đã chọn
            </Button>
          </>
        )}
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={applications}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Modal chi tiết / thêm đơn */}
      <ApplicationModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentApp(null);
        }}
        initialData={currentApp}
      />

      {/* Modal từ chối */}
      <Modal
        title="Từ chối đơn đăng ký"
        open={rejectModalVisible}
        onOk={confirmReject}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectReason('');
        }}
        okText="Xác nhận từ chối"
        cancelText="Hủy"
      >
        <p><strong>Nhập lý do từ chối (bắt buộc):</strong></p>
        <textarea
          rows={5}
          style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #d9d9d9' }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Ví dụ: Không đủ điều kiện tham gia, thông tin không chính xác..."
        />
      </Modal>
    </>
  );
};

export default RegistrationPage;