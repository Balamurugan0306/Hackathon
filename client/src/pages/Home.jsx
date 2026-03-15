import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DomainCard from "../components/DomainCard";
import {
  BrainCircuit,
  Database,
  Shield,
  Globe,
  Cpu,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
const domains = [
  {
    title: "AI / ML",
    icon: BrainCircuit,
    description:
      "Build the next generation of intelligent systems. From neural networks to computer vision, show us how AI can reshape our reality.",
    color: "#00f2fe",
    path: "ai-ml",
  },
  {
    title: "Blockchain",
    icon: Database,
    description:
      "Decentralize the future. Smart contracts, DeFi, and Web3 solutions that define a more transparent and secure digital economy.",
    color: "#7b2ff7",
    path: "blockchain",
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    description:
      "Harden the digital walls. Defend against next-gen threats with innovative security frameworks and zero-trust architectures.",
    color: "#ff007f",
    path: "cybersecurity",
  },
  {
    title: "Social Innovation",
    icon: Globe,
    description:
      "Hack for good. Use technology to solve real-world social problems, from education access to sustainable living.",
    color: "#4facfe",
    path: "social-innovation",
  },
  {
    title: "IoT",
    icon: Cpu,
    description:
      "Connect the unconnected. Integrate hardware and software to build smart environments that react and adapt to the real world.",
    color: "#00d2ff",
    path: "iot",
  },
];

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <Hero />

      {/* Domains Section */}
      <motion.section
        id="domains"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="py-32 px-6"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-1.5 rounded-full glass border-white/20 mb-6 font-orbitron font-bold text-[10px] tracking-widest text-neon-blue">
              CHOOSE YOUR ARENA
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-orbitron font-black text-white mb-6 uppercase tracking-widest leading-tight">
              CORE <span className="text-neon-blue">DOMAINS</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-500 font-space text-lg">
              Explore our 5 specialized tracks. Each domain represents a
              fundamental pillar of the future tech landscape.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {domains.map((domain, index) => (
              <DomainCard key={index} {...domain} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      {/* <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 px-6 relative overflow-hidden"
      >
        <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center border-y border-white/5 py-20 bg-white/1">
          {[
            { label: "48H", sub: "Intense Hacking" },
            { label: "150+", sub: "Finalists" },
            { label: "$50K", sub: "Prize Money" },
            { label: "20+", sub: "Renowned Mentors" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-6xl font-orbitron font-black text-white mb-2">
                {stat.label}
              </div>
              <div className="text-[10px] font-orbitron text-gray-500 tracking-widest uppercase">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section> */}

      {/* Schedule Section */}
      <motion.section
        id="schedule"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-32 px-6 relative overflow-hidden"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-4 py-1.5 rounded-full glass border-white/20 mb-6 font-orbitron font-bold text-[10px] tracking-widest text-neon-blue">
              EVENT TIMELINE
            </div>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6 uppercase tracking-widest leading-tight">
              HACKATHON <span className="text-neon-purple">SCHEDULE</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-linear-to-b from-neon-blue via-neon-purple to-transparent opacity-30" />

            <div className="space-y-16">
              {[
                {
                  day: "March 15, 2026",
                  time: "06:00 PM",
                  title: "Registration starts",
                  desc: "Participants can start registering their teams by providing the required details.",
                },
                {
                  day: "March 17, 2026",
                  time: "6:00 PM",
                  title: "Registration ends",
                  desc: "All teams must complete their registration and submit the required details before the deadline.",
                },
                {
                  day: "March 17 -18, 2026",
                  time: "07:00 PM- 10:00 AM",
                  title: "Round 1 Evaluation",
                  desc: "Each team will present their idea or solution to the evaluation panel within the allotted time.",
                },
                {
                  day: "March 18, 2026",
                  time: "5:00 PM",
                  title: "Round 1 Results",
                  desc: "The shortlisted teams from Round 1 will be officially announced.",
                },
                {
                  day: "March 24, 2026",
                  time: "",
                  title: "Round 2 Kickoff",
                  desc: "Round 2 of the event will officially begin on this date.The Shortlisted teams has to pay the registration fee of 200 INR per team to confirm their participation in Round 2.Further announcements regarding the schedule, guidelines, and evaluation process will be shared soon with the shortlisted teams.",
                },
                // {
                //   day: "DAY 03",
                //   time: "12:00 PM",
                //   title: "SUBMISSION DEADLINE",
                //   desc: "All code and projects must be submitted to devpost.",
                // },
                // {
                //   day: "DAY 03",
                //   time: "03:00 PM",
                //   title: "AWARD CEREMONY",
                //   desc: "Project demonstrations and prize distribution.",
                // },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0a0a0c] border-2 border-neon-blue z-10 shadow-[0_0_15px_rgba(0,242,254,0.5)]" />

                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <div
                      className={`glass p-6 border-white/10 hover:border-neon-blue/30 transition-all ${idx % 2 === 0 ? "md:ml-12" : "md:mr-12"}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-orbitron font-bold text-neon-blue tracking-widest px-2 py-1 rounded bg-neon-blue/10">
                          {item.day}
                        </span>
                        <span className="text-[10px] font-orbitron font-bold text-gray-500 tracking-widest">
                          {item.time}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-orbitron font-black text-white mb-2 tracking-widest">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 font-space text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-neon-blue to-neon-purple flex items-center justify-center font-bold font-orbitron">
                  N
                </div>
                <span className="font-orbitron font-bold text-xl tracking-tighter text-white">
                  CHAKRAVYUHA 1.0
                </span>
              </div>
              <p className="text-gray-500 font-space text-sm leading-relaxed mb-8">
                The ultimate battleground for the next generation of engineers.
                Entering the maze of innovation.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-white transition-all cursor-pointer"
                  >
                    #{i}
                  </div>
                ))}
              </div>
            </div> */}
{/* 
            <div>
              <h4 className="font-orbitron font-bold text-white mb-8 tracking-widest text-sm uppercase">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-4 text-gray-500 font-space text-sm font-medium">
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  The Event
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Sponsors
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Past Winners
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Our Team
                </li>
              </ul>
            </div> */}

            {/* <div>
              <h4 className="font-orbitron font-bold text-white mb-8 tracking-widest text-sm uppercase">
                Support
              </h4>
              <ul className="flex flex-col gap-4 text-gray-500 font-space text-sm font-medium">
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  FAQ
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Code of Conduct
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Privacy
                </li>
                <li className="hover:text-neon-blue transition-colors cursor-pointer">
                  Contact
                </li>
              </ul>
            </div> */}

            <div>
              <h4 className="font-orbitron font-bold text-white mb-8 tracking-widest text-sm uppercase">
                Reach Out
              </h4>
              <ul className="flex flex-col gap-6 text-gray-500 font-space text-sm font-medium">
                <li className="flex items-center gap-4">
                  <Mail size={18} className="text-neon-blue" />{" "}
                  info@chakravyuha.io
                </li>
                <li className="flex items-center gap-4">
                  <Phone size={18} className="text-neon-purple" /> +91 99442 15419 | +91 91763 27722
                </li>
                <li className="flex items-center gap-4">
                  <MapPin size={18} className="text-neon-pink" /> Sri Sairam Institute of Technology, Chennai
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-12 gap-6 text-center md:text-left">
            <div className="font-space text-[11px] text-gray-500 tracking-widest uppercase">
              © 2026 CHAKRAVYUHA 1.0
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Home;
