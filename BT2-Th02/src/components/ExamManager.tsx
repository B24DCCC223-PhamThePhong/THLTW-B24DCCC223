import { Question } from "../models/Question"

interface Props {
  questions: Question[]
}

export default function ExamManager({ questions }: Props) {

  const generateExam = () => {

    const easy = questions.filter(q => q.difficulty === "Dễ").slice(0, 2)
    const medium = questions.filter(q => q.difficulty === "Trung bình").slice(0, 2)
    const hard = questions.filter(q => q.difficulty === "Khó").slice(0, 1)

    const exam = [...easy, ...medium, ...hard]

    if (exam.length < 5) {
      alert("Không đủ câu hỏi để tạo đề")
      return
    }

    console.log("Đề thi:", exam)
    alert("Đã tạo đề thi (xem console)")
  }

  return (
    <div>
      <h2>Tạo đề thi</h2>

      <button onClick={generateExam}>
        Tạo đề
      </button>
    </div>
  )
}