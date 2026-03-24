import { useState } from "react"
import { Subject } from "../models/Subject"

interface Props {
  subjects: Subject[]
  setSubjects: (subjects: Subject[]) => void
}

export default function SubjectManager({ subjects, setSubjects }: Props) {

  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [credits, setCredits] = useState(3)

  const addSubject = () => {

    const newSubject: Subject = {
      id: Date.now().toString(),
      code,
      name,
      credits
    }

    setSubjects([...subjects, newSubject])

    setCode("")
    setName("")
  }

  return (
    <div>

      <h2>Quản lý môn học</h2>

      <input
        placeholder="Mã môn"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        placeholder="Tên môn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        value={credits}
        onChange={(e) => setCredits(Number(e.target.value))}
      />

      <button onClick={addSubject}>Thêm</button>

      <ul>
        {subjects.map((s) => (
          <li key={s.id}>
            {s.code} - {s.name} ({s.credits} tín chỉ)
          </li>
        ))}
      </ul>

    </div>
  )
}