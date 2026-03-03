import { useEffect, useState } from "react";
import "./App.css";

type StudySession = {
  id: string;
  date: string;
  duration: number;
  content: string;
  note: string;
};

type Subject = {
  id: string;
  name: string;
  goal: number;
  sessions: StudySession[];
};

const STORAGE_KEY = "study_app_data";

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setSubjects(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const calculateTotal = (sessions: StudySession[]) => {
    return sessions.reduce((sum, s) => sum + s.duration, 0);
  };

  const addSubject = () => {
    if (!newSubject.trim()) return;

    const subject: Subject = {
      id: Date.now().toString(),
      name: newSubject,
      goal: 0,
      sessions: [],
    };

    setSubjects([...subjects, subject]);
    setNewSubject("");
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const updateGoal = (id: string, goal: number) => {
    setSubjects(
      subjects.map((s) =>
        s.id === id ? { ...s, goal } : s
      )
    );
  };

  const addSession = (subjectId: string) => {
    const content = prompt("Nội dung học?");
    const duration = Number(prompt("Thời lượng (giờ)?"));
    const note = prompt("Ghi chú?");

    if (!content || !duration || isNaN(duration)) return;

    const newSession: StudySession = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      duration,
      content,
      note: note || "",
    };

    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? { ...s, sessions: [...s.sessions, newSession] }
          : s
      )
    );
  };

  const deleteSession = (subjectId: string, sessionId: string) => {
    setSubjects(
      subjects.map((s) =>
        s.id === subjectId
          ? {
              ...s,
              sessions: s.sessions.filter(
                (ses) => ses.id !== sessionId
              ),
            }
          : s
      )
    );
  };

  return (
    <div className="app-wrapper">
      <div className="app-header">
        <h1>Study Manager</h1>
        <p>Theo dõi tiến độ học tập của bạn</p>
      </div>

      <div className="add-box">
        <input
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Thêm môn học mới..."
        />
        <button className="btn-primary" onClick={addSubject}>
          Thêm
        </button>
      </div>

      {subjects.map((subject) => {
        const total = calculateTotal(subject.sessions);
        const percent =
          subject.goal > 0
            ? Math.min((total / subject.goal) * 100, 100)
            : 0;

        return (
          <div key={subject.id} className="subject-card">
            <div className="subject-top">
              <h2>{subject.name}</h2>
              <button
                className="btn-danger"
                onClick={() => deleteSubject(subject.id)}
              >
                Xóa
              </button>
            </div>

            <div className="progress-container">
              <div className="small-text">
                {total}h / {subject.goal || 0}h
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div style={{ marginTop: 15 }}>
              <input
                type="number"
                placeholder="Mục tiêu giờ/tháng"
                value={subject.goal}
                onChange={(e) =>
                  updateGoal(subject.id, Number(e.target.value))
                }
              />

              <button
                className="btn-primary"
                style={{ marginLeft: 10 }}
                onClick={() => addSession(subject.id)}
              >
                Thêm buổi học
              </button>
            </div>

            <ul className="session-list">
              {subject.sessions.map((ses) => (
                <li key={ses.id} className="session-item">
                  <div>
                    <div>{ses.content}</div>
                    <div className="small-text">
                      {ses.duration}h • {ses.date}
                    </div>
                  </div>

                  <button
                    className="btn-danger"
                    onClick={() =>
                      deleteSession(subject.id, ses.id)
                    }
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;