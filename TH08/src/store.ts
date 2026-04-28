import { create } from "zustand";
import type { Workout, HealthRecord, Goal, Exercise } from "./types";


const sampleWorkouts: Workout[] = [
  { id: "1", date: "2026-04-01", type: "Cardio", duration: 30, calories: 250, status: "completed" },
  { id: "2", date: "2026-04-02", type: "Strength", duration: 45, calories: 320, status: "completed" },
  { id: "3", date: "2026-04-03", type: "HIIT", duration: 20, calories: 280, status: "completed" },
  { id: "4", date: "2026-04-04", type: "Yoga", duration: 60, calories: 180, status: "missed" },
  { id: "5", date: "2026-04-05", type: "Cardio", duration: 35, calories: 260, status: "completed" },
  { id: "6", date: "2026-04-06", type: "Strength", duration: 50, calories: 350, status: "completed" },
  { id: "7", date: "2026-04-07", type: "HIIT", duration: 25, calories: 300, status: "completed" },
  { id: "8", date: "2026-04-08", type: "Yoga", duration: 45, calories: 170, status: "completed" },
  { id: "9", date: "2026-04-09", type: "Cardio", duration: 40, calories: 290, status: "missed" },
  { id: "10", date: "2026-04-10", type: "Strength", duration: 55, calories: 370, status: "completed" },
  { id: "11", date: "2026-04-11", type: "HIIT", duration: 30, calories: 320, status: "completed" },
  { id: "12", date: "2026-04-12", type: "Yoga", duration: 50, calories: 200, status: "completed" },
];
const sampleHealth: HealthRecord[] = [
  { id: "1", date: "2026-04-01", weight: 72, height: 175, heartRate: 72, sleep: 7 },
  { id: "2", date: "2026-04-03", weight: 71.5, height: 175, heartRate: 70, sleep: 7.5 },
  { id: "3", date: "2026-04-05", weight: 71, height: 175, heartRate: 69, sleep: 8 },
  { id: "4", date: "2026-04-07", weight: 70.5, height: 175, heartRate: 68, sleep: 7 },
  { id: "5", date: "2026-04-09", weight: 70, height: 175, heartRate: 67, sleep: 8 },
  { id: "6", date: "2026-04-11", weight: 69.5, height: 175, heartRate: 66, sleep: 7.5 },
  { id: "7", date: "2026-04-13", weight: 69, height: 175, heartRate: 65, sleep: 8 },
];

const sampleGoals: Goal[] = [
  {
    id: "1",
    name: "Giảm cân xuống 65kg",
    target: 65,
    current: 69,
    deadline: "2026-06-01",
    status: "active",
  },
  {
    id: "2",
    name: "Tập 30 buổi",
    target: 30,
    current: 12,
    deadline: "2026-05-01",
    status: "active",
  },
];

const sampleExercises: Exercise[] = [
  {
    id: "1",
    name: "Push Up",
    muscleGroup: "Chest",
    level: "medium",
    description: "Hít đất",
    caloriesPerHour: 400,
    instruction: `1. Đặt tay rộng bằng vai
2. Giữ lưng thẳng
3. Hạ người xuống gần sàn
4. Đẩy lên lại
5. Lặp 10-15 lần`
  },
  {
    id: "2",
    name: "Bench Press",
    muscleGroup: "Chest",
    level: "hard",
    description: "Đẩy ngực",
    caloriesPerHour: 500,
    instruction: `1. Nằm trên ghế
2. Giữ thanh tạ ngang ngực
3. Đẩy tạ lên cao
4. Hạ xuống có kiểm soát
5. Lặp 8-12 lần`
  },
  {
    id: "3",
    name: "Squat",
    muscleGroup: "Legs",
    level: "medium",
    description: "Tập chân",
    caloriesPerHour: 450,
    instruction: `1. Đứng thẳng, chân rộng bằng vai
2. Hạ hông xuống như ngồi ghế
3. Giữ lưng thẳng
4. Đẩy lên lại
5. Lặp 10-15 lần`
  },
  {
    id: "4",
    name: "Deadlift",
    muscleGroup: "Back",
    level: "hard",
    description: "Tập lưng",
    caloriesPerHour: 550,
    instruction: `1. Đứng gần thanh tạ
2. Cúi xuống giữ lưng thẳng
3. Nhấc tạ lên bằng chân và hông
4. Hạ xuống chậm
5. Lặp 6-10 lần`
  },
  {
    id: "5",
    name: "Plank",
    muscleGroup: "Core",
    level: "hard",
    description: "Giữ core",
    caloriesPerHour: 350,
    instruction: `1. Chống khuỷu tay xuống sàn
2. Giữ cơ thể thẳng
3. Siết cơ bụng
4. Giữ 30-60 giây
5. Lặp 3-5 lần`
  },
  {
    id: "6",
    name: "Shoulder Press",
    muscleGroup: "Shoulders",
    level: "medium",
    description: "Tập vai",
    caloriesPerHour: 420,
    instruction: `1. Giữ tạ ngang vai
2. Đẩy tạ lên trên đầu
3. Hạ xuống chậm
4. Giữ kiểm soát
5. Lặp 10-12 lần`
  },
];

// ===== STORE =====

interface Store {
  workouts: Workout[];
  health: HealthRecord[];
  goals: Goal[];
  exercises: Exercise[];

  addWorkout: (w: Workout) => void;
  updateWorkout: (w: Workout) => void;
  deleteWorkout: (id: string) => void;
  updateHealth: (h: HealthRecord) => void;
deleteHealth: (id: string) => void;
addHealth: (h: HealthRecord) => void;
updateGoal: (g: Goal) => void;
deleteGoal: (id: string) => void;
addGoal: (g: Goal) => void;
addExercise: (e: Exercise) => void;
updateExercise: (e: Exercise) => void;
deleteExercise: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  // 👇 gán data mẫu vào đây
  workouts: sampleWorkouts,
  health: sampleHealth,
  goals: sampleGoals,
  exercises: sampleExercises,

  addWorkout: (w) =>
    set((s) => ({ workouts: [...s.workouts, w] })),
   updateWorkout: (w) =>
    set((s) => ({
      workouts: s.workouts.map((item) =>
        item.id === w.id ? w : item
      ),
    })),

  // 🔥 DELETE
  deleteWorkout: (id) =>
    set((s) => ({
      workouts: s.workouts.filter((w) => w.id !== id),
    })),
    updateHealth: (h) =>
  set((s) => ({
    health: s.health.map((item) =>
      item.id === h.id ? h : item
    ),
  })),

deleteHealth: (id) =>
  set((s) => ({
    health: s.health.filter((h) => h.id !== id),
  })),
  addHealth: (h) =>
  set((s) => ({ health: [...s.health, h] })),
updateGoal: (g) =>
  set((s) => ({
    goals: s.goals.map((item) =>
      item.id === g.id ? g : item
    ),
  })),

deleteGoal: (id) =>
  set((s) => ({
    goals: s.goals.filter((g) => g.id !== id),
  })),
  addGoal: (g) =>
  set((s) => ({ goals: [...s.goals, g] })),
  addExercise: (e) =>
  set((s) => ({ exercises: [...s.exercises, e] })),

updateExercise: (e) =>
  set((s) => ({
    exercises: s.exercises.map((item) =>
      item.id === e.id ? e : item
    ),
  })),

deleteExercise: (id) =>
  set((s) => ({
    exercises: s.exercises.filter((e) => e.id !== id),
  })),
}));

