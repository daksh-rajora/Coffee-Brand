import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { subscriptionPlans } from '../data/products';
import { IoChevronDownOutline, IoChevronUpOutline, IoTimeOutline, IoGiftOutline, IoSwapHorizontalOutline } from 'react-icons/io5';

const Subscriptions = () => {
  const { openSubscriptionModal } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I cancel or pause my subscription at any time?",
      a: "Yes, absolutely! You have complete control. You can pause, skip a delivery, change your frequency, grind selection, or cancel your subscription at any time with no fees or penalties directly from your profile settings."
    },
    {
      q: "How fresh is the coffee when it arrives?",
      a: "We roast our coffee in small batches on Mondays and Thursdays. Subscription orders are roasted and packaged within 24 hours of dispatch, ensuring they reach your door at peak aroma and flavor."
    },
    {
      q: "Is shipping free on subscription plans?",
      a: "Yes, free shipping is included on all subscription deliveries. You will never pay standard shipping fees on your recurrent coffee bags."
    },
    {
      q: "Can I choose which specific coffee blends I receive?",
      a: "By default, our Starter and Barista Select plans are curated by our head roaster to take you on a tasting journey through our single origins and seasonal blends. However, you can write to us if you want to lock in a specific favorite blend, and we will happily adjust your profile!"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="text-center">
        <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full">
          The Coffee Club Subscriptions
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-primary mt-4">
          Fresh Coffee, On Your Schedule
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Skip the supermarket shelves. Subscribe to receive small-batch specialty coffees direct from our roasting room, roasted just for you.
        </p>
      </div>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="bg-white border border-neutral-100 rounded-3xl p-8 sm:p-12 shadow-sm">
        <h2 className="font-serif text-2xl font-black text-primary text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-3 p-2">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-2xl mb-1">
              <IoSwapHorizontalOutline />
            </div>
            <h3 className="font-serif text-base font-bold text-primary">1. Select Your Plan</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Choose from our Starter, Barista, or Connoisseur packages depending on how much coffee you consume.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-3 p-2">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-2xl mb-1">
              <IoTimeOutline />
            </div>
            <h3 className="font-serif text-base font-bold text-primary">2. Set the Frequency</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Configure your grind size (whole bean or ground) and choose how often you want coffee delivered (Weekly, Bi-weekly, or Monthly).
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-3 p-2">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-2xl mb-1">
              <IoGiftOutline />
            </div>
            <h3 className="font-serif text-base font-bold text-primary">3. Enjoy Free Delivery</h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Sit back and relax. Your custom-roasted beans will be shipped within 24 hours of roasting with free door-to-door delivery.
            </p>
          </div>

        </div>
      </section>

      {/* 3. PLANS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-white relative ${
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
                Configure Plan
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 4. SUBSCRIPTION FAQS */}
      <section className="bg-cream-light border border-neutral-200/50 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto shadow-sm">
        <h2 className="font-serif text-2xl font-black text-primary text-center mb-8">
          Subscription FAQs
        </h2>
        
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between font-serif font-bold text-primary text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <IoChevronUpOutline className="w-5 h-5 flex-shrink-0 text-neutral-400" /> : <IoChevronDownOutline className="w-5 h-5 flex-shrink-0 text-neutral-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-500 leading-relaxed border-t border-neutral-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Subscriptions;
