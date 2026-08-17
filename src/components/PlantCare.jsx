import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Droplets, Mountain, Scissors, RefreshCw } from "lucide-react";

export default function PlantCare() {
  const tips = [
    {
      icon: <Sun className="w-8 h-8 text-amber-500" />,
      title: "Light",
      desc: "Understand how much sunlight your plant needs."
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      title: "Water",
      desc: "Learn proper watering techniques."
    },
    {
      icon: <Mountain className="w-8 h-8 text-orange-700" />,
      title: "Soil",
      desc: "Choose the right soil for healthy growth."
    },
    {
      icon: <Scissors className="w-8 h-8 text-gray-600" />,
      title: "Pruning",
      desc: "Keep plants healthy and beautiful."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary-green" />,
      title: "Repotting",
      desc: "Know when your plant needs a larger pot."
    }
  ];

  return (
    <section className="py-24 bg-background-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Grow Better With Our Care Tips
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Even the healthiest plants need the right care. Discover our expert guides to keep your plants thriving all year round.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white rounded-full font-semibold transition-colors"
            >
              Ask an Expert
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.desc}</p>
              </div>
            ))}
            
            <Link to="/about" className="bg-primary-green p-6 rounded-2xl shadow-sm hover:bg-dark-green transition-colors flex flex-col justify-center items-center text-center text-white group cursor-pointer">
              <span className="font-bold text-xl mb-2">Read Full Guide</span>
              <span className="text-green-100 text-sm">Discover more tips</span>
              <div className="mt-4 bg-white/20 p-2 rounded-full group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </Link>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
