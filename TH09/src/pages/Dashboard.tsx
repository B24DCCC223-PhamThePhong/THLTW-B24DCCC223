import { Card, Row, Col } from "antd";
import { getTasks } from "../utils/storage";
import dayjs from "dayjs";

export default function Dashboard() {
  const tasks = getTasks();

  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => dayjs(t.deadline).isBefore(dayjs()) && t.status !== "done"
  ).length;

  return (
    <Row gutter={16} style={{ padding: 20 }}>
      <Col span={8}>
        <Card style={{ borderLeft: "5px solid #1677ff" }}>
          <h3>Tổng task</h3>
          <h1>{total}</h1>
        </Card>
      </Col>

      <Col span={8}>
        <Card style={{ borderLeft: "5px solid #52c41a" }}>
          <h3>Hoàn thành</h3>
          <h1>{done}</h1>
        </Card>
      </Col>

      <Col span={8}>
        <Card style={{ borderLeft: "5px solid #ff4d4f" }}>
          <h3>Quá hạn</h3>
          <h1>{overdue}</h1>
        </Card>
      </Col>
    </Row>
  );
}