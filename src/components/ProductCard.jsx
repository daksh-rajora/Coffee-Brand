import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoCartOutline, IoStar } from 'react-icons/io5';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Helper for roast badge coloring
  const getBadgeStyles = (roast) => {
    switch (roast?.toUpperCase()) {
      case 'DARK ROAST':
        return 'bg-neutral-900 text-white';
      case 'MEDIUM ROAST':
        return 'bg-blue-600 text-white';
      case 'LIGHT ROAST':
        return 'bg-amber-600 text-white';
      case 'SINGLE ORIGIN':
      default:
        return 'bg-accent text-white';
    }
  };

  const handleProductClick = (e) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default: adding quantity 1, grind "Whole Bean"
    addToCart(product, 1, 'Whole Bean');
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden group">
      
      {/* Product Image Wrapper */}
      <div className="relative pt-[100%] overflow-hidden bg-neutral-50 cursor-pointer" onClick={handleProductClick}>
        {/* Roast badge */}
        <span className={`absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${getBadgeStyles(product.roastLevel)}`}>
          {product.roastLevel}
        </span>
        
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        {/* view details hover cover */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-white/95 text-primary text-xs font-semibold px-4 py-2 rounded-full shadow-md backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center gap-0.5 text-accent mb-2">
          {[...Array(5)].map((_, i) => {
            const isFull = i < Math.floor(product.rating);
            return (
              <IoStar
                key={i}
                className={`w-3.5 h-3.5 ${isFull ? 'text-accent' : 'text-neutral-200'}`}
              />
            );
          })}
        </div>

        {/* Title */}
        <h3
          onClick={handleProductClick}
          className="font-serif text-base sm:text-lg font-bold text-primary hover:text-accent cursor-pointer transition-colors duration-150 line-clamp-1 mb-1"
        >
          {product.name}
        </h3>

        {/* Snippet Description */}
        <p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed flex-grow mb-4">
          {product.description}
        </p>

        {/* Bottom price and add-to-cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100">
          <div>
            <span className="text-xs text-neutral-400 block font-medium uppercase tracking-wider">{product.weight}</span>
            <span className="text-base sm:text-lg font-bold text-primary">₹{product.price}</span>
          </div>
          
          <button
            onClick={handleAddToCartClick}
            className="bg-primary hover:bg-primary-light text-white p-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            aria-label="Add to cart"
          >
            <IoCartOutline className="w-5 h-5" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ProductCard;
