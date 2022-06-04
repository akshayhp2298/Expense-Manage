import { v4 as uuidv4 } from "uuid";
export let users = [
  {
    userName: "akshay",
    password: "password",
  },
];

export const addUser = (user) => {
  users.push({ ...user, id: uuidv4() });
};

export let expense = [
  {
    id: "dummyUUid1",
    expense: "coffee",
    price: 200,
    desc: "hade a coffee at starbuks",
    createdOn: new Date(),
  },
  {
    id: "dummyUUid2",
    expense: "tea",
    price: 80,
    desc: "hade a tea at tea talks",
    createdOn: new Date(),
  },
  {
    id: "dummyUUid3",
    expense: "drink",
    price: 2000,
    desc: "hade a barardi at bar",
    createdOn: new Date(),
  },
  {
    id: "dummyUUid4",
    expense: "water",
    price: 20,
    desc: "hade a water at generale store",
    createdOn: new Date(),
  },
  {
    id: "dummyUUid5",
    expense: "coffee",
    price: 200,
    desc: "hade a coffee at starbuks",
    createdOn: new Date(),
  },
  {
    id: "dummyUUid6",
    expense: "tea",
    price: 80,
    desc: "hade a tea at tea talks",
    createdOn: new Date(),
  },
];

export const addExpense = (e) => {
  expense.push({ ...e, id: uuidv4() });
};

export const deleteExpense = (e) => {
  expense = expense.filter((ex) => ex.id !== e.id);
};

export const importData = (data) => {
  users = data.users.length ? data.users : users;
  expense = data.expense.length ? data.expense : expense;
};

export const exportData = (from) => {
  console.log("akshay this is exported", from, expense.length);
  return {
    users,
    expense,
  };
};
