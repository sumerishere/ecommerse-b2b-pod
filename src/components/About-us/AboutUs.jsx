
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Bulkify</h1>
          <p className="text-xl mb-8">Transforming B2B Commerce Through Innovation</p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            At Bulkify, we're committed to revolutionizing the B2B marketplace by connecting businesses worldwide through our innovative e-commerce platform. Our goal is to streamline bulk purchasing and make wholesale trading more efficient, transparent, and accessible for everyone.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Bulkify?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Efficiency</h3>
              <p className="text-gray-600">Streamlined ordering process and automated workflow for faster transactions</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Security</h3>
              <p className="text-gray-600">Advanced security measures to protect your transactions and data</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Transparent pricing and competitive rates for all business sizes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">10K+</h4>
              <p className="text-lg">Active Businesses</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">50+</h4>
              <p className="text-lg">Countries Served</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">$100M+</h4>
              <p className="text-lg">Annual Transactions</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">24/7</h4>
              <p className="text-lg">Customer Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div ><img className="w-34 h-75 bg-gray-300 rounded-full mx-auto mb-4" src="/images/person.jpg" alt="" /></div>
            <h3 className="text-xl font-semibold text-gray-800">Sarah Johnson</h3>
            <p className="text-gray-600">Chief Executive Officer</p>
          </div>
          <div className="text-center">
          <div ><img className="w-34 h-46 bg-gray-300 rounded-full mx-auto mb-4" src="/images/person2.jpg" alt="" /></div>
          <h3 className="text-xl font-semibold text-gray-800">Michael Chen</h3>
            <p className="text-gray-600">Chief Technology Officer</p>
          </div>
          <div className="text-center">
          <div ><img className="w-37 h-45 bg-gray-300 rounded-full mx-auto mb-4" src="/images/person3.jpg" alt="" /></div>
          <h3 className="text-xl font-semibold text-gray-800">Emily Rodriguez</h3>
            <p className="text-gray-600">Chief Operations Officer</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">Have questions about Bulkify? We're here to help!</p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
            Contact Us
          </button>
          <div className="mt-8 text-gray-600">
            <p>Email: contact@bulkify.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business Avenue, Tech City, TC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;









