import triangle from "../assets/triangle.svg";
import cycle from "../assets/cycle.svg";
import { Bell, Calendar, Plus, Star,X } from "lucide-react";
import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/deleteIcon.svg"
import { Calender } from "./Calendar";
import { addTodo } from "../redux/reducers/todoReducer";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,RootState } from "../store";
const [isImportant, setIsImportant] = useState<boolean>(false);
const [isCompleted, setIsCompleted] = useState<boolean>(false);

const Todo = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  

  const [viewListItem, setViewListItem] = useState<boolean>(false);
  const [todoMenu, setTodoMenu] = useState<boolean>(false);
  const [isDueDate,setIsDueDate] = useState<boolean>(false)
  const [isRepeat,setIsRepeat] = useState<boolean>(false)
    const [isReminder,setIsReminder] = useState<boolean>(false)
  const [setTitle, setSetTitle] = useState<string>("");

  // Set the state from localStorage on mount
  useEffect(() => {
    const storedViewListItem = localStorage.getItem("viewListItem");
    if (storedViewListItem) {
      setViewListItem(JSON.parse(storedViewListItem));
    }
  }, []);
  useEffect(() => {
    
  });
  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: setTitle,
      isCompleted: isCompleted,
      isImportant: isImportant,
      createdAt: new Date().toISOString(),
      dueDate: '',
      Repeat: isRepeat,
      notes: '',
    };
    dispatch(addTodo(newTodo));
  };
  console.log("todos,", todos);

    


  console.log("viewListItem", viewListItem);
  return (
    <div className="flex w-full  pl-6">
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
              onChange={(e) => setSetTitle(e.target.value)}
              type="text"
              placeholder="Add a Task"
              className="appearance-none border-none my-auto h-12 outline-none bg-transparent p-0 m-0 focus:ring-0 w-1/3 "
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2 mt-2 gap-x-6 p-2 pb-4">
                <Bell onClick={()=>setIsDueDate(!isDueDate)} className="size-6 cursor-pointer" />
                <img onClick={()=>setIsRepeat(!isRepeat)} className="size-6 cursor-pointer" src={cycle} alt="icon" />
                <Calendar onClick={()=>setIsReminder(isReminder)  } className="size-6 cursor-pointer hover:bg-gray-100 hover:rounded-full  focus-within:bg-gray-100" />
                    {isDueDate && <Calender />}
              </div>
              <button onClick={handleAddTodo} className="text-[#357937] bg-[#35793729] h-8 px-4  w-24 rounded-md  text-center  mx-2  ">
                Add Task
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-y-1">
          <div
            className={`grid  ${
              viewListItem ? "grid-cols-3 max-sm:grid-cols-2" : "grid-cols-1"
            } `}
          >
            <TodoCard setTodoMenu={setTodoMenu} todoMenu={todoMenu} />
          </div>
          <p className="text-lg font-medium text-gray-800 my-4">completed</p>
          <TodoCard />
        </div>
      </div>
      {todoMenu && <TodoMenu />}
    </div>
  );
};

export default Todo;
interface TodoCardProps {
  setTodoMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  todoMenu?: boolean;
}
export const TodoCard = ({ setTodoMenu, todoMenu }: TodoCardProps) => {

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(e.target.checked);
  };
  console.log(isCompleted);
  return (
    <div
      onClick={() => setTodoMenu && setTodoMenu(!todoMenu)}
      className="border-b border-[#142E159E] flex gap-x-4 items-center p-2 rounded-md w-full h-16"
    >
      <input
        onChange={handleCheckBox}
        checked={isCompleted}
        type="checkbox"
        className="accent-[#3D8D40] w-4 h-4"
      />
      <p
        className={`text-lg text-gray-800 font-medium ${
          isCompleted && "line-through"
        }`}
      >
        TaskName
      </p>
      <div
        onClick={() => setIsImportant(!isImportant)}
        className="cursor-pointer ml-auto"
      >
        {isImportant ? (
          <Star />
        ) : (
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
        )}
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

export const TodoMenu = () => {
  return (
    <div className="w-3/4 h-[92vh] flex flex-col bg-[#eef6ef] p-6 px-12 mt-4   ">
      <hr className="border-t-[0.5px] mt-1 border-b-gray-500" />
      <TodoCard />
      <div className="flex flex-col gap-y-5 mt-4">
        {TodoMenuData.map((data, index) => (
          <>
            <div key={index} className="flex items-center gap-2 gap-x-6 gap-y-4 p-2">
              {data.icon}
              <p>{data.name}</p>
            </div>
            <hr className="border-b-[0.5px] mt-1 border-b-gray-500" />
          </>
        ))}
        <div className="flex items-center gap-2 gap-x-6 gap-y-4 p-2">
          <img src={cycle} alt="icon" />
          <p>Repeat</p>
        </div>
          <hr className="border-b-[0.5px] mt-1 border-b-gray-500" />
      </div>
      <input
              type="text"
              placeholder="Add a Notes"
              className="appearance-none border-none  h-12 outline-none bg-transparent p-0 m-0 focus:ring-0 w-11/12 mx-auto mb-auto "
            />
            <hr className="border-t-[0.5px] mt-1 border-b-gray-500" />
            <div className="mt-auto flex w-full justify-between" >
                <X />
                <p>Created Today</p>
                <img className="size-6" src={deleteIcon} alt="icon" />


            </div>
    </div>
  );
};
