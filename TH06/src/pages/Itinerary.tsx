import { Layout, Typography } from 'antd';
import ItineraryBuilder from '../components/ItineraryBuilder';

const { Content } = Layout;
const { Title } = Typography;

export default function Itinerary() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Xây dựng lịch trình du lịch</Title>
        <ItineraryBuilder />
      </Content>
    </Layout>
  );
}