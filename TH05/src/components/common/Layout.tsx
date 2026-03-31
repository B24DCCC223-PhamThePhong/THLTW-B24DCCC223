import { Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { TeamOutlined, UserAddOutlined, BarChartOutlined, BookOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/', icon: <BookOutlined />, label: <Link to="/">Quản lý CLB</Link> },
    { key: '/registrations', icon: <UserAddOutlined />, label: <Link to="/registrations">Đơn đăng ký</Link> },
    { key: '/members', icon: <TeamOutlined />, label: <Link to="/members">Thành viên</Link> },
    { key: '/reports', icon: <BarChartOutlined />, label: <Link to="/reports">Báo cáo</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250}>
        <div style={{ color: 'white', padding: '16px', fontSize: '18px', textAlign: 'center' }}>
          Quản lý Câu lạc bộ
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px' }}>
          <h2>Hệ thống quản lý câu lạc bộ & đăng ký</h2>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;