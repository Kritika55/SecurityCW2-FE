import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../apis/Api';
import { toast } from 'react-toastify';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        getAllProducts()
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                toast.error('Failed to fetch products');
            });
    };

    return (
        <div className="products">
            <h2>Products</h2>
            <table className="table mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.productName}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productCategory}</td>
                            <td>{product.productDescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;
