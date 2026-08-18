import { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Leaf, Heart } from "lucide-react";
import Gallery from "../components/Gallery";
import { useLanguage } from "../context/LanguageContext";
import SEOHead from "../components/SEOHead";

export default function About() {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-0 bg-white dark:bg-gray-950 transition-colors duration-300">
      <SEOHead
        title="About GreenLeaf Farms | Plant Nursery in Sembanarkoil, Mayiladuthurai"
        description="Learn about GreenLeaf Farms — a trusted plant nursery in Sembanarkoil, Mayiladuthurai, Tamil Nadu 609309. We grow eco-friendly indoor, outdoor & herbal plants using sustainable organic farming methods."
        canonicalPath="/about"
      />
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300"
          >
            {t('aboutTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300"
          >
            {t('aboutP1')} <br/><br/> {t('aboutP2')}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src={`${import.meta.env.BASE_URL}images/about_farm_1786994707913.png`}
            alt="GreenLeaf Farms nursery aerial view in Sembanarkoil, Mayiladuthurai, Tamil Nadu" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-background-color dark:bg-gray-900 py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-light-green text-primary-green flex items-center justify-center rounded-2xl mb-8">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                To inspire and enable everyone to bring nature into their everyday lives. We strive to provide the healthiest plants while educating our community on sustainable gardening practices, ensuring every plant finds a loving home where it can truly thrive.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-forest dark:bg-gray-800 p-10 rounded-3xl shadow-lg text-white transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-white/10 flex items-center justify-center rounded-2xl mb-8">
                <Leaf size={32} />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-4">Our Vision</h2>
              <p className="text-green-50 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
                To be the most trusted and environmentally conscious nursery, transforming concrete jungles into green sanctuaries. We envision a world where every home, office, and community space is enriched by the beauty and benefits of natural plant life.
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Farm Stats / Values */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Heart size={40} className="text-primary-green mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Grown with Care</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
            Every plant at GreenLeaf Farms is nurtured using eco-friendly and sustainable farming methods. We avoid harsh chemicals, prioritizing organic composts and natural pest control to ensure our plants are safe for you and the environment.
          </p>
        </div>
      </div>

      <Gallery />
    </div>
  );
}
