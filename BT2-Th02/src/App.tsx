import { useState } from "react"
import "./App.css"

import KnowledgeBlockManager from "./components/KnowledgeBlock"
import SubjectManager from "./components/Subject"
import QuestionManager from "./components/QuestionManager"
import ExamManager from "./components/ExamManager"

import { KnowledgeBlock } from "./models/KnowledgeBlock"
import { Subject } from "./models/Subject"
import { Question } from "./models/Question"

function App(){

const [blocks,setBlocks]=useState<KnowledgeBlock[]>([])
const [subjects,setSubjects]=useState<Subject[]>([])
const [questions,setQuestions]=useState<Question[]>([])

return(

<div className="container">

<h1>Hệ thống ngân hàng câu hỏi</h1>

<div className="card">
<KnowledgeBlockManager
blocks={blocks}
setBlocks={setBlocks}
/>
</div>

<div className="card">
<SubjectManager
subjects={subjects}
setSubjects={setSubjects}
/>
</div>

<div className="card">
<QuestionManager
questions={questions}
setQuestions={setQuestions}
subjects={subjects}
blocks={blocks}
/>
</div>

<div className="card">
<ExamManager
questions={questions}
/>
</div>

</div>

)
}

export default App