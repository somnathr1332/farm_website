import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Sun, Droplets, MapPin, Ruler, AlertCircle } from "lucide-react";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { plants } from "../data/plants";
import { siteConfig } from "../config/site";
import { motion } from "framer-motion";
import SEOHead from "../components/SEOHead";

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

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
    <div className="pt-28 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEOHead
        title={`Buy ${plant.name} Plant Online | GreenLeaf Farms Sembanarkoil, Mayiladuthurai`}
        description={`Buy ${plant.name} (${plant.category}) from GreenLeaf Farms in Sembanarkoil, Mayiladuthurai, Tamil Nadu 609309. ${plant.description.substring(0, 120)}...`}
        canonicalPath={`/plants/${plant.id}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/plants" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-green dark:text-gray-400 dark:hover:text-primary-green transition-colors mb-8 font-medium">
          <ArrowLeft size={20} /> Back to Catalog
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row transition-colors duration-300">
          
          {/* Plant Image */}
          <div className="lg:w-1/2 relative bg-gray-50 dark:bg-gray-800 h-[400px] lg:h-auto transition-colors duration-300">
            <img 
              src={plant.image} 
              alt={`${plant.name} plant - Buy online from GreenLeaf Farms Sembanarkoil`} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Plant Info */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-light-green dark:bg-emerald-900/30 text-primary-green dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300">
                {plant.category}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors duration-300">
              {plant.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 transition-colors duration-300">
              {plant.description}
            </p>

            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-green text-white hover:bg-dark-green rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 mb-10"
            >
              <WhatsAppIcon size={22} />
              Enquire About This Plant
            </a>

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
