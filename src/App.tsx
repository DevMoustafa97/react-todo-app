import { useEffect, useState } from "react";
import "./App.css";
import { BASEURL, TodoType, isToday } from "./utils/utils";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import FilterTodos from "./components/FilterTodos";

function App() {
  // initializing our state and give them initial values

  // IMPORTANT: tasks stored in two different pices of state to facilitate filtering process 
  // and keep the original todos reflects what exactly in the server

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [renderTodayTodos, setRenderTodayTodos] = useState<boolean>(true);
  const [viewCompleted, setViewCompleted] = useState<boolean>(false);
  const [filtered, setFiltered] = useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = useState<TodoType[]>([]);

  // functions that update the state (we call them after we update tasks in the server)
  const addTodo = (todo: TodoType) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const newFilteredTodos = filteredTodos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    setFilteredTodos(newFilteredTodos);
  };

  const updateTodo = (updatedTodo: any) => {
    const updatedTodoIndex = todos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );
    const updatedFilterTodoIndex = filteredTodos.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    const newTodos = [...todos];
    const newFilterdTodos = [...filteredTodos];

    newTodos[updatedTodoIndex] = updatedTodo;
    newFilterdTodos[updatedFilterTodoIndex] = updatedTodo;

    setTodos(newTodos);
    setFilteredTodos(newFilterdTodos);
  };

  // Our initial call to the server to get all tasks and store them 
  useEffect(() => {
    fetch(`${BASEURL}`)
      .then((res) => res.json())
      .then((data: TodoType[]) => {
        setTodos(data);
      });
  }, []);


  // The following function return jsx and it manages the renderd components
  const renderTodos = (todos: TodoType[]) => {
    return todos ? (
      todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            delTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        );
      })
    ) : (
      <p>Loading</p>
    );
  };

  const renderTodyaTodos = (todos: TodoType[]) => {
    let length = 0;
    const todayTodos = todos ? (
      todos
        .filter((todo) => isToday(new Date(todo.dueDate)))
        .map((todo) => {
          length++;
          return (
            <Todo
              todo={todo}
              key={todo.id}
              delTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          );
        })
    ) : (
      <p>Loading</p>
    );

    return length ? todayTodos : <p>No todos,Yet</p>;
  };

  const getCompletedTasks = () => {
    const completed = todos
      .filter((todo) => todo.status)
      .map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            delTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        );
      });

    return completed;
  };

  const renderFilterdTodos = (todos: TodoType[]) => {
    const newTodos = todos.map((todo) => {
      return (
        <Todo
          todo={todo}
          key={todo.id}
          delTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      );
    });

    return newTodos;
  };

  // The only function that uses rendering functions conditionally to render them
  const viewTodos = () => {
    if (filtered) {
      return filteredTodos.length ? (
        renderFilterdTodos(filteredTodos)
      ) : (
        <p>No todos found</p>
      );
    }

    if (viewCompleted) {
      return getCompletedTasks();
    } else {
      return renderTodayTodos ? renderTodyaTodos(todos!) : renderTodos(todos!);
    }
  };

  return (
    <div className="App">
      <h1>Simple Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <FilterTodos
        todos={todos}
        setFilteredTodos={setFilteredTodos}
        filtered={filtered}
        setFiltered={setFiltered}
      />
      {!filtered && (
        <div className="controls">
          {!viewCompleted && (
            <button
              onClick={() => {
                setRenderTodayTodos(!renderTodayTodos);
              }}
            >
              {renderTodayTodos ? "View All Tasks" : "View Today Tasks"}
            </button>
          )}
          <button
            onClick={() => {
              setViewCompleted(!viewCompleted);
            }}
          >
            {viewCompleted ? "back" : "View Completed"}
          </button>
        </div>
      )}
      <main>
        <div className="title">
          {filtered && <p>Filter applied</p>}
          {renderTodayTodos && !viewCompleted && !filtered && (
            <p>Today tasks:</p>
          )}
          {!renderTodayTodos && !viewCompleted && !filtered && (
            <p>All tasks:</p>
          )}
          {viewCompleted && !filtered && <p>Completed tasks</p>}
        </div>
        {viewTodos()}
      </main>
    </div>
  );
}

export default App;
