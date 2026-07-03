import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('coffee_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [promoCode, setPromoCode] = useState(() => {
    return localStorage.getItem('coffee_promo') || '';
  });
  
  const [promoDiscount, setPromoDiscount] = useState(() => {
    const saved = localStorage.getItem('coffee_discount');
    return saved ? parseFloat(saved) : 0;
  });

  const [toasts, setToasts] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [tempCheckoutItem, setTempCheckoutItem] = useState(() => {
    const saved = localStorage.getItem('coffee_temp_checkout');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal / UI states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSubPlan, setSelectedSubPlan] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('coffee_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (tempCheckoutItem) {
      localStorage.setItem('coffee_temp_checkout', JSON.stringify(tempCheckoutItem));
    } else {
      localStorage.removeItem('coffee_temp_checkout');
    }
  }, [tempCheckoutItem]);

  useEffect(() => {
    localStorage.setItem('coffee_promo', promoCode);
    localStorage.setItem('coffee_discount', promoDiscount.toString());
  }, [promoCode, promoDiscount]);

  // Toast notifications
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Item to Cart
  const addToCart = (product, quantity = 1, grind = 'Whole Bean', isSubscription = false, frequency = '') => {
    // Find matching item in cart (matching id, grind, subscription flag, and frequency)
    const existingIndex = cartItems.findIndex(
      (item) => 
        item.id === product.id && 
        item.selectedGrind === grind && 
        item.isSubscription === isSubscription && 
        item.frequency === frequency
    );

    if (existingIndex > -1) {
      setCartItems((prevItems) => {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      });
      addToast(`Updated quantity of ${product.name} in your cart!`, 'info');
    } else {
      const newItem = {
        ...product,
        quantity,
        selectedGrind: grind,
        isSubscription,
        frequency,
        cartItemId: `${product.id}-${grind}-${isSubscription ? frequency : 'one-time'}`
      };
      setCartItems((prevItems) => [...prevItems, newItem]);
      addToast(`${product.name} added to your cart!`, 'success');
    }
  };

  // Remove Item from Cart
  const removeFromCart = (cartItemId) => {
    const itemToRemove = cartItems.find(item => item.cartItemId === cartItemId);
    if (itemToRemove) {
      setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
      addToast(`${itemToRemove.name} removed from your cart.`, 'info');
    }
  };

  // Update Item Quantity
  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prevItems) => 
      prevItems.map((item) => 
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Apply Coupon
  const applyPromo = (code) => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'COFFEE10') {
      setPromoCode('COFFEE10');
      setPromoDiscount(0.10); // 10% off
      addToast('Coupon COFFEE10 applied! 10% discount added.', 'success');
      return { success: true, message: 'Coupon applied successfully!' };
    } else {
      addToast('Invalid coupon code.', 'error');
      return { success: false, message: 'Invalid coupon code.' };
    }
  };

  // Remove Coupon
  const removePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    addToast('Coupon removed.', 'info');
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setPromoDiscount(0);
    localStorage.removeItem('coffee_cart');
    localStorage.removeItem('coffee_promo');
    localStorage.removeItem('coffee_discount');
  };

  // Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Discount Amount
  const discountAmount = subtotal * promoDiscount;

  // Shipping
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;

  // Grand Total
  const total = subtotal - discountAmount + shippingFee;

  // Mock checkout submit
  const placeOrder = (shippingInfo, _paymentInfo) => {
    const isTemp = tempCheckoutItem !== null;
    const items = isTemp ? [tempCheckoutItem] : [...cartItems];
    const orderSubtotal = isTemp ? tempCheckoutItem.price : subtotal;
    const orderDiscount = isTemp ? 0 : discountAmount;
    const orderShipping = orderSubtotal > 999 || orderSubtotal === 0 ? 0 : 99;
    const orderTotal = orderSubtotal - orderDiscount + orderShipping;

    const orderDetails = {
      orderId: `TC-${Math.floor(100000 + Math.random() * 900000)}`,
      items,
      subtotal: orderSubtotal,
      discountAmount: orderDiscount,
      shippingFee: orderShipping,
      total: orderTotal,
      shippingInfo,
      paymentInfo: _paymentInfo,
      date: new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    setLastOrder(orderDetails);
    if (isTemp) {
      setTempCheckoutItem(null); // Clear temp checkout item
    } else {
      clearCart();
    }
    addToast('Order placed successfully! Thank you.', 'success');
    return orderDetails;
  };

  // Buy It Now sets temporary checkout item without modifying cartItems
  const buyItNowDirect = (product, grind, weight, isSubscription) => {
    // Reset previous success receipts
    setLastOrder(null);

    // 1. Calculate price
    let multiplier = 1;
    if (weight === '500g') multiplier = 1.8;
    if (weight === '1kg') multiplier = 3.2;
    let finalPrice = product.price * multiplier;
    if (isSubscription) {
      finalPrice = finalPrice * 0.85;
    }
    finalPrice = Math.round(finalPrice);

    // 2. Create mock item
    const orderItem = {
      ...product,
      price: finalPrice,
      quantity: 1,
      selectedGrind: grind,
      weight: weight,
      isSubscription: isSubscription,
      frequency: isSubscription ? 'Every 4 Weeks' : '',
      cartItemId: `${product.id}-${grind}-${isSubscription ? 'subscription' : 'one-time'}`
    };

    setTempCheckoutItem(orderItem);
  };

  // Helper triggers to open modals easily from subcomponents
  const openSubscriptionModal = (plan) => {
    setSelectedSubPlan(plan);
    setIsSubModalOpen(true);
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        promoCode,
        promoDiscount,
        toasts,
        lastOrder,
        subtotal,
        discountAmount,
        shippingFee,
        total,
        // Modal states
        isCartOpen,
        setIsCartOpen,
        isQuizOpen,
        setIsQuizOpen,
        isSubModalOpen,
        setIsSubModalOpen,
        selectedSubPlan,
        setSelectedSubPlan,
        isQuickViewOpen,
        setIsQuickViewOpen,
        quickViewProduct,
        setQuickViewProduct,
        // Operations
        addToCart,
        removeFromCart,
        updateQuantity,
        applyPromo,
        removePromo,
        clearCart,
        placeOrder,
        addToast,
        removeToast,
        openSubscriptionModal,
        openQuickView,
        buyItNowDirect,
        tempCheckoutItem,
        setTempCheckoutItem,
        setLastOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
