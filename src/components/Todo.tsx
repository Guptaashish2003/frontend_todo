import triangle from "../assets/triangle.svg";
import cycle from "../assets/cycle.svg";
import whitecycle from "../assets/whitecycle.svg";
import { Bell, Calendar, Plus, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg";
import { addTodo, deleteTodo, updateTodo } from "../redux/reducers/todoReducer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import { formatDate } from "../lib/utils";

export  interface Todo {
  userId:Number;
  id:number;
  title:string;
  isCompleted?:boolean;
  isImportant?:boolean;
  createdAt?:string;
  dueDate?:string;
  reminderDate?:string;
  Repeat?:boolean;
  notes?:string;

}
interface DarkModeProps {
  className?:string
  DarkMode?:boolean
  listView?:boolean
}

const Todo = ({className,DarkMode,listView}:DarkModeProps) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  // const {listView} = useSelector((state:RootState) => state.uiInputs)

  const dispatch = useDispatch<AppDispatch>();
  const [Title, setTitle] = useState<string>("");
  const [viewListItem, setViewListItem] = useState<boolean>(false);
  const [todoMenu, setTodoMenu] = useState<boolean>(false);
  const [isDueDate, setIsDueDate] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(false);
  const [selectTodo, setSelectTodo]= useState<Todo | null>(null);
  const [isReminder, setIsReminder] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const [reminderDate, setReminderDate] = useState<Date | null>(new Date());
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const userId = useSelector((state: RootState) => state.user.userId);
  const [userTodos, setUserTodos] = useState<any>([]);
  let completedTask:boolean = true
  const handleNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };
 
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDateSelection = (date: Date | null) => {
    setReminderDate(date);
    setIsReminder(false); // Close the calendar after selecting a date
  };
  const handleDueDateSelection = (date: Date | null) => {
    setDueDate(date);
    setIsDueDate(false); // Close the calendar after selecting a date
  }

  // Set the state from localStorage on mount
  useEffect(() => {
    const storedViewListItem = localStorage.getItem("viewListItem");
    if (storedViewListItem) {
      setViewListItem(JSON.parse(storedViewListItem));
    }
  }, []);
  useEffect(() => {
    if(todos){
      setUserTodos(todos.filter((todo: any) => todo.userId === userId));
    }
  }, [todos, userId]);

  const handleAddTodo = () => {
    const newTodo = {
      userId: userId,
      id: Date.now(),
      title: Title,
      isCompleted: false,
      isImportant: false,
      createdAt: new Date().toISOString(),
      dueDate: dueDate?.toISOString() || "",
      reminderDate: reminderDate?.toISOString() || "",
      Repeat: false,
      notes: "",
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setDueDate(new Date());
    setReminderDate(new Date());
    setIsRepeat(false);
    toast.success("Todo added successfully");
  };
  return (
    <div className={`flex w-full  pl-6 ${className}`}>
      <div className="w-full p-2 mr-10 text-[#142E159E]">
        <span className="flex gap-1 items-center">
          <p>Todo</p>
          <img className="mt-1" src={triangle} alt="icon" />
        </span>
        <section
          className=" h-72 w-full  rounded-lg mt-2 p-2"
          style={{
            background:
              "linear-gradient(0deg, rgba(53, 121, 55, 0.1) 0%, rgba(208, 255, 210, 0.1) 100%)",
          }}
        >
          <div className="flex flex-col  justify-evenly h-full">
            <input
              onChange={handleTitle}
              type="text"
              value={Title}
              required
              placeholder="Add a Task"
              className={`appearance-none border-none my-auto h-12 outline-none bg-transparent p-0 m-0 focus:ring-0 w-1/3 ${DarkMode?"text-white":""}`}
            />
            <div className="flex justify-between items-center relative">
              <div className="flex gap-2 mt-2 gap-x-6 p-2 pb-4">
                <Bell
                  color={DarkMode?"white":"black"}
                  onClick={() => setIsDueDate(!isDueDate)}
                  className={`size-6 cursor-pointer hover:bg-customGreen hover:text-white hover:rounded-full hover:p-1.5 focus:bg-customGreen ${
                    isDueDate ? "bg-customGreen text-white rounded-full size-8 p-1" : ""
                  }`}
                />
                {isDueDate && (
                  <div
                    className="absolute z-50 bg-white shadow-lg border rounded-md p-2"
                    style={{ top: "50px", left: "-40px" }}
                  >
                    <DatePicker
                      selected={reminderDate}
                      onChange={handleDueDateSelection}
                      inline
                    />
                  </div>
                )}
                <img
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`size-6 cursor-pointer hover:bg-customGreen hover:text-white hover:rounded-full hover:p-1.5 focus:bg-customGreen ${
                    isRepeat ? "bg-customGreen text-white rounded-full size-8 p-1" : ""
                  }`}
                  src={DarkMode?whitecycle:cycle}
                  alt="icon"
                  style={{
                    filter: DarkMode ? " white(100%) " : "none",
                  }}
                />
                <Calendar
                color={DarkMode?"white":"black"}
                  onClick={()=>setIsReminder((prev) => !prev)}
                  className={`size-6 cursor-pointer hover:bg-customGreen hover:text-white hover:rounded-full hover:p-1.5 focus:bg-customGreen ${
                    isReminder ? "bg-customGreen text-white rounded-full size-8 p-1" : ""
                  }`}
                />
                {isReminder && (
                  <div
                    className="absolute z-50 bg-white shadow-lg border rounded-md p-2"
                    style={{ top: "50px", left: "40px" }}
                  >
                    <DatePicker
                      selected={reminderDate}
                      onChange={handleDateSelection}
                      inline
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleAddTodo}
                className="text-[#357937] bg-[#35793729] h-8 px-4  w-24 rounded-md  text-center  mx-2  "
              >
                Add Task
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-y-1">
          <div
            className={`grid  ${
              listView ? "grid-cols-3 max-sm:grid-cols-2" : "grid-cols-1"
            } `}
          >
            {userTodos.map((todo: Todo, index: number) => (
              <div key={index} className={` grid w-[98%] ${viewListItem ? "col-span-4  " : "col-span-1"} `}>
                <TodoCard className={className} DarkMode={DarkMode}  setTodoMenu={setTodoMenu} setSelectTodo={setSelectTodo} todoMenu={todoMenu} userTodos={todo} />
              </div>

            ))}
          </div>
          <p className={`text-lg font-medium  my-4 ${DarkMode?"text-white":"text-gray-800"}`}>completed</p>
          {
            userTodos.map((todo: Todo, index: number) => (
              todo.isCompleted &&<div className="grid w-[98%] col-span-1">
                <TodoCard key={index} completedTask={completedTask}  userTodos={todo} DarkMode={DarkMode} className={className} />
              </div> 
            ))
          }
        </div>
      </div>
      {todoMenu && <TodoMenu className={className} notes={notes} handleNotes={handleNotes} setTodoMenu={setTodoMenu} selectTodo={selectTodo} todoMenu={todoMenu} DarkMode={DarkMode}  />}
      <ToastContainer/>
    </div>
  );
};

