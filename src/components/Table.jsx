import React from "react";
import {Link} from "react-router-dom";

const Table = ({products, handleDelete}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {products.map((singleProduct) => (
                    <tr key={singleProduct._id} className="odd:bg-white even:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            <img
                                height={'40px'}
                                width={'40px'}
                                src={`${singleProduct.productImage}`}
                                alt=""
                            />
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {singleProduct.productName}
                        </th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            NPR.{singleProduct.productPrice}
                        </th>
                        <td className="px-6 py-4">
                            {singleProduct.productCategory}
                        </td>
                        <td className="px-6 py-4">
                            {singleProduct.productDescription}
                        </td>
                        <td className="px-6 py-4">
                            <div className="btn-group" role="group">
                                <Link to={`/admin/update/${singleProduct._id}`}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(singleProduct._id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;
