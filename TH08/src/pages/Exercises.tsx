import {
  Card,
  Input,
  Select,
  Row,
  Col,
  Tag,
  Modal,
  Button,
  Form,
  Popconfirm,
  Space,
} from "antd";
import { useState } from "react";
import { useStore } from "../store";

export default function Exercises() {
  const { exercises, addExercise, updateExercise, deleteExercise } =
    useStore();

  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("");
  const [level, setLevel] = useState("");

  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  const [editing, setEditing] = useState<any>(null);

  const [form] = Form.useForm();

  // ===== FILTER =====
  const filtered = exercises.filter((e) => {
    const matchSearch = e.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchMuscle = muscle ? e.muscleGroup === muscle : true;
    const matchLevel = level ? e.level === level : true;

    return matchSearch && matchMuscle && matchLevel;
  });

  // ===== ADD / EDIT =====
  const onFinish = (values: any) => {
    if (editing) {
      updateExercise({ ...editing, ...values });
    } else {
      addExercise({
        id: Date.now().toString(),
        ...values,
      });
    }

    form.resetFields();
    setEditing(null);
    setOpen(false);
  };

  const onEdit = (e: any) => {
    setEditing(e);
    form.setFieldsValue(e);
    setOpen(true);
  };

  return (
    <>
      {/* FILTER */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Muscle"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setMuscle(v)}
          options={[
            { value: "Chest" },
            { value: "Back" },
            { value: "Legs" },
            { value: "Shoulders" },
            { value: "Arms" },
            { value: "Core" },
            { value: "Full Body" },
          ]}
        />

        <Select
          placeholder="Level"
          allowClear
          style={{ width: 150 }}
          onChange={(v) => setLevel(v)}
          options={[
            { value: "easy" },
            { value: "medium" },
            { value: "hard" },
          ]}
        />

        <Button type="primary" onClick={() => setOpen(true)}>
          Add Exercise
        </Button>
      </Space>

      {/* GRID */}
      <Row gutter={[16, 16]}>
        {filtered.map((e) => (
          <Col span={8} key={e.id}>
            <Card
              title={e.name}
              hoverable
              onClick={() => setDetail(e)}
            >
              <p>{e.muscleGroup}</p>

              <Tag
                color={
                  e.level === "easy"
                    ? "green"
                    : e.level === "medium"
                    ? "gold"
                    : "red"
                }
              >
                {e.level}
              </Tag>

              <p>{e.description}</p>

              <p>{e.caloriesPerHour} cal/hour</p>

              {/* ACTION */}
              <Space>
                <Button onClick={() => onEdit(e)}>Edit</Button>

                <Popconfirm
                  title="Delete exercise?"
                  onConfirm={() => deleteExercise(e.id)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* DETAIL MODAL */}
      <Modal
        open={!!detail}
        title={detail?.name}
        onCancel={() => setDetail(null)}
        footer={null}
      >
        <p><b>Muscle:</b> {detail?.muscleGroup}</p>
        <p><b>Level:</b> {detail?.level}</p>
        <p><b>Description:</b> {detail?.description}</p>
        <p><b>Calories:</b> {detail?.caloriesPerHour}</p>
      </Modal>

      {/* ADD / EDIT MODAL */}
      <Modal
  open={!!detail}
  title={detail?.name}
  onCancel={() => setDetail(null)}
  footer={null}
>
  <p><b>Muscle:</b> {detail?.muscleGroup}</p>

  <p><b>Level:</b> {detail?.level}</p>

  <p><b>Description:</b> {detail?.description}</p>

  <p><b>Calories:</b> {detail?.caloriesPerHour}</p>

  {/* 🔥 HƯỚNG DẪN CHI TIẾT */}
  <div style={{ marginTop: 16 }}>
    <b>Instructions:</b>
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {detail?.instruction}
    </pre>
  </div>
</Modal>
    </>
  );
}