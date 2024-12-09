import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { z } from "zod";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context";

// login Component
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { login } = useAuth();

  const navigate = useNavigate();
  const UserSchema = z.object({
    email: z
      .string()
      .regex(emailRegex, "Invalid email format")
      .email("Invalid email format"), // Custom error message
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password can be up to 10 characters only"), // Custom error messages
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = { email, password };
    console.log(import.meta.env.VITE_BACKEND_URL);
    try {
      UserSchema.parse(userData);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        }
      );
      console.log(response);

      if (response.ok) {
        alert("Registration Successful");
        setEmail("");
        setPassword("");
        login();
        navigate("/user/dashboard");
      } else {
        // const errorData = await response.json();
        alert("Invalid credentials");
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.map((err) => err.message).join(", ");
        setError(zodErrors); // Set error messages from Zod validation
      } else {
        console.log(error);
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-80 mx-auto mt-10">
      <p>Login User</p>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          className="border rounded p-2"
          required
        />
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="border rounded p-2"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}{" "}
            {/* Use Eye or EyeOff icon */}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </Button>
      </form>
    </div>
  );
};
