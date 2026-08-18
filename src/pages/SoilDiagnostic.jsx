import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Droplet, Sun, Sprout, Leaf, ArrowRight, RefreshCw } from "lucide-react";
import { plants } from "../data/plants";
import PlantCard from "../components/PlantCard";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../context/LanguageContext";

export default function SoilDiagnostic() {
  const { language } = useLanguage();
  const [selectedSoil, setSelectedSoil] = useState("");
  const [selectedClimate, setSelectedClimate] = useState("");
  const [report, setReport] = useState(null);

  // Soil details (EN & TA)
  const soils = [
    {
      value: "Clay",
      name: { en: "Clay Soil", ta: "களிமண்" },
      desc: { en: "Heavy, fine-textured soil that retains water and nutrients well but has poor drainage and aeration.", ta: "நீர் மற்றும் ஊட்டச்சத்துக்களை நன்றாக தக்கவைக்கும் ஆனால் வடிகால் மற்றும் காற்றோட்டம் குறைவான அடர்ந்த மண்." },
      icon: "🧱",
    },
    {
      value: "Sandy",
      name: { en: "Sandy Soil", ta: "மணல் மண்" },
      desc: { en: "Light, coarse soil that drains very quickly and has low nutrient retention, requiring regular composting.", ta: "மிக வேகமாக நீர் வடிந்துவிடும், ஊட்டச்சத்துக்கள் குறைவாக இருக்கும், அடிக்கடி உரம் தேவைப்படும் மணற்பாங்கான மண்." },
      icon: "🏜️",
    },
    {
      value: "Loamy",
      name: { en: "Loamy Soil", ta: "வண்டல் மண்" },
      desc: { en: "Ideal mixture of sand, clay, and organic matter. Highly fertile, holds moisture, and drains perfectly.", ta: "மணல், களிமண் மற்றும் கரிமப் பொருட்களின் சிறந்த கலவை. அதிக வளமான மற்றும் உகந்த வடிகால் கொண்ட மண்." },
      icon: "🪵",
    },
    {
      value: "Red",
      name: { en: "Red Soil", ta: "செம்மண்" },
      desc: { en: "Iron-rich soil common in South India, with decent drainage, suitable for a wide range of organic herbs.", ta: "தென்னிந்தியாவில் பரவலான இரும்புச்சத்து நிறைந்த மண். நடுத்தர வடிகால் கொண்ட மூலிகைகளுக்கு உகந்த மண்." },
      icon: "🔴",
    },
  ];

  // Climate details (EN & TA)
  const climates = [
    {
      value: "Dry",
      name: { en: "Dry & Hot", ta: "வெப்பமான காலநிலை" },
      desc: { en: "High temperature, low humidity, strong sun. Requires heat-resistant and drought-tolerant crops.", ta: "அதிக வெப்பம், குறைந்த ஈரப்பதம் மற்றும் வெயில். வறட்சியைத் தாங்கும் செடிகள் தேவைப்படும் பகுதி." },
      icon: "☀️",
    },
    {
      value: "Humid",
      name: { en: "Humid & Coastal", ta: "கடலோர ஈரப்பதம்" },
      desc: { en: "High air moisture, salty breeze, warm ambient temperature. Great for palms and tropical foliage.", ta: "காற்றின் ஈரப்பதம் அதிகம், உப்பு காற்று, மிதமான வெப்பம். பனை மற்றும் வெப்பமண்டல இலைச்செடிகளுக்கு ஏற்றது." },
      icon: "🌊",
    },
    {
      value: "Cool",
      name: { en: "Cool & Hilly", ta: "குளிர் பிரதேசம் / மலைப்பாங்கான பகுதி" },
      desc: { en: "Lower temperatures, fresh air, frequent rainfall. Perfect for delicate herbs and leafy vegetables.", ta: "குறைந்த வெப்பநிலை, புதிய காற்று, அடிக்கடி மழைப்பொழிவு. மென்மையான மூலிகைகள் மற்றும் கீரைகளுக்கு ஏற்றது." },
      icon: "🏔️",
    },
  ];

  // Diagnostic advice data map
  const diagnosticData = {
    Clay: {
      healthIndex: 65,
      strengths: {
        en: "High nutrient retention, holds roots firmly, excellent moisture reservoir.",
        ta: "அதிக ஊட்டச்சத்துக்களைத் தக்கவைக்கும் திறன், வேர்களைப் பலமாகப் பிடிக்கும், நீண்ட நேரம் ஈரப்பதம் காக்கும்.",
      },
      challenges: {
        en: "Easily waterlogged, compaction prevents root aeration, hardens like brick when dry.",
        ta: "நீர் எளிதில் தேங்கிவிடும், மண் இறுகுவதால் வேர்களுக்கு காற்றோட்டம் கிடைக்காது, காய்ந்தால் பாறை போல் கடினமாகும்.",
      },
      enrichment: {
        en: "Mix in 30% organic coco peat or coir pith to loosen structure. Add aged vermicompost and river sand to improve drainage channels.",
        ta: "மண்ணை தளர்த்த 30% தேங்காய் நார் கழிவு கலக்கவும். வடிகால் வசதியை மேம்படுத்த மண்புழு உரம் மற்றும் ஆற்று மணல் சேர்க்கவும்.",
      },
    },
    Sandy: {
      healthIndex: 50,
      strengths: {
        en: "Superb drainage, zero waterlogging risk, loose texture allows rapid root spreading.",
        ta: "சிறந்த வடிகால் வசதி, நீர் தேங்கும் அபாயம் இல்லை, தளர்வான அமைப்பு என்பதால் வேர்கள் வேகமாகப் பரவும்.",
      },
      challenges: {
        en: "Extremely low nutrient holding capacity, dries out within hours, high temperature conductivity.",
        ta: "ஊட்டச்சத்துக்களைத் தக்கவைக்காது, சில மணிநேரங்களில் காய்ந்துவிடும், வெப்பத்தை வேகமாக வேர்களுக்குக் கடத்தும்.",
      },
      enrichment: {
        en: "Amplify organic matter. Incorporate dry cow dung manure, composted leaf mold, and red soil to build a binding body. Apply mulching heavily.",
        ta: "கரிமப் பொருட்களை அதிகரிக்கவும். மட்கிய தொழு உரம், இலை மக்கு மற்றும் செம்மண் சேர்த்து பிணைப்பை உருவாக்கவும். ஈரப்பதம் காக்க மூடாக்கு இடவும்.",
      },
    },
    Loamy: {
      healthIndex: 95,
      strengths: {
        en: "Perfect organic balance, natural aeration, high biological activity, optimal drainage speed.",
        ta: "சரியான கரிம சமநிலை, இயற்கையான காற்றோட்டம், அதிக நுண்ணுயிர் செயல்பாடு, சிறந்த வடிகால் வேகம்.",
      },
      challenges: {
        en: "Needs regular seasonal organic replenishment to maintain its high fertility levels over years.",
        ta: "ஆண்டுகள் கடந்தும் அதன் வளத்தைத் தக்கவைக்க பருவகால இயற்கை உரங்களை தொடர்ந்து இட வேண்டும்.",
      },
      enrichment: {
        en: "Apply Panchagavya spray monthly. Keep soil active with light doses of vermicompost and bio-fertilizers (Azospirillum/Phosphobacteria).",
        ta: "மாதமொருமுறை பஞ்சகவ்யா தெளிக்கவும். மண்புழு உரம் மற்றும் உயிர் உரங்களை (அசோஸ்பைரில்லம்) லேசான அளவில் இட்டு மண்ணை சுறுசுறுப்பாக வைத்திருக்கவும்.",
      },
    },
    Red: {
      healthIndex: 80,
      strengths: {
        en: "Rich in iron and aluminum minerals, porous structure with good drainage, holds basic nutrients well.",
        ta: "இரும்பு மற்றும் அலுமினிய தாதுக்கள் நிறைந்தது, நல்ல வடிகால் கொண்ட நுண்துளை அமைப்பு, ஊட்டச்சத்துக்களைத் தக்கவைக்கும்.",
      },
      challenges: {
        en: "Can become acidic over time, moderate organic matter levels, requires regular nitrogen addition.",
        ta: "காலப்போக்கில் அமிலத்தன்மை அடையலாம், நடுத்தர கரிமப் பொருட்கள் என்பதால் வழக்கமான தழைச்சத்து உரம் தேவைப்படும்.",
      },
      enrichment: {
        en: "Incorporate organic compost or sheep manure. Spray diluted liquid seaweed fertilizer to supply micro-minerals. Add a small pinch of lime to balance pH if acidic.",
        ta: "இயற்கை உரம் அல்லது ஆட்டு எரு கலக்கவும். நுண்ணூட்டச்சத்துக்களுக்கு திரவ பாசி உரம் தெளிக்கவும். அமிலத்தன்மை இருப்பின் சமன்படுத்த சிறிதளவு சுண்ணாம்பு சேர்க்கவும்.",
      },
    },
  };

  const handleDiagnose = () => {
    if (!selectedSoil || !selectedClimate) return;

    // Filter plants that match selected criteria
    const matched = plants.filter((plant) => {
      // 1. Soil matching rules
      let soilMatch = false;
      const category = plant.category.toLowerCase();
      const loc = plant.location.toLowerCase();

      if (selectedSoil === "Clay") {
        // Clay soil holds water -> good for moisture loving outdoor trees, indoor plants
        soilMatch = loc.includes("indoor") || category.includes("fruit") || plant.water.toLowerCase().includes("regular") || plant.water.toLowerCase().includes("moist");
      } else if (selectedSoil === "Sandy") {
        // Sandy soil drains fast -> perfect for low-water plants, succulents, herbs
        soilMatch = plant.water.toLowerCase().includes("low") || category.includes("mini") || category.includes("herbal");
      } else if (selectedSoil === "Loamy") {
        // Loamy soil fits almost all plants
        soilMatch = true;
      } else if (selectedSoil === "Red") {
        // Red soil matches herbal plants and garden ornamentals
        soilMatch = category.includes("herbal") || category.includes("ornamental") || category.includes("fruit");
      }

      // 2. Climate matching rules
      let climateMatch = false;
      const sun = plant.sunlight.toLowerCase();

      if (selectedClimate === "Dry") {
        // Dry/Hot -> full sun, drought tolerant
        climateMatch = sun.includes("full") || plant.care.toLowerCase().includes("neglect") || plant.care.toLowerCase().includes("drought");
      } else if (selectedClimate === "Humid") {
        // Humid -> partial shade, indoor, high moisture
        climateMatch = sun.includes("indirect") || loc.includes("indoor") || plant.water.toLowerCase().includes("high") || plant.water.toLowerCase().includes("moist");
      } else if (selectedClimate === "Cool") {
        // Cool -> low light, partial shade, regular watering
        climateMatch = sun.includes("low") || sun.includes("partial") || category.includes("herbal");
      }

      return soilMatch && climateMatch;
    });

    const info = diagnosticData[selectedSoil];
    setReport({
      soil: selectedSoil,
      climate: selectedClimate,
      healthIndex: info.healthIndex,
      strengths: info.strengths[language],
      challenges: info.challenges[language],
      enrichment: info.enrichment[language],
      matches: matched.slice(0, 4), // Top 4 matches
    });
  };

  const resetTool = () => {
    setSelectedSoil("");
    setSelectedClimate("");
    setReport(null);
  };

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEOHead
        title={language === "en" ? "Soil & Climate Advisor | Organic Crop Diagnostic" : "மண் ஆலோசகர் | இயற்கை விவசாய மண் பரிசோதனை"}
        description={language === "en" ? "Interactive diagnostic tool to analyze your soil type and local climate, recommending organic fertilizers and compatible plants." : "உங்கள் மண் வகை மற்றும் காலநிலையை பரிசோதித்து, இயற்கை உரங்கள் மற்றும் ஏற்ற பயிர்களைப் பரிந்துரைக்கும் கருவி."}
        canonicalPath="/diagnostic"
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-primary-green dark:text-neon-green text-xs font-bold tracking-widest uppercase bg-primary-green/10 px-4 py-2 rounded-full">
            {language === "en" ? "SOIL ADVISOR" : "மண் ஆலோசகர்"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest dark:text-white mt-4 transition-colors">
            {language === "en" ? "Soil & Climate Advisor" : "மண் மற்றும் காலநிலை பரிசோதனை"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto transition-colors text-sm sm:text-base">
            {language === "en"
              ? "Analyze your garden soil quality and regional weather to receive customized bio-enrichment recipes and match the best crops."
              : "உங்கள் தோட்டத்து மண் வளம் மற்றும் காலநிலையைப் பரிசோதித்து, பிரத்தியேக இயற்கை உரக் கரைசல்கள் மற்றும் உகந்த செடிகளின் பட்டியலை அமையுங்கள்."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!report ? (
            <motion.div
              key="inputs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Grid selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Soil Selector Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-forest dark:text-white mb-6 flex items-center gap-2">
                    <Leaf className="text-primary-green" size={22} />
                    {language === "en" ? "1. Select Soil Type" : "1. மண் வகையைத் தேர்ந்தெடுக்கவும்"}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {soils.map((s) => {
                      const isSel = selectedSoil === s.value;
                      return (
                        <button
                          key={s.value}
                          onClick={() => setSelectedSoil(s.value)}
                          className={`flex gap-4 p-4 rounded-2xl border text-left transition-all ${
                            isSel
                              ? "bg-forest/5 dark:bg-primary-green/10 border-primary-green shadow-md scale-[1.01]"
                              : "bg-transparent border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                          }`}
                        >
                          <span className="text-3xl bg-gray-50 dark:bg-gray-800 p-2 rounded-xl h-fit">
                            {s.icon}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-200">
                              {s.name[language]}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {s.desc[language]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Climate Selector Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
                  <h3 className="text-xl font-bold text-forest dark:text-white mb-6 flex items-center gap-2">
                    <Sun className="text-orange-500" size={22} />
                    {language === "en" ? "2. Select Climate / Region" : "2. காலநிலையைத் தேர்ந்தெடுக்கவும்"}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {climates.map((c) => {
                      const isSel = selectedClimate === c.value;
                      return (
                        <button
                          key={c.value}
                          onClick={() => setSelectedClimate(c.value)}
                          className={`flex gap-4 p-4 rounded-2xl border text-left transition-all ${
                            isSel
                              ? "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500 shadow-md scale-[1.01]"
                              : "bg-transparent border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
                          }`}
                        >
                          <span className="text-3xl bg-gray-50 dark:bg-gray-800 p-2 rounded-xl h-fit">
                            {c.icon}
                          </span>
                          <div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-200">
                              {c.name[language]}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {c.desc[language]}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Diagnose Action Button */}
              <div className="text-center">
                <button
                  onClick={handleDiagnose}
                  disabled={!selectedSoil || !selectedClimate}
                  className={`inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl transition-all shadow-md ${
                    selectedSoil && selectedClimate
                      ? "bg-primary-green hover:bg-forest text-white hover:shadow-xl hover:scale-[1.02]"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {language === "en" ? "Analyze Soil & Climate" : "மண் வளம் பரிசோதிக்கவும்"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              {/* Header result banner */}
              <div className="bg-gradient-to-r from-forest to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <span className="text-neon-green text-xs font-bold tracking-widest uppercase">
                    {language === "en" ? "DIAGNOSTIC ADVISORY REPORT" : "பரிசோதனை அறிக்கை"}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
                    {soils.find((s) => s.value === report.soil).name[language]} + {climates.find((c) => c.value === report.climate).name[language]}
                  </h2>
                  <p className="text-gray-200 mt-2 text-sm sm:text-base max-w-xl">
                    {language === "en"
                      ? "Your customized soil-enrichment recipes and matched plants have been generated based on organic farming guidelines."
                      : "இயற்கை விவசாய வழிகாட்டுதலின்படி உங்களது பிரத்தியேக மண் மேம்பாட்டு முறைகளும் ஏற்ற பயிர்களும் தயாரிக்கப்பட்டுள்ளன."}
                  </p>
                </div>

                {/* Score Gauge */}
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <Gauge className="text-neon-green" size={44} />
                    <span className="absolute text-xl font-bold font-serif">{report.healthIndex}%</span>
                  </div>
                  <span className="text-xs font-bold text-neon-green mt-2 tracking-wide uppercase">
                    {language === "en" ? "Soil Health Score" : "மண் ஆரோக்கிய குறியீடு"}
                  </span>
                </div>
              </div>

              {/* Soil Analysis Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Details Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold text-forest dark:text-white flex items-center gap-2">
                    <Droplet className="text-primary-green" size={20} />
                    {language === "en" ? "Soil Profile Analysis" : "மண் குணங்கள்"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {language === "en" ? "Strengths" : "நிறைகள்"}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {report.strengths}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {language === "en" ? "Challenges / Deficiencies" : "குறைகள் / சவால்கள்"}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {report.challenges}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enrichment Card */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                  <h3 className="text-xl font-bold text-forest dark:text-white flex items-center gap-2">
                    <Sprout className="text-orange-500" size={20} />
                    {language === "en" ? "Bio-Enrichment Recipe" : "உர தயாரிப்பு குறிப்புகள்"}
                  </h3>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                      {language === "en" ? "Organic Fertilization Recipe" : "இயற்கை ஊட்டச்சத்து உரம்"}
                    </h4>
                    <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl text-sm text-gray-700 dark:text-gray-300 italic">
                      "{report.enrichment}"
                    </div>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl text-xs text-gray-500 dark:text-gray-400">
                    {language === "en"
                      ? "💡 Tip: Always enrich soil before transplanting saplings, preferably during late afternoon when the soil is cool."
                      : "💡 குறிப்பு: செடிகளை நடுவதற்கு முன் மண்ணை தயார் செய்யவும். மாலை வேளையில் நடுவது வேர்கள் பிடிக்க உதவும்."}
                  </div>
                </div>
              </div>

              {/* Crop Recommendations */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-serif text-forest dark:text-white text-center sm:text-left transition-colors">
                  {language === "en" ? "Top Compatible Crops" : "பயிரிட ஏற்ற சிறந்த பயிர்கள்"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {report.matches.length > 0 ? (
                    report.matches.map((plant) => <PlantCard key={plant.id} plant={plant} />)
                  ) : (
                    <p className="text-gray-500 text-center col-span-2 py-10">
                      {language === "en" ? "No matches found in standard catalog." : "வகைப்பாட்டில் பொருத்தமான பயிர்கள் கிடைக்கவில்லை."}
                    </p>
                  )}
                </div>
              </div>

              {/* Reset actions */}
              <div className="text-center pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={resetTool}
                  className="inline-flex items-center gap-2 font-bold text-forest dark:text-white border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                >
                  <RefreshCw size={18} />
                  {language === "en" ? "New Diagnose" : "புதிய பரிசோதனை"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
