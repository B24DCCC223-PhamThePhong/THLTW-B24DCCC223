import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Popconfirm,
  Space,
} from "antd";
import { useState } from "react";
import { useStore } from "../store";

// 🔥 tính BMI
const getBMI = (weight: number, height: number) => {
  const h = height / 100;
  return weight / (h * h);
};

// 🔥 phân loại BMI
const getBMITag = (bmi: number) => {
  if (bmi < 18.5) return <Tag color="blue">Underweight</Tag>;
  if (bmi < 25) return <Tag color="green">Normal</Tag>;
  if (bmi < 30) return <Tag color="gold">Overweight</Tag>;
  return <Tag color="red">Obese</Tag>;
};

export default function Health() {
  const { health, addHealth, updateHealth, deleteHealth } = useStore();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  // ===== ADD / EDIT =====
  const onFinish = (values: any) => {
    if (editing) {
      updateHealth({ ...editing, ...values });
    } else {
      addHealth({
        id: Date.now().toString(),
        ...values,
      });
    }

    setEditing(null);
    form.resetFields();
    setOpen(false);
  };

  const onEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Add Health
      </Button>

      {/* TABLE */}
      <Table
        rowKey="id"
        dataSource={health}
        columns={[
          { title: "Date", dataIndex: "date" },
          { title: "Weight (kg)", dataIndex: "weight" },
          { title: "Height (cm)", dataIndex: "height" },

          // 🔥 BMI
          {
            title: "BMI",
            render: (_, r) => {
              const bmi = getBMI(r.weight, r.height);
              return (
                <>
                  {bmi.toFixed(1)} {getBMITag(bmi)}
                </>
              );
            },
          },

          { title: "Heart Rate", dataIndex: "heartRate" },
          { title: "Sleep (hours)", dataIndex: "sleep" },

          // 🔥 ACTION
          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button onClick={() => onEdit(record)}>Edit</Button>

                <Popconfirm
                  title="Delete record?"
                  onConfirm={() => deleteHealth(record.id)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* MODAL */}
      <Modal
        title={editing ? "Edit Health" : "Add Health"}
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="date" label="Date" required>
            <Input />
          </Form.Item>

          <Form.Item name="weight" label="Weight (kg)" required>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="height" label="Height (cm)" required>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="heartRate" label="Heart Rate (bpm)">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="sleep" label="Sleep (hours)">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}