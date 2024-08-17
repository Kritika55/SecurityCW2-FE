import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you import useNavigate
import { toast } from 'react-toastify'; 
import Hero from "../components/Hero";
import Vehicles from "../components/Vehicles";
import About from "../components/About";
import { checkSessionApi } from '../api/api'; 

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await checkSessionApi();
                if (!response.data.success) {
                    // Handle session expiration
                    toast.error('Session expired. Please log in again.');
                    navigate('/login');
                }
            } catch (error) {
                console.error('Session check failed', error);
            }
        };

        checkSession(); // Initial check when the component mounts

        const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Check every 15 minutes

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <div>
            <div className="h-screen">
                <Hero />
            </div>
            <Vehicles />
            <About />
        </div>
    );
};

export default Home;
