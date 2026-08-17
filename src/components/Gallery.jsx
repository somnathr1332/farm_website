import { motion } from "framer-motion";

export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4ce30?w=600&q=80",
    "https://images.unsplash.com/photo-1416879598555-220b852d2f10?w=600&q=80",
    "https://images.unsplash.com/photo-1596547610488-827ce7a0d4c7?w=600&q=80",
    "https://images.unsplash.com/photo-1620127807580-1a1362095cc1?w=600&q=80",
    "https://images.unsplash.com/photo-1582739243761-9e77695a70fb?w=600&q=80",
    "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600&q=80"
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Life at the Farm
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-primary-green mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square md:aspect-auto md:h-72 overflow-hidden rounded-xl group cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
