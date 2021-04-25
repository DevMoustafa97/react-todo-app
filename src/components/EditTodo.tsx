import { useState } from "react";
import { BASEURL } from "../utils/utils";

const EditTodo = (props: any) => {
  const { todo, update, hideForm } = props;

  // form values
  const [title, setTitle] = useState<any>(todo.title);
  const [description, setDescription] = useState<any>(todo.description);
  const [dueDate, setDueDate] = useState<any>(new Date());
  // current Date (to prevent making task with old date)
  const d = new Date();
  const dateFormat = d.toISOString().slice(0, 10);

  const updateTodo = (e: any) => {
    e.preventDefault();

    fetch(`${BASEURL}/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        dueDate: dueDate,
      }),
    })
      .then((res) => (res.ok ? res.json() : "Error:Faild to make new task"))
      .then((updatedTodo) => {
        update(updatedTodo);
        hideForm();
      });
  };

  return (
    <form
      onSubmit={(e) => {
        updateTodo(e);
      }}
      className="editTodo"
    >
      <label>Title</label>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        type="text"
        id="title"
        placeholder="Task title"
        required
      />
      <label>Description</label>
      <input
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
        type="text"
        id="description"
        placeholder="Some info about the task"
        required
      />
      <label>Date</label>
      <input
        onChange={(e) => {
          setDueDate(e.target.value);
        }}
        value={new Date(dueDate).toISOString().slice(0, 10)}
        type="date"
        id="date"
        min={dateFormat}
        required
      />
      <button>Update</button>
    </form>
  );
};

export default EditTodo;
