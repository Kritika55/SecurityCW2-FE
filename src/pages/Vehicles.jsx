import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import {getAllProducts} from "../api/api";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllProducts().then((res) => {
          setVehicles(res.data.products);
        }).catch((error) => {
          console.log(error);  
        });
      }, []);



    return (
        <section className="container my-10 mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map((vehicle, index) => (
                    <Card key={index} vehicle={vehicle}/>
                ))}
            </div>
        </section>
    );
};

export default Vehicles;