export default Todo;
interface TodoCardProps {
  setTodoMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  todoMenu?: boolean;
  userTodos?: Todo | null;
  completedTask?:boolean;
  setSelectTodo?: React.Dispatch<React.SetStateAction<Todo | null>>;
  className?:string
  DarkMode?:boolean

}
export const TodoCard = ({ setTodoMenu, todoMenu ,userTodos,completedTask,setSelectTodo,className,DarkMode}: TodoCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
    const updatedTodo: Todo = {
      ...userTodos,
      userId: userTodos?.userId || 0,
      id: userTodos?.id || Date.now(),
      title: userTodos?.title || "",
      isCompleted: e.target.checked,
      isImportant: userTodos?.isImportant || false,
      createdAt: userTodos?.createdAt || "",
      dueDate: userTodos?.dueDate || "",
      reminderDate: userTodos?.reminderDate || "",
      Repeat: userTodos?.Repeat || false,
      notes: userTodos?.notes || "",
    };
    // Dispatch the updated todo to the Redux store
    dispatch(updateTodo(updatedTodo));
    if(e.target.checked){
      toast.success("Todo completed successfully");
    }
    else{
      toast.success("Todo uncompleted ");
    }
  };
  const handleImportant = () => {
    setIsImportant((prev) => !prev);
    const updatedTodo: Todo = {
      userId: userTodos?.userId || 0,
      id: userTodos?.id || Date.now(),
      title: userTodos?.title || "",
      isCompleted: userTodos?.isCompleted || false,
      isImportant: !isImportant,
      createdAt: userTodos?.createdAt || "",
      dueDate: userTodos?.dueDate || "",
      reminderDate: userTodos?.reminderDate || "",
      Repeat: userTodos?.Repeat || false,
      notes: userTodos?.notes || "",
    };
    dispatch(updateTodo(updatedTodo));

  }
  const handleTodos = () => {
    if (userTodos !== undefined) {
      setSelectTodo && setSelectTodo(userTodos);
    }
    setTodoMenu && setTodoMenu(!todoMenu);
  }
  return (
    <div
      
      className={`border-b border-[#142E159E] mx-2 flex gap-x-4 items-center p-2 rounded-md w-full h-16 ${DarkMode?"text-white":""} ${className}`}
    >
      <input
        onChange={handleCheckBox}
        // checked={isCompleted}
        disabled={completedTask}
        defaultChecked={completedTask}
        type="checkbox"
        className="accent-[#3D8D40] cursor-pointer w-4 h-4"
      />
      <p
        onClick={handleTodos}
        className={`text-lg ${DarkMode?"text-white":"text-gray-800"} cursor-pointer font-medium ${
          completedTask ||isCompleted  ? "line-through":""
        }`}
      >
        {userTodos && userTodos?.title}
      </p>
      <div
        onClick={handleImportant}
        className="cursor-pointer ml-auto"
      >
        {isImportant ? (
          <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.4232 8.11812C21.3294 7.82986 21.1524 7.5758 20.9145 7.38795C20.6766 7.2001 20.3885 7.08686 20.0863 7.06249L14.5551 6.61624L12.4194 1.45155C12.3039 1.17013 12.1074 0.929412 11.8547 0.759996C11.6021 0.59058 11.3047 0.500122 11.0005 0.500122C10.6963 0.500122 10.399 0.59058 10.1463 0.759996C9.89369 0.929412 9.69712 1.17013 9.58163 1.45155L7.44788 6.6153L1.91381 7.06249C1.61117 7.08809 1.3228 7.20243 1.08485 7.39118C0.8469 7.57994 0.669943 7.83472 0.576151 8.12361C0.482359 8.41249 0.475904 8.72263 0.557593 9.01516C0.639283 9.3077 0.805485 9.56962 1.03538 9.76812L5.25413 13.4084L3.96881 18.8516C3.89693 19.1473 3.91453 19.4577 4.01938 19.7434C4.12423 20.0291 4.3116 20.2771 4.55771 20.4562C4.80382 20.6352 5.09757 20.737 5.40167 20.7488C5.70576 20.7605 6.0065 20.6817 6.26569 20.5222L11.0001 17.6084L15.7373 20.5222C15.9965 20.6798 16.2967 20.7571 16.5998 20.7445C16.903 20.7318 17.1956 20.6298 17.4409 20.4512C17.6861 20.2725 17.8731 20.0254 17.9782 19.7407C18.0832 19.4561 18.1017 19.1467 18.0313 18.8516L16.7413 13.4075L20.9601 9.76718C21.1918 9.56902 21.3595 9.30652 21.442 9.01296C21.5244 8.71939 21.5179 8.40796 21.4232 8.11812Z"
            fill="black"
          />
        </svg>
        ) : <Star/>}
      </div>
    </div>
  );
};

