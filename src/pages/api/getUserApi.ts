import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const getUserApi = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email } = req.query;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        name: String(name),
        email: String(email),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kullanıcıyı döndür
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getUserApi;
