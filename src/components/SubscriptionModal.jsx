import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoAddOutline, IoRemoveOutline, IoCalendarOutline } from 'react-icons/io5';

const SubscriptionModal = () => {
  const {
    isSubModalOpen,
    setIsSubModalOpen,
    selectedSubPlan,
    addToCart
  } = useCart();

  const [grind, setGrind] = useState('Whole Bean');
  const [frequency, setFrequency] = useState('Every 2 Weeks');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Reset options when opening for a different plan
    if (isSubModalOpen) {
      setGrind('Whole Bean');
      setFrequency('Every 2 Weeks');
      setQuantity(1);
    }
  }, [isSubModalOpen, selectedSubPlan]);

  if (!selectedSubPlan) return null;

  const handleClose = () => {
    setIsSubModalOpen(false);
  };

  const handleSubscribe = () => {
    // Construct subscription item
    const subProduct = {
      id: selectedSubPlan.id,
      name: `${selectedSubPlan.name} Subscription`,
      price: selectedSubPlan.price,
      image: selectedSubPlan.id === 'sub-starter' 
        ? "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?q=80&w=600&auto=format&fit=crop"
        : selectedSubPlan.id === 'sub-barista'
          ? "https://images.unsplash.com/photo-1627932646914-2d07570f878a?q=80&w=600&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1589733901241-5e53429e1dbf?q=80&w=600&auto=format&fit=crop",
      description: `Plan: ${selectedSubPlan.name} (${selectedSubPlan.bagsCount} bags of specialty coffee delivered ${frequency.toLowerCase()}).`,
      roastLevel: "Assorted Roast",
      category: "Subscription",
      weight: `${selectedSubPlan.bagsCount} Bags`
    };

    addToCart(subProduct, quantity, grind, true, frequency);
    handleClose();
  };

  const grinds = ['Whole Bean', 'French Press', 'Pour Over', 'Espresso', 'Drip Filter'];
  const frequencies = ['Every Week', 'Every 2 Weeks', 'Every Month'];

  return (
    <AnimatePresence>
      {isSubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-cream-light w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-neutral-200/50 flex flex-col p-6 sm:p-8"
          >
            
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-primary bg-white hover:bg-neutral-100 p-1.5 rounded-full z-20 shadow-sm transition-colors"
              aria-label="Close modal"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>

            {/* Plan Info */}
            <div className="mb-6">
              <span className="text-[10px] bg-primary/10 text-primary-light font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Subscription Plan Configurator
              </span>
              <h2 className="font-serif text-2xl font-black text-primary mt-2">
                Configure Your {selectedSubPlan.name}
              </h2>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Customize your grind, delivery schedule, and volume below. Pause or cancel easily from your profile.
              </p>
            </div>

            {/* Config Options */}
            <div className="space-y-4">
              
              {/* Grind Selector */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  1. Select Grind Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {grinds.map((g) => {
                    const active = grind === g;
                    return (
                      <button
                        key={g}
                        onClick={() => setGrind(g)}
                        className={`text-xs font-semibold py-2 px-3 rounded-xl border text-center transition-colors ${
                          active
                            ? 'bg-primary border-primary text-cream shadow-sm'
                            : 'bg-white border-neutral-200 hover:border-primary-light text-neutral-600'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Frequency Selector */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  2. Delivery Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {frequencies.map((f) => {
                    const active = frequency === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFrequency(f)}
                        className={`text-xs font-semibold py-2 px-3 rounded-xl border text-center transition-colors ${
                          active
                            ? 'bg-primary border-primary text-cream shadow-sm'
                            : 'bg-white border-neutral-200 hover:border-primary-light text-neutral-600'
                        }`}
                      >
                        {f}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  3. Plan Quantity (Multiplier)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-200 rounded-xl bg-white p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 text-neutral-500 hover:text-primary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <IoRemoveOutline className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-primary text-sm min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1.5 text-neutral-500 hover:text-primary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <IoAddOutline className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-neutral-400 font-medium">
                    ({selectedSubPlan.bagsCount * quantity} total bags delivered per cycle)
                  </span>
                </div>
              </div>

            </div>

            {/* Total price and Subscribe Button */}
            <div className="mt-8 pt-5 border-t border-neutral-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">Total cost</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary">₹{selectedSubPlan.price * quantity}</span>
                  <span className="text-xs text-neutral-500 font-medium">/{selectedSubPlan.period}</span>
                </div>
              </div>

              <button
                onClick={handleSubscribe}
                className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.01] flex items-center gap-2 text-xs sm:text-sm"
              >
                <IoCalendarOutline className="w-4 h-4" />
                Subscribe Now
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;
