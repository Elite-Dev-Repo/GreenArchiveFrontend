import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import WhatWeDo from "./components/WhatWeDo";
import APIFeatures from "./components/APIFeatures";
import Categories from "./components/Categories";
import HowItWorks from "./components/HowItWorks";
import UseCases from "./components/UseCases";
import DailyFeed from "./components/DailyFeed";
import DevExperience from "./components/DevExperience";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import ApiKeysPage from "./pages/ApiKeysPage";
import DocsPage from "./pages/DocsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function LandingPage() {
  return (
    <div className="bg-cream min-h-screen">
      <Navbar />
      <Hero />
      <Ticker />
      <WhatWeDo />
      <APIFeatures />
      <Categories />
      <HowItWorks />
      <UseCases />
      <DailyFeed />
      <DevExperience />
      <Pricing />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/apikeys" element={<ApiKeysPage />} />
        <Route path="/docs" element={<DocsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
