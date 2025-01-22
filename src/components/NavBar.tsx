import { Menu,Search,MoonStar,List, Sun } from "lucide-react";
import logo from "../assets/logo.svg";
import WinIcon from "../assets/WinIcon.svg"
import whiteWIn from "../assets/whiteWIn.svg"
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface NavBarProps {
    isOpenSideBar: boolean;
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>
    className?:string

}

const NavBar = ({isOpenSideBar,setIsOpenSideBar,className}:NavBarProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const [viewListItem , setViewListItem] = React.useState<boolean>(false)
  const [darkMode , setDarkMode]= React.useState<boolean>(false)
  const handleClick = () => {
    setViewListItem((prev) => {
      const newValue = !prev; // Calculate new state
      dispatch({ type: "LIST_VIEW", payload: { listView: newValue } }); // Dispatch new value
      return newValue;
    });
  };

  // Handle Dark Mode Toggle
  const handleChangeMode = () => {
    setDarkMode((prev) => {
      const newValue = !prev; // Calculate new state
      dispatch({ type: "DARK_MODE", payload: { DarkMode: newValue } }); // Dispatch new value
      return newValue;
    });
  };
  useEffect(() => {
    localStorage.setItem("viewListItem", JSON.stringify(viewListItem))
  }, [viewListItem])


    
  return (
    <>
      <nav id="logo" className={`flex items-center py-4 px-10 justify-between ${className}`}>
        <div className="flex gap-x-3">
          <Menu onClick={ ()=> setIsOpenSideBar(!isOpenSideBar) } />
          <span className="w-16">
            <img className="h-full w-full" src={logo} alt="quadB" />
          </span>
        </div>
        <div className="flex gap-x-3">
        <Search />
        <div className="cursor-pointer" onClick={handleClick } >{viewListItem?<img src={darkMode?whiteWIn:WinIcon} alt="menuoption" />:<List />}</div>
        <span className="cursor-pointer" onClick={handleChangeMode}> 
        {darkMode?<Sun />:<MoonStar/>}
        </span>

        </div>
      </nav>
    </>
  );
};

export default NavBar;
