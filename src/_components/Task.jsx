import React from "react";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

export default function Task({ task, id }) {
  return (
    <>
      <p>{task}</p>
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <UpdateButton id={id} task={task} />
        <DeleteButton id={id} />
      </span>
    </>
  );
}
