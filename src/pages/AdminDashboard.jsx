import React, {useState, useEffect} from 'react';
import {createProductApi, deleteProduct, getAllProducts} from '../api/api';
import {toast} from 'react-toastify';
import Table from "../components/Table";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getAllProducts()
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setProductImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };


    const handleDelete = (id) => {
        const confirmDialog = window.confirm("Are you sure you want to delete?");
        if (confirmDialog) {
            deleteProduct(id)
                .then((res) => {
                    if (res.status === 201) {
                        toast.success(res.data.message);
                        setProducts(products.filter(product => product._id !== id));
                    }
                })
                .catch((error) => {
                    if (error.response.status === 500) {
                        toast.error(error.response.data.message);
                    } else if (error.response.status === 400) {
                        toast.error(error.response.data.message);
                    }
                });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productPrice', productPrice);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        createProductApi(formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setProductName('');
                    setProductPrice('');
                    setProductDescription('');
                    setProductImage(null);
                    setPreviewImage(null);
                    getAllProducts().then((res) => {
                        setProducts(res.data.products);
                    });
                } else {
                    toast.error("Something went wrong in frontend!");
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error(error.response.data.message);
                    }
                } else if (error.response.status === 500) {
                    toast.error("Internal server error");
                } else {
                    toast.error("No response!!");
                }
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row">
                <AdminSidebar/>
                <main className="flex-1 p-4 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>

                        <button data-modal-target="default-modal" data-modal-toggle="default-modal"
                                className="block text-white bg-yellow-500 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                                onClick={openModal}
                        >
                            Add Product
                        </button>

                        {isModalOpen && (
                            <div
                                className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center"
                                aria-labelledby="modal-title"
                                role="dialog"
                                aria-modal="true"
                            >
                                {/* Black overlay */}
                                <div
                                    className="absolute inset-0 bg-black opacity-50 overlay"
                                    onClick={closeModal}
                                ></div>

                                {/* Modal content */}
                                <div className="relative p-4 w-full max-w-3xl">
                                    <div className="relative bg-white rounded-lg shadow">
                                        <div
                                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                Create a Product
                                            </h3>
                                            <button
                                                onClick={closeModal}
                                                type="button"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                            >
                                                <svg
                                                    className="w-3 h-3"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                        </div>
                                        <div className="p-4 md:p-5 space-y-4 max-h-96 overflow-y-auto">
                                            <form onSubmit={handleSubmit}>
                                                {/* Your form inputs */}
                                                {/* Example for Product Name */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Product
                                                        Name</label>
                                                    <input
                                                        onChange={(e) => setProductName(e.target.value)}
                                                        type="text"
                                                        className="form-input mt-1 block w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:border-yellow-500"
                                                        placeholder="Enter product Name"
                                                        value={productName}
                                                        required
                                                    />
                                                </div>
                                                {/* Example for Product Price */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Product
                                                        Price</label>
                                                    <input
                                                        onChange={(e) => setProductPrice(e.target.value)}
                                                        type="number"
                                                        className="form-input mt-1 block w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:border-yellow-500"
                                                        placeholder="Enter product Price"
                                                        value={productPrice}
                                                        required
                                                    />
                                                </div>
                                               
                                                {/* Example for Product Description */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Product
                                                        Description</label>
                                                    <textarea
                                                        onChange={(e) => setProductDescription(e.target.value)}
                                                        className="form-textarea mt-1 block w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:border-yellow-500"
                                                        placeholder="Enter product description"
                                                        value={productDescription}
                                                        required
                                                    ></textarea>
                                                </div>
                                                {/* Example for Product Image */}
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Product
                                                        Image</label>
                                                    <input
                                                        onChange={handleImageUpload}
                                                        type="file"
                                                        className="form-input mt-1 block w-full border-2 border-gray-200 p-3 rounded focus:outline-none focus:border-yellow-500"
                                                    />
                                                    {/* Preview Image */}
                                                    {previewImage && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={previewImage}
                                                                alt="Product Preview"
                                                                className="w-full h-40 object-cover rounded"
                                                            />
                                                        </div>
                                                    )}
                                                
                                                    
                                                </div>
                                            </form>
                                        </div>
                                        <div
                                            className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b">
                                            <button
                                                onClick={closeModal}
                                                type="button"
                                                className="py-2.5 px-5 mr-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                            >
                                                Close
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <Table products={products} handleDelete={handleDelete}/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
