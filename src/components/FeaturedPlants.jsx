import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PlantCard from "./PlantCard";
import { plants } from "../data/plants";

export default function FeaturedPlants() {
  // Select first 6 available plants to feature
  const featured = plants.filter(p => p.available).slice(0, 6);

  return (
    <section className="py-20 bg-background-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Featured Collection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 text-lg"
            >
              Handpicked premium plants that will transform your space instantly.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link 
              to="/plants" 
              className="group flex items-center gap-2 text-primary-green font-semibold hover:text-dark-green transition-colors"
            >
              View All Plants 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((plant, index) => (
            <PlantCard key={plant.id} plant={plant} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
