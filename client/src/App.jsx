import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import DomainPage from "./pages/DomainPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SettingsProvider } from "./context/SettingsContext";

// Protection for Admin Routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <SettingsProvider>
      <Router>
      <ScrollToTop />
        <div className="relative overflow-hidden bg-[#0a0a0c] min-h-screen">
          {/* Optimized Particle Background Layer */}
          <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0a0a0c]">
            {/* Top Left Bloom */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-blue/15 blur-[120px] rounded-full animate-float-slow" />

            {/* Bottom Right Bloom */}
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-purple/15 blur-[120px] rounded-full animate-float-slow"
              style={{ animationDelay: "-3s" }}
            />

            {/* Center Bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-neon-pink/5 blur-[150px] rounded-full" />

            {/* Particle Grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.08) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/domain/:domainId" element={<DomainPage />} />
            <Route path="/domains" element={<Home />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>

          <ToastContainer
            theme="dark"
            position="bottom-right"
            toastClassName="glass !rounded-xl border !border-white/10"
            progressClassName="!bg-neon-blue"
          />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
