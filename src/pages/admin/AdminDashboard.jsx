import React, { useState, useEffect } from 'react';
import { createProductApi, deleteProduct, getAllProducts } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productEngine, setEngine] = useState('');
    const [productMileage, setMileage] = useState('');
    const [productOccupancy, setOccupancy] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
                        setProducts(products.filter(product => product._id !== id)); // Remove deleted product from state
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
        formData.append('productEngine', productEngine);
        formData.append('productMileage', productMileage);
        formData.append('productOccupancy', productOccupancy);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('productDescription', productDescription);
        formData.append('productImage', productImage);

        createProductApi(formData)
            .then((res) => {
                if (res.status === 201) {
                    toast.success(res.data.message);
                    setProductName('');
                    setEngine('');
                    setMileage('');
                    setOccupancy('');
                    setProductPrice('');
                    setProductCategory('');
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
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky">
                        <div className="pt-3">
                            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                Navigation
                            </h6>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to="/admin/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/dashboard/products" className="nav-link">
                                        Products
                                    </Link>
                                </li>
                                {/* Add more links for other sections like Bookings if needed */}
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between mt-2">
                        <h2>Admin Dashboard</h2>
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add Product
                        </button>
                    </div>

                    {/* Modal for adding product */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create a new product!</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <label>Product Name</label>
                                        <input
                                            onChange={(e) => setProductName(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter product Name"
                                            value={productName}
                                        />
                                        <label>Engine</label>
                                        <input
                                            onChange={(e) => setEngine(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter product Engine"
                                            value={productEngine}
                                        />
                                        <label>Mileage</label>
                                        <input
                                            onChange={(e) => setMileage(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter product Mileage"
                                            value={productMileage}
                                        />
                                        <label>Occupancy</label>
                                        <input
                                            onChange={(e) => setOccupancy(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter product Occupancy"
                                            value={productOccupancy}
                                        />
                                        <label className="mt-2">Product Price</label>
                                        <input
                                            onChange={(e) => setProductPrice(e.target.value)}
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter product Price"
                                            value={productPrice}
                                        />
                                        <div className="mt-2">
                                            <label>Select Category</label>
                                            <select
                                                onChange={(e) => setProductCategory(e.target.value)}
                                                className="form-control"
                                                value={productCategory}
                                            >
                                                <option value="car">Car</option>
                                                <option value="bike">Bike</option>
                                                <option value="scooter">Scooter</option>
                                                <option value="suv">SUV</option>
                                            </select>
                                        </div>
                                        <label className="mt-2">Type product description</label>
                                        <textarea
                                            onChange={(e) => setProductDescription(e.target.value)}
                                            className="form-control"
                                            value={productDescription}
                                        ></textarea>
                                        <label className="mt-2">Product Image</label>
                                        <input onChange={handleImageUpload} type="file" className="form-control" />

                                        {/* Preview Image */}
                                        {previewImage && (
                                            <div className="">
                                                <img src={previewImage} alt="preview" className="img-fluid rounded object-fit-cover mt-3" />
                                            </div>
                                        )}
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Close
                                    </button>
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary">
                                        Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Table */}
                    <table className="table mt-3">
                        <thead className="table-dark">
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((singleProduct) => (
                                <tr key={singleProduct._id}>
                                    <td>
                                        <img
                                            height={'40px'}
                                            width={'40px'}
                                            src={`http://localhost:5000/products/${singleProduct.productImage}`}
                                            alt=""
                                        />
                                    </td>
                                    <td>{singleProduct.productName}</td>
                                    <td>NPR.{singleProduct.productPrice}</td>
                                    <td>{singleProduct.productCategory}</td>
                                    <td>{singleProduct.productDescription}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <Link to={`/admin/update/${singleProduct._id}`} className="btn btn-success">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(singleProduct._id)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
