import { v4 as uuidv4 } from "uuid";
export let users = JSON.parse(
  localStorage.getItem("users") ||
    JSON.stringify([
      {
        userId: "adminUserId",
        userName: "admin",
        password: "admin",
        name: "Admin",
        email: "admin@gmail.com",
      },
    ])
);

export const addUser = (user) => {
  console.log("akshay add user", user);
  users.push({ ...user, id: uuidv4() });
  localStorage.setItem("users", JSON.stringify(users));
};

export let expense = JSON.parse(
  localStorage.getItem("expense") ||
    JSON.stringify([
      {
        id: "dummyUUid1",
        userId: "adminUserId",
        expense: "coffee",
        price: 200,
        desc: "hade a coffee at starbuks",
        createdOn: new Date(),
      },
      {
        id: "dummyUUid2",
        userId: "adminUserId",
        expense: "tea",
        price: 80,
        desc: "hade a tea at tea talks",
        createdOn: new Date(),
      },
      {
        id: "dummyUUid3",
        userId: "adminUserId",
        expense: "drink",
        price: 2000,
        desc: "hade a barardi at bar",
        createdOn: new Date(),
      },
      {
        id: "dummyUUid4",
        userId: "adminUserId",
        expense: "water",
        price: 20,
        desc: "hade a water at generale store",
        createdOn: new Date(),
      },
      {
        id: "dummyUUid5",
        userId: "adminUserId",
        expense: "coffee",
        price: 200,
        desc: "hade a coffee at starbuks",
        createdOn: new Date(),
      },
      {
        id: "dummyUUid6",
        userId: "adminUserId",
        expense: "tea",
        price: 80,
        desc: "hade a tea at tea talks",
        createdOn: new Date(),
      },
    ])
);

export const currentExpense = (userId) =>
  expense.filter((e) => e.userId === userId);

export const addExpense = (e) => {
  expense.push({ ...e, id: uuidv4() });
  localStorage.setItem("expense", JSON.stringify(expense));
};

export const deleteExpense = (e) => {
  expense = expense.filter((ex) => ex.id !== e.id);
  localStorage.setItem("expense", JSON.stringify(expense));
};

export const setDefaultData = () => {
  users = [
    {
      userId: "adminUserId",
      userName: "admin",
      password: "admin",
      name: "Admin",
      email: "admin@gmail.com",
    },
  ];
  expense = [
    {
      id: "dummyUUid1",
      userId: "adminUserId",
      expense: "coffee",
      price: 200,
      desc: "hade a coffee at starbuks",
      createdOn: new Date(),
    },
    {
      id: "dummyUUid2",
      userId: "adminUserId",
      expense: "tea",
      price: 80,
      desc: "hade a tea at tea talks",
      createdOn: new Date(),
    },
    {
      id: "dummyUUid3",
      userId: "adminUserId",
      expense: "drink",
      price: 2000,
      desc: "hade a barardi at bar",
      createdOn: new Date(),
    },
    {
      id: "dummyUUid4",
      userId: "adminUserId",
      expense: "water",
      price: 20,
      desc: "hade a water at generale store",
      createdOn: new Date(),
    },
    {
      id: "dummyUUid5",
      userId: "adminUserId",
      expense: "coffee",
      price: 200,
      desc: "hade a coffee at starbuks",
      createdOn: new Date(),
    },
    {
      id: "dummyUUid6",
      userId: "adminUserId",
      expense: "tea",
      price: 80,
      desc: "hade a tea at tea talks",
      createdOn: new Date(),
    },
  ];
};
