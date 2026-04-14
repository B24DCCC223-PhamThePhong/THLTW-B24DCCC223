import { useApp } from '../context/AppContext';
import BudgetChart from '../components/BudgetChart';
import type { BudgetItem } from '../types';
import { Alert, Typography } from 'antd';

const { Title } = Typography;

export default function Budget() {
  const { itinerary } = useApp();

  const budgetData: BudgetItem[] = [
    { category: 'Ăn uống', amount: itinerary.reduce((s, i) => s + i.destination.foodCost, 0), color: '#0088FE' },
    { category: 'Lưu trú', amount: itinerary.reduce((s, i) => s + i.destination.stayCost, 0), color: '#00C49F' },
    { category: 'Di chuyển', amount: itinerary.reduce((s, i) => s + i.destination.transportCost, 0), color: '#FFBB28' },
  ];

  const total = budgetData.reduce((sum, item) => sum + item.amount, 0);
  const warning = total > 15000000;

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Quản lý ngân sách</Title>
      {warning && <Alert message="Cảnh báo: Ngân sách đã vượt quá 15 triệu!" type="error" showIcon style={{ marginBottom: 20 }} />}
      <BudgetChart data={budgetData} />
      <h3 style={{ marginTop: 30 }}>Tổng chi phí: {total.toLocaleString('vi-VN')} ₫</h3>
    </div>
  );
}