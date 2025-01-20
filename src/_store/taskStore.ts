import { Tasks } from "@/types/types";
import { create } from "zustand";

export const taskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks: any) => set({ tasks }), // Görevleri yüklemek için
  createTask: (task: Tasks) =>
    set((state: any) => ({ tasks: [...state.tasks, task] })), // Yeni görev ekle
  deleteTask: (id: string) =>
    set((state: any) => ({
      tasks: state.tasks.filter((task: any) => task.id !== id),
    })),
  updateTask: (id: string, updatedTask: string) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: any) =>
        task.id === id ? { ...task, task: updatedTask } : task
      ),
    })),
}));
