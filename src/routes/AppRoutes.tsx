import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Cakes from "../pages/Cakes/Cakes";
import CakeDetails from "../pages/Cakes/CakeDetails";
import EventsPage from "../pages/Events/EventsPage";
import MascotsPage from "../pages/Mascots/MascotsPage";
import About from "../components/About/About";
import Gallery from "../pages/Gallery/Gallery";
import Contact from "../pages/Contact/Contact";
import AdminLogin from "../pages/AdminPanel/AdminLogin";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import ProtectedRoute from "../pages/AdminPanel/ProtectedRoute";

const NotFound = () => (
  <main className="grid min-h-screen place-items-center bg-[#fff8f2] px-6 text-center">
    <div>
      <h1 className="text-6xl font-bold text-[#3a2d28]" style={{ fontFamily: "Playfair Display" }}>
        Page not found
      </h1>
      <p className="mt-5 text-[#8a7a72]">The page you requested does not exist.</p>
      <a
        href="/"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-[#d7a88c] text-white hover:bg-[#c99a7d] transition"
      >
        Return Home
      </a>
    </div>
  </main>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cakes" element={<Cakes />} />
      <Route path="/cakes/:slug" element={<CakeDetails />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/mascots" element={<MascotsPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<EventsPage />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />

      {/* In-built Admin Panel Routes */}
      <Route path="/admin-panel/login" element={<AdminLogin />} />
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-panel/*"
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
