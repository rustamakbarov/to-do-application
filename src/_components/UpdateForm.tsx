"use client";

import { taskStore } from "@/_store/taskStore";
import { Open } from "@/types/types";
import React, { useState } from "react";

export default function UpdateForm({ id, task, setOpen }: Open) {
  const [updatedTask, setUpdatedTask] = useState("");
  const updateTask = taskStore((state: any) => state.updateTask);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (updatedTask.trim() === "") {
      alert("Lütfen geçerli bir görev girin!");
      return;
    }
    try {
      const response = await fetch(`/api/updateTaskApi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, updatedTask }),
      });

      // Eğer yanıt başarılıysa
      if (response.ok) {
        updateTask(id, updatedTask);
        setOpen((open) => !open);
      } else {
        // API yanıtı başarısız olduysa hata mesajı
        const error = await response.json();
        console.error("Güncelleme başarısız:", error.message);
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  }
  return (
    <div className="update-form-container">
      <form onSubmit={handleSubmit}>
        <p style={{ marginBottom: "12px" }}>
          Güncellemek istediğiniz task: {task}
        </p>
        <input
          type="text"
          placeholder="Güncellemek istediğiniz versiyonu giriniz"
          value={updatedTask}
          onChange={(e) => setUpdatedTask(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "green",
            color: "#fff",
            cursor: "pointer",
            marginLeft: "20px",
          }}
          type="submit"
        >
          Güncelle
        </button>
        <button
          className="close-button"
          onClick={() => setOpen((open) => !open)}
        >
          X
        </button>
      </form>
    </div>
  );
}
