export interface WorkingHour {
  day: number
  start: string
  end: string
}

export interface Employee {
  id: string
  name: string
  maxPerDay: number
  workingHours: WorkingHour[]
}

export interface Service {
  id: string
  name: string
  price: number
  duration: number
}

export type BookingStatus = 'pending' | 'confirmed' | 'done' | 'cancel'

export interface Booking {
  id: string
  employeeId: string
  serviceId: string
  date: string
  startTime: string
  endTime: string
  status: BookingStatus
}

export interface Review {
  id: string
  employeeId: string
  rating: number
  comment: string
  reply?: string
}
