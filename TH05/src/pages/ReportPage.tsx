import { useMemo } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Column } from '@ant-design/charts';
import { useApplicationStore } from '../stores/useApplicationStore';
import { useClubStore } from '../stores/useClubStore';

const ReportPage = () => {
  const { applications } = useApplicationStore();
  const { clubs } = useClubStore();

  const stats = useMemo(() => {
    const pending = applications.filter(a => a.status === 'pending').length;
    const approved = applications.filter(a => a.status === 'approved').length;
    const rejected = applications.filter(a => a.status === 'rejected').length;
    return { totalClubs: clubs.length, pending, approved, rejected };
  }, [applications, clubs]);

  // Dữ liệu cho Column Chart
  const chartData = useMemo(() => {
    return clubs.map(club => {
      const clubApps = applications.filter(a => a.clubId === club.id);
      return {
        club: club.name,
        Pending: clubApps.filter(a => a.status === 'pending').length,
        Approved: clubApps.filter(a => a.status === 'approved').length,
        Rejected: clubApps.filter(a => a.status === 'rejected').length,
      };
    });
  }, [clubs, applications]);

  const config = {
    data: chartData,
    xField: 'club',
    yField: ['Pending', 'Approved', 'Rejected'],
    isGroup: true,
    seriesField: 'type', // cần điều chỉnh nếu dùng grouped
    label: { position: 'middle' as const },
    legend: { position: 'top' as const },
  };

  return (
    <>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="Tổng số CLB" value={stats.totalClubs} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đơn đang chờ" value={stats.pending} valueStyle={{ color: '#faad14' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đã duyệt" value={stats.approved} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đã từ chối" value={stats.rejected} valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Card title="Số đơn đăng ký theo từng câu lạc bộ">
        <Column {...config} />
      </Card>
    </>
  );
};

export default ReportPage;