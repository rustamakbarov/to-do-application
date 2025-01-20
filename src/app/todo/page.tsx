import React from "react";
import AddNewTaskForm from "@/_components/AddNewTaskForm";
import TaskList from "@/_components/TaskList";

export default function todo() {
  return (
    <div className="home-container">
      <h3 style={{ textAlign: "center" }}>To Do List'e hoş geldiniz</h3>
      <div className="to-do-list-container">
        <TaskList />
        <AddNewTaskForm />
      </div>
    </div>
  );
}
