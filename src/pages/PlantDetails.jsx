import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Sun, Droplets, MapPin, Ruler, AlertCircle, ShoppingCart, CheckCircle, Minus, Plus } from "lucide-react";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { plants } from "../data/plants";
import { siteConfig } from "../config/site";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "../components/SEOHead";
import { useCart } from "../context/CartContext";

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundPlant = plants.find(p => p.id === parseInt(id));
    if (foundPlant) {
      setPlant(foundPlant);
    } else {
      navigate("/not-found");
    }
  }, [id, navigate]);

  if (!plant) return null;

  const defaultMessage = `Hello, I am interested in the ${plant.name} plant. Please share more details.`;
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  const waLink = siteConfig.socials.whatsapp.includes("?") 
    ? `${siteConfig.socials.whatsapp}&text=${encodedMessage}`
    : `${siteConfig.socials.whatsapp}?text=${encodedMessage}`;

  return (
    <div className="pt-24 pb-16 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEOHead
        title={`Buy ${plant.name} Plant Online | GreenLeaf Farms Sembanarkoil, Mayiladuthurai`}
        description={`Buy ${plant.name} (${plant.category}) from GreenLeaf Farms in Sembanarkoil, Mayiladuthurai, Tamil Nadu 609309. ${plant.description.substring(0, 120)}...`}
        canonicalPath={`/plants/${plant.id}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/plants" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green transition-colors mb-5 font-medium">
          <ArrowLeft size={18} /> Back to Catalog
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row transition-colors duration-300">
          
          {/* Plant Image */}
          <div className="lg:w-[40%] relative bg-gray-50 dark:bg-gray-800 h-[320px] lg:h-[420px] overflow-hidden transition-colors duration-300">
            <img 
              src={plant.image} 
              alt={`${plant.name} plant - Buy online from GreenLeaf Farms Sembanarkoil`} 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Plant Info */}
          <div className="lg:w-[60%] p-5 lg:p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-light-green dark:bg-emerald-900/30 text-primary-green dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                {plant.category}
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-3 tracking-tight transition-colors duration-300">
              {plant.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-primary-green">₹{plant.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per plant</span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 transition-colors duration-300">
              {plant.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
                <span className="px-5 py-2 text-lg font-bold text-gray-900 dark:text-white min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus size={16} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total: <span className="font-bold text-gray-900 dark:text-white">₹{plant.price * quantity}</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    addToCart(plant);
                  }
                  setAddedToCart(true);
                  setTimeout(() => setAddedToCart(false), 2500);
                }}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                  addedToCart 
                    ? "bg-emerald-500 text-white" 
                    : "bg-primary-green text-white hover:bg-dark-green"
                }`}
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="added"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle size={22} /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="inline-flex items-center gap-2"
                    >
                      <ShoppingCart size={22} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* WhatsApp Enquiry */}
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white hover:bg-[#1da851] rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <WhatsAppIcon size={22} />
                Enquire on WhatsApp
              </a>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-8 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">Care & Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-amber-500 mt-1 transition-colors duration-300">
                    <Sun size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Sunlight</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">{plant.sunlight}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-blue-500 mt-1 transition-colors duration-300">
                    <Droplets size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Watering</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">{plant.water}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg text-orange-600 mt-1 transition-colors duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Location</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">{plant.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">
                    <Ruler size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">Size</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300">{plant.size}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-sage/10 dark:bg-emerald-900/10 p-6 rounded-2xl border border-sage/20 dark:border-emerald-900/30 transition-colors duration-300">
                <div className="flex items-center gap-2 text-forest dark:text-primary-green font-bold mb-2 transition-colors duration-300">
                  <AlertCircle size={20} /> Expert Care Tip
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                  {plant.care}
                </p>
              </div>

              {plant.benefits && plant.benefits.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">Key Benefits:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {plant.benefits.map((benefit, i) => (
                      <li key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm transition-colors duration-300">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
