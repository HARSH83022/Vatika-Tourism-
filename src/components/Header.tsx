import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Bot as Lotus } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', nameHindi: 'होम' },
    { name: 'Q&A Explorer', href: '/explorer', nameHindi: 'प्रश्न उत्तर' },
    { name: 'Add Q&A', href: '/add-qa', nameHindi: 'प्रश्न जोड़ें' },
    { name: 'Dashboard', href: '/dashboard', nameHindi: 'डैशबोर्ड' },
    { name: 'Map', href: '/map', nameHindi: 'नक्शा' },
    { name: 'Events', href: '/events', nameHindi: 'कार्यक्रम' },
    { name: 'Contact', href: '/contact', nameHindi: 'संपर्क' },
  ];

  return (
    <header className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <Lotus className="h-10 w-10 text-white" />
              <MapPin className="h-4 w-4 text-yellow-300 absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">VATIKA Tourism</h1>
              <p className="text-orange-100 text-sm">वाराणसी दर्शन</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'bg-white text-orange-600'
                    : 'text-white hover:bg-orange-400 hover:text-white'
                }`}
              >
                <span className="block">{item.name}</span>
                <span className="block text-xs opacity-75">{item.nameHindi}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-200 focus:outline-none focus:text-orange-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-orange-700 rounded-lg mb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-white text-orange-600'
                      : 'text-white hover:bg-orange-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="block">{item.name}</span>
                  <span className="block text-sm opacity-75">{item.nameHindi}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;