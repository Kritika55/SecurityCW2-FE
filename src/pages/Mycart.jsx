import React from 'react';

const MyCart = ({ cartItems }) => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-5xl font-bold mb-10">My Cart</h1>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cartItems.map((item, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-lg">
                            <img
                                src={`${item.productImage}`}
                                alt={item.productName}
                                className="w-full h-48 object-cover mb-4 rounded-lg"
                            />
                            <h2 className="text-2xl font-bold mb-2">{item.productName}</h2>
                            <p className="text-lg mb-2">Price: Rs. {item.productPrice} /-</p>
                            <p className="text-lg mb-2">Quantity: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-2xl">Your cart is empty.</p>
            )}
        </div>
    );
};

export default MyCart;
