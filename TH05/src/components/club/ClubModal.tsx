import { useEffect, useState } from 'react';
import { Modal, Form, Input, Switch, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Club } from '../../types';
import { useClubStore } from '../../stores/useClubStore';

interface ClubModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Club | null;
}

const ClubModal = ({ open, onClose, initialData }: ClubModalProps) => {
  const [form] = Form.useForm();
  const { addClub, updateClub } = useClubStore();
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setAvatarUrl(initialData.avatar || '');
    } else {
      form.resetFields();
      setAvatarUrl('');
    }
  }, [initialData, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      const clubData: Omit<Club, 'id'> = {
        ...values,
        avatar: avatarUrl || undefined,
        isActive: values.isActive ?? true,
      };

      if (initialData) {
        updateClub({ ...initialData, ...clubData });
      } else {
        addClub(clubData);
      }
      onClose();
      message.success(initialData ? 'Cập nhật CLB thành công' : 'Thêm CLB thành công');
    });
  };

  return (
    <Modal
      title={initialData ? 'Chỉnh sửa CLB' : 'Thêm câu lạc bộ mới'}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      width={700}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="avatar" label="Ảnh đại diện">
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = (e) => setAvatarUrl(e.target?.result as string);
              reader.readAsDataURL(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="name" label="Tên câu lạc bộ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="leader" label="Chủ nhiệm CLB" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="foundedDate" label="Ngày thành lập">
          <Input type="date" />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item name="isActive" label="Hoạt động" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClubModal;