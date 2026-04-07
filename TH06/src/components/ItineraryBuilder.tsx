import { useApp } from '../context/AppContext';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

function SortableItem({ item, onRemove }: { item: any; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} size="small" className="mb-3">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong>{item.destination.name}</strong> - Ngày {item.day}
        </div>
        <Button danger icon={<DeleteOutlined />} size="small" onClick={onRemove} />
      </div>
    </Card>
  );
}

export default function ItineraryBuilder() {
  const { itinerary, updateItinerary, removeFromItinerary } = useApp();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = itinerary.findIndex(i => i.id === active.id);
      const newIndex = itinerary.findIndex(i => i.id === over.id);
      updateItinerary(arrayMove(itinerary, oldIndex, newIndex));
    }
  };

  // Tính tổng ngân sách (demo)
  const totalBudget = itinerary.reduce((sum, item) => {
    const d = item.destination;
    return sum + d.foodCost + d.stayCost + d.transportCost;
  }, 0);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={itinerary.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {itinerary.map(item => (
            <SortableItem
              key={item.id}
              item={item}
              onRemove={() => removeFromItinerary(item.id)}
            />
          ))}
        </div>
      </SortableContext>
      <div style={{ marginTop: 20, fontSize: 18, fontWeight: 600 }}>
        Tổng ngân sách dự kiến: <span style={{ color: '#52c41a' }}>{totalBudget.toLocaleString('vi-VN')} ₫</span>
      </div>
    </DndContext>
  );
}