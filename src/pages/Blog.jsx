import React, { useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import { IoTimeOutline, IoPersonOutline, IoCloseOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center">
        <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3.5 py-1.5 rounded-full">
          The Brewing Room
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-primary mt-4">
          Master the Craft
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-lg mx-auto mt-2 leading-relaxed">
          Learn the extraction methods, grind specs, and recipe configurations used by award-winning baristas to brew delicious coffee at home.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col cursor-pointer group"
          >
            {/* Cover Image */}
            <div className="relative pt-[60%] overflow-hidden bg-neutral-100">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-white/95 text-primary text-[10px] font-bold py-1 px-2.5 rounded-md shadow-sm backdrop-blur-sm">
                {post.readTime}
              </span>
            </div>

            {/* Content Preview */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] text-accent font-extrabold uppercase tracking-wider block">
                  {post.date}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-black text-primary leading-snug group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                  {post.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-50/70 text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <IoPersonOutline /> {post.author.split(',')[0]}
                </span>
                <span className="text-primary hover:text-accent font-bold flex items-center gap-1">
                  Read Recipe →
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Reading Modal Details */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black"
            />

            {/* Reading Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-cream-light w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col border border-neutral-200/50"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-primary bg-white hover:bg-neutral-100 p-1.5 rounded-full z-20 shadow-sm transition-colors"
                aria-label="Close reader"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>

              {/* Cover Image in Reader */}
              <div className="h-44 sm:h-56 relative bg-neutral-100 flex-shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <span className="text-[10px] text-accent uppercase font-black tracking-widest bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">
                    Brewing Guide
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-black">{selectedPost.title}</h2>
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 pb-4 border-b border-neutral-200/50">
                  <span className="flex items-center gap-1"><IoPersonOutline /> {selectedPost.author}</span>
                  <span className="flex items-center gap-1"><IoTimeOutline /> {selectedPost.readTime}</span>
                  <span>{selectedPost.date}</span>
                </div>

                {/* Intro */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
                  {selectedPost.introduction}
                </p>

                {/* Equipment section */}
                <div className="bg-white border border-neutral-100 rounded-2xl p-4 sm:p-5">
                  <h4 className="font-serif text-sm font-bold text-primary mb-3">Equipment & Ingredients</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-600">
                    {selectedPost.equipment.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <IoCheckmarkCircleOutline className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps Section */}
                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-bold text-primary border-b border-neutral-100 pb-2">
                    Step-by-Step Instructions
                  </h4>
                  <ol className="space-y-5">
                    {selectedPost.steps.map((st) => (
                      <li key={st.step} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-primary text-cream text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                          {st.step}
                        </span>
                        <div>
                          <h5 className="font-serif text-sm font-bold text-primary">{st.title}</h5>
                          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-0.5">
                            {st.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blog;
