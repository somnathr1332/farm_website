import { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Calendar } from "lucide-react";
import { guides } from "../data/guides";
import { useLanguage } from "../context/LanguageContext";

export default function CareGuides() {
  const { t, language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-colors duration-300"
          >
            {t('guides')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300"
          >
            {language === 'en' ? "Expert advice for nurturing your plants in the Tamil Nadu climate." : "தமிழ்நாட்டு சீதோஷ்ண நிலையில் உங்கள் செடிகளை வளர்ப்பதற்கான நிபுணர் ஆலோசனை."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2 text-xs font-bold text-forest">
                  <Calendar size={14} />
                  {guide.date}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {language === 'en' ? guide.title : guide.title_ta}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  {language === 'en' ? guide.content : guide.content_ta}
                </p>
                <button className="text-primary-green font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:text-forest transition-colors mt-auto">
                  <Leaf size={16} />
                  {language === 'en' ? 'Read More' : 'மேலும் படிக்க'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
