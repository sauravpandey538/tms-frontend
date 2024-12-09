import React from "react";
import SideMenu from "./sidemenu";
import Navbar from "../landing-page/navigation";
import TaskCard from "./add-task";
import TaskCardList from "./tasks";
import Settings from "./settings";

interface ComponentNameProps {}

const Dashboard: React.FC<ComponentNameProps> = ({}) => {
  return (
    <div className=" flex flex-col">
      <Navbar />
      {/* sidemenu */}
      <div className="flex gap-5 dark:bg-gray-800">
        <SideMenu />
        {/* <TaskCard /> */}
        <TaskCardList />
      </div>
      <Settings />
    </div>
  );
};

export default Dashboard;
