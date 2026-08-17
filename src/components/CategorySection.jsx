import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategorySection() {
  const categories = [
    { name: "Herbal Plants", image: "https://images.unsplash.com/photo-1594955355444-f86a9f5d3419?w=800&q=80", param: "Herbal", span: "md:col-span-2 md:row-span-2" },
    { name: "Ornamental Plants", image: "https://images.unsplash.com/photo-1548845924-118bd4d96c15?w=600&q=80", param: "Ornamental", span: "md:col-span-1 md:row-span-1" },
    { name: "Indoor Plants", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7e?w=600&q=80", param: "Indoor", span: "md:col-span-1 md:row-span-2" },
    { name: "Mini Plants", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80", param: "Mini Plants", span: "md:col-span-1 md:row-span-1" },
    { name: "Fruit Plants", image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80", param: "Fruit Plants", span: "md:col-span-2 md:row-span-1" },
    { name: "Outdoor Plants", image: "https://images.unsplash.com/photo-1674483785640-57140e4e7e6f?w=600&q=80", param: "Outdoor", span: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section className="py-24 bg-background-color dark:bg-gray-950 relative transition-colors duration-300">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-sage/20 dark:bg-emerald-900/20 rounded-full blur-3xl -translate-x-1/2 pointer-events-none transition-colors duration-300" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif font-bold text-forest dark:text-white mb-4 tracking-tight transition-colors duration-300"
            >
              Curated <br /><span className="italic text-primary-green">Collections.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 text-lg md:text-xl border-l-2 border-neon-green pl-4 transition-colors duration-300"
            >
              Discover nature's finest, sorted by character and style to match your unique spaces.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/plants" className="inline-block border-b-2 border-forest dark:border-white text-forest dark:text-white font-bold pb-1 hover:text-primary-green hover:border-primary-green transition-colors text-lg">
              View All Plants →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 lg:gap-8 h-auto md:h-[800px]">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative ${category.span} min-h-[250px]`}
            >
              <Link 
                to={`/plants?category=${category.param}`}
                className="group block w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden rounded-[2rem] group-hover:rounded-[3rem] transition-all duration-700 shadow-xl group-hover:shadow-2xl">
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/20 to-transparent z-10" />
                  
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-1000 relative z-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <h3 className="text-white font-serif font-bold text-2xl md:text-3xl leading-tight tracking-wide group-hover:text-neon-green transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-light-green/70 text-sm font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
