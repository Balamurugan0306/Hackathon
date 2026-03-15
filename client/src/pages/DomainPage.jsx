import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  ArrowLeft,
  Clock,
  ScrollText,
  AlertTriangle,
  Lightbulb,
  Trophy,
  Cpu,
} from "lucide-react";

/* -------- Common Rules -------- */
const commonRules = [
  "Each team shall consist of a maximum of four members.",
  "All teams are required to prepare a PowerPoint presentation explaining their proposed idea or solution.",
  "Teams presenting a working prototype or demonstration will receive additional consideration during the Round 1 evaluation.",
  "All participants will take part in a 5-minute online evaluation round conducted via Google Meet.",
  "The provided problem statements are intended solely for the purpose of the first-round online evaluation.",
];

/* -------- Common Timeline -------- */
const commonTimeline = [
  { time: "Day 1: 10AM", event: "PPT Submission" },
  { time: "Day 1: 2PM", event: "Online Evaluation (G-meet)" },
  { time: "Day 2: 6AM", event: "Shortlisting Based on your presentation" },
  { time: "Day 2: 2PM", event: "Round 2 (offline)(The Shortlisted teams has to pay the registration fee of 200 INR per team to confirm their participation in Round 2)" }
];


const domainDetails = {
  "ai-ml": {
    title: "AI / ML",
    description:
      "Artificial Intelligence and Machine Learning are the brains of the future. This domain challenges you to build models that think, learn, and act.",
    problem:
      "Truck drivers often operate for long hours in highly polluted environments such as mining areas and industrial zones. Poor air quality inside the vehicle cabin can negatively affect the driver’s health, leading to fatigue, reduced alertness, and an increased risk of accidents. Therefore, there is a need for a smart system that can continuously monitor the air quality inside the cabin and take actions to improve it when necessary. \n\n The proposed solution should be able to detect harmful air pollutants, assess the air quality level, and automatically activate mechanisms to improve the cabin environment. Additionally, the system should monitor vital health parameters of the driver, such as heart rate and oxygen saturation levels, to ensure their well-being. In case of abnormal conditions, the system should provide real-time alerts to both the driver and fleet management, enabling timely intervention and improving overall safety and health monitoring.",
    rules: commonRules,
    timeline: commonTimeline,
  },

  blockchain: {
    title: "Blockchain",
    description:
      "Decentralized technologies provide the trust layer for the internet. Build smart contracts and Web3 apps that eliminate the middleman.",
    problem:
      "India needs a secure digital system to verify educational credentials from 500+ AICTE-approved colleges, as current manual verification takes 3–7 days and is vulnerable to document fraud.\nThe platform must support millions of credentials annually while keeping the issuance cost below ₹10 per credential.\nStudents should control their credentials through selective disclosure, sharing only necessary information with employers or institutions.\nThe system must also enable offline verification using QR codes for areas with limited internet access.\nThe solution should be a scalable blockchain-based credential verification platform that integrates with existing university ERP systems and complies with DPDPA 2023 and GDPR.",
    rules: commonRules,
    timeline: commonTimeline,
  },

  cybersecurity: {
    title: "Cybersecurity",
    description:
      "In an era of digital warfare, security is everything. Build tools to defend, detect, and mitigate cyber threats.",
    problem:
      "Ransomware attacks are becoming more advanced, with modern variants capable of staying hidden in systems for long periods while studying user behavior and file activity before launching an attack. These sleeper ransomware threats mimic normal system processes, making them difficult for traditional security tools to detect until files start getting encrypted. Existing cybersecurity solutions mostly identify ransomware only after suspicious activity begins, which is often too late to prevent damage.\nDesign ChronoShield, a system that analyzes the behavioral patterns of processes, users, and file interactions over time to detect early signs of ransomware preparation. The platform should monitor unusual activity patterns, detect abnormal file access or modification behavior, and use decoy files to trigger alerts when suspicious actions occur. The solution must operate with minimal system overhead, reduce false positives during normal operations like backups, and work even in offline or restricted network environments to protect critical systems.",    
    rules: commonRules,
    timeline: commonTimeline,
  },
  
  "social-innovation": {
    title: "Social Innovation",
    description:
      "Technology should serve humanity. Think outside the box and solve problems related to health, education, and equality.",
    problem:
      "Air pollution is a major public health challenge in many Indian cities such as Delhi, Mumbai, Chennai, and Bengaluru due to rapid urbanization, traffic congestion, and industrial emissions. Although initiatives like the National Clean Air Programme (NCAP) exist, air quality monitoring stations are limited and unevenly distributed, leaving many neighborhoods without accurate local pollution data. Develop a data-driven platform that predicts and visualizes air quality across urban areas using environmental, traffic, and weather data. The system should identify pollution hotspots, generate neighborhood-level insights, and provide early health risk alerts to help citizens and city planners take proactive measures to improve urban air quality.",
    rules: commonRules,
    timeline: commonTimeline,
  },

  iot: {
    title: "IoT",
    description:
      "Connecting the physical and digital worlds. Use sensors, controllers, and data to build smart, responsive environments.",
    problem:
      "To detect air quality inside the cabin and improve it. Typically truck drivers operate for long hours and at times in highly polluted environments like mines. Driver health and alertness while driving is key to avoid accidents at work site. Sometimes air quality deteriorates inside the cabin, and this could lead to driver fatigue. Can you come up with solutions that can detect the air quality level inside the cabin and improve it, and at the same time alerting the driver as well as fleet management about the vital health characteristics of the driver like heart rate, oxygen level etc.",
    rules: commonRules,
    timeline: commonTimeline,
  },
};

