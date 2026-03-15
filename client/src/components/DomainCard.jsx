import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSettings } from "../hooks/useSettings";

const DomainCard = ({ title, icon: Icon, description, color, path }) => {
  const { isRegistrationEnded } = useSettings();
  const ended = isRegistrationEnded();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative p-8 glass-card border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon size={28} style={{ color: color }} />
      </div>

      <h3 className="text-2xl font-orbitron font-bold text-white mb-4 tracking-wider group-hover:text-neon-blue transition-colors">
        {title}
      </h3>

      <p className="text-gray-400 font-space text-sm leading-relaxed mb-8 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <Link
          to={`/domain/${path}`}
          className="text-[10px] font-orbitron font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all flex items-center gap-2"
        >
          DETAILS <ChevronRight size={14} />
        </Link>

        <Link
          to={ended ? "#" : `/register?domain=${encodeURIComponent(title)}`}
          onClick={ended ? (e) => e.preventDefault() : undefined}
        >
          <motion.button
            whileHover={ended ? {} : { scale: 1.05 }}
            whileTap={ended ? {} : { scale: 0.95 }}
            disabled={ended}
            className={`px-4 py-2 rounded-lg border font-space font-bold text-xs transition-all ${ended ? "bg-gray-800 text-gray-500 border-white/5 cursor-not-allowed" : "bg-white/5 border-white/10 hover:bg-white hover:text-black cursor-pointer"}`}
          >
            {ended ? "CLOSED" : "REGISTER"}
          </motion.button>
        </Link>
      </div>

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl rounded-2xl"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};

export default DomainCard;
