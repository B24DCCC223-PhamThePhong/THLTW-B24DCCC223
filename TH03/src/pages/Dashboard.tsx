import { useEffect, useState } from 'react'
import type { Booking, Service } from '../types'

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    const b = localStorage.getItem('bookings')
    const s = localStorage.getItem('services')
    if (b) setBookings(JSON.parse(b))
    if (s) setServices(JSON.parse(s))
  }, [])

  const total = bookings.length

  const revenue = bookings
    .filter(b => b.status === 'done')
    .reduce((sum, b) => {
      const s = services.find(s => s.id === b.serviceId)
      return sum + (s?.price || 0)
    }, 0)

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Tổng lịch: {total}</p>
      <p>Doanh thu: {revenue}đ</p>
    </div>
  )
}
