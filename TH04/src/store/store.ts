import { Book, Decision, Diploma, FieldConfig } from "../models";

const load = (key: string) => JSON.parse(localStorage.getItem(key) || "[]");
const save = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const store = {
  books: load("books") as Book[],
  decisions: load("decisions") as Decision[],
  diplomas: load("diplomas") as Diploma[],
  fields: load("fields") as FieldConfig[],

  saveAll() {
    save("books", this.books);
    save("decisions", this.decisions);
    save("diplomas", this.diplomas);
    save("fields", this.fields);
  }
};