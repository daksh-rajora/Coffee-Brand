import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products, categories, subscriptionPlans } from '../data/products';
import ProductCard from '../components/ProductCard';
import { IoChevronForwardOutline, IoShieldCheckmarkOutline, IoLeafOutline, IoFlashOutline, IoMailOutline } from 'react-icons/io5';

const Home = () => {
  const { setIsQuizOpen, openSubscriptionModal, addToast } = useCart();
  const [emailInput, setEmailInput] = useState('');
  const navigate = useNavigate();

  const bestSellers = products.filter((p) => p.isBestSeller);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      addToast(`Thank you! Code COFFEE10 has been sent to ${emailInput.trim()}`, 'success');
      setEmailInput('');
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Hero Left: Rounded Image Box */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square w-full max-w-md mx-auto">
              
              {/* Badge Top Left */}
              <span className="absolute top-4 left-4 z-10 bg-accent text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                ★ BEST SELLER
              </span>
              
              <img
                src="https://images.unsplash.com/photo-1517256064527-09c53b2d0c6b?q=80&w=600&auto=format&fit=crop"
                alt="Happy woman drinking coffee"
                className="w-full h-full object-cover"
              />

              {/* Badge Bottom Center */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-soft-blue-light/95 border border-soft-blue text-primary text-xs font-bold py-2 px-5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5 whitespace-nowrap">
                ✈️ FREE SHIPPING
              </div>

            </div>
          </div>

          {/* Hero Right: Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <span className="text-xs uppercase font-extrabold tracking-widest text-accent bg-accent/10 px-3.5 py-1.5 rounded-full">
              FRESHLY ROASTED WEEKLY
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-primary leading-tight">
              Good Coffee, <br className="hidden sm:inline" />
              <span className="text-accent italic font-serif font-normal">Good Mood.</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              We craft matches that fit your unique taste profile. Tell us what flavors you like, and we will brew and roast the perfect specialty cup for you, delivered straight to your door.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/shop"
                className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white font-bold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-center hover:scale-[1.01]"
              >
                Shop Now
              </Link>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto bg-white border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary font-bold py-3.5 px-8 rounded-xl transition-all duration-200 text-center shadow-sm"
              >
                Explore Blends
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 border-b border-neutral-200/50 pb-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-wider block">Shop by Category</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary mt-1">Find your perfect blend</h2>
          </div>
          <Link to="/shop" className="text-sm font-bold text-primary hover:text-accent transition-colors flex items-center gap-1">
            View All <IoChevronForwardOutline />
          </Link>
        </div>

        {/* 4 circular categories grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border border-neutral-200/50 shadow-sm group-hover:shadow-md transition-shadow duration-300 bg-white relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-primary mt-3 group-hover:text-accent transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">{cat.itemCount}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="bg-cream-light border-y border-neutral-200/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Top Rated</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary mt-1 relative inline-block">
              Our Best Sellers
              <span className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-16 h-1 bg-accent rounded" />
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. BETTER TOGETHER (French Press Bundle Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-soft-blue border border-soft-blue-light/50 rounded-3xl overflow-hidden relative shadow-sm">
          
          {/* Badge Top Right */}
          <div className="absolute top-4 right-4 bg-accent text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md z-10">
            SAVE 20%
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            {/* Banner Left */}
            <div className="md:col-span-7 space-y-4 text-left">
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary leading-tight">
                Better Together.
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-md leading-relaxed">
                Get our special starter coffee bundle featuring a premium glass French Press, a custom scoop, and a 250g bag of your choice.
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="inline-block bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-xl shadow-sm text-sm transition-colors"
              >
                Shop Bundles
              </button>
            </div>

            {/* Banner Right */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-md border border-white bg-white/40">
                <img
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=400&auto=format&fit=crop"
                  alt="French Press and Coffee Bag"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SUBSCRIPTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Never Run Out</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary mt-1">Never Run Out of Coffee</h2>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
            Freshly roasted beans delivered on your schedule. Free shipping, 10% discount on every bags, cancel anytime.
          </p>
        </div>

        {/* 3 cards subscription grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                plan.popular
                  ? 'border-primary ring-2 ring-primary/20 shadow-lg scale-[1.01] md:translate-y-[-8px]'
                  : 'border-neutral-200/75 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Highlight badge */}
              <span className={`absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                plan.popular ? 'bg-primary text-cream' : 'bg-neutral-100 text-neutral-500'
              }`}>
                {plan.badge}
              </span>

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-primary">{plan.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-medium">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 py-2 border-y border-neutral-100">
                  <span className="text-3xl font-black text-primary">₹{plan.price}</span>
                  <span className="text-xs text-neutral-500 font-semibold">/{plan.period}</span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                  {plan.description}
                </p>

                {/* Features checklist */}
                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-600">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-6 border-t border-neutral-100">
                <button
                  onClick={() => openSubscriptionModal(plan)}
                  className={`w-full font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition-all duration-200 shadow-sm ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary-light text-white hover:shadow'
                      : 'bg-white border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary'
                  }`}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURES VALUE PROPOSITION */}
      <section className="bg-cream-light py-10 border-y border-neutral-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            
            {/* Feature 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <IoLeafOutline className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-primary">Ethically Sourced</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  We trade directly with coffee farmers worldwide, guaranteeing them fair prices and investing in sustainable cultivation.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3">
              <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 flex-shrink-0">
                <IoFlashOutline className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-primary">Freshly Roasted</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Roasted in small, custom batches twice a week and packaged immediately in valved bags, securing rich aromas.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                <IoShieldCheckmarkOutline className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-primary">Premium Quality</h3>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  Only the top 1% specialty Arabica coffee beans are selected. We grade and cuptest every import meticulously.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. COFFEE QUIZ BANNER (Find Your Match) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-cream rounded-3xl overflow-hidden shadow-lg border border-primary-light/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            
            {/* Left Column */}
            <div className="md:col-span-8 space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Not sure what you like?
              </h2>
              <p className="text-xs sm:text-sm text-cream-light/80 max-w-xl leading-relaxed">
                Take our quick, interactive coffee match quiz. Answer 4 questions about your preferences, and let our taste engine recommend the perfect blend for you.
              </p>
              <button
                onClick={() => setIsQuizOpen(true)}
                className="bg-accent hover:bg-accent-dark text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors text-sm hover:scale-[1.01]"
              >
                Find My Perfect Match →
              </button>
            </div>

            {/* Right Column */}
            <div className="md:col-span-4 flex justify-center">
              <div className="text-7xl select-none animate-bounce">☕✨</div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Social Proof</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-primary mt-1">Brewing Joy for 50,000+ Coffee Lovers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-primary">Priya Sharma</h4>
                <p className="text-[10px] text-neutral-400 uppercase font-semibold">Coffee Enthusiast</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed">
              "The freshest beans I have ever ordered. The Monsoon Malabar is incredible, full-bodied with almost zero acidity. My morning routine will never be the same again."
            </p>
            <div className="flex text-accent text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-100 shadow-sm space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop"
                  alt="Rohan Mehta"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-primary">Rohan Mehta</h4>
                <p className="text-[10px] text-neutral-400 uppercase font-semibold">Home Barista</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 italic leading-relaxed">
              "You can smell the freshness the second the package arrives. The Summer Blend is incredibly fruity and bright, and works beautifully as a cold brew extraction."
            </p>
            <div className="flex text-accent text-sm">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 9. INSTAGRAM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Social Feed</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary mt-1">Join Our Community</h2>
          <a href="#" className="text-xs sm:text-sm font-bold text-accent mt-0.5 hover:underline">
            @thecoffeeclub
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {[
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=300&auto=format&fit=crop"
          ].map((img, i) => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-neutral-100 shadow-sm relative group cursor-pointer">
              <img
                src={img}
                alt="Instagram Coffee Lifestyle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg">❤️</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. NEWSLETTER SIGN UP BOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border border-neutral-200/50 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary">Get 10% OFF Your First Order</h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
              Sign up for our newsletter to receive brewing guides, early micro-lot announcements, and discount codes.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-grow">
              <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default Home;