const DomainPage = () => {
  const { domainId } = useParams();
  const domain = domainDetails[domainId] || domainDetails["ai-ml"];
  const [activeRound, setActiveRound] = useState(null);
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Header */}
      <header className="relative pt-40 pb-20 px-6 bg-white/2">
        <div className="container mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors font-orbitron font-bold text-xs tracking-widest mb-12"
          >
            <ArrowLeft size={16} /> BACK TO DOMAINS
          </Link>

          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1 rounded-lg glass border-neon-blue/20 text-neon-blue font-orbitron font-bold text-[10px] tracking-widest mb-6"
              >
                DOMAIN OVERVIEW
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-orbitron font-black text-white mb-8 tracking-widest leading-tight"
              >
                {domain.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 font-space text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                {domain.description}
              </motion.p>
            </div>

            <div className="lg:w-96 flex flex-col gap-8">
              <div className="glass p-8 border-neon-blue/20">
                <div className="text-[10px] font-orbitron text-gray-500 tracking-[0.3em] uppercase mb-4">
                  PRIZE POOL
                </div>
                <div className="text-4xl font-orbitron font-black text-white flex items-center gap-4">
                  ₹10,000 <Trophy className="text-yellow-500" />
                </div>
                <div className="mt-4 text-[10px] text-neon-blue/70 font-space font-medium tracking-tight">
                  Each domain will have only one prize awarded.
                </div>
              </div>
              <Link
                to={`/register?domain=${encodeURIComponent(domain.title)}`}
                className="w-full"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-xl bg-white text-black font-orbitron font-black text-lg tracking-widest transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                  APPLY FOR DOMAIN
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-20 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Problem & Rules */}
          <div className="lg:col-span-2 space-y-12">
            {/* Problem Statement */}
            <section className="glass p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Lightbulb size={120} className="text-neon-blue" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded bg-neon-blue/20 flex items-center justify-center text-neon-blue">
                  <Lightbulb size={24} />
                </div>
                <h2
                  className="text-2xl font-orbitron font-black text-white tracking-widest"
                  id="problem-statement"
                >
                  PROBLEM STATEMENT
                </h2>
              </div>
              <p className="text-gray-300 font-space text-lg italic leading-relaxed">
                "{domain.problem}"  
              </p>
            </section>

            {/* Rules */}
            <section className="glass p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded bg-neon-purple/20 flex items-center justify-center text-neon-purple">
                  <ScrollText size={24} />
                </div>
                <h2 className="text-2xl font-orbitron font-black text-white tracking-widest">
                  RULES
                </h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domain.rules.map((rule, i) => (
                  <li
                    key={i}
                    className="flex gap-4 items-start bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <AlertTriangle
                      size={18}
                      className="text-neon-pink shrink-0 mt-1"
                    />
                    <span className="text-gray-400 font-space text-sm leading-relaxed">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Timeline */}
          <aside>
            <div className="glass p-10 sticky top-32">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                  <Clock size={24} />
                </div>
                <h2 className="text-2xl font-orbitron font-black text-white tracking-widest uppercase">
                  TIMELINE
                </h2>
              </div>
              <div className="space-y-10 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
                {domain.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-14 group">
                    <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-neon-cyan group-hover:bg-neon-cyan transition-colors z-10" />
                    {/* <div className="text-[10px] font-orbitron font-bold text-neon-cyan tracking-[0.2em] mb-1">
                      {item.time}
                    </div> */}
                    <div className="text-sm font-space font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {item.event}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-xl bg-neon-blue/5 border border-dashed border-neon-blue/20">
                <div className="flex items-center gap-3 text-neon-blue mb-4">
                  <Cpu size={18} />
                  <span className="font-orbitron font-bold text-[10px] tracking-widest uppercase">
                    Judging Criteria
                  </span>
                </div>
                <ul className="text-[10px] font-space text-gray-500 uppercase tracking-widest space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Innovation:</span>{" "}
                    <span className="text-white">40%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Technicality:</span>{" "}
                    <span className="text-white">30%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Presentation:</span>{" "}
                    <span className="text-white">20%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Teamwork:</span>{" "}
                    <span className="text-white">10%</span>
                  </li>
                </ul>
              </div>
              
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default DomainPage;
