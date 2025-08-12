import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Info, LogIn, User } from 'lucide-react';
import { getCurrentUser, clearCurrentUser } from '../data/mockData';

const Navbar: React.FC = () => {
  const location = useLocation();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    clearCurrentUser();
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Tale of Talents</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link
              to="/talents"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/talents')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Users size={16} />
              <span>Talents</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Info size={16} />
              <span>About</span>
            </Link>

            {!currentUser ? (
              <Link
                to="/auth"
                className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <LogIn size={16} />
                <span>Apply Now</span>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to={currentUser.type === 'moderator' ? '/moderator' : '/dashboard'}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <User size={16} />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;