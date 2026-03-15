/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Cpu } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { Link } from "react-router-dom";

const CountdownUnit = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl md:text-6xl font-orbitron font-black text-white glow-text relative">
      {value.toString().padStart(2, "0")}
    </div>
    <div className="text-[10px] md:text-xs font-orbitron text-neon-blue uppercase tracking-[0.3em] mt-2 opacity-70">
      {label}
    </div>
  </div>
);

const Hero = () => {
  const { settings, isRegistrationEnded } = useSettings();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const ended = isRegistrationEnded();

  useEffect(() => {
    const targetDate = new Date(settings.registrationDeadline).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.registrationDeadline]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Glow Blobs */}
      <div className="glow-blob w-125 h-125 bg-neon-blue/20 -top-20 -left-20 blur-[150px] animate-pulse-slow" />
      <div className="glow-blob w-125 h-125 bg-neon-purple/20 bottom-20 -right-20 blur-[150px] animate-pulse-slow" />
      <div className="glow-blob w-96 h-96 bg-neon-pink/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[180px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/20 mb-8"
        >
          <span
            className={`w-2 h-2 rounded-full ${ended ? "bg-red-500" : "bg-neon-blue animate-pulse"}`}
          />
          <span className="text-[10px] md:text-sm font-space font-medium tracking-tight text-white/90">
            {ended
              ? "REGISTRATIONS CLOSED"
              : "REGISTRATIONS OPEN NOW"}
          </span>
        </motion.div>
        <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xs md:text-sm font-orbitron tracking-[0.4em] text-neon-blue mb-4 uppercase"
      >
        Department of Computer and Communication Engineering
      </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="text-4xl sm:text-6xl md:text-9xl font-orbitron font-black leading-tight tracking-[0.05em] mb-4 uppercase"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-neon-blue via-white to-neon-purple text-[0.8em]">
            CHAKRAVYUHA <br className="sm:hidden" />
            1.0 EDITION
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-2xl mx-auto text-gray-400 font-space text-lg md:text-xl mb-12 leading-relaxed"
        >
          {ended
            ? "The registration period has ended. Stay tuned for the event streaming and results!"
            : "A 24-hour hackathon focused on innovation, collaboration, and problem solving."}
        </motion.p>

        {ended ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card border-red-500/20 py-12 px-10 mb-16 max-w-4xl mx-auto"
          >
            <div className="text-2xl md:text-4xl font-orbitron font-black text-white glow-text mb-4">
              REGISTRATION PERIOD HAS{" "}
              <span className="text-red-500">ENDED</span>
            </div>
            <p className="text-gray-400 font-space text-lg">
              HACKING COMMENCING SOON. STAY TUNED FOR THE ANNOUNCEMENTS.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 justify-items-center items-center gap-6 md:gap-20 mb-16 px-6 py-8 md:px-10 glass-card border-neon-blue/20 max-w-4xl mx-auto"
          >
            <CountdownUnit value={timeLeft.days} label="Days" />
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={() => {
              if (ended) return;
              const el = document.getElementById("domains");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={ended}
            className={`px-10 py-5 rounded-2xl font-orbitron font-black text-lg tracking-widest flex items-center gap-2 transition-all ${ended ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5" : "bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] cursor-pointer"}`}
          >
            {ended ? "REGISTRATION ENDED" : "REGISTER NOW"}{" "}
            {!ended && <ArrowRight size={20} />}
          </button>
          <Link to="/domains">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-2xl glass border-white/20 text-white font-orbitron font-bold text-lg tracking-widest"
            >
              EXPLORE DOMAINS
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
