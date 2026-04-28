export type WorkoutType = "Cardio" | "Strength" | "Yoga" | "HIIT" | "Other";

export interface Workout {
  id: string;
  date: string;
  type: WorkoutType;
  duration: number;
  calories: number;
  note?: string;
  status: "completed" | "missed";
}

export interface HealthRecord {
  id: string;
  date: string;
  weight: number;
  height: number;
  heartRate: number;
  sleep: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  status: "active" | "done" | "cancel";
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  level: "easy" | "medium" | "hard";
  description: string;
  caloriesPerHour: number;
}