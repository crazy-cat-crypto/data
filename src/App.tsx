import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NASAData from "./pages/NASAData";
import MapPortalSimple from "./pages/MapPortalSimple";
import Districts from "./pages/Districts";
import Migration from "./pages/Migration";
import DisasterRisk from "./pages/DisasterRisk";
import Vegetation from "./pages/Vegetation";
import AirQuality from "./pages/AirQuality";
import HDIForecast from "./pages/HDIForecast";
import GDPForecast from "./pages/GDPForecast";
import TourismForecast from "./pages/TourismForecast";
import HDIIncomeRelation from "./pages/HDIIncomeRelation";
import Comparison from "./pages/Comparison";
import Prediction from "./pages/Prediction";
import Energy from "./pages/Energy";
import Map from "./pages/Map";
import EarthMap from "./pages/EarthMap";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Hospitals from "./pages/Hospitals";
import Forest from "./pages/Forest";
import DrinkingWater from "./pages/DrinkingWater";
import NationalProblems from "./pages/NationalProblems";
import DataSolutions from "./pages/DataSolutions";
import WhatsNext from "./pages/WhatsNext";
import VerificationDashboard from "./pages/VerificationDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nasa-data" element={<NASAData />} />
            <Route path="/map-portal" element={<MapPortalSimple />} />
            <Route path="/districts" element={<Districts />} />
            <Route path="/map" element={<Map />} />
            <Route path="/earth-map" element={<EarthMap />} />
            <Route path="/migration" element={<Migration />} />
            <Route path="/disaster-risk" element={<DisasterRisk />} />
            <Route path="/vegetation" element={<Vegetation />} />
            <Route path="/air-quality" element={<AirQuality />} />
            <Route path="/comparison" element={<Comparison />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/energy" element={<Energy />} />
            <Route path="/forecasts/hdi" element={<HDIForecast />} />
            <Route path="/forecasts/gdp" element={<GDPForecast />} />
            <Route path="/forecasts/tourism" element={<TourismForecast />} />
            <Route path="/forecasts/hdi-income" element={<HDIIncomeRelation />} />
            <Route path="/provinces/hospitals" element={<Hospitals />} />
            <Route path="/provinces/forest" element={<Forest />} />
            <Route path="/provinces/drinking-water" element={<DrinkingWater />} />
            <Route path="/national-problems" element={<NationalProblems />} />
            <Route path="/data-solutions" element={<DataSolutions />} />
            <Route path="/whats-next" element={<WhatsNext />} />
            <Route path="/verification-dashboard" element={<VerificationDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
