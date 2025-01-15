import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useNavigate } from "react-router-dom";
import Todo from "./components/Todo";

const App = () => {
  const navigate = useNavigate();
 useEffect(() => {
  if(localStorage.getItem("isAuthenticated") === "false" || localStorage.getItem("isAuthenticated") === null || localStorage.getItem("isAuthenticated") === undefined || localStorage.getItem("users") === null){
    console.log("helloe")
    navigate("/")
  }
}, [navigate])

  const [isOpenSideBar, setIsOpenSideBar] = useState<boolean>(true);
  const userName = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")!)[0].name : "User";
  console.log(userName)
  // in phonescreen size sidebar should be closed by default


  window.addEventListener("resize", () => {
    if(window.innerWidth < 768){
      setIsOpenSideBar(false)
    }
  });



  return (
    <div>
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
