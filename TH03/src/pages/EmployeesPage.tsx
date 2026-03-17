import { useState } from 'react'
import type { Employee } from '../types'

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [name, setName] = useState('')

  const add = () => {
    setEmployees([
      ...employees,
      {
        id: Date.now().toString(),
        name,
        maxPerDay: 3,
        workingHours: []
      }
    ])
  }

  return (
    <div className="container">
      <h2>Nhân viên</h2>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={add}>Thêm</button>

      {employees.map(e => (
        <div key={e.id} className="card">{e.name}</div>
      ))}
    </div>
  )
}
