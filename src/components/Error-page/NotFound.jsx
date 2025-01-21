import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

// Create a simple event system to control chatbot visibility
const CHATBOT_HIDE_EVENT = 'HIDE_CHATBOT';
const CHATBOT_SHOW_EVENT = 'SHOW_CHATBOT';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hide chatbot when component mounts
    window.dispatchEvent(new CustomEvent(CHATBOT_HIDE_EVENT));

    // Show chatbot when component unmounts
    return () => {
      window.dispatchEvent(new CustomEvent(CHATBOT_SHOW_EVENT));
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't seem to exist.
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;