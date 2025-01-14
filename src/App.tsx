import Sidebar from "./component/SideBar";
import TaskList from "./component/TaskList";
import TaskDetails from "./component/TaskDetails";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <TaskList />
      <TaskDetails />
    </div>
  );
};

export default App;
