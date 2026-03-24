export type FieldType = "string" | "number" | "date";

export interface FieldConfig {
  id: string;
  name: string;
  type: FieldType;
}

export interface Book {
  id: string;
  year: number;
  currentNumber: number;
}

export interface Decision {
  id: string;
  soQD: string;
  ngayBanHanh: string;
  trichYeu: string;
  bookId: string;
  searchCount: number;
}

export interface Diploma {
  id: string;
  soVaoSo: number;
  soHieu: string;
  msv: string;
  hoTen: string;
  ngaySinh: string;
  decisionId: string;
  extraData: Record<string, any>;
}
