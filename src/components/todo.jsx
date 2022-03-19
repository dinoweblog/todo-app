import { useEffect } from "react";
import { useState } from "react";
import load from "../images/loading-gif.png";
import { TodoList } from "./todoList";
import "./todo.css";

export const Todo = () => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 2;

  useEffect(() => {
    getData();
  }, [page]);

  const filterData = (id) => {
    console.log(id);
    const newData = todos.filter((todo) => {
      return todo.id !== id;
    });
    console.log(newData);
    setTodos(newData);
  };

  const getData = () => {
    fetch(
      `https://employees-dino-app.herokuapp.com/todos?_page=${page}&_limit=${limit}`
    )
      .then((d) => d.json())
      .then((res) => {
        setTodos(res);
        setLoading(false);
      });
  };

  return loading ? (
    <div className="load-gif">
      <img src={load} />
    </div>
  ) : (
    <div>
      <div className="input-box-div">
        <input
          className="title"
          placeholder="Title.."
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="task"
          placeholder="Add Task.."
          type="text"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          className="add"
          onClick={() => {
            const data = { status: false, title: title, task: task };
            fetch("https://employees-dino-app.herokuapp.com/todos", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
              },
            }).then(getData);
          }}
        >
          Add
        </button>
      </div>
      <div className="todo-list-div">
        {todos.map((e) => (
          <TodoList
            id={e.id}
            title={e.title}
            task={e.task}
            filterData={filterData}
          />
        ))}
      </div>
      <div>
        <button
          className="prev"
          onClick={() => {
            page > 1 ? setPage(page - 1) : setPage(page);
          }}
        >
          Prev
        </button>
        <button
          className="next"
          onClick={() => {
            todos.length > 1 ? setPage(page + 1) : setPage(page);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
