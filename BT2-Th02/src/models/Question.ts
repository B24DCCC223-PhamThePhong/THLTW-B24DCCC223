export type Difficulty = "Dễ" | "Trung bình" | "Khó" | "Rất khó"

export interface Question {
  id: string
  subjectId: string
  knowledgeBlockId: string
  content: string
  difficulty: Difficulty
}