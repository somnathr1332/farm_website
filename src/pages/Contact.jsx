import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { siteConfig } from "../config/site";

export default function Contact() {
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    
    // Simulate form submission since this is a static site
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
      
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            We'd love to hear from you. Visit our farm or drop us a message below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-forest dark:bg-gray-900 text-white rounded-3xl p-10 lg:p-12 shadow-xl h-full relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
              
              <h2 className="text-3xl font-serif font-bold mb-8">Visit Our Farm</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0">
                    <MapPin className="text-light-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Address</h3>
                    <p className="text-green-100 leading-relaxed">{siteConfig.contact.address}</p>
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sage hover:text-white transition-colors text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0">
                    <Phone className="text-light-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Phone</h3>
                    <p className="text-green-100">{siteConfig.contact.phone}</p>
                    <a 
                      href={`tel:${siteConfig.contact.phone}`}
                      className="inline-block mt-2 text-sage hover:text-white transition-colors text-sm font-medium"
                    >
                      Call Us →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0">
                    <Mail className="text-light-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Email</h3>
                    <p className="text-green-100">{siteConfig.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl shrink-0">
                    <Clock className="text-light-green" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-1">Opening Hours</h3>
                    <p className="text-green-100">{siteConfig.contact.hours}</p>
                    <p className="text-sage text-sm mt-1">Closed on Sundays & Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Send us a Message</h2>
            
            {formStatus === "success" ? (
              <div className="bg-light-green/30 border border-primary-green/20 text-primary-green p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Plant Interested In (Optional)</label>
                  <input 
                    type="text" 
                    id="interest" 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="e.g. Aloe Vera, Mango Tree"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    required 
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 bg-primary-green text-white rounded-xl font-bold text-lg hover:bg-dark-green transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {formStatus === "submitting" ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
