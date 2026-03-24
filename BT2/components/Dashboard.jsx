import { Card, Col, Row, Statistic } from 'antd'

export default function Dashboard({ products, orders }) {
  const stockValue = products.reduce((s, p) => s + p.price * p.quantity, 0)
  const revenue = orders.filter(o => o.status === 'Hoàn thành').reduce((s, o) => s + o.totalAmount, 0)

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col span={6}><Card><Statistic title="Tổng sản phẩm" value={products.length} /></Card></Col>
      <Col span={6}><Card><Statistic title="Giá trị tồn kho" value={stockValue} /></Card></Col>
      <Col span={6}><Card><Statistic title="Tổng đơn hàng" value={orders.length} /></Card></Col>
      <Col span={6}><Card><Statistic title="Doanh thu" value={revenue} /></Card></Col>
    </Row>
  )
}