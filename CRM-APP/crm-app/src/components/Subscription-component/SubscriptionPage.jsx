import { Check, Star } from "lucide-react";

const SubscriptionPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose your plan</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select the subscription that best fits your needs and start your 14-day free trial today.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Create Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col">
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Create</h2>
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  $79 <span className="text-lg font-normal text-gray-600">per month</span>
                </p>
                <p className="text-gray-600 mt-1">15,000 unique monthly visitors</p>
              </div>
              
              <form className="mb-6">
                <button type="button" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                  Start 14-day free trial
                </button>
              </form>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">#1 drag & drop builder</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Reusable page blocks and forms</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Real-time visual collaboration</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Triggered popups and sticky bars</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">AI content</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Mobile responsiveness</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <p className="text-sm text-gray-700 font-medium">Unlimited conversions</p>
            </div>
          </div>
          
          {/* Optimize Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-500 flex flex-col relative">
            <div className="absolute top-0 inset-x-0">
              <div className="bg-purple-500 text-white text-center py-1 px-4 text-sm font-medium">
                Recommended
              </div>
            </div>
            <div className="p-6 pt-10 flex-1">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Optimize</h2>
                <Star size={20} className="text-purple-500 ml-2" fill="#8B5CF6" />
              </div>
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">
                  $159 <span className="text-lg font-normal text-gray-600">per month</span>
                </p>
                <p className="text-gray-600 mt-1">30,000 unique monthly visitors</p>
              </div>
              
              <form className="mb-6">
                <button type="button" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                  Start 14-day free trial
                </button>
              </form>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">All Create features plus:</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Server-side A/B testing</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hypothesis setting and history</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Customizable traffic splitting</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Scheduling</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Multi-step forms</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Dynamic text replacement</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <p className="text-sm text-gray-700 font-medium">Unlimited conversions</p>
            </div>
          </div>
          
          {/* Convert Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col">
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Convert</h2>
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">Custom</p>
                <p className="text-gray-600 mt-1">Custom unique monthly visitors</p>
              </div>
              
              <form className="mb-6">
                <button type="button" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-md transition duration-300">
                  Get a demo
                </button>
              </form>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">All Optimize features plus:</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Enterprise-ready platform</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Global Blocks</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Heatmaps</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Audit logs</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Direct lead bypass</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-purple-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">CSM & Professional Services</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <p className="text-sm text-gray-700 font-medium">Unlimited conversions</p>
            </div>
          </div>
        </div>
        
        {/* Contact form for additional information */}
        <div className="max-w-xl mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need help choosing a plan?</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                rows="4" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Tell us about your needs"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Contact Sales
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;