export const TodoMenuData = [
  {
    icon: <Plus />,
    name: "Add Step",
  },
  {
    icon: <Bell />,
    name: "Set Reminder",
  },
  {
    icon: <Calendar />,
    name: "Add due Date",
  },
];

interface TodoMenuProps {
  handleNotes: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setTodoMenu: React.Dispatch<React.SetStateAction<boolean>>;
  todoMenu: boolean;
  className?:string
  selectTodo: Todo | null;
  notes?: string;
  DarkMode?:boolean
}

export const TodoMenu = ({ handleNotes,setTodoMenu,todoMenu,selectTodo,className,DarkMode }: TodoMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = () => {
    if (selectTodo) {
      dispatch(deleteTodo(selectTodo.id));
      setTodoMenu && setTodoMenu(!todoMenu);
      toast.error("Todo deleted successfully");
    }
  };
  return (
    <div className={`w-3/4 h-[92vh] flex flex-col  p-6 px-12 mt-4 ${DarkMode?"bg-[#2c2c2c]":"bg-[#eef6ef]"}  ${className}`}>
      <hr className="border-t-[0.5px] mt-1 border-b-gray-500" />
      <TodoCard className={className} DarkMode={DarkMode} userTodos={selectTodo} />
      <div className="flex flex-col gap-y-5 mt-4">
        {TodoMenuData.map((data, index) => (
          <>
            <div
              key={index}
              className="flex items-center gap-2 gap-x-6 gap-y-4 p-2"
            >
              {data.icon}
              <p>{data.name}</p>
            </div>
            <hr className="border-b-[0.5px] mt-1 border-b-gray-500" />
          </>
        ))}
        <div className="flex items-center gap-2 gap-x-6 gap-y-4 p-2">
          <img src={DarkMode?whitecycle:cycle} alt="icon" />
          <p>Repeat</p>
        </div>
        <hr className="border-b-[0.5px] mt-1 border-b-gray-500" />
      </div>
      <input
        onChange={handleNotes}
        type="text"
        placeholder="Add a Notes"
        className="appearance-none border-none  h-12 outline-none bg-transparent p-0 m-0 focus:ring-0 w-11/12 mx-auto mb-auto "
      />
      <hr className="border-t-[0.5px] mt-1 border-b-gray-500" />
      <div className="mt-auto flex w-full justify-between">
        <X className="cursor-pointer" onClick={() => setTodoMenu && setTodoMenu(!todoMenu)} />
        <p>{ selectTodo?.createdAt ? formatDate(new Date(selectTodo.createdAt)) : "" }</p>
        <img onClick={handleDelete} className="size-6 cursor-pointer" src={deleteIcon} alt="icon" />
      </div>
    </div>
  );
};
