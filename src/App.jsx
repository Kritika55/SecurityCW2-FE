import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import VehiclesPage from "./pages/Vehicles";
import Contact from "./pages/Contact";
import Chat from "./pages/AdminChat";
import Details from "./components/Details";
import ProfilePage from "./pages/Profile";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import AdminChat from "./pages/AdminChat";
import Forgetpsw from "./pages/Forgetpsw";
import ResetPassword from "./pages/ResetPsw";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/Myorders";
import ThankYou from "./pages/Thankyou";
import ReservationSummary from "./pages/Reservation";
import MyCart from "./pages/Mycart";
import AddToCart from "./pages/Addtocart";

function App() {
    return (
        <>
            <Navbar/>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/book-now/:id" element={<Details/>}/>
                <Route path="/register" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<Forgetpsw/>}/>
                <Route path="/reset-password/:id" element={<ResetPassword/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/vehicles" element={<VehiclesPage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/admin" element={<AdminDashboard/>}/>
                <Route path="/confirmed-order" element={<ThankYou/>}/>
                <Route path="/reservation" element={<ReservationSummary/>}/>
                <Route path="/my-orders" element={<MyBookings/>}/>
                <Route path="/admin/update/:id" element={<div>Admin Update</div>}/>
                <Route path="/admin/chat" element={<AdminChat/>}/>
                <Route path="/cart" element={<AddToCart/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
