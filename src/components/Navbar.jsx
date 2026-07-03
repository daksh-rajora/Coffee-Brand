import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoCartOutline, IoSearchOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

const Navbar = () => {
  const { cartItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Total quantity in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-cream-light border-b border-neutral-100">
      {/* Top Banner */}
      <div className="w-full bg-primary text-cream text-center py-1.5 text-xs font-semibold tracking-wider">
        FREE SHIPPING ON ALL ORDERS OVER ₹999
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile menu toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-primary-light focus:outline-none p-1.5 rounded-lg border border-neutral-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <IoCloseOutline className="w-6 h-6" /> : <IoMenuOutline className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl sm:text-2xl font-black text-primary tracking-tight transition-colors duration-200 group-hover:text-primary-light">
              The Coffee Club
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10 text-sm font-medium">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-colors duration-200 py-2 border-b-2 ${
                  isActive ? 'text-accent border-accent' : 'text-neutral-600 hover:text-primary border-transparent hover:border-neutral-300'
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/our-story"
              className={({ isActive }) =>
                `transition-colors duration-200 py-2 border-b-2 ${
                  isActive ? 'text-accent border-accent' : 'text-neutral-600 hover:text-primary border-transparent hover:border-neutral-300'
                }`
              }
            >
              Our Story
            </NavLink>
            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                `transition-colors duration-200 py-2 border-b-2 ${
                  isActive ? 'text-accent border-accent' : 'text-neutral-600 hover:text-primary border-transparent hover:border-neutral-300'
                }`
              }
            >
              Subscriptions
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `transition-colors duration-200 py-2 border-b-2 ${
                  isActive ? 'text-accent border-accent' : 'text-neutral-600 hover:text-primary border-transparent hover:border-neutral-300'
                }`
              }
            >
              Blog
            </NavLink>
          </nav>

          {/* Right Tools (Search, User, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search for beans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-100/70 border border-neutral-200 rounded-full py-1.5 pl-4 pr-10 text-xs w-48 focus:w-60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-primary"
                aria-label="Search"
              >
                <IoSearchOutline className="w-4 h-4" />
              </button>
            </form>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-neutral-600 hover:text-primary p-2 rounded-full hover:bg-neutral-100 transition-all duration-200 relative"
              aria-label="Cart"
            >
              <IoCartOutline className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-cream-light shadow-sm animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-light border-t border-neutral-100 px-4 py-4 space-y-3 animate-fadeIn">
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center relative w-full mb-3">
            <input
              type="text"
              placeholder="Search for beans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-100 border border-neutral-200 rounded-full py-2 pl-4 pr-10 text-sm w-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-primary"
              aria-label="Search"
            >
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </form>

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-2 font-medium">
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors"
            >
              Our Story
            </Link>
            <Link
              to="/subscriptions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors"
            >
              Subscriptions
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-neutral-700 hover:bg-neutral-100 hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
