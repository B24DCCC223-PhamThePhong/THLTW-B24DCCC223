import { useStore } from "../store";
import { Card, Row, Col, Timeline } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const { workouts, health, goals } = useStore();

  // ===== 1. STATS =====
  const totalWorkouts = workouts.length;

  const totalCalories = workouts.reduce(
    (sum, w) => sum + (w.calories || 0),
    0
  );

  // 🔥 STREAK (liên tiếp)
  const sorted = [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].status === "completed") streak++;
    else break;
  }

  // 🔥 Goal %
  const goalPercent =
    goals.length > 0
      ? (goals[0].current / goals[0].target) * 100
      : 0;

  // ===== 2. BAR CHART (workouts theo tuần) =====
  const weeklyData = [
    { week: "W1", count: 2 },
    { week: "W2", count: 3 },
    { week: "W3", count: 1 },
    { week: "W4", count: 4 },
  ];

  // ===== 3. LINE CHART (cân nặng) =====
  const weightData = health.map((h) => ({
    date: h.date,
    weight: h.weight,
  }));

  // ===== 4. TIMELINE =====
  const recent = [...workouts]
    .slice(-5)
    .reverse()
    .map((w) => ({
      children: `${w.date} - ${w.type} (${w.duration} min)`,
    }));

  return (
    <>
      {/* ===== CARDS ===== */}
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card title="Workouts">{totalWorkouts}</Card>
        </Col>

        <Col span={6}>
          <Card title="Calories">{totalCalories}</Card>
        </Col>

        <Col span={6}>
          <Card title="Streak">{streak} days</Card>
        </Col>

        <Col span={6}>
          <Card title="Goal">
            {goalPercent.toFixed(0)}%
          </Card>
        </Col>
      </Row>

      {/* ===== CHARTS ===== */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Workouts per Week">
            <BarChart width={300} height={200} data={weeklyData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Weight Progress">
            <LineChart width={300} height={200} data={weightData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="weight" />
            </LineChart>
          </Card>
        </Col>
      </Row>

      {/* ===== TIMELINE ===== */}
      <Card title="Recent Workouts" style={{ marginTop: 20 }}>
        <Timeline items={recent} />
      </Card>
    </>
  );
}