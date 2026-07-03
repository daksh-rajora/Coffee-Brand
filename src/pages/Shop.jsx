import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { IoSearchOutline, IoFilterOutline, IoCloseOutline } from 'react-icons/io5';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamVal = searchParams.get('search') || '';
  const categoryParamVal = searchParams.get('category') || '';

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParamVal);
  const [selectedCategory, setSelectedCategory] = useState(categoryParamVal || 'All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync state if url parameters change
  useEffect(() => {
    setSearchQuery(searchParamVal);
  }, [searchParamVal]);

  useEffect(() => {
    if (categoryParamVal) {
      setSelectedCategory(categoryParamVal);
    }
  }, [categoryParamVal]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Clear URL param if user filters manually
    if (categoryParamVal) {
      searchParams.delete('category');
      setSearchParams(searchParams);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRoast('All');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavorNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesRoast = selectedRoast === 'All' || product.roastLevel === selectedRoast;

    return matchesSearch && matchesCategory && matchesRoast;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // 'featured' / default (best sellers first, then others)
    const valA = a.isBestSeller ? 2 : 1;
    const valB = b.isBestSeller ? 2 : 1;
    return valB - valA;
  });

  const categories = ['All', 'Coffee Beans', 'Ground Coffee', 'Cold Brew', 'Gift Boxes'];
  const roasts = ['All', 'Light Roast', 'Medium Roast', 'Dark Roast'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-primary">The Coffee Shop</h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mt-2 leading-relaxed">
          Explore our collection of small-batch freshly roasted coffee beans, cold brews, and premium sets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
        <aside className="hidden lg:block space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="font-serif text-base font-black text-primary flex items-center gap-1.5">
              <IoFilterOutline className="w-4 h-4" /> Filters
            </h3>
            {(selectedCategory !== 'All' || selectedRoast !== 'All' || searchQuery !== '') && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-accent hover:underline font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Categories</h4>
            <div className="flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-left text-xs font-medium py-1 px-2.5 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-cream font-bold'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Roast Filter */}
          <div className="space-y-2 pt-4 border-t border-neutral-200/50">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Roast Levels</h4>
            <div className="flex flex-col space-y-1.5">
              {roasts.map((roast) => (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  className={`text-left text-xs font-medium py-1 px-2.5 rounded-lg transition-colors ${
                    selectedRoast === roast
                      ? 'bg-primary text-cream font-bold'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary'
                  }`}
                >
                  {roast}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= CATALOG AREA ================= */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 border border-neutral-100 rounded-2xl shadow-sm">
            
            {/* Search Input bar */}
            <div className="relative w-full sm:max-w-xs">
              <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Right toolbar widgets */}
            <div className="flex justify-between items-center gap-3 w-full sm:w-auto">
              {/* Product Counter */}
              <span className="text-xs text-neutral-400 font-medium">
                Showing {sortedProducts.length} results
              </span>

              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary text-xs font-bold py-2 px-3 rounded-xl transition-colors bg-white shadow-sm"
              >
                <IoFilterOutline /> Filters
              </button>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-sm"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>

          </div>

          {/* Grid Render */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-neutral-100 shadow-sm space-y-4 max-w-md mx-auto mt-8">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-serif text-base font-bold text-primary">No products found</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We couldn't find any coffees matching your current search or filter selections. Try adjusting them or clearing filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-primary hover:bg-primary-light text-white text-xs font-semibold px-5 py-2.5 rounded-full"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* ================= MOBILE FILTERS DRAWER ================= */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          
          {/* Backdrop */}
          <div
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/40"
          />

          {/* Panel */}
          <div className="relative w-full max-w-xs bg-cream-light h-full p-6 shadow-2xl flex flex-col space-y-6 z-10 animate-slideLeft">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-serif text-base font-black text-primary flex items-center gap-1.5">
                <IoFilterOutline /> Filters
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-neutral-400 hover:text-primary p-1 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Categories</h4>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary border-primary text-cream font-bold'
                        : 'bg-white border-neutral-200 text-neutral-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Roasts */}
            <div className="space-y-2 pt-4 border-t border-neutral-200/50">
              <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Roast Levels</h4>
              <div className="flex flex-wrap gap-1.5">
                {roasts.map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-colors ${
                      selectedRoast === roast
                        ? 'bg-primary border-primary text-cream font-bold'
                        : 'bg-white border-neutral-200 text-neutral-600'
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All */}
            <div className="pt-8 border-t border-neutral-200/50 mt-auto flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-grow bg-white border border-neutral-300 hover:border-primary text-neutral-700 hover:text-primary font-bold py-2.5 rounded-xl text-xs"
              >
                Clear All
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-grow bg-primary hover:bg-primary-light text-white font-bold py-2.5 rounded-xl text-xs"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
