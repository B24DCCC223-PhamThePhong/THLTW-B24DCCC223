import { useState } from 'react';
import { Row, Col, Input, Select, Slider, Button } from 'antd';
import DestinationCard from '../components/DestinationCard';
import { useApp } from '../context/AppContext';
import type { Destination } from '../types';

const { Search } = Input;
const { Option } = Select;

export default function Home() {
  const { destinations } = useApp();
  const [filtered, setFiltered] = useState(destinations);
  const [type, setType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const handleFilter = (value: string) => {
    let result = destinations;

    if (type !== 'all') {
      result = result.filter(d => d.type === type);
    }

    result = result.filter(d => d.price >= priceRange[0] && d.price <= priceRange[1]);

    if (value) {
      const search = value.toLowerCase();
      result = result.filter(d => d.name.toLowerCase().includes(search));
    }

    setFiltered(result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Khám phá điểm đến</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Select defaultValue="all" style={{ width: '100%' }} onChange={setType}>
            <Option value="all">Tất cả</Option>
            <Option value="beach">Biển</Option>
            <Option value="mountain">Núi</Option>
            <Option value="city">Thành phố</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Search placeholder="Tìm điểm đến..." onSearch={handleFilter} allowClear />
        </Col>
        <Col xs={24} md={12}>
          <div style={{ padding: '0 10px' }}>
            Giá: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₫
            <Slider range min={0} max={5000000} step={100000} value={priceRange} onChange={setPriceRange} onAfterChange={() => handleFilter('')} />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filtered.map(dest => (
          <Col xs={24} sm={12} md={8} lg={6} key={dest.id}>
            <DestinationCard dest={dest} />
          </Col>
        ))}
      </Row>
    </div>
  );
}