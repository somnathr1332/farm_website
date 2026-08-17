import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { siteConfig } from "../config/site";
import { cn } from "../lib/utils";
import WhatsAppIcon from "./WhatsAppIcon";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Plants", path: "/plants" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav
        className={cn(
          "w-full transition-all duration-500 pointer-events-auto border-b",
          isScrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-gray-200/50 dark:border-gray-800/50 py-3 px-4 sm:px-8"
            : "bg-white/10 dark:bg-black/20 backdrop-blur-md border-white/20 dark:border-white/10 py-5 px-4 sm:px-8"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-forest dark:bg-primary-green p-2 rounded-lg text-neon-green dark:text-forest group-hover:scale-110 transition-transform">
              <Leaf className="h-5 w-5" />
            </div>
            <span className={cn(
              "font-serif font-bold text-xl tracking-tight hidden sm:block transition-colors duration-300",
              isScrolled ? "text-forest dark:text-white" : "text-white"
            )}>
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all text-sm",
                  location.pathname === link.path
                    ? isScrolled ? "bg-forest/10 dark:bg-gray-800 text-forest dark:text-white" : "bg-white/20 text-white"
                    : isScrolled ? "text-gray-600 dark:text-gray-300 hover:text-forest dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800" : "text-gray-200 hover:text-white hover:bg-white/10"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle isScrolled={isScrolled} />
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-green text-white px-5 py-2.5 rounded-lg font-medium transition-all transform hover:scale-105 hover:bg-forest shadow-md hover:shadow-xl text-sm"
            >
              <WhatsAppIcon size={18} />
              <span>Enquire</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle isScrolled={isScrolled} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-forest dark:bg-primary-green text-white dark:text-forest p-2 rounded-full focus:outline-none shadow-md hover:bg-dark-green transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 mt-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-all duration-300 overflow-hidden shadow-2xl rounded-3xl border border-white/50 dark:border-gray-700/50",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent shadow-none"
          )}
        >
          <div className="p-4 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "block px-4 py-3 rounded-2xl text-base font-bold transition-colors",
                  location.pathname === link.path
                    ? "text-forest dark:text-primary-green bg-sage/30 dark:bg-gray-800"
                    : "text-gray-600 dark:text-gray-300 hover:text-forest dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                )}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-center mt-4 px-4 py-4 rounded-2xl bg-primary-green text-white font-bold shadow-md hover:bg-forest transition-colors"
            >
              <WhatsAppIcon size={20} />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
