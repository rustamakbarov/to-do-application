import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//Create New User
const createUserApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createUserApi;

// //Create New Task
// export async function createTask(newTask: string, authorId: string) {
//   const task = await prisma.task.create({
//     data: {
//       task: newTask,
//       authorId: authorId,
//     },
//   });

//   return task;
// }

// //Get Tasks
// export async function getTasks(userId: string) {
//   const tasks = await prisma.task.findMany({
//     where: {
//       authorId: userId,
//     },
//   });

//   return tasks;
// }

// //Delete Task
// export async function deleteTask(taskId: string) {
//   await prisma.task.delete({
//     where: {
//       id: taskId,
//     },
//   });
// }
