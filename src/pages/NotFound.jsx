import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background-color dark:bg-gray-950 px-4 transition-colors duration-300">
      <div className="text-center">
        <div className="w-24 h-24 bg-sage/20 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-8 transition-colors duration-300">
          <Leaf className="text-primary-green" size={40} />
        </div>
        <h1 className="text-6xl font-serif font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">404</h1>
        <h2 className="text-2xl font-serif font-semibold text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto transition-colors duration-300">
          Oops! It looks like this plant hasn't grown yet. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-8 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-dark-green transition-colors inline-block"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
