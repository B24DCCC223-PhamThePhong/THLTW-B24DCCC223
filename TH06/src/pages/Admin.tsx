import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useApp } from '../context/AppContext';
import type { Destination } from '../types';
import { destinations as initialData } from '../data/destinations';
import BudgetChart from '../components/BudgetChart';

export default function Admin() {
  const { destinations, setDestinations } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [form] = Form.useForm();

  const handleAddOrEdit = (values: any) => {
    if (editingDest) {
      // edit
      setDestinations(destinations.map(d => d.id === editingDest.id ? { ...d, ...values } : d));
      message.success('Cập nhật thành công');
    } else {
      const newDest: Destination = {
        ...values,
        id: Date.now().toString(),
        rating: 4.5,
      };
      setDestinations([...destinations, newDest]);
      message.success('Thêm điểm đến thành công');
    }
    setIsModalOpen(false);
    form.resetFields();
    setEditingDest(null);
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Loại', dataIndex: 'type', key: 'type' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (p: number) => p.toLocaleString('vi-VN') + ' ₫' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Destination) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => { setEditingDest(record); form.setFieldsValue(record); setIsModalOpen(true); }} />
          <Button danger icon={<DeleteOutlined />} style={{ marginLeft: 8 }} onClick={() => setDestinations(destinations.filter(d => d.id !== record.id))} />
        </>
      )
    }
  ];

  // Mock thống kê
  const mockStats = [
    { category: 'Lịch trình tạo', amount: 124 },
    { category: 'Phú Quốc', amount: 45 },
    { category: 'Sa Pa', amount: 32 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h1>Quản trị điểm đến</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDest(null); form.resetFields(); setIsModalOpen(true); }}>
          Thêm điểm đến mới
        </Button>
      </div>

      <Table dataSource={destinations} columns={columns} rowKey="id" />

      <Modal
        title={editingDest ? 'Sửa điểm đến' : 'Thêm điểm đến'}
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => { setIsModalOpen(false); setEditingDest(null); }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
          <Form.Item name="name" label="Tên điểm đến" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Vị trí" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Loại hình">
            <Select>
              <Select.Option value="beach">Biển</Select.Option>
              <Select.Option value="mountain">Núi</Select.Option>
              <Select.Option value="city">Thành phố</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="price" label="Giá trung bình/ngày" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh (URL)">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <h2 style={{ marginTop: 40 }}>Thống kê</h2>
      <BudgetChart data={mockStats.map(s => ({ category: s.category, amount: s.amount, color: '#1890ff' }))} />
    </div>
  );
}