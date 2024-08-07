import React, { useEffect, useState } from 'react';
import VehicleDescription from "./VehicleDescription";
import VehicleDetails from "./VehicleDetails";
import Chat from "./Chat";
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../api/api';
import BookNow from './BookNow';

const Details = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            try {
                const response = await getSingleProduct(id);
                setVehicle(response.data.product);
            } catch (error) {
                console.error('Error fetching vehicle details:', error);
            }
        };
        fetchVehicleDetails();
    }, [id]);

    if (!vehicle) return null; // Return null or a loading state if vehicle data is not yet fetched

    return (
        <>
            <VehicleDetails vehicle={vehicle} />
            {/* <BookNow id={vehicle._id} image={vehicle.productImage} /> */}
            <Chat />
        </>
    );
};

export default Details;
