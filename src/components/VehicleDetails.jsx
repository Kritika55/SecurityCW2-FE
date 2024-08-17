import React, { useState, useEffect, useContext } from 'react';
import { FaMoneyBillWave, FaShippingFast, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../utils/user-context';
import { createBookingApi, getAllProducts } from '../api/api';
import Card from '../components/Card';

const VehicleDetails = ({ vehicle, setCartItemCount }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setRelatedProducts(res.data.products); // You might want to filter these based on the current vehicle
            })
            .catch((error) => {
                console.log(error);
            });
    }, [vehicle]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('You need to be logged in to make a booking.');
            navigate('/login');
            return;
        }

        const formData = {
            userId: user._id,
            productId: vehicle._id,
            productImage: vehicle.productImage,
            productName: vehicle.productName,
            productPrice: vehicle.productPrice,
            productQuantity: quantity,
        };

        try {
            const response = await createBookingApi(formData);

            if (response.data.success) {
                toast.success('Product added to Cart!');
                setCartItemCount((prevCount) => prevCount + 1);
                navigate("/reservation");
            } else {
                console.error('Error submitting reservation:', response.statusText);
                toast.error('Failed to submit reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting reservation:', error);
            toast.error('Failed to submit reservation. Please try again.');
        }
    };

    return (
        <div className="flex flex-col mt-10 mb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <img
                            src={`${vehicle?.productImage}`}
                            alt={vehicle?.productName}
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 md:ml-12">
                        <h1 className="text-5xl font-bold mb-4">{vehicle?.productName}</h1>
                        <hr className="border-t-2 border-black mb-4" />
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                                <FaMoneyBillWave className="text-2xl text-black mr-2" />
                                <p className="text-lg font-bold">Price: Rs. {vehicle?.productPrice} /-</p>
                            </div>
                            <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                                <FaShippingFast className="text-2xl text-black mr-2" />
                                <p className="text-lg font-bold">Delivery: Free</p>
                            </div>
                            <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                                <FaShieldAlt className="text-2xl text-black mr-2" />
                                <p className="text-lg font-bold">Warranty: 1 Year</p>
                            </div>
                            <div className="flex items-center p-4 border border-gray-300 rounded-lg">
                                <FaUndo className="text-2xl text-black mr-2" />
                                <p className="text-lg font-bold">Return: Within 30 Days</p>
                            </div>
                        </div>
                        <hr className="border-t-2 border-black mb-4" />
                        <p className="text-2xl mb-8">{vehicle?.productDescription}</p>
                        <div className="flex items-center mb-4">
                            <label htmlFor="quantity" className="mr-2">Quantity:</label>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-16 px-2 py-1 border rounded-md"
                                min="1"
                            />
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                <div className="flex overflow-x-scroll">
                    {relatedProducts.map((relatedProduct, index) => (
                        <div key={index} className="flex-shrink-0 w-64 mr-4">
                            <Card vehicle={relatedProduct} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
