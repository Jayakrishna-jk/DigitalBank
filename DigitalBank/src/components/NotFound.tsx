import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
