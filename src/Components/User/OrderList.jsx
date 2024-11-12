import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import Navbar from '../Navbar/Navbar';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const id = localStorage.getItem('id');
            // Get user ID from local storage
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                const userOrders = response.data.order || [];
                // Fetch user orders
                setOrders(userOrders);
                // Set orders state
            } catch (error) {
                console.log('Error fetching orders:', error.message);
            }
        };
        // Call function to fetch orders
        fetchOrders();
    }, []);
    const handleClearAllOrders = async (product) => {
        const id = localStorage.getItem("id")
        console.log(product)
        const deletedOrder = orders.filter((item) => item.id !== product.id)
        axios.patch(`http://localhost:5000/users/${id}`, {
            order: deletedOrder
        })
            .then(() => {
                setOrders(deletedOrder)
            })
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold text-center mb-4">Order List</h1>
                {orders.length === 0 ? (
                    <p className="text-center text-lg">No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-md shadow-md">
                            <p className='text-lg font-semibold mb-2'>Order {index + 1}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                {order.items.map((product) => (
                                    <div key={product.id} className="flex items-center border-b py-2">
                                        <img
                                            src={product.url}
                                            className="w-24 h-24 object-cover rounded-md"
                                            alt={product.name}
                                        />
                                        <div className="ml-4">
                                            <p className="font-semibold">{product.name}</p>
                                            <p className="text-gray-600"> ₹ {product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
                {orders.length > 0 && (
                    <button
                        className="bg-black text-white px-6 py-2 rounded-2xl w-1/2 mt-4 hover:bg-red-600 text-sm"
                        onClick={handleClearAllOrders}
                    >
                        CLEAR ALL ORDERS
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderList;