import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { t } = useLanguage();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    let message = "Hello! I would like to place an order:%0A%0A";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Qty: ${item.quantity} (Rs. ${item.price * item.quantity})%0A`;
    });
    message += `%0ATotal: Rs. ${totalPrice}`;

    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="text-primary-green" />
                {t('yourCart')}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p className="text-lg">{t('cartEmpty')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                          <p className="text-primary-green font-bold">{t('priceRs')} {item.price}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-semibold text-gray-900 dark:text-white w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-600 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-600 dark:text-gray-400">{t('total')}</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs. {totalPrice}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {t('checkoutWhatsApp')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
