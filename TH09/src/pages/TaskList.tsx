import { Table, Input, Select, Space, Button, Modal } from "antd";
import { useState } from "react";
import { getTasks } from "../utils/storage";
import type { Task } from "../types/task";
import dayjs from "dayjs";
import TaskForm from "../components/TaskForm";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>();

  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const reload = () => {
    setTasks(getTasks());
    setOpen(false);
    setEditingTask(null);
  };

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) &&
    (status ? t.status === status : true)
  );

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="Tìm kiếm" onChange={e => setSearch(e.target.value)} />

        <Select
          placeholder="Lọc trạng thái"
          allowClear
          onChange={setStatus}
          style={{ width: 200 }}
        >
          <Select.Option value="todo">Cần làm</Select.Option>
          <Select.Option value="inprogress">Đang làm</Select.Option>
          <Select.Option value="done">Hoàn thành</Select.Option>
        </Select>

        <Button
          type="primary"
          onClick={() => {
            setEditingTask(null);
            setOpen(true);
          }}
        >
          + Thêm task
        </Button>
      </Space>

      <Table
        bordered
        pagination={{ pageSize: 5 }}
        dataSource={filtered}
        rowKey="id"
        columns={[
          { title: "Tên", dataIndex: "title" },
          {
            title: "Deadline",
            dataIndex: "deadline",
            sorter: (a, b) =>
              dayjs(a.deadline).unix() - dayjs(b.deadline).unix()
          },
          { title: "Trạng thái", dataIndex: "status" },
          {
            title: "Hành động",
            render: (_, record: Task) => (
              <Button
                onClick={() => {
                  setEditingTask(record);
                  setOpen(true);
                }}
              >
                Sửa
              </Button>
            )
          }
        ]}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={editingTask ? "Sửa task" : "Thêm task"}
      >
        <TaskForm editingTask={editingTask} onFinish={reload} />
      </Modal>
    </>
  );
}