import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IoArrowBackOutline, IoLockClosedOutline, IoTicketOutline } from 'react-icons/io5';

const Checkout = () => {
  const {
    cartItems,
    lastOrder,
    placeOrder,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    promoCode,
    applyPromo,
    removePromo,
    addToast,
    tempCheckoutItem,
    setTempCheckoutItem
  } = useCart();

  const displayItems = tempCheckoutItem ? [tempCheckoutItem] : cartItems;
  const displaySubtotal = tempCheckoutItem ? tempCheckoutItem.price : subtotal;
  const displayDiscountAmount = tempCheckoutItem ? 0 : discountAmount;
  const displayShippingFee = tempCheckoutItem ? (tempCheckoutItem.price > 999 ? 0 : 99) : shippingFee;
  const displayTotal = tempCheckoutItem ? (tempCheckoutItem.price + displayShippingFee) : total;


  const [paymentMethod, setPaymentMethod] = useState('card');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: '',
    selectedBank: ''
  });

  const [couponInput, setCouponInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyPromo(couponInput);
      setCouponInput('');
    }
  };

  const triggerUpiDeepLink = (appName, mockVpa) => {
    setErrorMsg('');
    const { name, email, address, city, zip } = formData;
    
    // Validate shipping details first
    if (!name || !email || !address || !city || !zip) {
      setErrorMsg('Please fill in all shipping details before making a payment.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormData((prev) => ({ ...prev, upiId: mockVpa }));
    
    // Construct standard UPI deep link
    const upiLink = `upi://pay?pa=thecoffeeclub@okaxis&pn=TheCoffeeClub&am=${displayTotal}&cu=INR&tn=TC-Payment`;
    
    addToast(`Launching ${appName}... Please complete the transaction in your app.`, 'info');
    
    // Attempt to open the payment app
    try {
      window.open(upiLink, '_self');
    } catch (e) {
      console.warn("Deep link failed to open", e);
    }

    setIsSubmitting(true);
    
    // Simulate transaction completion
    setTimeout(() => {
      placeOrder(
        { name, email, address, city, zip },
        {
          method: `UPI (${appName})`,
          details: `Approved via ${appName} (VPA: ${mockVpa})`
        }
      );
      setIsSubmitting(false);
    }, 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Shipping validation
    const { name, email, address, city, zip, cardNumber, cardExpiry, cardCvv, upiId, selectedBank } = formData;
    if (!name || !email || !address || !city || !zip) {
      setErrorMsg('Please fill in all shipping details.');
      return;
    }

    // Payment validation
    let paymentDetails = {};
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        setErrorMsg('Please fill in all credit card details.');
        return;
      }
      paymentDetails = {
        method: 'Credit/Debit Card',
        details: `Card ending in XXXX-${cardNumber.replace(/\s+/g, '').slice(-4)}`
      };
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        setErrorMsg('Please enter your UPI ID.');
        return;
      }
      if (!upiId.includes('@')) {
        setErrorMsg('Please enter a valid UPI ID (e.g. name@upi).');
        return;
      }
      paymentDetails = {
        method: 'UPI',
        details: `UPI ID: ${upiId}`
      };
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        setErrorMsg('Please select your Bank.');
        return;
      }
      paymentDetails = {
        method: 'Net Banking',
        details: `${selectedBank}`
      };
    }

    setIsSubmitting(true);

    // Simulate payment API delay
    setTimeout(() => {
      placeOrder(
        { name, email, address, city, zip },
        paymentDetails
      );
      setIsSubmitting(false);
    }, 2000);
  };

  // 1. ORDER SUCCESS SCREEN
  if (lastOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-200 text-3xl shadow-sm">
          ✓
        </div>
        
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-primary">Order Confirmed!</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Thank you for shopping with us. Your coffee batch will be roasted and dispatched soon!
          </p>
        </div>

        {/* Invoice details */}
        <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-6 text-left space-y-4 max-w-xl mx-auto">
          <div className="flex justify-between items-center pb-3 border-b border-neutral-100 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-400 font-medium block">Order ID</span>
              <strong className="text-primary font-bold">{lastOrder.orderId}</strong>
            </div>
            <div className="text-right">
              <span className="text-neutral-400 font-medium block">Date</span>
              <span className="text-primary font-medium">{lastOrder.date}</span>
            </div>
          </div>

          {/* Items checklist */}
          <div className="space-y-3 pb-3 border-b border-neutral-100">
            <span className="text-[10px] uppercase font-black text-neutral-400 tracking-wider block">Items Ordered</span>
            {lastOrder.items.map((item) => (
              <div key={item.cartItemId} className="flex justify-between items-center text-xs text-neutral-600">
                <span className="font-medium">
                  {item.name} <span className="text-neutral-400">({item.selectedGrind}) x{item.quantity}</span>
                </span>
                <span className="font-semibold text-primary">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Shipping summary */}
          <div className="pb-3 border-b border-neutral-100 text-xs text-neutral-600">
            <span className="text-[10px] uppercase font-black text-neutral-400 tracking-wider block mb-1">Shipping Address</span>
            <p className="font-medium text-primary">{lastOrder.shippingInfo.name}</p>
            <p className="text-neutral-500">{lastOrder.shippingInfo.address}</p>
            <p className="text-neutral-500">{lastOrder.shippingInfo.city} - {lastOrder.shippingInfo.zip}</p>
          </div>

          {/* Payment summary */}
          {lastOrder.paymentInfo && (
            <div className="pb-3 border-b border-neutral-100 text-xs text-neutral-600">
              <span className="text-[10px] uppercase font-black text-neutral-400 tracking-wider block mb-1">Payment Method</span>
              <p className="font-semibold text-primary">{lastOrder.paymentInfo.method}</p>
              <p className="text-neutral-500">{lastOrder.paymentInfo.details}</p>
            </div>
          )}

          {/* Financial summary */}
          <div className="space-y-1.5 text-xs text-neutral-500 pt-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-800">₹{lastOrder.subtotal}</span>
            </div>
            {lastOrder.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Coupon Applied</span>
                <span>-₹{lastOrder.discountAmount.toFixed(0)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping fee</span>
              <span>{lastOrder.shippingFee === 0 ? 'FREE' : `₹${lastOrder.shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm text-primary font-bold border-t border-neutral-100 pt-2.5 mt-2">
              <span>Total Paid</span>
              <span>₹{lastOrder.total.toFixed(0)}</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            onClick={() => {
              setLastOrder(null);
              setTempCheckoutItem(null);
            }}
            className="inline-block bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-xl shadow-sm text-sm"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
    );
  }

  // 2. EMPTY CART REDIRECT
  if (cartItems.length === 0 && !tempCheckoutItem) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <span className="text-4xl block">🛒</span>
        <h1 className="font-serif text-xl font-bold text-primary">Your cart is empty</h1>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
          You must add items to your cart before proceeding to the checkout screen.
        </p>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-block bg-primary hover:bg-primary-light text-white font-semibold py-2.5 px-6 rounded-full text-xs shadow-sm"
          >
            Go to Coffee Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back to shop */}
      <div className="mb-6">
        <Link
          to="/shop"
          onClick={() => setTempCheckoutItem(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-primary transition-colors"
        >
          <IoArrowBackOutline /> Back to Coffee Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* ================= LEFT COLUMN: FORM DETAILS ================= */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-black text-primary flex items-center gap-2">
                Checkout Details
              </h1>
              <p className="text-xs text-neutral-400 mt-0.5">Please provide your delivery and dummy credit details.</p>
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-3.5 rounded-xl">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Shipping section */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-neutral-100 pb-2">
                  1. Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="priya@example.com"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, building, street, etc."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="city" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">City / Region</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">PIN / ZIP Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="e.g. 400001"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                  <IoLockClosedOutline /> 2. Secure Payment Method
                </h3>

                {/* Tab Selector */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-neutral-500 hover:text-primary'
                    }`}
                  >
                    💳 Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-colors ${
                      paymentMethod === 'upi'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-neutral-500 hover:text-primary'
                    }`}
                  >
                    📱 UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-colors ${
                      paymentMethod === 'netbanking'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-neutral-500 hover:text-primary'
                    }`}
                  >
                    🏦 Net Banking
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3.5">
                    <div>
                      <label htmlFor="cardNumber" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Credit Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4111 2222 3333 4444 (Mock card number)"
                        maxLength={19}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="cardExpiry" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Expiration Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCvv" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">CVV / Security Code</label>
                        <input
                          type="password"
                          id="cardCvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Fields */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-3.5">
                    <div>
                      <label htmlFor="upiId" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Enter UPI ID (VPA)</label>
                      <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="e.g. mobileNumber@upi, username@ybl"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                      {/* Interactive UPI App triggers */}
                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-2.5">Pay Instantly via UPI App</span>
                        <div className="grid grid-cols-3 gap-2.5">
                          
                          {/* GPay */}
                          <button
                            type="button"
                            onClick={() => triggerUpiDeepLink('Google Pay', 'user@okaxis')}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-neutral-200 bg-white hover:border-[#4285F4] hover:bg-[#4285F4]/5 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                          >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                              <path d="M12.2 2C6.6 2 2 6.6 2 12.2S6.6 22.4 12.2 22.4 22.4 17.8 22.4 12.2 17.8 2 12.2 2z" fill="#F8F9FA"/>
                              <path d="M17.5 10.6h-5.3v3.1h3c-.3 1.6-1.7 2.8-3.6 2.8-2.4 0-4.3-2-4.3-4.4s1.9-4.4 4.3-4.4c1.1 0 2.1.4 2.8 1.1l2.2-2.2C15.3 5.4 13.8 4.7 12.2 4.7c-4.1 0-7.5 3.3-7.5 7.5s3.3 7.5 7.5 7.5c4.3 0 7.2-3 7.2-7.3 0-.5 0-.9-.1-1.3z" fill="#4285F4"/>
                              <path d="M12.2 12.2h5.3v-.1H12.2v.1z" fill="#34A853"/>
                              <path d="M12.2 12.2V7.8l-1.9 1.9 1.9 2.5z" fill="#FBBC05"/>
                              <path d="M12.2 12.2l1.9-1.9-1.9-2.5v4.4z" fill="#EA4335"/>
                            </svg>
                            <span className="text-[10px] font-extrabold text-neutral-700">GPay</span>
                          </button>

                          {/* PhonePe */}
                          <button
                            type="button"
                            onClick={() => triggerUpiDeepLink('PhonePe', 'user@ybl')}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-neutral-200 bg-white hover:border-[#5f259f] hover:bg-[#5f259f]/5 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                          >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" fill="#5f259f"/>
                              <path d="M15.5 8.5c0-.8-.7-1.5-1.5-1.5H10c-.8 0-1.5.7-1.5 1.5v4.5c0 .3.1.6.3.8l2.7 2.7c.3.3.7.3 1 0l2.7-2.7c.2-.2.3-.5.3-.8V8.5z" fill="#FFF"/>
                              <circle cx="12" cy="11.5" r="1.5" fill="#5f259f"/>
                            </svg>
                            <span className="text-[10px] font-extrabold text-neutral-700">PhonePe</span>
                          </button>

                          {/* Paytm */}
                          <button
                            type="button"
                            onClick={() => triggerUpiDeepLink('Paytm', 'user@paytm')}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl border border-neutral-200 bg-white hover:border-[#00b9f5] hover:bg-[#00b9f5]/5 transition-all cursor-pointer shadow-sm hover:scale-[1.01]"
                          >
                            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                              <rect width="24" height="24" rx="6" fill="#002E6E"/>
                              <path d="M5.5 7h4c1.4 0 2.5 1.1 2.5 2.5v1c0 1.4-1.1 2.5-2.5 2.5h-2v4H5.5V7zm4 4c.6 0 1-.4 1-1v-1c0-.6-.4-1-1-1h-2v3h2z" fill="#00b9f5"/>
                              <path d="M13.5 11v6H12v-6h1.5zm0-2.5v1.2H12V8.5h1.5z" fill="#00b9f5"/>
                            </svg>
                            <span className="text-[10px] font-extrabold text-neutral-700">Paytm</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Fields */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-3.5">
                    <div>
                      <label htmlFor="selectedBank" className="block text-[10px] font-bold uppercase text-neutral-400 mb-1">Select Bank</label>
                      <select
                        id="selectedBank"
                        name="selectedBank"
                        value={formData.selectedBank}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer shadow-sm"
                      >
                        <option value="">-- Choose Your Bank --</option>
                        <option value="SBI (State Bank of India)">SBI (State Bank of India)</option>
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex justify-center items-center gap-2 hover:scale-[1.01] disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing Authorization...
                    </>
                  ) : (
                    `Place Order - ₹${displayTotal.toFixed(0)}`
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: ORDER SUMMARY ================= */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm flex flex-col justify-between h-fit">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-neutral-100 pb-2">
              Order Summary
            </h3>

            {/* Cart products items */}
            <div className="space-y-3.5 max-h-[250px] overflow-y-auto pr-1">
              {displayItems.map((item) => (
                <div key={item.cartItemId} className="flex gap-3 text-xs text-neutral-700">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif font-bold text-primary truncate">{item.name}</h4>
                    <p className="text-[10px] text-neutral-400 font-medium">Grind: {item.selectedGrind}</p>
                    <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">x{item.quantity}</p>
                  </div>
                  <span className="font-bold text-primary flex-shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            {!promoCode ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-grow">
                  <IoTicketOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Coupon Code (COFFEE10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-light text-white text-xs font-bold px-3.5 py-2 rounded-lg"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-emerald-800">
                <span className="font-medium">Coupon active: <strong>{promoCode}</strong> (-10%)</span>
                <button onClick={removePromo} className="text-neutral-400 hover:text-rose-500 font-bold px-1.5">
                  Remove
                </button>
              </div>
            )}

            {/* Price list details */}
            <div className="space-y-2 text-xs text-neutral-500 pt-3 border-t border-neutral-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-800">₹{displaySubtotal}</span>
              </div>
              {displayDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-₹{displayDiscountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{displayShippingFee === 0 ? 'FREE' : `₹${displayShippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm text-primary font-bold border-t border-neutral-100 pt-3 mt-3">
                <span>Total</span>
                <span className="text-base font-black">₹{displayTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
