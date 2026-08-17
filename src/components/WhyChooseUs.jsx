import { motion } from "framer-motion";
import { Leaf, ShieldCheck, TreePine, HeartPulse, Sprout, Truck } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Sprout,
      title: "Farm Fresh",
      description: "Healthy plants carefully grown and maintained directly at our local farm.",
      offset: "lg:mt-0"
    },
    {
      icon: ShieldCheck,
      title: "Quality Plants",
      description: "We strictly select only the most healthy and strong plants for our customers.",
      offset: "lg:mt-16"
    },
    {
      icon: TreePine,
      title: "Wide Variety",
      description: "A huge selection of herbal, ornamental, indoor, outdoor and fruit plants.",
      offset: "lg:-mt-8"
    },
    {
      icon: HeartPulse,
      title: "Natural Living",
      description: "Bring more greenery into your everyday life and improve your wellbeing.",
      offset: "lg:mt-12"
    },
    {
      icon: Leaf,
      title: "Gardening Support",
      description: "Helpful plant-care guidance and expert advice for gardening beginners.",
      offset: "lg:-mt-4"
    },
    {
      icon: Truck,
      title: "Freshly Prepared",
      description: "Plants carefully packaged and prepared immediately before pickup or delivery.",
      offset: "lg:mt-20"
    }
  ];

  return (
    <section className="py-32 bg-forest dark:bg-gray-950 relative overflow-hidden text-white transition-colors duration-300">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-dark-green/30 dark:bg-emerald-900/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary-green/20 dark:bg-primary-green/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none transition-colors duration-300" />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center">
          <div className="lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white tracking-tighter leading-none"
            >
              Why Choose <br/><span className="text-neon-green italic font-light">GreenLeaf</span> Farms?
            </motion.h2>
          </div>
          <div className="lg:w-1/2">
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-light-green/80 text-xl md:text-2xl border-l-2 border-neon-green pl-6"
            >
              We are obsessed with quality. We ditch the standard nursery rules to bring you wildly healthy, vibrant plants grown with exceptional care.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 items-start pt-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className={`bg-dark-green/40 dark:bg-gray-900/40 backdrop-blur-md border border-light-green/10 dark:border-gray-800 p-10 rounded-[3rem] rounded-tr-[1rem] hover:bg-dark-green/60 dark:hover:bg-gray-900/80 transition-all duration-500 hover:-translate-y-4 group ${reason.offset}`}
            >
              <div className="bg-primary-green dark:bg-emerald-800 text-forest dark:text-white w-20 h-20 rounded-[2rem] rounded-tl-lg flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <reason.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white group-hover:text-neon-green transition-colors">{reason.title}</h3>
              <p className="text-light-green/70 leading-relaxed text-lg">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
