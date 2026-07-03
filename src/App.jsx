import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import QuizModal from './components/QuizModal';
import SubscriptionModal from './components/SubscriptionModal';
import Toast from './components/Toast';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Subscriptions from './pages/Subscriptions';
import OurStory from './pages/OurStory';
import Blog from './pages/Blog';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* App Layout Shell */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <QuickViewModal />
        <QuizModal />
        <SubscriptionModal />
        <Toast />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
