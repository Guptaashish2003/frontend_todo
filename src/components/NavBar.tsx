import { Menu,Search,MoonStar,List } from "lucide-react";
import logo from "../assets/logo.svg";
import WinIcon from "../assets/WinIcon.svg"
import React, { useEffect } from "react";

interface NavBarProps {
    isOpenSideBar: boolean;
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>

}

const NavBar = ({isOpenSideBar,setIsOpenSideBar}:NavBarProps) => {
  const [viewListItem , setViewListItem] = React.useState<boolean>(false)
  console.log(viewListItem)
  const handleClick = () => {
    setViewListItem((prev) => ! prev)
  }
  useEffect(() => {
    localStorage.setItem("viewListItem", JSON.stringify(viewListItem))
  }, [viewListItem])


    
  return (
    <>
      <nav id="logo" className="flex items-center py-4 px-10 justify-between">
        <div className="flex gap-x-3">
          <Menu onClick={ ()=> setIsOpenSideBar(!isOpenSideBar) } />
          <span className="w-16">
            <img className="h-full w-full" src={logo} alt="quadB" />
          </span>
        </div>
        <div className="flex gap-x-3">
        <Search />
        <div className="cursor-pointer" onClick={handleClick } >{viewListItem?<img src={WinIcon} alt="menuoption" />:<List />}</div>
        <MoonStar />

        </div>
      </nav>
    </>
  );
};

export default NavBar;
