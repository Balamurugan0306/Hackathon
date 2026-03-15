import React from "react";
import Navbar from "../components/Navbar";
import RegistrationForm from "../components/RegistrationForm";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const domainFromUrl = queryParams.get("domain");

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full glass border-white/20 mb-6 font-orbitron font-bold text-[10px] tracking-widest text-neon-blue animate-pulse">
              APPLICATION PORTAL
            </div>
            <h1 className="text-4xl md:text-7xl font-orbitron font-black text-white mb-6 uppercase tracking-[0.2em] leading-tight text-center">
              CHAKRAVYUHA <br />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue to-neon-purple">
                1.0 EDITION
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-500 font-space text-lg">
              Ready to build something legendary? Complete the form below to
              secure your spot in the most innovative hackathon of 2026.
            </p>
          </div>

          <RegistrationForm initialDomain={domainFromUrl} />
        </div>
      </main>
    </div>
  );
};

export default RegistrationPage;
