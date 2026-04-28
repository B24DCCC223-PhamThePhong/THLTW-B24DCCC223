import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  DatePicker,
  Popconfirm,
  Space,
} from "antd";
import { useState } from "react";
import { useStore } from "../store";
import dayjs from "dayjs";

export default function Workouts() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useStore();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateRange, setDateRange] = useState<any>(null);

  // ===== ADD / EDIT =====
  const onFinish = (values: any) => {
    if (editing) {
      updateWorkout({ ...editing, ...values });
    } else {
      addWorkout({
        id: Date.now().toString(),
        ...values,
        date: dayjs().format("YYYY-MM-DD"),
      });
    }

    setEditing(null);
    form.resetFields();
    setOpen(false);
  };

  const onEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record); // 🔥 fill lại form
    setOpen(true);
  };

  // ===== FILTER =====
  const filteredData = workouts.filter((w) => {
    const matchSearch = w.type
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType = typeFilter ? w.type === typeFilter : true;

    const matchDate =
      dateRange && dateRange.length === 2
        ? dayjs(w.date).isAfter(dateRange[0]) &&
          dayjs(w.date).isBefore(dateRange[1])
        : true;

    return matchSearch && matchType && matchDate;
  });

  return (
    <>
      {/* ===== FILTER UI ===== */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search type..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Filter type"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setTypeFilter(v)}
          options={[
            { value: "Cardio" },
            { value: "Strength" },
            { value: "Yoga" },
            { value: "HIIT" },
          ]}
        />

        <DatePicker.RangePicker onChange={(v) => setDateRange(v)} />

        <Button type="primary" onClick={() => setOpen(true)}>
          Add
        </Button>
      </Space>

      {/* ===== TABLE ===== */}
      <Table
        rowKey="id"
        dataSource={filteredData}
        columns={[
          { title: "Date", dataIndex: "date" },
          { title: "Type", dataIndex: "type" },
          { title: "Duration", dataIndex: "duration" },
          { title: "Calories", dataIndex: "calories" },
          {
            title: "Status",
            dataIndex: "status",
            render: (s) => (
              <Tag color={s === "completed" ? "green" : "red"}>
                {s}
              </Tag>
            ),
          },
          {
            title: "Action",
            render: (_, record) => (
              <Space>
                <Button onClick={() => onEdit(record)}>Edit</Button>

                <Popconfirm
                  title="Delete workout?"
                  onConfirm={() => deleteWorkout(record.id)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* ===== MODAL ===== */}
      <Modal
        title={editing ? "Edit Workout" : "Add Workout"}
        open={open}
        onCancel={() => {
          setOpen(false);
          setEditing(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="type" label="Type" required>
            <Select
              options={[
                { value: "Cardio" },
                { value: "Strength" },
                { value: "Yoga" },
                { value: "HIIT" },
              ]}
            />
          </Form.Item>

          <Form.Item name="duration" label="Duration">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="calories" label="Calories">
            <Input type="number" />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Select
              options={[
                { value: "completed" },
                { value: "missed" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}