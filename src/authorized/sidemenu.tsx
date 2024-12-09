import React from "react";
import { Button } from "../components/ui/button"; // Assuming you are using ShadCN Button
import Logo from "../landing-page/logo";
import { ReusableAlertDialog } from "../reuse/alertDialogue";
import { useAuth } from "../auth/auth-context";

const SideMenu: React.FC = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className=" hidden lg:flex w-80 h-screen bg-gray-100 text-black dark:bg-gray-800 dark:text-white  flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8">
        <Logo />
      </div>

      {/* Menu Buttons */}
      <div className="flex flex-col space-y-4 ">
        <Button
          variant="outline"
          className=" hover:bg-gray-600 hover:text-white"
        >
          <a href="/user/dashboard" className="w-full text-left px-4 py-2">
            Dashboard
          </a>
        </Button>

        <Button
          variant="outline"
          className=" hover:bg-gray-600 hover:text-white"
        >
          <a href="/user/add-task" className="w-full text-left px-4 py-2">
            Add Task
          </a>
        </Button>

        <Button
          variant="outline"
          className=" hover:bg-gray-600 hover:text-white"
        >
          <a href="/user/settings" className="w-full text-left px-4 py-2">
            Settings
          </a>
        </Button>
        <ReusableAlertDialog
          title="Logout Account"
          description="Are you sure you want to logout your account? This action cannot be undone."
          buttonNames={{ cancel: "Cancel", action: "Logout" }}
          onCancel={() => {}}
          onConfirm={handleLogout}
          triggerButtonLabel="Logout"
          classNames="text-white bg-red-500 hover:text-white hover:bg-red-400" // Optional class for styling the trigger button
        />
      </div>
    </div>
  );
};

export default SideMenu;
