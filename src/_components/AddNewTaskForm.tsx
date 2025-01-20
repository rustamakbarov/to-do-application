"use client";

import React, { useState } from "react";
import { taskStore } from "@/_store/taskStore";
import { userStore } from "@/_store/userStore";

export default function AddNewTaskForm() {
  const [newTask, setTask] = useState<string>("");

  const createTask = taskStore((state: any) => state.createTask);
  const user = userStore((state: any) => state.user);
  const { id } = user;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (newTask.trim() === "") {
      alert("Lütfen geçerli bir görev girin!");
      return;
    }
    const response = await fetch("/api/createTaskApi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTask, id }),
    });

    if (response.ok) {
      const task = await response.json();
      createTask(task);
      setTask(" ");
    } else {
      console.error("Failed to create task:", await response.json());
    }
  }
  return (
    <form className="add-new-task-form" onSubmit={handleSubmit}>
      <input
        value={newTask}
        type="text"
        required
        placeholder="Yeni Görev Ekleyiniz..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
      />
      <button type="submit" className="add-new-task">
        Yeni Görev Ekle
      </button>
    </form>
  );
}
