import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Todo from "./components/Todo";
import type { RootState } from "./store";
const App = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.user);
  const darkMode = useSelector((state:RootState) => state.uiInputs)

  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);
  const userName = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!)[0].name : "User";
  // in phonescreen size sidebar should be closed by default
  useEffect(() => {
    if(!isAuthenticated.authenticated && !localStorage.getItem("isAuthenticated")){
      navigate("/")
    }
    if(window.innerWidth < 768){
      setIsOpenSideBar(false)
    }
  },[])


  // window.addEventListener("resize", () => {
  //   if(window.innerWidth < 768){
  //     setIsOpenSideBar(false)
  //   }
  // });



  return (
    <div className="">
      <NavBar
        isOpenSideBar={isOpenSideBar}
        setIsOpenSideBar={setIsOpenSideBar}
      />
     <div className="flex">
     {isOpenSideBar && <SideBar userName={userName} />}
     <Todo />
     </div>
    </div>
  );
};

export default App;
