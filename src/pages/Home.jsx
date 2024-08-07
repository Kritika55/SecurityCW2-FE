import React from 'react';
import Hero from "../components/Hero";
import Vehicles from "../components/Vehicles";
import About from "../components/About";

const Home = () => {
    return (
        <div>
            <div className="h-screen">
                <Hero/>
            </div>
            <Vehicles/>
            <About/>
        </div>
    );
};

export default Home;