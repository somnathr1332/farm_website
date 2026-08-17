import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background-color dark:bg-gray-950 pt-24 pb-20 lg:pt-32 transition-colors duration-300">
      {/* Full Size Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1596547610488-827ce7a0d4c7?w=1600&q=80"
        >
          <source src="/Farmwebsite.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay to ensure text readability on the left while keeping the video clear on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/60 dark:to-transparent pointer-events-none transition-colors duration-300" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start flex-grow mb-12">
        
        {/* Typography */}
        <div className="w-full lg:w-3/4 xl:w-2/3 flex flex-col justify-center relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full border border-white/40 text-white font-bold text-xs md:text-sm tracking-widest uppercase mb-6 shadow-sm transform -rotate-2 bg-white/10 backdrop-blur-md">
              EST. 2024 • TAMIL NADU'S FINEST
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-serif font-bold leading-[0.95] text-white tracking-tight mb-8 drop-shadow-lg"
          >
            நம்ம <br />
            <span className="italic font-light text-primary-green ml-8 lg:ml-24 block">மண்.</span>
            நம்ம இயற்கை.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 max-w-lg mb-10 pl-4 lg:pl-12 border-l-4 border-neon-green drop-shadow-md"
          >
            Cultivated with love in the fertile soils of Tamil Nadu. Discover wildly beautiful, farm-fresh plants nurtured for your unique spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 pl-4 lg:pl-12"
          >
            <Link 
              to="/plants"
              className="bg-primary-green hover:bg-neon-green text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Explore Catalog <ArrowRight size={20} />
            </Link>
            <Link 
              to="/about"
              className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-forest font-bold px-8 py-4 rounded-full transition-all"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-forest dark:bg-gray-900 text-light-green py-3 whitespace-nowrap z-30 transition-colors duration-300">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="inline-block text-sm md:text-base font-bold tracking-widest uppercase"
        >
          <span className="mx-4">🌿 100% இயற்கை உரம்</span>
          <span className="mx-4">🌱 தமிழ்நாட்டின் பெருமை</span>
          <span className="mx-4">💚 NATIONWIDE DELIVERY</span>
          <span className="mx-4">🌿 100% இயற்கை உரம்</span>
          <span className="mx-4">🌱 தமிழ்நாட்டின் பெருமை</span>
          <span className="mx-4">💚 NATIONWIDE DELIVERY</span>
          <span className="mx-4">🌿 100% இயற்கை உரம்</span>
          <span className="mx-4">🌱 தமிழ்நாட்டின் பெருமை</span>
          <span className="mx-4">💚 NATIONWIDE DELIVERY</span>
          <span className="mx-4">🌿 100% இயற்கை உரம்</span>
          <span className="mx-4">🌱 தமிழ்நாட்டின் பெருமை</span>
          <span className="mx-4">💚 NATIONWIDE DELIVERY</span>
        </motion.div>
      </div>
    </div>
  );
}
