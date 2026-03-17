import { useState, useEffect } from 'react'
import type { Booking, Employee, Service } from '../types'
import { isOverlap } from '../utils/booking'

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [employeeId, setEmployeeId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  // load data
  useEffect(() => {
    const b = localStorage.getItem('bookings')
    const e = localStorage.getItem('employees')
    const s = localStorage.getItem('services')

    if (b) setBookings(JSON.parse(b))
    if (e) setEmployees(JSON.parse(e))
    if (s) setServices(JSON.parse(s))
  }, [])

  // save bookings
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  const addBooking = () => {
    if (!employeeId || !serviceId || !date || !time) {
      alert('Nhập đầy đủ')
      return
    }

    const service = services.find(s => s.id === serviceId)
    const employee = employees.find(e => e.id === employeeId)
    if (!service || !employee) return

    // tính endTime
    const [h, m] = time.split(':').map(Number)
    const endMinutes = h * 60 + m + service.duration

    const endTime = `${Math.floor(endMinutes / 60)
      .toString()
      .padStart(2, '0')}:${(endMinutes % 60)
      .toString()
      .padStart(2, '0')}`

    const sameDay = bookings.filter(
      b => b.date === date && b.employeeId === employeeId
    )

    const isConflict = sameDay.some(b =>
      isOverlap(time, endTime, b.startTime, b.endTime)
    )

    if (isConflict) {
      alert('Trùng lịch!')
      return
    }

    if (sameDay.length >= employee.maxPerDay) {
      alert('Đủ khách!')
      return
    }

    setBookings([
      ...bookings,
      {
        id: Date.now().toString(),
        employeeId,
        serviceId,
        date,
        startTime: time,
        endTime,
        status: 'pending'
      }
    ])
  }

  const updateStatus = (id: string, status: any) => {
    setBookings(bookings.map(b =>
      b.id === id ? { ...b, status } : b
    ))
  }

  return (
    <div className="container">
      <h2>Đặt lịch</h2>

      <select onChange={e => setEmployeeId(e.target.value)}>
        <option value="">Chọn nhân viên</option>
        {employees.map(e => (
          <option key={e.id} value={e.id}>{e.name}</option>
        ))}
      </select>

      <select onChange={e => setServiceId(e.target.value)}>
        <option value="">Chọn dịch vụ</option>
        {services.map(s => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <input type="date" onChange={e => setDate(e.target.value)} />
      <input type="time" onChange={e => setTime(e.target.value)} />

      <button onClick={addBooking}>Đặt</button>

      {bookings.map(b => (
        <div key={b.id} className="card">
          {b.date} - {b.startTime}

          <select
            value={b.status}
            onChange={e => updateStatus(b.id, e.target.value)}
          >
            <option value="pending">Chờ</option>
            <option value="confirmed">Xác nhận</option>
            <option value="done">Hoàn thành</option>
            <option value="cancel">Hủy</option>
          </select>
        </div>
      ))}
    </div>
  )
}