import { useState } from "react";
import { BASEURL } from "../utils/utils";

const AddTodo = (props: any) => {
  const { addTodo } = props;
  // form values
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [dueDate, setDueDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  // current Date (to prevent making task with old date)
  const d = new Date();
  const dateFormat = d.toISOString().slice(0, 10);

  const makeNewTodo = (e: any) => {
    e.preventDefault();

    fetch(BASEURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        dueDate: dueDate,
      }),
    })
      .then((res) => (res.ok ? res.json() : "Error:Faild to make new task"))
      .then((data) => {
        addTodo(data);
        // resetting form values (we do not reset the date value for better ux)
        setTitle("");
        setDescription("");
      });
  };

  return (
    <article className="block">
      <h2>Add Todo</h2>
      <form
        onSubmit={(e) => {
          makeNewTodo(e);
        }}
      >
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label>Date</label>
          <input
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
            value={dueDate}
            type="date"
            id="date"
            min={dateFormat}
            required
          />
        </div>
        <button>Create new Todo</button>
      </form>
    </article>
  );
};

export default AddTodo;
