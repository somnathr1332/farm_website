import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sprout, Scissors, Wheat, Bell, BellOff } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import SEOHead from "../components/SEOHead";

export default function PlantingCalendar() {
  const { language } = useLanguage();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [subscription, setSubscription] = useState({});
  const [showAlert, setShowAlert] = useState(null);

  const months = [
    { name: { en: "January", ta: "ஜனவரி" }, value: 0 },
    { name: { en: "February", ta: "பிப்ரவரி" }, value: 1 },
    { name: { en: "March", ta: "மார்ச்" }, value: 2 },
    { name: { en: "April", ta: "ஏப்ரல்" }, value: 3 },
    { name: { en: "May", ta: "மே" }, value: 4 },
    { name: { en: "June", ta: "ஜூன்" }, value: 5 },
    { name: { en: "July", ta: "ஜூலை" }, value: 6 },
    { name: { en: "August", ta: "ஆகஸ்ட்" }, value: 7 },
    { name: { en: "September", ta: "செப்டம்பர்" }, value: 8 },
    { name: { en: "October", ta: "அக்டோபர்" }, value: 9 },
    { name: { en: "November", ta: "நவம்பர்" }, value: 10 },
    { name: { en: "December", ta: "டிசம்பர்" }, value: 11 },
  ];

  // Specific agricultural/gardening data for Tamil Nadu / South India
  const seasonalData = {
    0: { // Jan
      sow: {
        en: ["Chillies", "Brinjal (Kathirikai)", "Tomato seeds", "Coriander", "Fenugreek (Vendhaya Keerai)"],
        ta: ["மிளகாய்", "கத்திரிக்காய்", "தக்காளி விதைகள்", "கொத்தமல்லி", "வெந்தயக் கீரை"],
      },
      care: {
        en: ["Prune summer flowering jasmines.", "Water plants in early morning to prevent fungal growth from cooler night dew.", "Apply organic vermicompost."],
        ta: ["கோடை கால மல்லிகைச் செடிகளை கவாத்து செய்யவும்.", "பனிப்பொழிவால் ஏற்படும் பூஞ்சையைத் தடுக்க அதிகாலையில் தண்ணீர் ஊற்றவும்.", "இயற்கை மண்புழு உரம் இடவும்."],
      },
      harvest: {
        en: ["Pongal harvest: Turmeric, Sugarcane", "Radish", "Spinach", "Guava"],
        ta: ["பொங்கல் அறுவடை: மஞ்சள், கரும்பு", "முள்ளங்கி", "பசலைக் கீரை", "கொய்யாப்பழம்"],
      },
    },
    1: { // Feb
      sow: {
        en: ["Okra (Ladies Finger)", "Bitter Gourd", "Cluster Beans", "Cucumber"],
        ta: ["வெண்டைக்காய்", "பாகற்காய்", "கொத்தவரங்காய்", "வெள்ளரிக்காய்"],
      },
      care: {
        en: ["Apply Neem oil solution to ward off early-spring whiteflies.", "Mulch plant bases to preserve moisture as temperatures rise.", "Prune hibiscus plants."],
        ta: ["வெள்ளை ஈக்களைத் தடுக்க வேப்பெண்ணெய் கரைசல் தெளிக்கவும்.", "வெப்பநிலை உயர்வதால் ஈரப்பதத்தை காக்க வேர்பகுதியில் மூடாக்கு போடவும்.", "செம்பருத்திச் செடிகளை கவாத்து செய்யவும்."],
      },
      harvest: {
        en: ["Carrots", "Beetroots", "Cabbage", "Jasmine blooms"],
        ta: ["கேரட்", "பீட்ரூட்", "முட்டைக்கோஸ்", "மல்லிகைப் பூக்கள்"],
      },
    },
    2: { // Mar
      sow: {
        en: ["Watermelon", "Muskmelon", "Lemongrass", "Tulsi (Basil)"],
        ta: ["தர்பூசணி", "முலாம் பழம்", "எலுமிச்சை புல்", "துளசி"],
      },
      care: {
        en: ["Increase watering frequency to twice daily (early morning & late evening).", "Install shade nets for sensitive balcony leafy greens.", "Avoid heavy pruning."],
        ta: ["தண்ணீர் ஊற்றும் அளவை ஒரு நாளைக்கு இருமுறையாக அதிகரிக்கவும்.", "நிழல் வலைகளை அமைத்து கீரை வகைகளைக் காக்கவும்.", "அதிகமாக கவாத்து செய்வதைத் தவிர்க்கவும்."],
      },
      harvest: {
        en: ["Tomato", "Chilli", "Brinjal", "Drumstick (Murungai)"],
        ta: ["தக்காளி", "மிளகாய்", "கத்திரிக்காய்", "முருங்கைக்காய்"],
      },
    },
    3: { // Apr
      sow: {
        en: ["Amaranthus (Keerai)", "Ridge Gourd", "Snake Gourd", "Sunflower"],
        ta: ["அரைக்கீரை / முளைக்கீரை", "பீர்க்கங்காய்", "புடலங்காய்", "சூரியகாந்தி"],
      },
      care: {
        en: ["Sprinkle water on plant foliage to cool them down.", "Avoid chemical fertilizers completely during extreme heat; use diluted buttermilk fertilizer.", "Keep soil moist but not waterlogged."],
        ta: ["செடிகளின் இலைகளில் தண்ணீர் தெளித்து குளிர்விக்கவும்.", "கோடையில் ரசாயன உரங்களைத் தவிர்த்து, நீர்த்த மோர் கரைசல் தெளிக்கவும்.", "மண்ணை ஈரப்பதமாக வைத்திருக்கவும்."],
      },
      harvest: {
        en: ["Mangoes", "Jackfruit", "Watermelon", "Cucumber"],
        ta: ["மாம்பழம்", "பலாப்பழம்", "தர்பூசணி", "வெள்ளரிக்காய்"],
      },
    },
    4: { // May
      sow: {
        en: ["Ginger", "Turmeric root", "Sweet potato vines", "Moringa seeds"],
        ta: ["இஞ்சி", "மஞ்சள் வேர்", "சர்க்கரைவள்ளி கிழங்கு", "முருங்கை விதைகள்"],
      },
      care: {
        en: ["Protect pot roots from heat concrete floor conduction by raising pots on stands.", "Group plants together to create a microclimate with higher humidity.", "Deep watering twice a day."],
        ta: ["தொட்டிகளை ஸ்டாண்டுகளில் வைத்து தரை வெப்பத்திலிருந்து வேர்களைக் காக்கவும்.", "செடிகளை ஒன்றாக நெருக்கமாக வைத்து ஈரப்பதம் அதிகரிக்கச் செய்யவும்.", "தினமும் இருமுறை ஆழமாக நீர் பாய்ச்சவும்."],
      },
      harvest: {
        en: ["Curry leaves", "Mint", "Green chillies", "Lemons"],
        ta: ["கறிவேப்பிலை", "புதினா", "பச்சை மிளகாய்", "எலுமிச்சம்பழம்"],
      },
    },
    5: { // Jun
      sow: {
        en: ["Pre-monsoon sowing: Lady's Finger", "Tomato", "Brinjal", "Jasmine saplings"],
        ta: ["பருவமழைக்கு முந்தைய விதைப்பு: வெண்டை", "தக்காளி", "கத்தரி", "மல்லிகை நாற்றுகள்"],
      },
      care: {
        en: ["Prune dead stems before monsoon winds begin.", "Clean drainage holes in pots to prevent water logging.", "Add compost to enrich soil before rains."],
        ta: ["மழைக்காற்றுக்கு முன் காய்ந்த கிளைகளை வெட்டவும்.", "தேங்கும் நீரைத் தடுக்க தொட்டிகளின் வடிகால் துளைகளை சுத்தம் செய்யவும்.", "மழைக்கு முன் மண்ணை வளப்படுத்த உரம் சேர்க்கவும்."],
      },
      harvest: {
        en: ["Bitter gourd", "Snake gourd", "Spinach", "Papaya"],
        ta: ["பாகற்காய்", "புடலங்காய்", "கீரை", "பப்பாளி"],
      },
    },
    6: { // Jul
      sow: {
        en: ["Radish", "Carrot", "Beans", "Marigold flowers"],
        ta: ["முள்ளங்கி", "கேரட்", "அவரைக்காய்", "சாமந்திப் பூக்கள்"],
      },
      care: {
        en: ["Reduce watering as monsoon rains start.", "Spray Panchagavya or organic pest repellents to prevent pest attacks in humid air.", "Stake tall plants to protect from heavy winds."],
        ta: ["பருவமழை துவங்குவதால் தண்ணீர் அளவைக் குறைக்கவும்.", "ஈரப்பதமான காற்றால் பூச்சித் தாக்குதலைத் தடுக்க பஞ்சகவ்யா தெளிக்கவும்.", "காற்றுக்கு சாயாமல் இருக்க பெரிய செடிகளுக்கு முட்டுக் கொடுக்கவும்."],
      },
      harvest: {
        en: ["Guava", "Banana", "Drumstick leaves", "Okra"],
        ta: ["கொய்யா", "வாழைப்பழம்", "முருங்கைக்கீரை", "வெண்டைக்காய்"],
      },
    },
    7: { // Aug
      sow: {
        en: ["Aadi Perukku special: All gourds", "Greens", "Cluster beans", "Onion bulbs"],
        ta: ["ஆடிப் பெருக்கு சிறப்பு: அனைத்து கொடிவகைகள்", "கீரைகள்", "கொத்தவரை", "வெங்காயம்"],
      },
      care: {
        en: ["Ensure soil has loose texture so rainwater drains out quickly.", "Weed regularly as weed growth accelerates after rain.", "Prune unwanted suckers from tomato plants."],
        ta: ["மழைநீர் எளிதாக வடிய மண் தளர்வாக இருப்பதை உறுதி செய்யவும்.", "மழைக்குப் பின் வேகமாக வளரும் களைகளை உடனடியாக அகற்றவும்.", "தக்காளிச் செடியின் தேவையற்ற பக்கக் கிளைகளை நீக்கவும்."],
      },
      harvest: {
        en: ["Beans", "Coriander", "Amaranthus Keerai", "Custard Apple"],
        ta: ["அவரைக்காய்", "கொத்தமல்லி", "முளைக்கீரை", "சீதாப்பழம்"],
      },
    },
    8: { // Sep
      sow: {
        en: ["Radish", "Spinach", "Turnip", "Rose cuttings"],
        ta: ["முள்ளங்கி", "பசலைக்கீரை", "டர்னிப்", "ரோஜா போத்துகள்"],
      },
      care: {
        en: ["Apply organic nitrogen fertilizer to support vegetative growth.", "Monitor for caterpillars and hand-pick them.", "Gently till topsoil to aeration."],
        ta: ["வளர்ச்சியை அதிகரிக்க இயற்கை தழைச்சத்து உரங்களை இடவும்.", "புழுக்கள் தாக்குதலைக் கண்காணித்து அவற்றை அகற்றவும்.", "மண்ணிற்கு காற்றோட்டம் கிடைக்க மேல் மண்ணை லேசாக கிளறிவிடவும்."],
      },
      harvest: {
        en: ["Ridge gourd", "Snake Gourd", "Green Chillies", "Marigold"],
        ta: ["பீர்க்கங்காய்", "புடலங்காய்", "பச்சை மிளகாய்", "சாமந்திப்பூ"],
      },
    },
    9: { // Oct
      sow: {
        en: ["Northeast monsoon crops: Coriander", "Fenugreek", "Mustard", "Garlic cloves"],
        ta: ["வடகிழக்கு பருவமழை பயிர்கள்: கொத்தமல்லி", "வெந்தயம்", "கடுகு", "பூண்டு"],
      },
      care: {
        en: ["Move indoor plants closer to window glass as day length shortens.", "Spray sour buttermilk to prevent mildew diseases from high humidity.", "Check pot drainage carefully."],
        ta: ["பகல்பொழுது குறைவதால் நிழல் செடிகளை ஜன்னல் அருகே வைக்கவும்.", "அதிக ஈரப்பதத்தால் ஏற்படும் சாம்பல் நோயைத் தடுக்க புளித்த மோர் தெளிக்கவும்.", "தொட்டியின் வடிகால் அமைப்பைச் சரிபார்க்கவும்."],
      },
      harvest: {
        en: ["Yam", "Sweet Potato", "Guava", "Corn"],
        ta: ["கருணைக்கிழங்கு", "சர்க்கரைவள்ளிக் கிழங்கு", "கொய்யா", "சோளம்"],
      },
    },
    10: { // Nov
      sow: {
        en: ["Spinach", "Mint cuttings", "Mustard greens", "Dahlia bulb"],
        ta: ["பசலைக்கீரை", "புதினா போத்துகள்", "கடுகுக்கீரை", "டாலியா கிழங்கு"],
      },
      care: {
        en: ["Water plants only when top 2 inches of soil is completely dry.", "Avoid composting or heavy fertilization during heavy rains.", "Move succulent pots under a roof shadow."],
        ta: ["மண்ணின் மேல் பகுதி உலர்ந்த பின் மட்டுமே தண்ணீர் ஊற்றவும்.", "அதிமழைக் காலத்தில் உரங்கள் இடுவதைத் தவிர்க்கவும்.", "கற்றாழை, சதைப்பற்றுள்ள செடிகளை நிழற்கூரையின் கீழ் நகர்த்தவும்."],
      },
      harvest: {
        en: ["Papaya", "Jasmine", "Ginger", "Radish"],
        ta: ["பப்பாளி", "மல்லிகை", "இஞ்சி", "முள்ளங்கி"],
      },
    },
    11: { // Dec
      sow: {
        en: ["Tomato", "Brinjal", "Chilli seeds", "Winter flowers (Petunia, Aster)"],
        ta: ["தக்காளி", "கத்தரி", "மிளகாய் விதைகள்", "குளிர்கால மலர்கள் (பெட்டுனியா, ஆஸ்டர்)"],
      },
      care: {
        en: ["Loosen topsoil once a week.", "Protect delicate saplings from cold winds using protective wraps.", "Water mid-morning when sun shines warm."],
        ta: ["வாரமொருமுறை மேல் மண்ணைக் கிளறி தளர்வாக்கவும்.", "குளிர்ச்சியான காற்றிலிருந்து இளம் நாற்றுகளைப் பாதுகாக்க மூடி வைக்கவும்.", "வெயில் வந்த பிறகு காலை வேளையில் தண்ணீர் பாய்ச்சவும்."],
      },
      harvest: {
        en: ["Turmeric", "Potato", "Flat beans (Avarai)", "Custard apple"],
        ta: ["மஞ்சள்", "உருளைக்கிழங்கு", "அவரைக்காய்", "சீதாப்பழம்"],
      },
    },
  };

  const handleSubscribe = (monthVal) => {
    const monthName = months.find((m) => m.value === monthVal).name[language];
    const isSubbed = subscription[monthVal];
    
    setSubscription((prev) => ({
      ...prev,
      [monthVal]: !isSubbed,
    }));

    const alertMsg = !isSubbed
      ? language === "en"
        ? `Successfully subscribed to automated care notifications for ${monthName}! Simulated daily reminders will keep your farm fresh.`
        : `${monthName} மாதத்திற்கான தானியங்கி பராமரிப்பு நினைவூட்டல்கள் வெற்றிகரமாக பதிவு செய்யப்பட்டன!`
      : language === "en"
      ? `Unsubscribed from ${monthName} reminders.`
      : `${monthName} நினைவூட்டல்கள் ரத்து செய்யப்பட்டன.`;

    setShowAlert(alertMsg);
    setTimeout(() => {
      setShowAlert(null);
    }, 4000);
  };

  const currentMonthData = seasonalData[selectedMonth];

  return (
    <div className="pt-24 pb-20 bg-background-color dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <SEOHead
        title={language === "en" ? "Seasonal Planting Calendar | South India Gardening Guide" : "விவசாய காலண்டர் | தமிழ்நாட்டின் பயிரிடும் முறை"}
        description={language === "en" ? "Interactive month-by-month sowing, harvesting, and care guide tailored for South Indian weather." : "தமிழ்நாடு வானிலைக்கு ஏற்றவாறு விதைப்பு, அறுவடை மற்றும் பராமரிப்பு குறிப்புகள் கொண்ட காலண்டர்."}
        canonicalPath="/calendar"
      />

      <div className="max-w-6xl mx-auto px-4">
        {/* Title Block */}
        <div className="text-center mb-12">
          <span className="text-primary-green dark:text-neon-green text-xs font-bold tracking-widest uppercase bg-primary-green/10 px-4 py-2 rounded-full">
            {language === "en" ? "SOWING GUIDE" : "பயிரிடும் கால அட்டவணை"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest dark:text-white mt-4 transition-colors">
            {language === "en" ? "Seasonal Planting Calendar" : "பயிரிடும் மற்றும் பராமரிப்பு காலண்டர்"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl mx-auto transition-colors text-sm sm:text-base">
            {language === "en"
              ? "Discover the perfect months to plant organic crops, apply native fertilizers, and harvest fresh produce tailored for Tamil Nadu climates."
              : "தமிழ்நாட்டின் தட்பவெப்ப நிலைக்கு ஏற்ப, இயற்கை செடிகளை நடவும், உரம் இடவும், அறுவடை செய்யவும் சிறந்த காலங்களை அறியுங்கள்."}
          </p>
        </div>

        {/* Floating Simulated Alert Banner */}
        <AnimatePresence>
          {showAlert && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md bg-forest dark:bg-gray-900 border border-emerald-500/30 text-white rounded-2xl shadow-2xl p-4 flex gap-3 items-center"
            >
              <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400">
                <Bell size={20} className="animate-swing" />
              </div>
              <p className="text-sm font-semibold flex-grow">{showAlert}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Month Selector Column */}
          <div className="lg:col-span-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-xl transition-all">
            <h3 className="text-lg font-bold text-forest dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="text-primary-green" size={20} />
              {language === "en" ? "Select Month" : "மாதத்தைத் தேர்ந்தெடுக்கவும்"}
            </h3>
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {months.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMonth(m.value)}
                  className={`py-3 px-4 rounded-xl text-sm font-bold transition-all text-center lg:text-left ${
                    selectedMonth === m.value
                      ? "bg-primary-green text-white shadow-md scale-[1.02]"
                      : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-forest/5 dark:hover:bg-white/5"
                  }`}
                >
                  {m.name[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header info */}
            <div className="bg-gradient-to-r from-forest to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <span className="text-neon-green text-xs font-bold tracking-widest uppercase">
                  {language === "en" ? "MONTHLY ACTION GUIDE" : "மாதாந்திர வழிகாட்டி"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-2">
                  {months[selectedMonth].name[language]}
                </h2>
              </div>
              <button
                onClick={() => handleSubscribe(selectedMonth)}
                className={`flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-2xl transition-all shadow-md active:scale-95 ${
                  subscription[selectedMonth]
                    ? "bg-white/20 border border-white/30 text-white hover:bg-white/30"
                    : "bg-white text-forest hover:bg-emerald-50 hover:shadow-lg"
                }`}
              >
                {subscription[selectedMonth] ? (
                  <>
                    <BellOff size={18} />
                    {language === "en" ? "Cancel Alerts" : "நினைவூட்டல் ரத்து செய்க"}
                  </>
                ) : (
                  <>
                    <Bell size={18} />
                    {language === "en" ? "Subscribe to Alerts" : "நினைவூட்டல் பதிவு செய்"}
                  </>
                )}
              </button>
            </div>

            {/* Three Seasonal Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sow Card */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-xl transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-2xl text-primary-green">
                    <Sprout size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-forest dark:text-white">
                    {language === "en" ? "Sow & Plant" : "விதைக்க மற்றும் நட"}
                  </h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {currentMonthData.sow[language].map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-primary-green text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Care Card */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-xl transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-2xl text-orange-500">
                    <Scissors size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-forest dark:text-white">
                    {language === "en" ? "Seasonal Care" : "பராமரிப்பு குறிப்புகள்"}
                  </h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {currentMonthData.care[language].map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-orange-500 text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Harvest Card */}
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-xl transition-all flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-2xl text-amber-500">
                    <Wheat size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-forest dark:text-white">
                    {language === "en" ? "Harvesting" : "அறுவடை காலம்"}
                  </h3>
                </div>
                <ul className="space-y-3 flex-grow">
                  {currentMonthData.harvest[language].map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-amber-500 text-lg leading-none">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
