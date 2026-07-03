import React from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCheckmarkCircle, IoInformationCircle, IoAlertCircle, IoClose } from 'react-icons/io5';

const Toast = () => {
  const { toasts, removeToast } = useCart();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <IoCheckmarkCircle className="text-emerald-500 w-5 h-5" />;
      case 'error':
        return <IoAlertCircle className="text-rose-500 w-5 h-5" />;
      case 'info':
      default:
        return <IoInformationCircle className="text-sky-500 w-5 h-5" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-rose-50 border-rose-200';
      case 'info':
      default:
        return 'bg-sky-50 border-sky-200';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center justify-between p-4 rounded-xl border shadow-lg ${getBgColor(toast.type)}`}
          >
            <div className="flex items-center gap-3">
              {getIcon(toast.type)}
              <p className="text-sm font-medium text-neutral-800">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded"
              aria-label="Close notification"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
