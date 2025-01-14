// components/TaskList.js


const TaskList = () => {
  const tasks = [
    { id: 1, name: "Buy groceries", starred: true },
    { id: 2, name: "Finish project report", starred: false },
    { id: 3, name: "Call the bank", starred: false },
    { id: 4, name: "Schedule dentist appointment", starred: false },
    { id: 5, name: "Plan weekend trip", starred: true },
    { id: 6, name: "Read a book", completed: true },
  ];

  return (
    <div className="task-list">
      <h2>To Do</h2>
      <button className="add-task-btn">Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <input type="checkbox" defaultChecked={task.completed} />
            {task.name}
            {task.starred && <span className="star">★</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
