import "./todo.css";

// Todo list component

export const TodoList = ({ id, title, task, filterData }) => {
  return (
    <div className="todoItem">
      <div key={id}>
        <div className="title-text">{title}</div> <div> {task}</div>
      </div>

      <button
        onClick={() => {
          console.log(id, filterData);
          filterData(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
