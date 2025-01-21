import "./Home.css";
import { useState} from "react";
import Slider from "react-slick";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";
import Scroller from "../Infinite-scroller/Scroller";
import LoginForm from "../Login-form/LoginForm";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Animation from "../Animatation/Animation";


const Home = ({ cart }) => {
  const [loginClicked, setLoginClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [userData, setUserData] = useState(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem('userData');
  //   if (storedUserData) {
  //     setUserData(JSON.parse(storedUserData));
  //   }
  // }, []);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   // localStorage.removeItem('userData');
  //   // localStorage.removeItem('isAuthenticated');
  //   setUserData(null);
  //   onLogout();
  //   toast.info('Logged out successfully');
  //   navigate('/login');
  // };

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClickLogin = () => {
    setLoginClicked(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <ToastContainer position="top-right" autoClose={3000} />

      {loginClicked && <LoginForm onClose={() => setLoginClicked(false)} />}
      {/* Navbar */}
      <nav className="bg-gray-100 shadow sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Tagline */}
        <div className="flex">
          <h1 className="text-xl font-semibold text-gray-800">Bulkify</h1>
          <sub className="text-blue-500">B2B</sub>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="text-gray-600 md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-grow mx-4 relative items-center">
          <input
            type="text"
            placeholder="Search for products, suppliers, and more"
            className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6 text-gray-600">
          {/* Login */}
          <button className="hover:text-blue-500 flex items-center space-x-2" onClick={handleClickLogin}>
            <i className="fas fa-user-tie"></i>
            <span>Login</span>
          </button>

          {/* Become a Seller */}
          <div className="hover:text-blue-500 cursor-pointer flex items-center space-x-2">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
              alt="Become a Seller Icon"
              className="w-6 h-6"
            />
            <Link to="/seller">Become a Seller</Link>
          </div>

          {/* More Dropdown */}
          <div className="relative group">
            <button className="hover:text-blue-500 flex items-center space-x-2">
              <span>More</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40 left-1/2 -translate-x-1/2">
              <ul className="py-2">
                {/* <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
                <i class="fa-solid fa-chart-simple"></i>
                  <Link to="/Dashboard">My Sell</Link>
                </li> */}

                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
                {/* <i className="fa-light fa-bags-shopping"></i> */}
                <i class="fa-solid fa-basket-shopping"></i>
                  <Link to="/Bulk-Order">Bulk Order</Link>
                </li>

                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
                  <i className="fas fa-info-circle"></i>
                  <Link to="/AboutUs">About Us</Link>
                </li>
                <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
                  <i className="fas fa-question-circle"></i>
                  <a href="/help">Help</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="hover:text-blue-500 flex items-center space-x-2">
              <i className="fas fa-shopping-cart"></i>
              <span>Cart</span>
            </Link>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white px-6 py-3 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>

          {/* Menu Items */}
          <button className="block w-full text-left hover:text-blue-500" onClick={handleClickLogin}>
            Login
          </button>
          <Link to="/seller" className="block hover:text-blue-500">
            Become a Seller
          </Link>
          <Link to="/Dashboard" className="block hover:text-blue-500">
            Portfolio
          </Link>
          <Link to="/AboutUs" className="block hover:text-blue-500">
            About Us
          </Link>
          <a href="/help" className="block hover:text-blue-500">
            Help
          </a>
          <Link to="/cart" className="block hover:text-blue-500">
            Cart ({cart.length})
          </Link>
        </div>
      )}
    </nav>


      {/* Carousel Section */}
      <section id="carousel" className="py-10 ">
        <div className="container mx-auto px-6">
          <Slider {...carouselSettings}>
            <div className="h-60">
              <img
                src="	https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/d49caf7f1079a44e.jpg?q=20"
                alt="Featured Product 1"
                className="w-full h-full object-fit"
              />
            </div>
            <div className="h-60">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/500f9504445ddae6.jpeg?q=20"
                alt="Featured Product 2"
                className="w-full h-full object-fit"
              />
            </div>
            <div className="h-60">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/aa7d5b58b26ff5d8.jpg?q=20"
                alt="Featured Product 3"
                className="w-full h-full object-fit"
              />
            </div>

            <div className="h-60">
              <img
                src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a79ae9fee2e76cfe.jpeg?q=20"
                alt="Featured Product 3"
                className="w-full h-full object-fit"
              />
            </div>
          </Slider>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-10 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Product Categories</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Snacks Category */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                alt="Snacks Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">Snacks</h4>
              <p className="text-gray-600 mb-4">
                Explore a delicious variety of snacks for every craving.
              </p>
              <Link
                to="/electronicItems"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Explore
              </Link>
            </div>

            {/* Shoes Category */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
                alt="Shoes Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">Shoes</h4>
              <p className="text-gray-600 mb-4">
                Find stylish and comfortable shoes for all occasions.
              </p>
              <Link
                to="/electronicItems"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Shop Now
              </Link>
            </div>

            {/* Electronic Items Category */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2570/2570571.png"
                alt="Electronics Icon"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-2">Electronic Items</h4>
              <p className="text-gray-600 mb-4">
                Discover the latest gadgets and electronics for your needs.
              </p>
              <Link
                to="/electronicItems"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Our Features</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Wide Product Range */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3388/3388819.png"
                  alt="Wide Product Range Icon"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">
                  Wide Product Range
                </h4>
                <p className="text-gray-600 text-center">
                  Access thousands of products tailored to your industry.
                </p>
              </div>
            </div>

            {/* Verified Suppliers */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
                  alt="Verified Suppliers Icon"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">
                  Verified Suppliers
                </h4>
                <p className="text-gray-600 text-center">
                  Connect with trusted and reliable suppliers.
                </p>
              </div>
            </div>

            {/* Easy Integration */}
            <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
              <div className="flex flex-col items-center mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3063/3063823.png"
                  alt="Easy Integration Icon"
                  className="w-16 h-16 mb-4"
                />
                <h4 className="text-xl font-semibold mb-2">Easy Integration</h4>
                <p className="text-gray-600 text-center">
                  Seamless process to connect and collaborate with partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Scroller />

      <Animation/>

      {/* About Section */}
      <section id="about" className="py-10 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-extrabold mb-6 text-indigo-900">
            About Us
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Our platform bridges the gap between buyers and sellers, offering
            unparalleled services to businesses of all sizes. We strive to
            empower your business with seamless connectivity and innovative
            solutions.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
              alt="About Us"
              className="mx-auto w-40 h-40"
            />
          </div>
        </div>
      </section>

     

      {/* Contact Section */}
      <section id="contact" className="py-10 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-extrabold mb-6 text-blue-700">
            Get in Touch
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or need assistance? We're here to help. Reach out to
            us anytime!
          </p>
          <a
            href="#"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition"
          >
            Contact Us
          </a>
          <div className="mt-6 text-gray-600">
            <p>Email: contact@bulkify.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business Avenue, Tech City, TC 12345</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-center lg:text-left">
              <p className="text-sm">
                &copy; 2025{" "}
                <span className="font-bold text-white">Bulkify</span>. All
                Rights Reserved.
              </p>
            </div>
            <div className="flex justify-center space-x-6 mt-4 lg:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;



// import { useState } from "react";
// import Slider from "react-slick";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Link } from "react-router-dom"
// import Scroller from "../Infinite-scroller/Scroller";
// import LoginForm from "../Login-form/LoginForm";
// import "./Home.css";

// const Home = ({ onLogout, cart }) => {

//   const [loginClicked, setLoginClicked] = useState(false);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     onLogout();
//   };

//   // Carousel settings
//   const carouselSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const handleClickLogin = () => {
//     setLoginClicked(true)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {loginClicked && <LoginForm onClose={() => setLoginClicked(false)} />}
//       {/* Navbar */}
//       <nav className="bg-white shadow sticky top-0 z-50">
//         <div className="container mx-auto px-6 py-3 flex items-center justify-between">
//           {/* Logo and Tagline */}
//           <div className="flex">
//             <h1 className="text-xl font-semibold text-gray-800">Bulkify</h1>
//             <sub className="text-blue-500">B2B</sub>
//           </div>

//           {/* Search Bar */}
//           <div className="flex-grow mx-4 relative ml-20 mr-20">
//             <input
//               type="text"
//               placeholder="Search for products, suppliers, and more"
//               className="w-full px-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
//             />
//             <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//               <i className="fas fa-search text-gray-400"></i>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-6 text-gray-600">
//             {/* Login */}
//             <button className="hover:text-blue-500 flex items-center space-x-2" onClick={handleClickLogin}>
//               <i className="fas fa-user-tie"></i>
//               <span>Login</span>
//             </button>

//             {/* Become a Seller */}
//             <div className="hover:text-blue-500 cursor-pointer flex items-center space-x-2">
//               <img
//                 src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/Store-9eeae2.svg"
//                 alt="Become a Seller Icon"
//                 className="w-6 h-6"
//               />
//               <Link to="/seller">Become a Seller</Link>
//             </div>


//             {/* More Dropdown */}
//             <div className="relative group">
//               <button className="hover:text-blue-500 flex items-center space-x-2">
//                 {/* <i className="fas fa-ellipsis-h"></i> */}
//                 <span>More</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="w-4 h-4"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               {/* Dropdown Content */}
//               <div className="absolute hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-40 left-1/2 -translate-x-1/2">
//   <ul className="py-2">
//     <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
//       <i className="fas fa-briefcase"></i>
//       <Link to="/Dashboard">Portfolio</Link>
//     </li>
//     <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
//       <i className="fas fa-info-circle"></i>
//       <Link to="/AboutUs">About Us</Link>
//     </li>
//     <li className="px-4 py-2 hover:bg-blue-500 hover:text-white flex items-center space-x-2 transition-all duration-200">
//       <i className="fas fa-question-circle"></i>
//       <a href="/help">Help</a>
//     </li>
//   </ul>
// </div>

//             </div>


//             {/* Cart */}
//             <div className="relative">
//               <Link to="/cart" className="hover:text-blue-500 flex items-center space-x-2">
//                 <i className="fas fa-shopping-cart"></i>
//                 <span>Cart</span>
//               </Link>
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 {cart.length}
//               </span>
//             </div>
//           </div>
//         </div>
//       </nav>


//       {/* Carousel Section */}
//       <section id="carousel" className="py-10">
//         <div className="container mx-auto px-6">
//           <Slider {...carouselSettings}>
//             <div className="h-60">
//               <img
//                 src="	https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/ebe650f1bd18e588.jpg?q=20"
//                 alt="Featured Product 1"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <div className="h-60">
//               <img
//                 src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/53dcf24ecc20bf27.jpg?q=20"
//                 alt="Featured Product 2"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <div className="h-60">
//               <img
//                 src="	https://rukminim2.flixcart.com/fk-p-flap/1010/170/image/1e5f2e97e448cee0.jpg?q=20"
//                 alt="Featured Product 3"
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           </Slider>
//         </div>
//       </section>




//       {/* Categories Section */}
//       <section id="categories" className="py-10 bg-gray-100">
//         <div className="container mx-auto px-6 text-center">
//           <h3 className="text-3xl font-bold mb-8">Product Categories</h3>
//           <div className="flex flex-wrap justify-center gap-8">
//             {/* Snacks Category */}
//             <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
//                 alt="Snacks Icon"
//                 className="w-16 h-16 mx-auto mb-4"
//               />
//               <h4 className="text-xl font-semibold mb-2">Snacks</h4>
//               <p className="text-gray-600 mb-4">Explore a delicious variety of snacks for every craving.</p>
//               <Link to="/electronicItems" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 Explore
//               </Link>
//             </div>

//             {/* Shoes Category */}
//             <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/679/679720.png"
//                 alt="Shoes Icon"
//                 className="w-16 h-16 mx-auto mb-4"
//               />
//               <h4 className="text-xl font-semibold mb-2">Shoes</h4>
//               <p className="text-gray-600 mb-4">Find stylish and comfortable shoes for all occasions.</p>
//               <Link to="/electronicItems" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 Shop Now
//               </Link>
//             </div>

//             {/* Electronic Items Category */}
//             <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/2570/2570571.png"
//                 alt="Electronics Icon"
//                 className="w-16 h-16 mx-auto mb-4"
//               />
//               <h4 className="text-xl font-semibold mb-2">Electronic Items</h4>
//               <p className="text-gray-600 mb-4">Discover the latest gadgets and electronics for your needs.</p>
//               <Link to="/electronicItems" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
//                 View More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>





//       {/* Features Section */}
//       <section id="features" className="py-10">
//   <div className="container mx-auto px-6 text-center">
//     <h3 className="text-3xl font-bold mb-8">Our Features</h3>
//     <div className="flex flex-wrap justify-center gap-8">
//       {/* Wide Product Range */}
//       <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//         <div className="flex flex-col items-center mb-4">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3388/3388819.png"
//             alt="Wide Product Range Icon"
//             className="w-16 h-16 mb-4"
//           />
//           <h4 className="text-xl font-semibold mb-2">Wide Product Range</h4>
//           <p className="text-gray-600 text-center">Access thousands of products tailored to your industry.</p>
//         </div>
//       </div>

//       {/* Verified Suppliers */}
//       <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//         <div className="flex flex-col items-center mb-4">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
//             alt="Verified Suppliers Icon"
//             className="w-16 h-16 mb-4"
//           />
//           <h4 className="text-xl font-semibold mb-2">Verified Suppliers</h4>
//           <p className="text-gray-600 text-center">Connect with trusted and reliable suppliers.</p>
//         </div>
//       </div>

//       {/* Easy Integration */}
//       <div className="bg-white p-6 shadow-lg rounded-lg w-full sm:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105">
//         <div className="flex flex-col items-center mb-4">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/3063/3063823.png"
//             alt="Easy Integration Icon"
//             className="w-16 h-16 mb-4"
//           />
//           <h4 className="text-xl font-semibold mb-2">Easy Integration</h4>
//           <p className="text-gray-600 text-center">Seamless process to connect and collaborate with partners.</p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>


//       <Scroller />


//       {/* About Section */}
//       <section id="about" className="py-10 bg-gray-100">
//         <div className="container mx-auto px-6 text-center">
//           <h3 className="text-4xl font-extrabold mb-6 text-indigo-900">About Us</h3>
//           <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
//             Our platform bridges the gap between buyers and sellers, offering unparalleled services to businesses of all sizes.
//             We strive to empower your business with seamless connectivity and innovative solutions.
//           </p>
//           <div className="mt-8">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
//               alt="About Us"
//               className="mx-auto w-40 h-40"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-10 bg-gray-50">
//         <div className="container mx-auto px-6 text-center">
//           <h3 className="text-4xl font-extrabold mb-6 text-blue-700">Get in Touch</h3>
//           <p className="text-lg text-gray-600 mb-6">
//             Have questions or need assistance? We're here to help. Reach out to us anytime!
//           </p>
//           <a
//             href="#"
//             className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition"
//           >
//             Contact Us
//           </a>
//           <div className="mt-6 text-gray-600">
//             <p>Email: contact@bulkify.com</p>
//             <p>Phone: +1 (555) 123-4567</p>
//             <p>Address: 123 Business Avenue, Tech City, TC 12345</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-5">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-wrap justify-between items-center">
//             <div className="text-center lg:text-left">
//               <p className="text-sm">
//                 &copy; 2025 <span className="font-bold text-white">Bulkify</span>. All Rights Reserved.
//               </p>
//             </div>
//             <div className="flex justify-center space-x-6 mt-4 lg:mt-0">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
//               >
//                 <i className="fab fa-facebook-f text-2xl"></i>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
//               >
//                 <i className="fab fa-twitter text-2xl"></i>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition duration-300 ease-in-out"
//               >
//                 <i className="fab fa-linkedin-in text-2xl"></i>
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>



//     </div>
//   );
// };

// export default Home;
