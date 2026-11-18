
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const Product = () => {
    const [products, setProducts] = useState([]);

    const { token } = useContext(productContext);

    const API_URL = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/getproducts`);
            setProducts(response.data);
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getProduct = async (image, title, company, price) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/addfav`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in favourite list');
            } else {
                alert('Item added to favourites');
            }
        } catch (error) {
            console.log('Error adding favourite:', error);
        }
    };

    const addtoCart = async (image, title, company, price) => {
        try {
            const response = await axios.post(
                `${API_URL}/api/addcart`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item added to cart');
            }
        } catch (error) {
            console.log('Error adding to cart:', error);
        }
    };

    return (
        <div className="product">
            <h3 className="text-center p-4">Products</h3>

            <div className="pro-layout">
                {products && products.length > 0 ? (
                    products.map((li) => (
                        <div className="cardz" key={li._id}>
                            <img src={li.image} className="image" alt={li.title} />

                            <p className="title">{li.title}</p>

                            <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">Rs:{li.price}</p>
                            </div>

                            <div className="btns">
                                <Button
                                    variant="success"
                                    onClick={() =>
                                        addtoCart(li.image, li.title, li.company, li.price)
                                    }
                                >
                                    Add to Cart
                                </Button>

                                <Button
                                    variant="warning"
                                    onClick={() =>
                                        getProduct(li.image, li.title, li.company, li.price)
                                    }
                                >
                                    Add to Favourite
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
