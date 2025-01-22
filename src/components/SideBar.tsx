import { ClipboardList, Calendar, Star, Plus,Info } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";



interface SideBarProps {
  userName: string;
  className?:string;
  DarkMode?:boolean
}

const SideBar = ({ userName,className,DarkMode }: SideBarProps) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const totalTask = todos.length;
  const completedTask = todos.filter((todo) => todo.isCompleted).length;
  const completedTaskPercentage = (completedTask / totalTask) * 100;
  const inCompletedTaskPercentage = 100-completedTaskPercentage
  const [selectedDiv, setSelectedDiv] = useState<number | null>(null);
  const data = [
    { label: 'Pending', value: completedTaskPercentage, color: "#3F9142" },
    { label: 'Done', value: inCompletedTaskPercentage, color: "#142E15" },
  ];
  const userTask = [
    {
      taskIcon: <ClipboardList />,
      taskName: "All Tasks",
    },
    {
      taskIcon: <Calendar />,
      taskName: "Today",
    },
    {
      taskIcon: <Star />,
      taskName: "Important",
    },
    {
      taskIcon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill={DarkMode?"white":"black"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.25 6.93341C23.25 6.63341 23.1 6.40841 22.875 6.25841L17.625 3.25841C17.475 3.18341 17.4 3.18341 17.25 3.18341C17.1 3.18341 17.025 3.18341 16.875 3.25841L12 6.03341L7.125 3.25841C6.975 3.18341 6.9 3.18341 6.75 3.18341C6.6 3.18341 6.525 3.18341 6.375 3.25841L1.125 6.25841C0.9 6.40841 0.75 6.63341 0.75 6.93341V21.9334C0.75 22.3834 1.05 22.6834 1.5 22.6834C1.65 22.6834 1.725 22.6084 1.875 22.6084L6.75 19.8334L11.625 22.6084C11.775 22.6834 11.85 22.6834 12 22.6834C12.15 22.6834 12.225 22.6834 12.375 22.6084L17.25 19.8334L22.125 22.6084C22.2 22.6834 22.35 22.6834 22.5 22.6834C22.95 22.6834 23.25 22.3834 23.25 21.9334V6.93341ZM2.25 7.38341L6 5.20841V18.4834L2.25 20.6584V7.38341ZM11.25 20.6584L7.5 18.4834V5.20841L11.25 7.38341V20.6584ZM16.5 18.4834L12.75 20.6584V7.38341L16.5 5.20841V18.4834ZM18 18.4834V5.20841L21.75 7.38341V20.6584L18 18.4834Z"
          
          />
        </svg>
      ),
      taskName: "Planned",
    },
    {
      taskIcon: (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill={DarkMode?"white":"black"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.25 6.93341C23.25 6.63341 23.1 6.40841 22.875 6.25841L17.625 3.25841C17.475 3.18341 17.4 3.18341 17.25 3.18341C17.1 3.18341 17.025 3.18341 16.875 3.25841L12 6.03341L7.125 3.25841C6.975 3.18341 6.9 3.18341 6.75 3.18341C6.6 3.18341 6.525 3.18341 6.375 3.25841L1.125 6.25841C0.9 6.40841 0.75 6.63341 0.75 6.93341V21.9334C0.75 22.3834 1.05 22.6834 1.5 22.6834C1.65 22.6834 1.725 22.6084 1.875 22.6084L6.75 19.8334L11.625 22.6084C11.775 22.6834 11.85 22.6834 12 22.6834C12.15 22.6834 12.225 22.6834 12.375 22.6084L17.25 19.8334L22.125 22.6084C22.2 22.6834 22.35 22.6834 22.5 22.6834C22.95 22.6834 23.25 22.3834 23.25 21.9334V6.93341ZM2.25 7.38341L6 5.20841V18.4834L2.25 20.6584V7.38341ZM11.25 20.6584L7.5 18.4834V5.20841L11.25 7.38341V20.6584ZM16.5 18.4834L12.75 20.6584V7.38341L16.5 5.20841V18.4834ZM18 18.4834V5.20841L21.75 7.38341V20.6584L18 18.4834Z"
          />
        </svg>
      ),
      taskName: "Assigned to me",
    },
  ];

  return (
    <div className={`h-screen z-20 w-1/5 ml-10 min-w-80 lg:mt-24 md:mt-16 flex flex-col gap-y-3  ${DarkMode?"bg-[#2C2C2C]":"bg-[#EEF6EF]"} ${className}`}>
      <div className=" md:size-20 lg:size-32 mx-auto relative md:bottom-10 lg:bottom-16">
        <img
          className="w-full h-full rounded-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="user"
        />
      </div>

      <div className="relative lg:top-[-65px] flex flex-col gap-y-3">
        <div className="text-center my-3">
          <p className="text-base font-semibold">{userName}</p>
        </div>

        <div className={`mx-5 ${DarkMode?"bg-[#232323]":"bg-[#FBFDFC]"} h-72 flex flex-col gap-y-2  py-2 `}>
          {userTask.map((task, index) => (
            <div
              onClick={() => setSelectedDiv(index)}
              className={`flex items-center cursor-pointer ${DarkMode?"hover:bg-[#35793729] hover:text-[#98E19B]":"hover:bg-[#EEF6EF] hover:text-[#357937]"} mx-1 rounded-sm hover:mt-1 gap-x-4 gap-y-3 px-4 py-2 ${
                selectedDiv === index ? "bg-[#EEF6EF] text-[#357937]" : ""
              }`}
            >
              {task.taskIcon}
              <span>{task.taskName}</span>
            </div>
          ))}
        </div>
        <div className={`mx-5 ${DarkMode?"!bg-[#232323]":"bg-[#FBFDFC]"} h-16 py-2 cursor-pointer flex gap-x-5 items-center  px-4 ${className} `}>
          <Plus fill={DarkMode?"balck":"white"} />
          <p>Add List</p>
        </div>
        <div className={`mx-5 ${DarkMode?"!bg-[#232323]":"bg-[#FBFDFC]"} h-[21rem] py-2   gap-x-5   px-4 ${className} `}>
          <div className="flex justify-between py-4 w-full">
            <span>
            <p> Today Tasks</p>
            <p>{totalTask}</p>
            </span>
            <Info width={20} height={20} color="#BDBDBD" className="cursor-pointer mt-2" />
          </div>
          <hr className="text-[#BDBDBD] border-[1px]" />
          <div>
          <PieChart data={data} DarkMode={DarkMode} />
          </div>
         <div className="flex  gap-x-3 items-center mt-4">
         <span className="flex gap-x-3 items-center ">
            <hr className="size-2 bg-[#3F9142] rounded-full "  />
          <p>Pending</p>
          </span>
         <span className="flex gap-x-3  items-center">
            <hr className="size-2 bg-[#142E15] rounded-full"  />
          <p>Done</p>
          </span>
         </div>
        
        </div>
      </div>
    </div>
  );
};

