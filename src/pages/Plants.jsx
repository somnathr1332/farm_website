import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import PlantCard from "../components/PlantCard";
import { plants } from "../data/plants";
import { motion, AnimatePresence } from "framer-motion";

export default function Plants() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync category with URL
  useEffect(() => {
    if (selectedCategory === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", selectedCategory);
    }
    setSearchParams(searchParams, { replace: true });
  }, [selectedCategory, setSearchParams]);

  // Update selected category if URL changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const categories = ["All", "Herbal", "Indoor", "Outdoor", "Ornamental", "Mini Plants", "Fruit Plants"];

  const filteredPlants = plants.filter((plant) => {
    const matchesCategory = selectedCategory === "All" || plant.category === selectedCategory;
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-forest dark:bg-gray-900 text-white py-16 mb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-green-100 max-w-2xl mx-auto"
          >
            Browse through our wide variety of farm-fresh plants perfect for every space.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search plants by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-primary-green outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden w-full flex items-center justify-center gap-2 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={20} />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Desktop Categories */}
          <div className="hidden md:flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? "bg-primary-green text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Categories Dropdown */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden mb-8"
            >
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-wrap gap-2 transition-colors duration-300">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === cat 
                        ? "bg-primary-green text-white shadow-md" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Info */}
        <div className="mb-6 text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">
          Showing {filteredPlants.length} {filteredPlants.length === 1 ? 'plant' : 'plants'}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Plant Grid */}
        {filteredPlants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant, index) => (
              <PlantCard key={plant.id} plant={plant} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-sm text-center border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
              <Search className="text-gray-400 dark:text-gray-500" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">No plants found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors duration-300">We couldn't find any plants matching your current filters.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-3 bg-primary-green text-white rounded-full font-medium hover:bg-dark-green transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
