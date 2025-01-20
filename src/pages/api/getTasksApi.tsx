import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getTasksApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        authorId: String(id),
      },
    });

    // if ((tasks.length === 0)) {
    //   return res.status(404).json({ message: "Task not found" });
    // }

    // Taskları döndür
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getTasksApi;
