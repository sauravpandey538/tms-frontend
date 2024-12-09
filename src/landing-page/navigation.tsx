import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { useAuth } from "../auth/auth-context";
import {
  FaCog,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaTasks,
  FaUserPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { VscThreeBars } from "react-icons/vsc";

const Navbar: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { authState, logout } = useAuth();
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const mobileButtons =
    authState === "authenticated"
      ? [
          { title: "Dashboard", to: "/user/dashboard", icon: <FaHome /> },
          { title: "Add Task", to: "/user/add-task", icon: <FaTasks /> },
          { title: "Settings", to: "/user/settings", icon: <FaCog /> },
          { title: "Logout", to: "/", icon: <FaSignOutAlt />, onClick: logout },
        ]
      : [
          { title: "Login", to: "/login", icon: <FaSignInAlt /> },
          { title: "Sign Up", to: "/register", icon: <FaUserPlus /> },
        ];
  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 w-100vw">
      <div className="text-xl font-bold text-gray-800 dark:text-white">
        <a href="/">TaskMaster</a>
      </div>

      {/* for laptops */}
      <div className="hidden lg:flex gap-5 ">
        {authState === "authenticated" ? (
          <Button
            variant="outline"
            className="text-white bg-red-500 hover:text-white hover:bg-red-400 rounded"
            onClick={() => logout()}
          >
            <a>Logout</a>
          </Button>
        ) : (
          <div className="space-x-4 ">
            {/* Use ShadCN Button for "Login" */}
            <Button variant="outline" className="text-gray-800 dark:text-white">
              <a href="/login">Login</a>
            </Button>

            {/* Use ShadCN Button for "Sign Up" with custom colors */}
            <Button className="bg-green-500 text-white hover:bg-green-600">
              <a href="/register">Sign Up</a>
            </Button>
          </div>
        )}
        <Button
          onClick={toggleDarkMode}
          className={`${darkMode ? "text-gray-200" : "text-gray-600"}`}
        >
          {" "}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      {/* for mobile */}
      <div className="block lg:hidden">
        <Button
          size={"icon"}
          onClick={() => setOpenSideMenu((prev) => !prev)}
          className=" text-black dark:text-white"
        >
          <VscThreeBars />
        </Button>
        <AnimatePresence>
          {openSideMenu && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 right-0 bg-white dark:bg-gray-800 border shadow-lg p-4 max-w-60 space-y-4"
            >
              {mobileButtons.map((button, index) => (
                <Button
                  key={index}
                  onClick={button.onClick || undefined}
                  className="flex w-full items-center space-x-2 text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded px-4 py-2"
                >
                  <span className="text-lg">{button.icon}</span>
                  <a href={button.to} className="text-sm">
                    {button.title}
                  </a>
                </Button>
              ))}
              <Button
                onClick={toggleDarkMode}
                className={`w-full mt-4 ${
                  darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
