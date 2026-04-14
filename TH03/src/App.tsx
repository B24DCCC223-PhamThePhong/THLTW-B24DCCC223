import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import EmployeesPage from './pages/EmployeesPage'
import ServicesPage from './pages/ServicesPage'
import BookingPage from './pages/BookingPage'
import Dashboard from './pages/Dashboard'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Nhân viên</Link>
        <Link to="/services">Dịch vụ</Link>
        <Link to="/booking">Đặt lịch</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
