import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, CalendarOutlined, DollarOutlined, SettingOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import Itinerary from './pages/Itinerary';
import Budget from './pages/Budget';
import Admin from './pages/Admin';
import { AppProvider } from './context/AppContext';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ background: '#fff', padding: '0 20px' }}>
            <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<CalendarOutlined />}>
                <Link to="/itinerary">Lịch trình</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<DollarOutlined />}>
                <Link to="/budget">Ngân sách</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                <Link to="/admin">Quản trị</Link>
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ padding: '0 20px', marginTop: 20 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Travel Planner © {new Date().getFullYear()} - Responsive cho Mobile & Tablet
          </Footer>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;