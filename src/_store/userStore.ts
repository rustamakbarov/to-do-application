import { User } from "@/types/types";
import { create } from "zustand";

export const userStore = create((set) => ({
  user: {
    name: "",
    email: "",
    id: "",
  },

  createUser: (newUser: User) =>
    set((state: object) => ({
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
      },
    })),
}));
