import React from "react";
import { toast } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';

const CartPage = ({ cart, setCart }) => {
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        toast.error("Product Removed");
    };

    // Calculate the total payable amount
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="p-6 flex gap-6">
            {/* Cart Items Section */}
            <div className="flex-grow">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    Your Cart
                </h1>

                {cart.length > 0 ? (
                    <div className="flex flex-col items-center gap-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl"
                            >
                                {/* Image Section */}
                                <div className="w-full md:w-1/4 h-32 overflow-hidden flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full object-contain"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-grow flex flex-col justify-between p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {item.description.length > 100
                                            ? `${item.description.substring(0, 100)}...`
                                            : item.description}
                                    </p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-green-600 font-semibold">
                                            ${item.price}
                                        </span>
                                        <span className="text-gray-400">
                                            {item.rating.rate} ⭐ ({item.rating.count} reviews)
                                        </span>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="rounded-md mt-4 md:mt-0 md:ml-4 transition-all duration-300 hover:text-red-600 hover:scale-110"
                                >
                                    <i className="fas fa-trash-alt text-xl text-red-500" />
                                </button>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">
                        Your cart is empty. Add some items to see them here!
                    </p>
                )}
            </div>

            {/* Total Payable Amount Section */}
            <div className="w-80 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Price Details</h2>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-green-600 font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all duration-300">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
