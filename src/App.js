import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/App.css";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import ForgetPassword from "./pages/Forgetpsw";
import ResetPassword from "./pages/Resetpsw";
import HomeLayout from "./components/Homelayout.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the Login page without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Route for the homepage with Navbar */}
        <Route path="/home" element={<HomeLayout><Homepage /></HomeLayout>} />
      </Routes>

      {/* ToastContainer can be rendered globally */}
      <ToastContainer />
    </Router>
  );
}

export default App;
