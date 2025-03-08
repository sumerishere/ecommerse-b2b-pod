import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, Building2, Users, TrendingUp, Package, Truck, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Registration = () => {
    // ... [Keep all the existing state and handlers]
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        address: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        // ... [Keep existing submit handler]
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match!");
            return;
        }

        const { confirmPassword, ...submitData } = formData;

        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/users/add-user', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            toast.success('Registration successful!');
            setFormData({
                firstName: '',
                lastName: '',
                mobile: '',
                address: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            setTimeout(() => {
                navigate('/');
              },3000);
      
        } catch (err) {
            toast.error('Something went wrong!!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white p-12 flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Bulkify B2B Platform</h1>
                    <p className="text-xl mb-8">Your One-Stop Solution for Wholesale E-commerce</p>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center space-x-4">
                        <Building2 size={32} />
                        <div>
                            <h3 className="font-semibold">Business Growth</h3>
                            <p className="text-sm text-blue-100">Scale your business efficiently</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Users size={32} />
                        <div>
                            <h3 className="font-semibold">Supplier Network</h3>
                            <p className="text-sm text-blue-100">Connect with verified suppliers</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <TrendingUp size={32} />
                        <div>
                            <h3 className="font-semibold">Market Insights</h3>
                            <p className="text-sm text-blue-100">Data-driven decisions</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Package size={32} />
                        <div>
                            <h3 className="font-semibold">Bulk Orders</h3>
                            <p className="text-sm text-blue-100">Wholesale pricing</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <p className="text-sm text-blue-100">Join thousands of businesses already growing with Bulkify</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {isLoading && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Keep all the existing form fields exactly as they are */}
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isLoading ? 'Registering...' : 'Register'}
                            </button>
                        </form>

                        <p className="mt-4 text-center">
                            Already have an account?{' '}
                            <a href="/login" className="text-blue-600 hover:underline">Login</a>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Registration;