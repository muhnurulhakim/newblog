import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">Digital Insights</span>
              </Link>
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname.startsWith('/admin')
                        ? 'text-indigo-600'
                        : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    <User className="h-5 w-5 inline-block" />
                    <span className="ml-1">Admin</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600"
                  >
                    <LogOut className="h-5 w-5 inline-block" />
                    <span className="ml-1">Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-600"
                >
                  <User className="h-5 w-5 inline-block" />
                  <span className="ml-1">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}