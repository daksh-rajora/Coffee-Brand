import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { IoStar, IoRefreshOutline, IoAirplaneOutline, IoLeafOutline, IoChevronForwardOutline } from 'react-icons/io5';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen, buyItNowDirect } = useCart();

  // Find product by id
  const product = products.find((p) => p.id === id) || products[0];

  // States
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [selectedWeight, setSelectedWeight] = useState('250g');
  const [isSubscribeActive, setIsSubscribeActive] = useState(false);

  // Sync state if URL product ID changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedGrind('Whole Bean');
    setSelectedWeight('250g');
    setIsSubscribeActive(false);
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id, product]);

  // Price calculations based on weight selection
  const getWeightPrice = () => {
    let multiplier = 1;
    if (selectedWeight === '500g') multiplier = 1.8;
    if (selectedWeight === '1kg') multiplier = 3.2;

    const basePrice = product.price * multiplier;
    // 15% discount if subscription toggle is active
    if (isSubscribeActive) {
      return Math.round(basePrice * 0.85);
    }
    return Math.round(basePrice);
  };

  const getWeightOriginalPrice = () => {
    if (!product.originalPrice) return null;
    let multiplier = 1;
    if (selectedWeight === '500g') multiplier = 1.8;
    if (selectedWeight === '1kg') multiplier = 3.2;
    return Math.round(product.originalPrice * multiplier);
  };

  const handleAddToCart = () => {
    const finalProduct = {
      ...product,
      price: getWeightPrice(),
      weight: selectedWeight
    };
    addToCart(
      finalProduct,
      1,
      selectedGrind,
      isSubscribeActive,
      isSubscribeActive ? 'Every 4 Weeks' : ''
    );
    setIsCartOpen(true); // Open the drawer automatically to show bag
  };

  const handleBuyNow = () => {
    buyItNowDirect(
      product,
      selectedGrind,
      selectedWeight,
      isSubscribeActive
    );
    navigate('/checkout'); // Direct checkout redirect
  };

  const grinds = ['Whole Bean', 'Fine', 'Coarse'];
  const weights = ['250g', '500g', '1kg'];

  // Filter out current product for related section
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      
      {/* 1. BREADCRUMBS */}
      <nav className="text-xs sm:text-sm text-neutral-400 font-semibold flex items-center gap-1.5" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <IoChevronForwardOutline className="w-3 h-3 text-neutral-300" />
        <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <IoChevronForwardOutline className="w-3 h-3 text-neutral-300" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <IoChevronForwardOutline className="w-3 h-3 text-neutral-300" />
        <span className="text-primary truncate font-bold">{product.name}</span>
      </nav>

      {/* 2. MAIN LAYOUT (Columns) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* ================= LEFT COLUMN: IMAGES ================= */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          
          {/* Vertical Thumbnails strip (Desktop left) */}
          <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
            {product.thumbnails?.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(thumb)}
                className={`w-16 h-16 rounded-2xl overflow-hidden border-2 bg-white transition-all shadow-sm ${
                  activeImage === thumb ? 'border-accent ring-2 ring-accent/15' : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <img src={thumb} alt={`${product.name} Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Large Image frame */}
          <div className="relative rounded-3xl overflow-hidden border border-neutral-100 bg-white aspect-[4/3] sm:aspect-square flex-grow shadow-sm">
            {product.isBestSeller && (
              <span className="absolute top-4 right-4 z-10 bg-accent text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                ★ BEST SELLER
              </span>
            )}
            
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Horizontal Thumbnails row (Mobile below) */}
          <div className="flex md:hidden gap-2 overflow-x-auto pb-1 flex-shrink-0 justify-center">
            {product.thumbnails?.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(thumb)}
                className={`w-14 h-14 rounded-xl overflow-hidden border-2 bg-white transition-all ${
                  activeImage === thumb ? 'border-accent' : 'border-neutral-200'
                }`}
              >
                <img src={thumb} alt={`${product.name} Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

        </div>

        {/* ================= RIGHT COLUMN: OPTIONS ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Title and Ratings */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-primary leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-1.5 mt-2.5">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => {
                  const isFull = i < Math.floor(product.rating);
                  return <IoStar key={i} className={`w-4 h-4 ${isFull ? 'text-accent' : 'text-neutral-200'}`} />;
                })}
              </div>
              <span className="text-xs text-neutral-500 font-bold ml-1">
                {product.rating} ({product.reviewsCount} Reviews)
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2.5 py-3 border-y border-neutral-100">
            <span className="text-3xl font-black text-primary">₹{getWeightPrice()}</span>
            {getWeightOriginalPrice() && (
              <span className="text-sm text-neutral-400 font-semibold line-through">
                ₹{getWeightOriginalPrice()}
              </span>
            )}
            {isSubscribeActive && (
              <span className="ml-2 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 font-extrabold px-2 py-0.5 rounded">
                SAVE 15% ACTIVE
              </span>
            )}
          </div>

          {/* Roast Intensity indicator */}
          <div className="space-y-2">
            <span className="block text-[10px] font-extrabold uppercase text-neutral-400 tracking-wider">
              Roast Intensity: <strong className="text-primary font-bold">{product.roastLevel.split(" ")[0]}</strong>
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-10 rounded-full transition-colors ${
                    i < (product.intensity || 3) ? 'bg-primary' : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Grind Selector */}
          <div className="space-y-2">
            <span className="block text-[10px] font-extrabold uppercase text-neutral-400 tracking-wider">
              Grind Type
            </span>
            <div className="flex gap-2">
              {grinds.map((g) => {
                const active = selectedGrind === g;
                return (
                  <button
                    key={g}
                    onClick={() => setSelectedGrind(g)}
                    className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border text-center transition-all ${
                      active
                        ? 'bg-primary border-primary text-cream shadow-sm font-bold'
                        : 'bg-white border-neutral-200 hover:border-neutral-400 text-neutral-600'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight Selector */}
          <div className="space-y-2">
            <span className="block text-[10px] font-extrabold uppercase text-neutral-400 tracking-wider">
              Weight
            </span>
            <div className="flex gap-2">
              {weights.map((w) => {
                const active = selectedWeight === w;
                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`flex-1 text-xs font-semibold py-2.5 px-3 rounded-xl border text-center transition-all ${
                      active
                        ? 'bg-primary border-primary text-cream shadow-sm font-bold'
                        : 'bg-white border-neutral-200 hover:border-neutral-400 text-neutral-600'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subscription toggle banner card */}
          <div className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
            isSubscribeActive
              ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
              : 'bg-soft-blue-light/50 border-soft-blue text-primary'
          }`}>
            <div className="flex items-center gap-3">
              <IoRefreshOutline className={`w-5 h-5 flex-shrink-0 ${isSubscribeActive ? 'text-emerald-600 animate-spin-slow' : 'text-primary'}`} />
              <div>
                <strong className="block text-xs font-bold">Subscribe & Save 15%</strong>
                <span className="text-[10px] text-neutral-500 font-medium">Get coffee delivered every 4 weeks.</span>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => setIsSubscribeActive(!isSubscribeActive)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none relative flex items-center ${
                isSubscribeActive ? 'bg-emerald-600' : 'bg-neutral-300'
              }`}
              aria-label="Toggle subscription"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  isSubscribeActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Action Buy Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-accent hover:bg-accent-dark text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm hover:scale-[1.01]"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-primary hover:bg-primary-light text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm hover:scale-[1.01]"
            >
              Buy It Now
            </button>
          </div>

          {/* Small feature flags */}
          <div className="flex justify-center gap-6 text-[10px] font-bold text-neutral-400 uppercase tracking-wider pt-4 border-t border-neutral-100">
            <span className="flex items-center gap-1.5"><IoAirplaneOutline className="text-neutral-400 w-3.5 h-3.5" /> Free Shipping</span>
            <span className="flex items-center gap-1.5"><IoLeafOutline className="text-neutral-400 w-3.5 h-3.5" /> Eco-Friendly</span>
          </div>

        </div>
      </section>

      {/* 3. DETAILS & BREWING GUIDES (Deep Dive layout) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 border-t border-neutral-200/50">
        
        {/* Left Column Deep Dive */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-black text-primary">A Deep Dive into Darkness</h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-3">
              {product.description}
            </p>
          </div>

          {product.quote && (
            <blockquote className="border-l-4 border-accent pl-4 text-xs sm:text-sm font-semibold italic text-primary leading-relaxed my-4">
              "{product.quote}"
            </blockquote>
          )}

          {/* Notes tags */}
          <div className="flex gap-4">
            {product.flavorNotes?.[0] && (
              <div className="bg-white border border-neutral-200/60 rounded-2xl p-4 flex-1 shadow-sm">
                <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">Notes</span>
                <span className="font-serif text-sm sm:text-base font-bold text-primary">{product.flavorNotes[0]}</span>
              </div>
            )}
            {product.flavorNotes?.[1] && (
              <div className="bg-white border border-neutral-200/60 rounded-2xl p-4 flex-1 shadow-sm">
                <span className="text-[9px] uppercase font-bold text-neutral-400 block mb-1">Finish</span>
                <span className="font-serif text-sm sm:text-base font-bold text-primary">{product.flavorNotes[1]}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column Brewing Guide Box */}
        <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif text-lg font-black text-primary border-b border-neutral-100 pb-3 mb-4 flex items-center gap-1.5">
            📖 Brewing Guide
          </h3>
          
          <ol className="space-y-4">
            {product.brewingGuide && (
              <>
                <li className="flex gap-3 items-start">
                  <span className="w-5.5 h-5.5 rounded-full bg-primary text-cream text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    1
                  </span>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-primary">{product.brewingGuide.step1Title}</h5>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                      {product.brewingGuide.step1Desc}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-5.5 h-5.5 rounded-full bg-primary text-cream text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    2
                  </span>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-primary">{product.brewingGuide.step2Title}</h5>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                      {product.brewingGuide.step2Desc}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-5.5 h-5.5 rounded-full bg-primary text-cream text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    3
                  </span>
                  <div>
                    <h5 className="font-serif text-sm font-bold text-primary">{product.brewingGuide.step3Title}</h5>
                    <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
                      {product.brewingGuide.step3Desc}
                    </p>
                  </div>
                </li>
              </>
            )}
          </ol>
        </div>

      </section>

      {/* 4. YOU MIGHT ALSO LIKE (Related products grid) */}
      <section className="pt-8 border-t border-neutral-200/50 space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl font-black text-primary text-center">You Might Also Like</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};

export default ProductDetail;
