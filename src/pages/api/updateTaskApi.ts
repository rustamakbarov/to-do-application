import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

//Update Task
const updateTaskApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id, updatedTask } = req.body;

  if (id === undefined || updatedTask === undefined) {
    return res
      .status(400)
      .json({ message: "ID and updatedTask status are required" });
  }

  try {
    const task = await prisma.task.update({
      where: { id },
      data: {
        task: updatedTask,
      },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default updateTaskApi;
