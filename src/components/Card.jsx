import React from 'react';
import {Link} from "react-router-dom";

const Card = ({vehicle}) => {


    return (
        <div
            className="max-w-lg flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow">
            <Link to="#" className=" w-full overflow-hidden">
                <img className="rounded-t-lg w-full object-cover overflow-hidden"
                     alt="Product Image"
                     src={`${vehicle.productImage}`}
                />
            </Link>
            <div className="p-5 mt-4">
                <Link to="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{vehicle.productName}</h5>
                </Link>
                <div>
                    <p className="mb-3 font-normal text-gray-700">Price: Rs.{vehicle.productPrice}</p>
                </div>
                <div className="flex gap-2 mt-5">
                    <Link to={`/book-now/${vehicle._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600">
                        View Description
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Card;
