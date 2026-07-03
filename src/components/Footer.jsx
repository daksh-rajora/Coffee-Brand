import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoInstagram, IoLogoFacebook, IoLogoTwitter, IoMailOutline } from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF7F2] border-t border-neutral-200/60 pt-16 pb-8 text-neutral-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-primary">The Coffee Club</h3>
            <p className="text-neutral-500 leading-relaxed max-w-xs">
              Crafting premium, ethically sourced, and micro-lot freshly roasted coffees that match your personal taste profile.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Instagram">
                <IoLogoInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Facebook">
                <IoLogoFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors" aria-label="Twitter">
                <IoLogoTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">Shop All Blends</Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-primary transition-colors">Coffee Subscriptions</Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-primary transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">Brewing Guides</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy & Terms</a>
              </li>
            </ul>
          </div>

          {/* Contact / Newsletter info */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold text-primary uppercase tracking-wider">Get in Touch</h4>
            <p className="text-neutral-500 leading-relaxed">
              Have questions, feedback, or just want to chat about coffee? Drop us a line.
            </p>
            <div className="flex items-center space-x-2.5 text-neutral-500">
              <IoMailOutline className="w-4 h-4 flex-shrink-0" />
              <a href="mailto:hello@thecoffeeclub.com" className="hover:text-primary transition-colors">
                hello@thecoffeeclub.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-neutral-200/60 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400">
          <p>© {currentYear} The Coffee Club. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed and brewed with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
