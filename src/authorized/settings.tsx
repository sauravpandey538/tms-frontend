import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { updateDetails } from "../api";
import { useAuth } from "../auth/auth-context";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { email } = useAuth();
  const handleSave = async () => {
    const data = {
      oldPassword,
      newPassword,
      email,
    };

    const response = await updateDetails(data);
    if (response) {
      alert("Success");
    } else {
      alert("Error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center flex-1 w-[90%] items-center rounded-lg shadow-md dark:bg-gray-800 min-h-screen">
      <div className="mx-auto p-6 space-y-6 bg-white dark:bg-gray-600 dark:text-white">
        <h2 className="text-2xl font-semibold ">Settings</h2>

        {/* Email Section */}
        <div className="flex items-center space-x-4 my-4 max-w-fit">
          <Label htmlFor="email" className="w-1/3">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            value={email}
            placeholder="Enter email address"
            className="w-3/4" // Increase the width of the input
            readOnly
          />
        </div>

        {/* Old Password Section */}
        <div className="flex items-center space-x-4 my-4">
          <Label htmlFor="oldPassword" className="w-1/3">
            Old Password
          </Label>
          <div className="relative w-3/4">
            {" "}
            {/* Increase width here */}
            <Input
              type={showPassword ? "text" : "password"}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        {/* New Password Section */}
        <div className="flex items-center space-x-4 my-4">
          <Label htmlFor="newPassword" className="w-1/3">
            New Password
          </Label>
          <div className="relative w-3/4">
            {" "}
            {/* Increase width here */}
            <Input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="bg-blue-500 text-white mt-4 w-full hover:bg-blue-400 hover:text-white"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
