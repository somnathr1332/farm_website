import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";

export default function PlantCard({ plant }) {
  const defaultMessage = `Hello, I am interested in the ${plant.name} plant. Please share more details.`;
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  const waLink = siteConfig.socials.whatsapp.includes("?") 
    ? `${siteConfig.socials.whatsapp}&text=${encodedMessage}`
    : `${siteConfig.socials.whatsapp}?text=${encodedMessage}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-[2.5rem] rounded-tr-[1rem] overflow-hidden shadow-xl hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.4)] dark:hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] transition-all duration-500 group flex flex-col h-full transform hover:-translate-y-3"
    >
      {/* Image container */}
      <div className="relative h-72 overflow-hidden m-2 rounded-[2rem] rounded-tr-lg bg-gray-100 dark:bg-gray-900">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur text-forest dark:text-gray-100 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm transition-colors duration-300">
          {plant.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-bold mb-2 text-forest dark:text-white group-hover:text-primary-green transition-colors">{plant.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-grow transition-colors duration-300">{plant.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <Link 
            to={`/plants/${plant.id}`}
            className="text-forest dark:text-gray-200 font-bold text-sm uppercase tracking-wider hover:text-primary-green dark:hover:text-primary-green transition-colors border-b-2 border-transparent hover:border-primary-green pb-1"
          >
            Explore
          </Link>
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary-green hover:bg-forest text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-xl transform hover:scale-110"
            aria-label={`Enquire about ${plant.name} on WhatsApp`}
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
