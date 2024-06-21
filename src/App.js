import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import "../src/App.css";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpsw";
import ResetPassword from "./pages/Resetpsw";
import HomeLayout from "./components/Homelayout.js";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/home"
          element={
            <HomeLayout>
              <Homepage />
            </HomeLayout>
          }
        />

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
