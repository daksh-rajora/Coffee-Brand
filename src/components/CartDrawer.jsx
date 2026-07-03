import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoCloseOutline, 
  IoTrashOutline, 
  IoAddOutline, 
  IoRemoveOutline, 
  IoBagOutline, 
  IoArrowForwardOutline,
  IoShieldCheckmarkOutline,
  IoRibbonOutline
} from 'react-icons/io5';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    addToCart,
    setLastOrder
  } = useCart();

  const navigate = useNavigate();

  // Free shipping parameters
  const shippingThreshold = 1000;
  const isFreeShippingUnlocked = subtotal >= shippingThreshold;
  const amountToFreeShipping = shippingThreshold - subtotal;
  const shippingProgressFraction = Math.min(1, subtotal / shippingThreshold);

  const handleCheckout = () => {
    setLastOrder(null);
    setIsCartOpen(false);
    navigate('/checkout');
  };

  // Upsell / Recommendations items
  const upsellProducts = [
    {
      id: "upsell-frother",
      name: "Milk Frother",
      price: 350,
      image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=300&auto=format&fit=crop",
      category: "Accessories",
      roastLevel: "Accessory",
      weight: "1 Unit",
      description: "Battery-powered handheld milk frother for rich, creamy foam."
    },
    {
      id: "upsell-carafe",
      name: "Glass Carafe",
      price: 650,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&auto=format&fit=crop",
      category: "Accessories",
      roastLevel: "Accessory",
      weight: "600ml",
      description: "Heat-resistant borosilicate glass carafe for pour-over brewing."
    }
  ];

  const handleAddUpsell = (item) => {
    addToCart(item, 1, 'Whole Bean');
  };

  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-50 cursor-pointer"
          />

          {/* Slide-out Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-extrabold text-primary flex items-center gap-2">
                  <IoBagOutline className="w-5 h-5 text-primary" />
                  Your Daily Ritual
                </h2>
                <span className="inline-block text-[10px] bg-[#3BA9E0]/15 text-[#1b739e] font-extrabold px-2.5 py-0.5 rounded-full mt-1.5 uppercase tracking-wide">
                  {totalQty} {totalQty === 1 ? 'Item' : 'Items'} in Bag
                </span>
              </div>
              
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-400 hover:text-primary p-1.5 rounded-full hover:bg-neutral-50 transition-colors"
                aria-label="Close cart"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-grow overflow-y-auto p-5 space-y-6">
              
              {/* Shipping progress indicator */}
              {totalQty > 0 && (
                <div className="space-y-2 p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl">
                  <div className="flex justify-between text-xs text-emerald-800 font-bold">
                    <span>
                      {isFreeShippingUnlocked 
                        ? "You've unlocked Free Shipping! 🎉" 
                        : `You're ₹${amountToFreeShipping} away from Free Shipping!`}
                    </span>
                    <span className="text-neutral-400 font-semibold">
                      ₹{subtotal}/₹{shippingThreshold}
                    </span>
                  </div>
                  
                  {/* Progress bar line */}
                  <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${shippingProgressFraction * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-4xl block">☕</span>
                    <div>
                      <h3 className="font-serif text-base font-bold text-primary">Your cart is empty</h3>
                      <p className="text-xs text-neutral-400 max-w-[200px] mx-auto mt-1">
                        Select a coffee from the shop to start your ritual.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm"
                    >
                      Shop Blends
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-neutral-100 shadow-sm relative group"
                    >
                      
                      {/* Floating BEST BREW overlay badge */}
                      {item.isBestSeller && (
                        <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-[#005C8A] text-white text-[8px] font-black tracking-widest px-2.5 py-1.5 rounded-lg shadow-md rotate-[-9deg] flex flex-col items-center gap-0.5 border border-white">
                          <span>✨</span>
                          <span>BEST BREW</span>
                        </div>
                      )}

                      {/* Image */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-50 border border-neutral-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Details block */}
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-sm font-bold text-primary truncate pr-2">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.cartItemId)}
                              className="text-neutral-400 hover:text-rose-500 p-0.5 transition-colors"
                              aria-label="Remove item"
                            >
                              <IoTrashOutline className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            {item.selectedGrind} · {item.weight}
                          </p>
                          {item.isSubscription && (
                            <span className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded mt-1.5 uppercase tracking-wider">
                              Subscription ({item.frequency})
                            </span>
                          )}
                        </div>

                        {/* Qty and price line */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-neutral-200/60 rounded-full bg-neutral-50 px-1 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="p-1 text-neutral-500 hover:text-primary transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <IoRemoveOutline className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-primary">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="p-1 text-neutral-500 hover:text-primary transition-colors"
                              aria-label="Increase quantity"
                            >
                              <IoAddOutline className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <span className="text-sm font-extrabold text-primary">₹{item.price * item.quantity}</span>
                        </div>

                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Recommendation Upsell (Complete Your Ritual) */}
              {cartItems.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center text-[10px] font-extrabold text-neutral-400 uppercase tracking-widest my-6 before:content-[''] before:flex-grow before:border-t before:border-neutral-100 before:mr-3 after:content-[''] after:flex-grow after:border-t after:border-neutral-100 after:ml-3">
                    Complete Your Ritual
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                    {upsellProducts.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-neutral-50 border border-neutral-100 rounded-2xl p-3 flex items-center justify-between gap-3 min-w-[220px] max-w-[240px] flex-shrink-0 snap-start"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h5 className="font-serif text-xs font-bold text-primary truncate max-w-[110px]">{item.name}</h5>
                            <span className="text-xs font-extrabold text-neutral-500">₹{item.price}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleAddUpsell(item)}
                          className="bg-[#2D5A43] hover:bg-[#1B3B2B] text-white p-1.5 rounded-full shadow-sm hover:scale-105 transition-all flex items-center justify-center flex-shrink-0"
                          aria-label="Add upsell to cart"
                        >
                          <IoAddOutline className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Summary Box */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-neutral-100 bg-white space-y-4 shadow-2xl">
                
                {/* Financial Summary */}
                <div className="space-y-2 text-xs text-neutral-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-800">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#A84429]">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-neutral-100 my-2.5 pt-2.5 flex justify-between text-sm text-primary font-black">
                    <span>Total</span>
                    <span className="text-base font-extrabold">₹{subtotal}</span>
                  </div>
                </div>

                {/* Checkout CTA button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#A84429] hover:bg-[#8F341C] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex justify-center items-center gap-2 hover:scale-[1.01]"
                >
                  Checkout Now
                  <IoArrowForwardOutline className="w-4 h-4" />
                </button>

                {/* Trust Seals */}
                <div className="flex justify-center gap-6 text-[9px] font-bold text-neutral-400 uppercase tracking-widest pt-2.5">
                  <span className="flex items-center gap-1"><IoShieldCheckmarkOutline className="w-3.5 h-3.5" /> Secure Checkout</span>
                  <span className="flex items-center gap-1"><IoRibbonOutline className="w-3.5 h-3.5" /> 30-Day Guarantee</span>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
