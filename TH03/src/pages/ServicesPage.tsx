import { useState } from 'react'
import type { Service } from '../types'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [name, setName] = useState('')

  const add = () => {
    if (!name) return
    setServices([
      ...services,
      { id: Date.now().toString(), name, price: 100, duration: 60 }
    ])
    setName('')
  }

  return (
    <div className="container">
      <h2>Dịch vụ</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={add}>Thêm</button>

      {services.map(s => (
        <div key={s.id} className="card">
          {s.name} - {s.price}đ - {s.duration}p
        </div>
      ))}
    </div>
  )
}
