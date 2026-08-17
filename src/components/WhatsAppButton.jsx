import WhatsAppIcon from "./WhatsAppIcon";
import { siteConfig } from "../config/site";

export default function WhatsAppButton() {
  const defaultMessage = "Hello, I would like to know more about your plants.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  
  // Checking if the whatsapp link already has a query parameter
  const waLink = siteConfig.socials.whatsapp.includes("?") 
    ? `${siteConfig.socials.whatsapp}&text=${encodedMessage}`
    : `${siteConfig.socials.whatsapp}?text=${encodedMessage}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all transform hover:scale-110 flex items-center justify-center animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
