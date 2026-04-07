import { Card, Rate, Tag } from 'antd';
import type { Destination } from '../types';
import { useApp } from '../context/AppContext';

const { Meta } = Card;

export default function DestinationCard({ dest }: { dest: Destination }) {
  const { addToItinerary } = useApp();

  const handleAdd = () => {
    addToItinerary(dest, 1); // mặc định thêm vào ngày 1, sau này có thể chọn
  };

  return (
    <Card
      hoverable
      cover={<img alt={dest.name} src={dest.image} style={{ height: 200, objectFit: 'cover' }} />}
      actions={[
        <button onClick={handleAdd} style={{ background: 'transparent', border: 'none', color: '#1890ff', cursor: 'pointer' }}>
          Thêm vào lịch
        </button>
      ]}
    >
      <Meta
        title={dest.name}
        description={
          <>
            <Tag color={dest.type === 'beach' ? 'blue' : dest.type === 'mountain' ? 'green' : 'orange'}>
              {dest.type === 'beach' ? 'Biển' : dest.type === 'mountain' ? 'Núi' : 'Thành phố'}
            </Tag>
            <div style={{ marginTop: 8 }}>
              <Rate disabled defaultValue={dest.rating} style={{ fontSize: 14 }} /> {dest.rating}
            </div>
            <div style={{ marginTop: 4, fontWeight: 600 }}>
              {dest.price.toLocaleString('vi-VN')} ₫ / ngày
            </div>
          </>
        }
      />
    </Card>
  );
}