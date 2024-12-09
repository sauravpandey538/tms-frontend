import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  authState: "loading" | "authenticated" | "unauthenticated";
  login: () => void;
  logout: () => void;
  email: string;
  dueDateAfter1Day: any[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setIsAuthenticated] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [email, setEmail] = useState("");
  const [dueDateAfter1Day, setDueDateAfter1Day] = useState([]);
  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated("authenticated");
        setEmail(data.email);
        setDueDateAfter1Day(data.taskIds);
        console.log("User is verified");
      } else {
        setIsAuthenticated("unauthenticated");
      }
    };

    checkUser();
  }, []);

  const login = () => {
    setIsAuthenticated("authenticated");
  };

  const logout = () => {
    document.cookie = "auth_token=; Max-Age=0; path=/";
    setIsAuthenticated("unauthenticated");
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, logout, email, dueDateAfter1Day }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
