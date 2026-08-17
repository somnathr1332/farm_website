import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-forest text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Growing Green,<br />
              <span className="text-sage italic">Growing Better.</span>
            </h2>
            <p className="text-lg text-green-50 leading-relaxed">
              We believe every home deserves a little more green. At GreenLeaf Farms, we grow and carefully select plants that bring beauty, freshness and natural character to homes, gardens and workspaces.
            </p>
            <p className="text-lg text-green-50 leading-relaxed">
              Our farm uses sustainable practices to ensure every plant is healthy, strong, and ready to thrive in its new environment.
            </p>
            
            <div className="pt-4">
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest hover:bg-gray-100 rounded-full font-bold transition-all transform hover:-translate-y-1 shadow-lg"
              >
                Discover Our Story <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4ce30?w=800&q=80" 
              alt="GreenLeaf Farm Nursery" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 to-transparent flex items-end p-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                <p className="text-xl font-semibold">10+ Years of Expertise</p>
                <p className="text-green-100 text-sm mt-1">Cultivating nature with love and care.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
