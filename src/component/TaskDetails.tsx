// components/TaskDetails.js
const TaskDetails = () => {
  return (
    <div className="task-details">
      <h3>Buy groceries</h3>
      <div className="details-options">
        <button>Add Step</button>
        <button>Set Reminder</button>
        <button>Add Due Date</button>
        <button>Repeat</button>
      </div>
      <textarea placeholder="Add Notes"></textarea>
    </div>
  );
};

export default TaskDetails;
