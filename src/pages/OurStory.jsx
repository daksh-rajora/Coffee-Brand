import React from 'react';

const OurStory = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full">
          Who We Are
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-primary">
          Our Journey
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
          Founded in 2022, The Coffee Club started with a simple belief: everyone deserves fresh, ethically sourced, and perfectly roasted specialty coffee.
        </p>
      </div>

      {/* Row 1: Sourcing with Intention */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column Content */}
        <div className="lg:col-span-6 space-y-5 order-2 lg:order-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary leading-tight">
            Sourcing with Intention
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Specialty coffee is not just a commodity; it's the result of months of care and hard work by farmers. We buy directly from organic estates and family farms across South India (Chikmagalur), Timor-Leste, Colombia, and Ethiopia.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            By paying premium premiums—far exceeding standard Fair Trade levels—we ensure farmers can invest in sustainable cultivation techniques, clean washing mills, and their local community's healthcare and schooling.
          </p>
        </div>

        {/* Right Column Image */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="rounded-3xl overflow-hidden shadow-md aspect-video w-full max-w-xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop"
              alt="Raw coffee beans drying in the sun"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </section>

      {/* Row 2: Precision Roasting */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column Image */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden shadow-md aspect-video w-full max-w-xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop"
              alt="Pouring freshly roasted coffee beans"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column Content */}
        <div className="lg:col-span-6 space-y-5 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-primary leading-tight">
            Scientific Roasting Precision
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Every green bean cargo holds a unique chemical profile, determined by height, soil chemistry, and humidity. To unlock their full potential, our roasting team uses thermodynamic monitoring software on our vintage custom drum roasters.
          </p>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            We adjust temperatures down to the tenth of a degree, monitoring air velocity and bean surface heat curves. Whether we want to reveal the floral acidity of a Light Roast Timor or the rich, caramel sweetness of our Dark Roast Classic Espresso, precision is our standard.
          </p>
        </div>

      </section>

      {/* Row 3: Cupping & Quality Check */}
      <section className="bg-cream-light border border-neutral-200/40 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
        <h2 className="font-serif text-2xl font-black text-primary">Sensory Testing & Cupping</h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          Before any bag is shipped, samples of every single batch undergo cupping—a standardized sensory inspection process. We measure aroma, acidity, mouthfeel, cleanliness, and sweetness. If a roast does not score at least 84 points on the SCA (Specialty Coffee Association) scale, we won't sell it. That's our freshness promise to you.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left pt-6 border-t border-neutral-200/40">
          <div>
            <span className="text-xl font-bold text-accent">86+</span>
            <p className="text-xs text-neutral-400 mt-1 uppercase font-semibold">Average SCA Score</p>
          </div>
          <div>
            <span className="text-xl font-bold text-accent">100%</span>
            <p className="text-xs text-neutral-400 mt-1 uppercase font-semibold">Direct Trade Sourced</p>
          </div>
          <div>
            <span className="text-xl font-bold text-accent">12-16 Hrs</span>
            <p className="text-xs text-neutral-400 mt-1 uppercase font-semibold">Small Batch Roasting</p>
          </div>
          <div>
            <span className="text-xl font-bold text-accent">24 Hrs</span>
            <p className="text-xs text-neutral-400 mt-1 uppercase font-semibold">Shipment window</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OurStory;
