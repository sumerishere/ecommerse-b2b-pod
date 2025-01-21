import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
const items = [
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 470,
    },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 319,
    },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 134,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 400,
    },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 250,
    },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: {
      rate: 2.2,
      count: 140,
    },
  },
];

// Function to shorten description text
// const shortenDescription = (description, maxLength = 100) => {
//   return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
// };

const ElectronicItems = ({ cart, setCart }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    toast.success("Product Added")
    console.log(cart);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Electronic Products
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="flex flex-col bg-white rounded-lg shadow-lg max-w-xs w-full">
              <div className="w-full h-48 overflow-hidden mt-4">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
              </div>
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h2 className="text-md font-semibold text-gray-800">{item.title}</h2>
                <p className="text-xs text-gray-500 mt-2">
                  {item.description.length > 100
                    ? `${item.description.substring(0, 100)}...`
                    : item.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-600 font-semibold text-md">${item.price}</span>
                  <div className="flex items-center">
                    <span className="text-black-500">{item.rating.rate} ⭐</span>
                    <span className="text-gray-400 ml-2">({item.rating.count} reviews)</span>
                  </div>
                </div>
                {
                  cart.some((cartItem) => cartItem.id === item.id) ? (
                    <Link
                      to="/cart"
                      className="mt-4 bg-gradient-to-r from-gray-600 to-gray-500 text-white py-2 px-4 rounded-md hover:from-gray-500 hover:to-gray-400 shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-shopping-cart"></i> Go to Cart
                    </Link>
                  ) : (
                    <button
                      className="mt-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-blue-500 shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                      onClick={() => addToCart(item)}
                    >
                      <i className="fas fa-plus"></i> Add to Cart
                    </button>
                  )
                }

              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ElectronicItems;