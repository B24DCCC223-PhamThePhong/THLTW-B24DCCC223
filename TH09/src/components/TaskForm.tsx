import { Form, Input, DatePicker, Select, Button } from "antd";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import type { Task } from "../types/task";
import { getTasks, saveTasks } from "../utils/storage";

interface Props {
  editingTask?: Task | null;
  onFinish?: () => void;
}

export default function TaskForm({ editingTask, onFinish }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        ...editingTask,
        deadline: dayjs(editingTask.deadline)
      });
    } else {
      form.resetFields();
    }
  }, [editingTask]);

  const handleSubmit = (values: any) => {
    const tasks = getTasks();

    if (editingTask) {
      const updated = tasks.map(t =>
        t.id === editingTask.id
          ? {
              ...t,
              ...values,
              deadline: values.deadline.format("YYYY-MM-DD")
            }
          : t
      );
      saveTasks(updated);
    } else {
      tasks.push({
        id: uuid(),
        ...values,
        deadline: values.deadline.format("YYYY-MM-DD"),
        status: "todo"
      });
      saveTasks(tasks);
    }

    form.resetFields();
    onFinish?.();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="title" label="Tên task" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="deadline" label="Deadline" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="priority" label="Ưu tiên">
        <Select>
          <Select.Option value="high">Cao</Select.Option>
          <Select.Option value="medium">Trung bình</Select.Option>
          <Select.Option value="low">Thấp</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="tags" label="Tags">
        <Select mode="tags" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {editingTask ? "Cập nhật" : "Thêm task"}
      </Button>
    </Form>
  );
}