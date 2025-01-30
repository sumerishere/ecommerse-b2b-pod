import React, { useState, useEffect } from 'react';
import { Forward } from 'lucide-react';

// Sample feed data with real image URLs
const feedData = [
  {
    id: 1,
    author: "Savannah M. Fihad",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "When asked if GitHub users should expect any big alterations, Friedman answered that Microsoft is 'buying GitHub because [it] likes GitHub' and intended...",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    likes: 145,
    comments: [
      { id: 1, author: "John Doe", content: "This is great news!", authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36" },
      { id: 2, author: "Sarah Smith", content: "Interesting perspective!", authorImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" }
    ],
    shares: 12,
    isLiked: false
  },
  {
    id: 2,
    author: "Time Global Consultancy",
    authorImg: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    content: "We are thrilled to announce the launch of our latest product! Designed with innovation and customer feedback in mind.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    likes: 89,
    comments: [],
    shares: 8,
    isLiked: false
  }
];

// Reusing previous sidebar data...
const sidebarData = {
    account: {
      name: "My Account",
      position: "Current Position",
      contact: "Contact"
    },
    metrics: [
      { label: "Products Impression", value: "34k" },
      { label: "Profile Impression", value: "24k" }
    ],
    quickLinks: [
      "About", "Contact", "Products", "Blogs"
    ],
    communities: {
      favorites: [
        { name: "WomenInTech", type: "group" },
        { name: "Australia Women's Security", type: "group" },
        { name: "TLDR", type: "tag" },
        { name: "FinanceFridays", type: "tag" },
        { name: "[Host] San Francisco Dev", type: "event" }
      ],
      groups: [
        "Australia Women's Security",
        "[Admin] OnGold Company Group",
        "Sydney College Alumni Group",
        "Business in SF Bay Area",
        "Girls Who Code"
      ]
    }
  };
  

// Right sidebar product data
const topProducts = [
    { name: "Back Market/MacBook", count: "356 products" },
    { name: "Passenger Lifts", count: "89 products" },
    { name: "Batteries", count: "120 products" },
    { name: "Solar & Renewable Energy", count: "78 products" },
    { name: "Medical Treatment Services", count: "145 products" },
    { name: "Fitness Supplements", count: "189 products" },
    { name: "PCD Pharma Franchise", count: "234 products" },
    { name: "Air Compressors", count: "167 products" },
    { name: "Automotive Oils", count: "198 products" },
    { name: "Agricultural Tools", count: "145 products" }
  ];

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setTimeout(() => {
        setPosts(feedData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId) => {
    if (activeCommentId === postId) {
      setActiveCommentId(null);
    } else {
      setActiveCommentId(postId);
      setShowShareOptions(null);
    }
  };

  const handleShare = (postId) => {
    if (showShareOptions === postId) {
      setShowShareOptions(null);
    } else {
      setShowShareOptions(postId);
      setActiveCommentId(null);
    }
  };

  const submitComment = (postId) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            author: "Current User",
            content: newComment,
            authorImg: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          }]
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const shareOptions = [
    { name: 'Copy Link', icon: '🔗' },
    { name: 'Share on LinkedIn', icon: '💼' },
    { name: 'Share on Twitter', icon: '🐦' },
    { name: 'Share on Facebook', icon: '👤' },
    { name: 'Send via Email', icon: '✉️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Left Sidebar - Keep previous implementation */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full"></div>
                <div className="ml-4">
                  <h3 className="font-semibold">{sidebarData.account.name}</h3>
                  <p className="text-sm text-gray-600">{sidebarData.account.position}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                {sidebarData.metrics.map((metric, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{metric.label}</span>
                    <span className="font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {sidebarData.quickLinks.map((link, index) => (
                  <li key={index} className="text-blue-600 hover:underline cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">Your Communities</h3>
              <div className="space-y-4">
                {sidebarData.communities.favorites.map((item, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className="w-6 h-6 bg-gray-200 rounded-full mr-2"></span>
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-6">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow mb-6 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center mb-4">
                      <img 
                        src={post.authorImg} 
                        alt={post.author} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-3">
                        <h4 className="font-semibold">{post.author}</h4>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <p className="mb-4">{post.content}</p>
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="w-full h-64 object-cover rounded-lg mb-4"
                    />
                    <div className="flex items-center space-x-4 text-gray-500">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 ${post.isLiked ? 'text-blue-600' : 'hover:text-blue-600'}`}
                      >
                        <span>{post.isLiked ? '❤️' : '🤍'} Like</span>
                        <span>{post.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleComment(post.id)}
                        className="flex items-center space-x-1 hover:text-blue-600"
                      >
                        <span>💬 Comment</span>
                        <span>{post.comments.length}</span>
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => handleShare(post.id)}
                          className="flex items-center space-x-1 hover:text-blue-600"
                        >
                          <span><Forward />Share</span>
                          <span>{post.shares}</span>
                        </button>
                        
                        {showShareOptions === post.id && (
                          <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                            {shareOptions.map((option, index) => (
                              <button
                                key={index}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2"
                                onClick={() => {
                                  alert(`Sharing via ${option.name}`);
                                  setShowShareOptions(null);
                                }}
                              >
                                <span>{option.icon}</span>
                                <span>{option.name}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {activeCommentId === post.id && (
                    <div className="border-t p-4">
                      <div className="mb-4">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2"
                            placeholder="Write a comment..."
                          />
                          <button
                            onClick={() => submitComment(post.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <img 
                              src={comment.authorImg} 
                              alt={comment.author} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <p className="font-semibold text-sm">{comment.author}</p>
                              <p className="text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {/* Right Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Top Selling Products</h3>
              <div className="space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-xs text-gray-500">{product.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;