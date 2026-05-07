import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { LogOut } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-stone-600 mb-4">Please log in to view your profile</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gold hover:bg-gold/90 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Go to Login
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-serif text-stone-800 mb-8">My Profile</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-2">
                Full Name
              </label>
              <p className="text-lg text-stone-800">{user.name}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-2">
                Email Address
              </label>
              <p className="text-lg text-stone-800">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-600 mb-2">
                User ID
              </label>
              <p className="text-lg text-stone-800">{user.id}</p>
            </div>

            <div className="pt-8 border-t border-gold/20">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
