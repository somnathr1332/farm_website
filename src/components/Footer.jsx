import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const Instagram = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const Facebook = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const Youtube = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-forest via-dark-green to-forest dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-light-green pt-20 pb-10 border-t-4 border-neon-green/30 relative overflow-hidden transition-colors duration-300">
      {/* Decorative leafy abstract background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-green/5 dark:bg-emerald-900/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2 pointer-events-none transition-colors duration-300" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl text-neon-green">🌿</span>
              <span className="font-bold text-2xl tracking-tight text-white">{siteConfig.name}</span>
            </div>
            <p className="text-light-green/80 leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={siteConfig.socials.instagram} className="text-green-200 hover:text-white transition-colors" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href={siteConfig.socials.facebook} className="text-green-200 hover:text-white transition-colors" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href={siteConfig.socials.youtube} className="text-green-200 hover:text-white transition-colors" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-dark-green/50 dark:border-gray-800 pb-2 inline-block transition-colors duration-300">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-light-green/80 hover:text-neon-green hover:pl-2 transition-all flex items-center gap-2"><span className="text-neon-green/50 text-xs">▶</span> Home</Link></li>
              <li><Link to="/plants" className="text-light-green/80 hover:text-neon-green hover:pl-2 transition-all flex items-center gap-2"><span className="text-neon-green/50 text-xs">▶</span> Catalog</Link></li>
              <li><Link to="/about" className="text-light-green/80 hover:text-neon-green hover:pl-2 transition-all flex items-center gap-2"><span className="text-neon-green/50 text-xs">▶</span> About Us</Link></li>
              <li><Link to="/contact" className="text-light-green/80 hover:text-neon-green hover:pl-2 transition-all flex items-center gap-2"><span className="text-neon-green/50 text-xs">▶</span> Contact</Link></li>
            </ul>
          </div>

          {/* Plant Categories */}
          <div>
            <h3 className="font-bold text-lg mb-6">Categories</h3>
            <ul className="space-y-3 text-green-100">
              <li><Link to="/plants?category=Herbal" className="hover:text-white transition-colors">Herbal Plants</Link></li>
              <li><Link to="/plants?category=Indoor" className="hover:text-white transition-colors">Indoor Plants</Link></li>
              <li><Link to="/plants?category=Outdoor" className="hover:text-white transition-colors">Outdoor Plants</Link></li>
              <li><Link to="/plants?category=Ornamental" className="hover:text-white transition-colors">Ornamental Plants</Link></li>
              <li><Link to="/plants?category=Fruit" className="hover:text-white transition-colors">Fruit Plants</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white border-b border-dark-green/50 dark:border-gray-800 pb-2 inline-block transition-colors duration-300">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 text-neon-green flex-shrink-0" size={20} />
                <span className="text-light-green/80">{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-neon-green flex-shrink-0" size={20} />
                <span className="text-light-green/80">{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-neon-green flex-shrink-0" size={20} />
                <span className="text-light-green/80">{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-neon-green flex-shrink-0" size={20} />
                <span className="text-light-green/80">{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-green/50 dark:border-gray-800 mt-12 pt-8 text-center text-light-green/60 text-sm transition-colors duration-300">
          <p>© {currentYear} {siteConfig.name}. All Rights Reserved.</p>
          <p>Bring Nature Home 💚</p>
        </div>
      </div>
    </footer>
  );
}
