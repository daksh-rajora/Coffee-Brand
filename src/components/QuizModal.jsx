import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline, IoCheckmarkCircle } from 'react-icons/io5';

const QuizModal = () => {
  const { isQuizOpen, setIsQuizOpen, addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    brewMethod: '',
    flavor: '',
    roast: '',
    style: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const totalSteps = 4;

  const handleClose = () => {
    setIsQuizOpen(false);
    // Reset state
    setStep(1);
    setAnswers({ brewMethod: '', flavor: '', roast: '', style: '' });
    setRecommendation(null);
    setIsCalculating(false);
  };

  const handleSelectOption = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    // Auto-advance after selection to feel snappy
    setTimeout(() => {
      if (step < totalSteps) {
        setStep(step + 1);
      } else {
        calculateResult();
      }
    }, 300);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateResult = () => {
    setIsCalculating(true);
    setStep(5); // Calculation screen
    
    setTimeout(() => {
      // Simple recommendation engine
      let matchedProduct = null;
      
      const flavor = answers.flavor;

      if (flavor === 'Bold & Spicy') {
        matchedProduct = products.find(p => p.id === 'prod-monsoon');
      } else if (flavor === 'Sweet & Fruity') {
        matchedProduct = products.find(p => p.id === 'prod-timor') || products.find(p => p.id === 'prod-summer');
      } else if (flavor === 'Rich & Chocolatey') {
        matchedProduct = products.find(p => p.id === 'prod-espresso') || products.find(p => p.id === 'prod-frenchpress');
      } else {
        matchedProduct = products.find(p => p.id === 'prod-summer') || products.find(p => p.id === 'prod-frenchpress');
      }

      // Fallback
      if (!matchedProduct) {
        matchedProduct = products[0];
      }

      setRecommendation(matchedProduct);
      setIsCalculating(false);
    }, 1500);
  };

  const handleAddRecommendation = () => {
    if (recommendation) {
      addToCart(recommendation, 1, answers.brewMethod || 'Whole Bean');
      handleClose();
    }
  };

  const quizStepsData = [
    {
      step: 1,
      key: 'brewMethod',
      question: "What's your preferred brewing method?",
      options: [
        { label: 'Espresso Machine', value: 'Espresso', icon: '☕' },
        { label: 'French Press', value: 'French Press', icon: '🏺' },
        { label: 'Pour Over (V60/Chemex)', value: 'Pour Over', icon: '📐' },
        { label: 'Cold Brew Jar', value: 'Cold Brew', icon: '🧊' }
      ]
    },
    {
      step: 2,
      key: 'flavor',
      question: "Which flavor profile appeals to you most?",
      options: [
        { label: 'Sweet & Fruity (Berry, Honey)', value: 'Sweet & Fruity', icon: '🍓' },
        { label: 'Rich & Chocolatey (Cocoa, Nutty)', value: 'Rich & Chocolatey', icon: '🍫' },
        { label: 'Bold & Spicy (Spice, Earthy)', value: 'Bold & Spicy', icon: '🌶️' },
        { label: 'Mild & Balanced (Caramel, Malt)', value: 'Mild & Balanced', icon: '⚖️' }
      ]
    },
    {
      step: 3,
      key: 'roast',
      question: "What roast level do you usually prefer?",
      options: [
        { label: 'Light Roast (Bright, Acidic, Tea-like)', value: 'Light Roast', icon: '🟡' },
        { label: 'Medium Roast (Balanced, Sweet, Smooth)', value: 'Medium Roast', icon: '🟤' },
        { label: 'Dark Roast (Bold, Heavy, Low Acidity)', value: 'Dark Roast', icon: '⚫' },
        { label: 'Surprise Me / No Preference', value: 'Medium Roast', icon: '✨' }
      ]
    },
    {
      step: 4,
      key: 'style',
      question: "How do you typically drink your coffee?",
      options: [
        { label: 'Black (No additions)', value: 'Black', icon: '☕' },
        { label: 'With Milk and Sugar', value: 'Milk', icon: '🥛' },
        { label: 'Vegan / Plant-based milk', value: 'Vegan', icon: '🌱' },
        { label: 'Iced / Cold drinks', value: 'Iced', icon: '❄️' }
      ]
    }
  ];

  const currentStepData = quizStepsData.find(s => s.step === step);

  return (
    <AnimatePresence>
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-cream-light w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-neutral-200/50 flex flex-col p-6 sm:p-8 min-h-[480px]"
          >
            
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6">
              <div>
                {step <= totalSteps && (
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">
                    Question {step} of {totalSteps}
                  </span>
                )}
                {step === 6 && (
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Match Found!
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-primary bg-white hover:bg-neutral-100 p-1.5 rounded-full z-20 shadow-sm transition-colors"
                aria-label="Close modal"
              >
                <IoCloseOutline className="w-5 h-5" />
              </button>
            </div>

            {/* Step Content */}
            <div className="flex-grow flex flex-col justify-center">
              
              {/* Question Screen */}
              {step <= totalSteps && currentStepData && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-primary leading-tight text-center">
                    {currentStepData.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentStepData.options.map((opt) => {
                      const isSelected = answers[currentStepData.key] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleSelectOption(currentStepData.key, opt.value)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 ${
                            isSelected
                              ? 'bg-primary border-primary text-cream shadow-md scale-[1.01]'
                              : 'bg-white border-neutral-200 hover:border-primary-light text-neutral-700 hover:bg-neutral-50/50'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="text-sm font-semibold">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Calculating Screen */}
              {step === 5 && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    <span className="absolute inset-0 flex items-center justify-center text-xl">☕</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary">Blending matches...</h3>
                    <p className="text-xs text-neutral-500 max-w-[250px] mx-auto mt-1 leading-relaxed">
                      Analyzing flavor notes, roast specifications, and brew preferences to select the perfect coffee.
                    </p>
                  </div>
                </div>
              )}

              {/* Result Screen */}
              {step === 5 && !isCalculating && recommendation && (
                // Set step to 6 to display final result
                setStep(6)
              )}

              {step === 6 && recommendation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 text-center"
                >
                  <div className="inline-flex items-center justify-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                    <IoCheckmarkCircle className="w-4 h-4 text-emerald-600" />
                    We found your perfect cup!
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 items-center bg-white border border-neutral-100 p-5 rounded-2xl shadow-sm text-left">
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="w-28 h-28 rounded-xl object-cover shadow-sm bg-neutral-50 border border-neutral-100"
                    />
                    <div>
                      <span className="text-[10px] bg-primary-light/10 text-primary-light font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {recommendation.roastLevel}
                      </span>
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-primary mt-1 mb-1">
                        {recommendation.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed mb-3">
                        {recommendation.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-extrabold text-primary">₹{recommendation.price}</span>
                        <span className="text-xs text-neutral-400 font-medium">/{recommendation.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        setStep(1);
                        setAnswers({ brewMethod: '', flavor: '', roast: '', style: '' });
                        setRecommendation(null);
                      }}
                      className="w-full sm:w-1/3 border border-neutral-300 hover:border-primary text-neutral-600 hover:text-primary font-bold py-3 px-4 rounded-xl text-sm transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={handleAddRecommendation}
                      className="w-full sm:w-2/3 bg-accent hover:bg-accent-dark text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      Add match to cart & Shop
                    </button>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Footer Navigation Buttons */}
            {step <= totalSteps && (
              <div className="flex items-center justify-between border-t border-neutral-200/60 pt-4 mt-6">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`flex items-center gap-1.5 text-xs font-bold py-2 px-3 rounded-lg border transition-all ${
                    step === 1
                      ? 'border-neutral-100 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-200 hover:border-primary text-neutral-600 hover:text-primary'
                  }`}
                >
                  <IoChevronBackOutline className="w-4 h-4" />
                  Back
                </button>
                
                {answers[currentStepData.key] && (
                  <button
                    onClick={() => {
                      if (step < totalSteps) {
                        setStep(step + 1);
                      } else {
                        calculateResult();
                      }
                    }}
                    className="flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-xs font-bold py-2 px-3.5 rounded-lg transition-colors"
                  >
                    Next
                    <IoChevronForwardOutline className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
