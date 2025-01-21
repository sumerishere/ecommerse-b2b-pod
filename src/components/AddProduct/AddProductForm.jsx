import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from "react-toastify";

const AddProductForm = ({onClose}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category:"",
    productPrice: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setFormData({
      productName: "",
      productDescription: "",
      category:"",
      productPrice: "",
    });
    setProductImage(null);
    setImagePreview(null);
  };

  // const handleClose = () => {
  //   navigate('/seller'); // Navigate back to seller dashboard
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productImage) {
      toast.error("Please select a product image");
      return;
    }

    setIsLoading(true);

    const formDataToSend = new FormData();
    const productData = new Blob([JSON.stringify(formData)], {
      type: 'application/json'
    });

    formDataToSend.append('product', productData);
    formDataToSend.append('image', productImage);

    try {
      const response = await fetch('http://localhost:8080/api/product/add-product', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      toast.success('Product added successfully!');
      handleReset();
      // Navigate back to seller dashboard after successful submission
      setTimeout(() => {
        navigate('/seller');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          aria-label="Close"
        >
          ✖
        </button> */}

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              id="productPrice"
              name="productPrice"
              type="number"
              value={formData.productPrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category <span className="text-red-500">*</span>
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="productImage"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image <span className="text-red-500">*</span>
            </label>
            <input
              id="productImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-32 w-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            {/* <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 shadow"
              disabled={isLoading}
            >
              Reset
            </button> */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 shadow"
                disabled={isLoading}
              >
                <Link to="/seller">Cancel</Link>
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded shadow hover:bg-blue-600 disabled:bg-blue-300"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;