import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//Create New Task
const createTaskApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { newTask, id } = req.body;

  if (!newTask || !id) {
    return res.status(400).json({ message: "Task and id are required" });
  }

  try {
    const task = await prisma.task.create({
      data: {
        task: newTask,
        authorId: id,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createTaskApi;
