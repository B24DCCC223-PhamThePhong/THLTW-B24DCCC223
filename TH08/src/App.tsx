import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Health from "./pages/Health";
import Goals from "./pages/Goals";
import Exercises from "./pages/Exercises";

const { Header, Content } = Layout;

export default function App() {
  const items = [
    {
      key: "dashboard",
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "workouts",
      label: <Link to="/workouts">Workouts</Link>,
    },
    {
      key: "health",
      label: <Link to="/health">Health</Link>,
    },
    {
      key: "goals",
      label: <Link to="/goals">Goals</Link>,
    },
    {
      key: "exercises",
      label: <Link to="/exercises">Exercises</Link>,
    },
  ];

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" items={items} />
        </Header>

        <Content style={{ padding: 20 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/health" element={<Health />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/exercises" element={<Exercises />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}