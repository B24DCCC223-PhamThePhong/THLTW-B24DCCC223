import {
  Card,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Progress,
  Popconfirm,
  Segmented,
  Space,
} from "antd";
import { useState } from "react";
import { useStore } from "../store";

export default function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useStore();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState("all");

  // ===== ADD =====
  const onFinish = (values: any) => {
    addGoal({
      id: Date.now().toString(),
      ...values,
    });

    form.resetFields();
    setOpen(false);
  };

  // ===== FILTER =====
  const filteredGoals =
    filter === "all"
      ? goals
      : goals.filter((g) => g.status === filter);

  return (
    <>
      {/* FILTER + ADD */}
      <Space style={{ marginBottom: 16 }}>
        <Segmented
          options={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Done", value: "done" },
            { label: "Cancel", value: "cancel" },
          ]}
          onChange={(v) => setFilter(v)}
        />

        <Button type="primary" onClick={() => setOpen(true)}>
          Add Goal
        </Button>
      </Space>

      {/* CARDS */}
      <Space wrap>
        {filteredGoals.map((g) => {
          const percent = (g.current / g.target) * 100;

          return (
            <Card key={g.id} style={{ width: 300 }}>
              <h3>{g.name}</h3>

              <p>Target: {g.target}</p>

              {/* 🔥 INLINE EDIT */}
              <Input
                value={g.current}
                type="number"
                onChange={(e) =>
                  updateGoal({
                    ...g,
                    current: Number(e.target.value),
                  })
                }
              />

              <Progress percent={Math.min(percent, 100)} />

              <p>Deadline: {g.deadline}</p>

              <p>Status: {g.status}</p>

              <Popconfirm
                title="Delete goal?"
                onConfirm={() => deleteGoal(g.id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Card>
          );
        })}
      </Space>

      {/* DRAWER */}
      <Drawer
        title="Add Goal"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" required>
            <Input />
          </Form.Item>

          <Form.Item name="target" label="Target" required>
            <Input type="number" />
          </Form.Item>

          <Form.Item name="current" label="Current">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="deadline" label="Deadline">
            <Input />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "active" },
                { value: "done" },
                { value: "cancel" },
              ]}
            />
          </Form.Item>

          <Button type="primary" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form>
      </Drawer>
    </>
  );
}