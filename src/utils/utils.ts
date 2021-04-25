// Here we store our utilities (types, helping functions, constans ...)
export const BASEURL = "https://6072d036e4e0160017ddeee8.mockapi.io/tasks";
export interface TodoType {
  description: Number;
  dueDate: string;
  id: string;
  status: boolean;
  title: string;
}

export const printDate = (date: string) => {
  return new Date(date);
};

export const isToday = (someDate: Date) => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const isDatesEqual = (d1: string, d2: string) => {
  const d1Date = new Date(d1);
  const d2Date = new Date(d2);
  return (
    d1Date.getDate() === d2Date.getDate() &&
    d1Date.getMonth() === d2Date.getMonth() &&
    d1Date.getFullYear() === d2Date.getFullYear()
  );
};

export const isInRange = (date: string, start: string, end: string) => {
  const d = new Date(date).toISOString().slice(0, 10);
  const from = new Date(start).toISOString().slice(0, 10);
  const to = new Date(end).toISOString().slice(0, 10);

  return d >= from && d <= to;
};
