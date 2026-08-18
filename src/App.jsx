import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import PlantDetails from "./pages/PlantDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CareGuides from "./pages/CareGuides";
import PlantQuiz from "./pages/PlantQuiz";
import PlantingCalendar from "./pages/PlantingCalendar";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="plants" element={<Plants />} />
        <Route path="plants/:id" element={<PlantDetails />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guides" element={<CareGuides />} />
        <Route path="quiz" element={<PlantQuiz />} />
        <Route path="calendar" element={<PlantingCalendar />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
