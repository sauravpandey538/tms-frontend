import "./App.css";
import { AuthProvider } from "./auth/auth-context";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Hero from "./landing-page/hero";
import Features from "./landing-page/features";
import Settings from "./authorized/settings";
import ProtectedRoute from "./auth/protectedRoutes";
import TaskCard from "./authorized/add-task";
import SideMenu from "./authorized/sidemenu";
import TaskCardList from "./authorized/tasks";
import { Login } from "./auth/login";
import { Register } from "./auth/register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div>
                    <Hero />
                    <Features />
                  </div>
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <div className="flex ">
                    <SideMenu />
                    <TaskCardList />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/add-task"
              element={
                <ProtectedRoute>
                  <div className="flex ">
                    <SideMenu />
                    <TaskCard />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/settings"
              element={
                <ProtectedRoute>
                  <div className="flex ">
                    <SideMenu />
                    <Settings />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
