// import React, { useContext, useState } from "react";
// import { UserContext } from '../../Context/UserContext';
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

// function Cart() {
//     const navigate = useNavigate();
//     const { cart, totalPrice, removeFromCart } = useContext(UserContext);

//     const [cartquantity, setCartquantity] = useState(0)

//     const decrement = (id) => {
//         setCartquantity((prevcounts) => ({
//             ...prevcounts, [id]: Math.max(prevcounts[id] || 1) - 1
//         }))
//     }
//     const increment = (id) => {
//         setCartquantity((prevcounts) => ({
//             ...prevcounts, [id]: (prevcounts[id] || 1) + 1
//         }))
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className="px-4 sm:px-6 lg:px-8">
//                 <h1 className="text-2xl font-semibold text-center mb-6 pt-5">YOUR CART</h1>

//                 {cart.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-full">
//                         <h1 className="text-lg text-center mb-4">Your cart is currently empty.</h1>
//                         <button onClick={() => navigate('/')} className="bg-blue-500 text-white px-6 py-2 rounded-xl">
//                             Shop now
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                             {cart.map((product) => (
//                                 <div key={product.id} className="border rounded-lg shadow-lg p-4">
//                                     <img
//                                         src={product.url}
//                                         alt={product.name}
//                                         className="w-full h-60 rounded-t object-cover mb-4"
//                                     />
//                                     <h1 className="text-lg font-semibold text-center">{product.name}</h1>
//                                     <p className="text-center text-gray-700"> ₹ {product.price}</p>

//                                     <div className="flex items-center justify-center mt-2">
//                                         <div className="flex items-center justify-between w-1/3 bg-gray-100 p-2 rounded">
//                                             <button onClick={() => decrement(product.id)} className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400">-</button>
//                                             <span>{cartquantity[product.id] || 1}</span>
//                                             <button onClick={() => increment(product.id)} className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400"> +</button>
//                                         </div>
//                                     </div>
//                                     {/* <p className="text-center text-gray-700">Quantity {product.quantity}</p> */}
//                                     {/* <span>{Quantity[product.id] || 1}</span> */}

//                                     <button
//                                         className="bg-black text-white px-6 py-2 rounded-2xl w-full mt-4 hover:bg-red-600 text-sm"
//                                         onClick={() => removeFromCart(product)}
//                                     >
//                                         REMOVE
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="flex flex-col items-center sm:items-end">
//                             <div className="flex items-center justify-between w-full sm:w-auto mb-4">
//                                 <h1 className="text-xl font-semibold">TOTAL:  ₹ {totalPrice}</h1>
//                             </div>
//                             <button
//                                 className="bg-gray-200 text-black px-8 py-2 rounded-2xl hover:bg-green-900 hover:text-white text-sm"
//                                 onClick={() => navigate('/order')}
//                             >
//                                 PLACE YOUR ORDER
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Cart


import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useContext(UserContext);

    const [cartquantity, setCartquantity] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    // Initialize quantities and total price whenever cart changes
    useEffect(() => {
        const initialQuantities = {};
        let initialTotal = 0;
        
        cart.forEach(product => {
            // Check if the product already has a quantity, else default to 1
            initialQuantities[product.id] = cartquantity[product.id] || 1;
            initialTotal += product.price * initialQuantities[product.id];
        });
        
        setCartquantity(initialQuantities);
        setTotalPrice(initialTotal);
    }, [cart]); // This useEffect runs whenever cart changes

    // Update the total price whenever cartquantity changes
    useEffect(() => {
        const newTotal = cart.reduce((total, product) => {
            const quantity = cartquantity[product.id] || 1;
            return total + product.price * quantity;
        }, 0);
        setTotalPrice(newTotal);
    }, [cartquantity, cart]); // This useEffect recalculate totalprice whenever cartquantity or cart changes focus on  totalprice updates 

    const decrement = (id) => {
        setCartquantity((prevcounts) => {
            const newQuantity = Math.max((prevcounts[id] || 1) - 1, 1);
            return { ...prevcounts, [id]: newQuantity };
        });
    };

    const increment = (id) => {
        setCartquantity((prevcounts) => {
            const newQuantity = (prevcounts[id] || 1) + 1;
            return { ...prevcounts, [id]: newQuantity };
        });
    };

    return (
        <div>
            <Navbar />
            <div className="px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-center mb-6 pt-5">YOUR CART IS HERE</h1>

                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-lg text-center mb-4">Your cart is currently empty.</h1>
                        <button onClick={() => navigate('/productList')} className="bg-blue-500 text-white px-6 py-2 rounded-xl">
                            Shop now
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {cart.map((product) => (
                                <div key={product.id} className="border rounded-lg shadow-lg p-4">
                                    <img
                                        src={product.url}
                                        alt={product.name}
                                        className="w-full h-60 rounded-t object-cover mb-4"
                                    />
                                    <h1 className="text-lg font-semibold text-center">{product.name}</h1>
                                    <p className="text-center text-gray-700"> ₹ {product.price}</p>

                                    <div className="flex items-center justify-center mt-2">
                                        <div className="flex items-center justify-between w-1/3 bg-gray-100 p-2 rounded">
                                            <button onClick={() => decrement(product.id)} className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400">-</button>
                                            <span>{cartquantity[product.id] || 1}</span>
                                            <button onClick={() => increment(product.id)} className="bg-gray-200 rounded px-2 flex items-center justify-center text-xl font-bold hover:bg-gray-400">+</button>
                                        </div>
                                    </div>

                                    <button
                                        className="bg-black text-white px-6 py-2 rounded-2xl w-full mt-4 hover:bg-red-600 text-sm"
                                        onClick={() => removeFromCart(product)}
                                    >
                                        REMOVE
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center sm:items-end">
                            <div className="flex items-center justify-between w-full sm:w-auto mb-4">
                                <h1 className="text-xl font-semibold">TOTAL:  ₹ {totalPrice}</h1>
                            </div>
                            <button
                                className="bg-gray-200 text-black px-8 py-2 rounded-2xl hover:bg-green-900 hover:text-white text-sm"
                                onClick={() => navigate('/order')}
                            >
                                PLACE YOUR ORDER
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;

