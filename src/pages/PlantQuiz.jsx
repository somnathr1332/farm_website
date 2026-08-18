import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, RefreshCw, Sparkles, Check } from "lucide-react";
import { plants } from "../data/plants";
import PlantCard from "../components/PlantCard";
import SEOHead from "../components/SEOHead";
import { useLanguage } from "../context/LanguageContext";

export default function PlantQuiz() {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    location: "",
    sunlight: "",
    watering: "",
    goal: "",
  });
  const [results, setResults] = useState([]);

  // Questions and options localized in EN and TA
  const quizQuestions = [
    {
      key: "location",
      question: {
        en: "Where will your new green companion live?",
        ta: "உங்கள் புதிய செடி எங்கு வளரப் போகிறது?",
      },
      options: [
        {
          value: "Indoor",
          label: { en: "Indoors (Living room, bedroom, office)", ta: "வீட்டுக்குள்ளே (வரவேற்பறை, படுக்கையறை, அலுவலகம்)" },
          icon: "🏠",
        },
        {
          value: "Outdoor",
          label: { en: "Outdoors / Balcony (Direct sunlight/breeze)", ta: "வெளியே / பால்கனி (நேரடி சூரிய ஒளி/காற்று)" },
          icon: "☀️",
        },
        {
          value: "Both",
          label: { en: "Both or transition areas (Bright windows, patio)", ta: "இரண்டு இடங்களிலும் (ஒளிமிகு ஜன்னல், தாழ்வாரம்)" },
          icon: "🌿",
        },
      ],
    },
    {
      key: "sunlight",
      question: {
        en: "How much natural sunlight does this spot receive?",
        ta: "அந்த இடத்தில் எவ்வளவு இயற்கை சூரிய ஒளி கிடைக்கும்?",
      },
      options: [
        {
          value: "Low",
          label: { en: "Low Light / Shady (Few hours or indirect light only)", ta: "குறைந்த ஒளி / நிழல் (சில மணிநேரங்கள் அல்லது மறைமுக ஒளி)" },
          icon: "☁️",
        },
        {
          value: "Bright",
          label: { en: "Bright Indirect Light (Well-lit room, no harsh rays)", ta: "மறைமுக வெளிச்சம் (நல்ல வெளிச்சம், ஆனால் நேரடி கதிர்கள் இல்லை)" },
          icon: "🌤️",
        },
        {
          value: "Full",
          label: { en: "Full Direct Sun (At least 4-6 hours of hot sun)", ta: "நேரடி வெயில் (குறைந்தது 4-6 மணிநேரம் வெயில்)" },
          icon: "☀️",
        },
      ],
    },
    {
      key: "watering",
      question: {
        en: "What is your watering style/commitment?",
        ta: "செடிகளுக்கு தண்ணீர் ஊற்றும் வழக்கம் எப்படி இருக்கும்?",
      },
      options: [
        {
          value: "Low",
          label: { en: "Forgetful / Low care (Water every few weeks, like succulents)", ta: "மறதி / குறைந்த பராமரிப்பு (சில வாரங்களுக்கு ஒருமுறை)" },
          icon: "🌵",
        },
        {
          value: "Moderate",
          label: { en: "Moderate (Water when soil starts drying, every few days)", ta: "நடுத்தர பராமரிப்பு (மண் காய்ந்ததும், சில நாட்களுக்கு ஒருமுறை)" },
          icon: "💧",
        },
        {
          value: "High",
          label: { en: "Attentive / Daily (Enjoy daily checks and moist soil)", ta: "அதிக பராமரிப்பு (தினமும் கவனித்து ஈரப்பதமாக வைத்தல்)" },
          icon: "💦",
        },
      ],
    },
    {
      key: "goal",
      question: {
        en: "What is your main goal for this plant?",
        ta: "இந்த செடியை வளர்ப்பதன் முக்கிய நோக்கம் என்ன?",
      },
      options: [
        {
          value: "Air",
          label: { en: "Clean Air & Wellness (Filter toxins, boost oxygen)", ta: "சுத்தமான காற்று & ஆரோக்கியம் (நச்சுகளை அகற்றுதல்)" },
          icon: "🍃",
        },
        {
          value: "Edible",
          label: { en: "Medicinal & Herbs (Cooking, traditional cures, tea)", ta: "மூலிகை & உணவு (சமையல், பாரம்பரிய வைத்தியம்)" },
          icon: "🍵",
        },
        {
          value: "Decor",
          label: { en: "Aesthetic Decor & Flowers (Beautiful blooms, color)", ta: "அழகு & மலர்கள் (அழகான பூக்கள், வண்ணங்கள்)" },
          icon: "🌸",
        },
        {
          value: "Easy",
          label: { en: "Hardy & Low Maintenance (Hard to kill, easy growth)", ta: "எளிமையான பராமரிப்பு (எளிதாக வளரக்கூடியவை)" },
          icon: "🛡️",
        },
      ],
    },
  ];

  const handleOptionSelect = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({
      location: "",
      sunlight: "",
      watering: "",
      goal: "",
    });
    setCurrentStep(0);
    setResults([]);
  };

  const calculateResults = () => {
    // Scoring logic based on answer combinations
    const scoredPlants = plants.map((plant) => {
      let score = 0;

      // 1. Location match
      const plantLoc = plant.location.toLowerCase();
      if (answers.location === "Indoor") {
        if (plantLoc.includes("indoor")) score += 3;
      } else if (answers.location === "Outdoor") {
        if (plantLoc.includes("outdoor") || plantLoc.includes("balcony")) score += 3;
      } else if (answers.location === "Both") {
        score += 2;
      }

      // 2. Sunlight match
      const plantSun = plant.sunlight.toLowerCase();
      if (answers.sunlight === "Low") {
        if (plantSun.includes("low") || plantSun.includes("shade")) score += 3;
      } else if (answers.sunlight === "Bright") {
        if (plantSun.includes("bright") || plantSun.includes("indirect")) score += 3;
      } else if (answers.sunlight === "Full") {
        if (plantSun.includes("full") || plantSun.includes("direct")) score += 3;
      }

      // 3. Watering match
      const plantWater = plant.water.toLowerCase();
      if (answers.watering === "Low") {
        if (plantWater.includes("low") || plantWater.includes("dry")) score += 3;
      } else if (answers.watering === "Moderate") {
        if (plantWater.includes("moderate") || plantWater.includes("slightly moist")) score += 3;
      } else if (answers.watering === "High") {
        if (plantWater.includes("regular") || plantWater.includes("moist") || plantWater.includes("daily")) score += 3;
      }

      // 4. Primary interest match
      const category = plant.category.toLowerCase();
      const benefits = plant.benefits?.map(b => b.toLowerCase()) || [];
      if (answers.goal === "Air") {
        if (benefits.some(b => b.includes("air") || b.includes("oxygen") || b.includes("purify"))) score += 4;
      } else if (answers.goal === "Edible") {
        if (category === "herbal" || category === "fruit plants" || benefits.some(b => b.includes("medicinal") || b.includes("cook"))) score += 4;
      } else if (answers.goal === "Decor") {
        if (category === "ornamental" || category === "flower" || benefits.some(b => b.includes("decor") || b.includes("bloom") || b.includes("flower"))) score += 4;
      } else if (answers.goal === "Easy") {
        if (benefits.some(b => b.includes("maintenance") || b.includes("drought") || b.includes("tough"))) score += 4;
      }

      return { plant, score };
    });

    // Sort by highest score first, filter score > 2, limit to top 4 recommendations
    const sorted = scoredPlants
      .filter((item) => item.score > 3)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.plant)
      .slice(0, 4);

    // Fallback to basic list if score filters are too strict
    setResults(sorted.length > 0 ? sorted : plants.slice(0, 3));
    setCurrentStep(quizQuestions.length); // Result phase
  };

  const currentQ = quizQuestions[currentStep];
  const activeAnswer = currentQ ? answers[currentQ.key] : "";

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEOHead
        title={language === 'en' ? "Plant Finder Quiz | Organic Farm" : "செடி தேர்வு | இயற்கை பண்ணை"}
        description={language === 'en' ? "Find the perfect organic plants matching your home and lifestyle details." : "உங்கள் வீட்டிற்கும் வாழ்க்கை முறைக்கும் ஏற்ற சரியான இயற்கை செடிகளைத் கண்டறியுங்கள்."}
        canonicalPath="/quiz"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Banner header */}
        <div className="text-center mb-10">
          <span className="text-primary-green dark:text-neon-green text-xs font-bold tracking-widest uppercase bg-primary-green/10 px-4 py-2 rounded-full">
            {language === 'en' ? 'QUIZ FINDER' : 'செடி தேர்வு வினாடி வினா'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest dark:text-white mt-4 transition-colors">
            {language === 'en' ? 'Find Your Perfect Plant Match' : 'உங்களுக்கு ஏற்ற செடியைத் தேர்ந்தெடுக்கவும்'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto transition-colors">
            {language === 'en' 
              ? 'Answer a few simple questions and let our agricultural matchmaking system recommend the best green buddies for your space.'
              : 'சில எளிய கேள்விகளுக்குப் பதிலளித்து, உங்கள் இடத்திற்கு மிகவும் பொருத்தமான செடிகளைத் தேர்ந்தெடுக்க எங்கள் வழிகாட்டிக்கு அனுமதியுங்கள்.'}
          </p>
        </div>

        {/* Card Frame */}
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10 transition-colors">
          <AnimatePresence mode="wait">
            {currentStep < quizQuestions.length ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mb-8">
                  <div
                    className="bg-primary-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>

                <div className="text-xs font-bold text-primary-green uppercase tracking-wider mb-2">
                  {language === 'en' ? `Question ${currentStep + 1} of ${quizQuestions.length}` : `கேள்வி ${currentStep + 1} / ${quizQuestions.length}`}
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-forest dark:text-white mb-8 transition-colors">
                  {currentQ.question[language]}
                </h2>

                <div className="grid grid-cols-1 gap-4 mb-10">
                  {currentQ.options.map((opt) => {
                    const isSelected = activeAnswer === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleOptionSelect(currentQ.key, opt.value)}
                        className={`flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 group ${
                          isSelected
                            ? "bg-forest/5 dark:bg-primary-green/10 border-primary-green shadow-md scale-[1.01]"
                            : "bg-transparent border-gray-200 dark:border-gray-800 hover:border-forest/30 dark:hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-3xl bg-gray-50 dark:bg-gray-800 p-2 rounded-xl group-hover:scale-110 transition-transform">
                            {opt.icon}
                          </span>
                          <span className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 transition-colors">
                            {opt.label[language]}
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                            isSelected
                              ? "bg-primary-green border-primary-green text-white"
                              : "border-gray-300 dark:border-gray-600"
                          }`}
                        >
                          {isSelected && <Check size={14} className="stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation actions */}
                <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-6 transition-colors">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
                      currentStep === 0
                        ? "text-gray-300 dark:text-gray-700 cursor-not-allowed"
                        : "text-forest dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <ArrowLeft size={18} />
                    {language === 'en' ? 'Back' : 'பின்செல்'}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!activeAnswer}
                    className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all shadow-md ${
                      activeAnswer
                        ? "bg-primary-green hover:bg-forest text-white hover:shadow-lg hover:scale-[1.02]"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {currentStep === quizQuestions.length - 1
                      ? (language === 'en' ? 'Get Matches' : 'செடிகளைக் காட்டு')
                      : (language === 'en' ? 'Next' : 'அடுத்து')}
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-full text-emerald-500 mb-6 animate-bounce">
                  <Sparkles size={40} />
                </div>
                <h2 className="text-3xl font-bold font-serif text-forest dark:text-white mb-2 transition-colors">
                  {language === 'en' ? 'Your Perfect Green Matches!' : 'உங்களுக்கு ஏற்ற சிறந்த செடிகள்!'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 transition-colors">
                  {language === 'en'
                    ? 'Based on your specific environment and styling preferences, we highly recommend these plants:'
                    : 'உங்கள் தேவைகள் மற்றும் பராமரிப்பு வசதிகளின் அடிப்படையில், இந்த செடிகளைப் பரிந்துரைக்கிறோம்:'}
                </p>

                {/* Grid of matches */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
                  {results.map((plant) => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 font-bold text-forest dark:text-white border border-gray-200 dark:border-gray-800 px-6 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                  >
                    <RefreshCw size={18} />
                    {language === 'en' ? 'Retake Quiz' : 'மீண்டும் முயற்சி செய்க'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
