import { Modal, Form, Input, Select, Radio, message } from 'antd';
import { useApplicationStore } from '../../stores/useApplicationStore';
import { useClubStore } from '../../stores/useClubStore';
import type { Application } from '../../types';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  initialData: Application | null;
}

const ApplicationModal = ({ open, onClose, initialData }: Props) => {
  const [form] = Form.useForm();
  const { clubs } = useClubStore();
  
  // Chỉ lấy những gì thực sự cần từ store
  const { updateStatus } = useApplicationStore();

  // Reset hoặc set dữ liệu khi modal mở
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        fullName: initialData.fullName,
        email: initialData.email,
        phone: initialData.phone,
        gender: initialData.gender,
        address: initialData.address,
        skills: initialData.skills,
        clubId: initialData.clubId,
        reason: initialData.reason,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (initialData) {
        message.success('Đã cập nhật thông tin đơn đăng ký');
      } else {
        message.success('Đã thêm đơn đăng ký mới');
      }
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialData ? 'Chi tiết / Chỉnh sửa đơn đăng ký' : 'Thêm đơn đăng ký mới'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      width={820}
      okText={initialData ? 'Lưu thay đổi' : 'Thêm mới'}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="fullName"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>

        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
          <Input placeholder="09xxxxxxxx" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="male">Nam</Radio>
            <Radio value="female">Nữ</Radio>
            <Radio value="other">Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
          <Input.TextArea rows={2} placeholder="Địa chỉ hiện tại" />
        </Form.Item>

        <Form.Item name="skills" label="Sở trường / Kỹ năng" rules={[{ required: true }]}>
          <Input.TextArea rows={3} placeholder="React, Node.js, Tiếng Anh giao tiếp..." />
        </Form.Item>

        <Form.Item
          name="clubId"
          label="Câu lạc bộ đăng ký"
          rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ!' }]}
        >
          <Select placeholder="Chọn câu lạc bộ">
            {clubs.map((club) => (
              <Select.Option key={club.id} value={club.id}>
                {club.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="reason" label="Lý do đăng ký" rules={[{ required: true }]}>
          <Input.TextArea 
            rows={4} 
            placeholder="Viết lý do bạn muốn tham gia câu lạc bộ này..." 
          />
        </Form.Item>

        {initialData?.history && initialData.history.length > 0 && (
          <Form.Item label="Lịch sử thao tác">
            <div style={{ maxHeight: 150, overflow: 'auto' }}>
              {initialData.history.map((h, index) => (
                <div key={index} style={{ marginBottom: 8, fontSize: '13px' }}>
                  <strong>{h.action.toUpperCase()}</strong> bởi {h.by} lúc{' '}
                  {new Date(h.timestamp).toLocaleString('vi-VN')}
                  {h.reason && <div style={{ color: '#f5222d' }}>Lý do: {h.reason}</div>}
                </div>
              ))}
            </div>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default ApplicationModal;