import { Question } from "./Question"

export interface Exam {
  id: string
  subjectId: string
  questions: Question[]
}