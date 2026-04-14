import { useState } from "react"
import { Question, Difficulty } from "../models/Question"
import { Subject } from "../models/Subject"
import { KnowledgeBlock } from "../models/KnowledgeBlock"

interface Props {
  questions: Question[]
  setQuestions: (q: Question[]) => void
  subjects: Subject[]
  blocks: KnowledgeBlock[]
}

export default function QuestionManager({ questions, setQuestions, subjects, blocks }: Props) {

  const [content, setContent] = useState("")
  const [subjectId, setSubjectId] = useState("")
  const [blockId, setBlockId] = useState("")
  const [difficulty, setDifficulty] = useState<Difficulty>("Dễ")

  const addQuestion = () => {

    const q: Question = {
      id: Date.now().toString(),
      content,
      subjectId,
      knowledgeBlockId: blockId,
      difficulty
    }

    setQuestions([...questions, q])
    setContent("")
  }

  return (
    <div>

      <h2>Quản lý câu hỏi</h2>

      <input
        placeholder="Nội dung câu hỏi"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select onChange={(e) => setSubjectId(e.target.value)}>
        <option>Chọn môn</option>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      <select onChange={(e) => setBlockId(e.target.value)}>
        <option>Khối kiến thức</option>
        {blocks.map((b) => (
          <option key={b.id} value={b.id}>{b.name}</option>
        ))}
      </select>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
      >
        <option>Dễ</option>
        <option>Trung bình</option>
        <option>Khó</option>
        <option>Rất khó</option>
      </select>

      <button onClick={addQuestion}>Thêm</button>

      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.content} - {q.difficulty}
          </li>
        ))}
      </ul>

    </div>
  )
}