import { printDate, BASEURL } from "../utils/utils";
import EditTodo from "./EditTodo";
import { useState } from "react";

const Todo = (props: any) => {
  const { todo, delTodo, updateTodo } = props;
  const { id, title, dueDate, description, status } = todo;

  const [editFormToggle, setEditFormToggle] = useState<boolean>(false);

  // Each function making its own request to the server then update the state of the app
  const deleteTodo = (id: string) => {
    fetch(`${BASEURL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((deletedTodo) => {
        delTodo(deletedTodo.id);
      });
  };

  const toggleStatus = (id: string, status: string) => {
    fetch(`${BASEURL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: !status,
      }),
    })
      .then((res) => (res.ok ? res.json() : "Error:Faild to make new task"))
      .then((updatedTodo) => {
        updateTodo(updatedTodo);
      });
  };

  return (
    <article className="todo">
      <h2>{title}</h2>
      <div className="details">
        <p>
          {printDate(dueDate).getFullYear()} -{" "}
          {printDate(dueDate).getMonth() + 1} - {printDate(dueDate).getDate()}
        </p>
        <p>{description}</p>
        <p>Is Completed: {status ? "Yes!" : "No"}</p>
      </div>
      {editFormToggle && (
        <EditTodo
          todo={todo}
          update={updateTodo}
          hideForm={setEditFormToggle}
        />
      )}
      <button
        onClick={() => {
          toggleStatus(id, status);
        }}
      >
        Mark as {status ? "Incompleted" : "Completed"}
      </button>
      <button
        onClick={() => {
          setEditFormToggle(!editFormToggle);
        }}
      >
        {editFormToggle ? "Cancel" : "Edit"}
      </button>
      <button
        onClick={() => {
          deleteTodo(id);
        }}
        className="negative"
      >
        Delete
      </button>
    </article>
  );
};

export default Todo;
