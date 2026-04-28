export const calcBMI = (w: number, hCm: number) => {
  const h = hCm / 100;
  return w / (h * h);
};

export const bmiTag = (bmi: number) => {
  if (bmi < 18.5) return { color: "blue", text: "Thiếu cân" };
  if (bmi < 25) return { color: "green", text: "Bình thường" };
  if (bmi < 30) return { color: "gold", text: "Thừa cân" };
  return { color: "red", text: "Béo phì" };
};