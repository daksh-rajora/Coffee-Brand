import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoAddOutline, IoRemoveOutline, IoStar } from 'react-icons/io5';

const QuickViewModal = () => {
  const {
    isQuickViewOpen,
    setIsQuickViewOpen,
    quickViewProduct,
    addToCart
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');

  if (!quickViewProduct) return null;

  const handleClose = () => {
    setIsQuickViewOpen(false);
    setQuantity(1);
    setSelectedGrind('Whole Bean');
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedGrind);
    handleClose();
  };

  const grinds = ['Whole Bean', 'French Press', 'Pour Over', 'Espresso', 'Drip Filter'];

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="bg-cream-light w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col md:flex-row border border-neutral-200/50"
          >
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-primary bg-white/80 hover:bg-white p-1.5 rounded-full z-20 shadow-sm transition-colors"
              aria-label="Close modal"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>

            {/* Left Column: Product Image */}
            <div className="w-full md:w-1/2 min-h-[250px] md:h-auto relative bg-neutral-100 flex-shrink-0">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            {/* Right Column: Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
              {/* Category */}
              <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-1">
                {quickViewProduct.category}
              </span>
              
              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary mb-2 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Price & Weight */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-black text-primary">₹{quickViewProduct.price}</span>
                <span className="text-xs text-neutral-500 font-medium">/ {quickViewProduct.weight}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <div className="flex text-accent">
                  {[...Array(5)].map((_, i) => (
                    <IoStar key={i} className="w-3.5 h-3.5" />
                  ))}
                </div>
                <span className="text-xs text-neutral-500 font-semibold ml-1">5.0 (Review Score)</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Flavor Notes */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Flavor Profile</h4>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.flavorNotes?.map((note, index) => (
                    <span
                      key={index}
                      className="bg-primary/5 text-primary-light text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid selectors */}
              <div className="space-y-4 pt-4 border-t border-neutral-200/60 mt-auto">
                {/* Grind Selector */}
                <div>
                  <label htmlFor="grind" className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                    Select Grind
                  </label>
                  <select
                    id="grind"
                    value={selectedGrind}
                    onChange={(e) => setSelectedGrind(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer shadow-sm"
                  >
                    {grinds.map((grind) => (
                      <option key={grind} value={grind}>
                        {grind}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity & Buy Button Row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-neutral-500 hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <IoRemoveOutline className="w-4 h-4" />
                    </button>
                    <span className="px-3.5 font-bold text-primary text-sm min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-neutral-500 hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <IoAddOutline className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-accent hover:bg-accent-dark text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
                  >
                    Add to Cart - ₹{quickViewProduct.price * quantity}
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