export default SideBar;



 interface PieChartProps {
   data: { label: string; value: number; color: string }[];
   DarkMode?:boolean
 }
 
export const PieChart: React.FC<PieChartProps> = ({ data,DarkMode }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Convert data into "arc" information
  const calculateArcs = (data: { value: number; color: string }[]) => {
    let cumulativePercentage = 0;

    return data.map((item) => {
      const startAngle = cumulativePercentage * 360; // starting angle
      const endAngle = (cumulativePercentage + item.value / total) * 360; // ending angle
      cumulativePercentage += item.value / total;

      return {
        ...item,
        startAngle,
        endAngle,
      };
    });
  };

  const arcs = calculateArcs(data);

  // Create an SVG Path for each arc
  const renderArcs = () =>
    arcs.map((arc, index) => {
      const { startAngle, endAngle, color } = arc;

      // Convert polar to cartesian
      const polarToCartesian = (angle: number) => {
        const radians = (angle * Math.PI) / 180;
        const x = Math.cos(radians) * 50 + 50; // radius 50, center (50,50)
        const y = Math.sin(radians) * 50 + 50;
        return { x, y };
      };

      const start = polarToCartesian(startAngle);
      const end = polarToCartesian(endAngle);

      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

      const pathData = [
        `M ${start.x} ${start.y}`, // Move to start
        `A 50 50 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, // Arc
        `L 50 50`, // Line to center
        `Z`, // Close path
      ].join(' ');

      return (
        <path
          key={index}
          d={pathData}
          fill={color}
          stroke="none"
          strokeWidth="1"
        />
      );
    });

  return (
    <div style={{ width: '200px', height: '200px', position: 'relative',rotate: '40deg' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        {renderArcs()}
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: DarkMode?"#232323":"#FBFDFC",
          
          borderRadius: '50%',
        }}
      ></div>
    </div>
  );
};
