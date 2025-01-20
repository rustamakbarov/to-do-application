"use client";

import React, { useEffect } from "react";
import { userStore } from "@/_store/userStore";
import Task from "@/_components/Task";
import { taskStore } from "@/_store/taskStore";

export default function TaskList() {
  const user = userStore((state) => state.user);
  const tasks = taskStore((state) => state.tasks);
  console.log(tasks);
  const setTasks = taskStore((state) => state.setTasks);

  useEffect(() => {
    async function getAllTasks() {
      const response = await fetch(`/api/getTasksApi?id=${user.id}`);

      if (!response.ok) {
        const data = await response.json();
        console.error(data.message);
      } else {
        const tasksFromApi = await response.json();
        setTasks(tasksFromApi);
      }
    }
    getAllTasks();
  }, [user.id, setTasks]);

  return (
    <ul className="tasks-list">
      {tasks.length === 0 ? (
        <p className="empty-list">Henüz listenizde bir görev yok</p>
      ) : (
        tasks.map((task, index) => (
          <li key={index} className="task-list-item">
            <Task task={task.task} id={task.id} />
          </li>
        ))
      )}
    </ul>
  );
}
