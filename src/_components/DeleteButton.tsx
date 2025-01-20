"use client";

import { taskStore } from "@/_store/taskStore";
import { ID } from "@/types/types";
import React from "react";

export default function DeleteButton({ id }: ID) {
  const deleteTask = taskStore((state: any) => state.deleteTask);
  async function handleClick() {
    try {
      const response = await fetch("/api/deleteTaskApi", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      if (response.status === 204) {
        console.log("Task deleted successfully");
        deleteTask(id);
      } else {
        const data = await response.json();
        console.error("Error deleting task:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash3-fill"
        viewBox="0 0 16 16"
        onClick={handleClick}
      >
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
      </svg>
    </div>
  );
}
