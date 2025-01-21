import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Package,
  CircleDollarSign,
  ShoppingCart,
  Settings,
  Bell,
  User,
  Search,
  Plus,
  CheckCircle2,
  TrendingUp,
  Truck,
  Headphones,
} from "lucide-react";
// import AddProductForm from '../AddProduct/AddProductForm';

const SellerDashboard = () => {
  // const [activeTab, setActiveTab] = useState('dashboard');
  // const navigate = useNavigate();
  const recentOrders = [
    { id: "1", product: "Wireless Earbuds", price: 1999, status: "Processing" },
    { id: "2", product: "Smart Watch", price: 2499, status: "Shipped" },
    { id: "3", product: "Phone Case", price: 499, status: "Delivered" },
  ];

  const stats = [
    {
      title: "Total Sales",
      value: "₹45,239",
      icon: <CircleDollarSign className="h-6 w-6" />,
    },
    {
      title: "Orders",
      value: "126",
      icon: <ShoppingCart className="h-6 w-6" />,
    },
    { title: "Products", value: "48", icon: <Package className="h-6 w-6" /> },
  ];

  const successStories = [
    {
      name: "Rajesh Kumar",
      business: "Electronics Hub",
      story:
        "Started with just 10 products in 2022, now managing 500+ products with monthly sales of ₹10L+",
      image:
        "https://imgs.search.brave.com/FrKqRdQwqPt9Tb_I9ltt2E8pFi9uN8bXsXIgczkh3lo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzgyLzY2Lzcw/LzM2MF9GXzg4MjY2/NzAwMl9sV09YTkYx/czZjWHZPMEJBZjBO/VUpBVXd5ZHd1TlVQ/Wi5qcGc",
    },
    {
      name: "Priya Sharma",
      business: "Fashion Forward",
      story:
        "From home-based business to 50+ employees in just 18 months. Now shipping pan-India.",
      image:
        "https://imgs.search.brave.com/oNdDiTO26C1gkMRTvTf41s11rg-J1r3d_WSMEBKM7wc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC15b3Vu/Zy1ibG9uZGUtd29t/YW5fMjczNjA5LTEw/NTE5LmpwZz9zZW10/PWFpc19oeWJyaWQ",
    },
  ];

  const sellerFeatures = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Growth Analytics",
      description:
        "Access detailed insights about your business performance and customer behavior",
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Logistics Support",
      description:
        "End-to-end shipping solutions with pan-India coverage and competitive rates",
    },
    {
      icon: <Headphones className="h-8 w-8 text-blue-600" />,
      title: "24/7 Support",
      description:
        "Dedicated seller support team to help you grow your business",
    },
  ];

  const registrationSteps = [
    {
      step: 1,
      title: "Basic Details",
      description:
        "Register with your business details, PAN, and GST information",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Submit required documents for verification and approval",
    },
    {
      step: 3,
      title: "Bank Account Setup",
      description: "Link your bank account for seamless payments",
    },
    {
      step: 4,
      title: "List Products",
      description: "Start listing your products and begin selling",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Seller Dashboard</div>
          <div className="flex items-center space-x-4">
            {/* <Bell className="h-6 w-6 cursor-pointer" /> */}
            {/* <Settings className="h-6 w-6 cursor-pointer" /> */}
            <User className="h-6 w-6 cursor-pointer" />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Search and Stats sections remain the same */}
        <div className="mb-6 ">
          {/* <Link
            to="/AddProduct"
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Product
          </Link> */}
          <button
            // onClick={() => navigate('/AddProduct')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            <Link to="/AddProduct"> + Add New Product</Link>
          </button>

          <button className="bg-blue-500 text-white m-4 px-4 py-2 rounded">
            <Link to="/Invoice">Invoice</Link>
          </button>

          <button className="bg-blue-500 text-white m-3 px-4 py-2 rounded">
            <i class="fa-solid fa-chart-simple px-1"></i>
            <Link to="/Dashboard">View Sales</Link>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="text-blue-600">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Success Stories */}
        <div className="w-full bg-gray-50 py-12 overflow-hidden">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Seller Success Stories
          </h2>
          <div className="relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

            {/* Scrolling Container */}
            <div className="flex animate-scroll">
              {/* First Set */}
              <div className="flex gap-6 px-6">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6"
                  >
                    <div className="flex items-start">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{story.name}</h3>
                        <p className="text-blue-600 font-medium">
                          {story.business}
                        </p>
                        <p className="mt-2 text-gray-600">{story.story}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Set for continuous scroll */}
              <div className="flex gap-6 px-6">
                {successStories.map((story, index) => (
                  <div
                    key={`dup-${index}`}
                    className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg p-6"
                  >
                    <div className="flex items-start">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{story.name}</h3>
                        <p className="text-blue-600 font-medium">
                          {story.business}
                        </p>
                        <p className="mt-2 text-gray-600">{story.story}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 10s linear infinite;
            }
          `}</style>
        </div>

        {/* Seller Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Why Sell With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sellerFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="font-semibold text-lg mt-4">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">{order.product}</td>
                    <td className="px-6 py-4">₹{order.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Registration Steps */}
        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            Start Selling in 4 Easy Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {registrationSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg mt-4">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
