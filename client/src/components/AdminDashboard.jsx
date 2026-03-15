import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  Users,
  Download,
  Search,
  LayoutDashboard,
  Database,
  Shield,
  BrainCircuit,
  Cpu,
  Globe,
  ArrowRight,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "./Navbar";
import { useSettings } from "../hooks/useSettings";
import { Clock } from "lucide-react";

const AdminDashboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Registrations");
  const { settings, updateSetting, fetchSettings } = useSettings();
  const [deadline, setDeadline] = useState(settings.registrationDeadline);

  const domains = [
    "All",
    "AI / ML",
    "Blockchain",
    "Cybersecurity",
    "Social Innovation",
    "IoT",
  ];

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get(
        "http://localhost:5000/api/admin/teams",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setTeams(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        window.location.href = "/admin/login";
      } else {
        toast.error("Failed to fetch teams");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (settings.registrationDeadline) {
      setDeadline(settings.registrationDeadline);
    }
  }, [settings.registrationDeadline]);

  const filteredTeams = teams.filter((team) => {
    const matchesDomain = filter === "All" || team.domain === filter;
    const matchesSearch =
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.teamLead.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const exportToPDF = () => {
    if (teams.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(20);
    doc.setTextColor(0, 242, 254); // Neon Blue
    doc.text("CHAKRAVYUHA 1.0", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Official Registration Report", 105, 22, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 28, {
      align: "center",
    });
    doc.text(`Total Registrations: ${teams.length}`, 105, 33, {
      align: "center",
    });

    // Table Headers
    const tableColumn = [
      "Team Name",
      "Domain",
      "Lead Name",
      "Email",
      "Phone",
      "Members",
    ];
    const tableRows = [];

    // Sort teams by domain for a cleaner report
    const sortedTeams = [...teams].sort((a, b) =>
      a.domain.localeCompare(b.domain),
    );

    sortedTeams.forEach((team) => {
      const teamData = [
        team.teamName,
        team.domain,
        team.teamLead.name,
        team.teamLead.email,
        team.teamLead.phone,
        team.teammates.length + 1,
      ];
      tableRows.push(teamData);
    });

    // Generate Table
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      headStyles: {
        fillColor: [0, 242, 254],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        halign: "center",
      },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        overflow: "linebreak",
        halign: "left",
      },
      columnStyles: {
        5: { halign: "center" }, // Center align Members count
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 40 },
    });

    // Save the PDF
    doc.save(
      `Chakravyuha_Registrations_All_Domains_${new Date().toISOString().split("T")[0]}.pdf`,
    );
    toast.success("PDF Exported successfully!");
  };

  const getIcon = (domain) => {
    switch (domain) {
      case "AI / ML":
        return <BrainCircuit className="text-neon-blue" />;
      case "Blockchain":
        return <Database className="text-neon-purple" />;
      case "Cybersecurity":
        return <Shield className="text-neon-pink" />;
      case "IoT":
        return <Cpu className="text-neon-cyan" />;
      default:
        return <Globe className="text-white" />;
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center">
                <LayoutDashboard className="text-neon-blue" />
              </div>
              <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white tracking-widest uppercase">
                ADMIN <span className="text-neon-blue">PANEL</span>
              </h2>
            </div>
            <p className="text-gray-500 font-space text-lg">
              Manage and monitor all student registrations and system settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10 mr-4">
              {["Registrations", "Settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-orbitron font-bold text-xs tracking-widest transition-all ${activeTab === tab ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            {activeTab === "Registrations" && (
              <>
                <button
                  onClick={fetchTeams}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-orbitron font-bold text-xs"
                >
                  <RefreshCcw
                    size={20}
                    className={loading ? "animate-spin" : ""}
                  />
                </button>
                <button
                  onClick={exportToPDF}
                  className="px-8 py-4 rounded-xl bg-white text-black font-orbitron font-black text-xs tracking-widest flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                >
                  <Download size={18} /> EXPORT PDF
                </button>
              </>
            )}
          </div>
        </div>

        {activeTab === "Registrations" ? (
          <>
            {/* Filters */}
            <div className="glass p-6 md:p-8 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-4 overflow-x-auto w-full md:w-auto pb-4 md:pb-0 scrollbar-hide">
                {domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilter(d)}
                    className={`px-6 py-2.5 rounded-full font-orbitron font-bold text-[10px] tracking-widest whitespace-nowrap transition-all ${filter === d ? "bg-neon-blue text-black" : "bg-white/5 text-gray-400 hover:text-white border border-white/10"}`}
                  >
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-96">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search Team or Lead Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-neon-blue/50 outline-none px-12 py-3 rounded-xl font-space text-sm text-white transition-all"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="glass p-12 max-w-2xl mx-auto border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center">
                <Clock className="text-neon-purple" />
              </div>
              <div>
                <h3 className="text-xl font-orbitron font-bold text-white tracking-widest">
                  REGISTRATION DEADLINE
                </h3>
                <p className="text-gray-500 font-space text-sm">
                  Set the final cutoff for event registrations. All times are
                  handled in{" "}
                  <span className="text-neon-blue font-bold">
                    IST (GMT+5:30)
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-orbitron font-bold text-gray-500 tracking-[0.2em] uppercase">
                    Closing Date & Time (IST)
                  </label>
                  <span className="text-[10px] font-orbitron text-neon-blue/60 font-bold uppercase tracking-widest">
                    GMT +5:30
                  </span>
                </div>
                <input
                  type="datetime-local"
                  value={
                    deadline
                      ? // Convert ISO to local time string for the input field
                        new Date(
                          new Date(deadline).getTime() -
                            new Date().getTimezoneOffset() * 60000,
                        )
                          .toISOString()
                          .slice(0, 16)
                      : ""
                  }
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-neon-blue outline-none px-6 py-4 rounded-xl font-space text-white transition-all"
                />
              </div>

              <button
                onClick={async () => {
                  if (!deadline) return;

                  // Convert local datetime-local input back to ISO UTC for storage
                  const selectedDate = new Date(deadline);
                  const success = await updateSetting(
                    "registrationDeadline",
                    selectedDate.toISOString(),
                  );

                  if (success) {
                    toast.success(
                      "Registration deadline updated successfully!",
                    );
                    fetchSettings();
                  } else {
                    toast.error("Failed to update deadline");
                  }
                }}
                className="w-full py-5 rounded-xl bg-neon-blue text-black font-orbitron font-black tracking-widest hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-all"
              >
                SAVE SETTINGS
              </button>
            </div>
          </div>
        )}

        {/* Desktop Table View / Mobile Card View */}
        {activeTab === "Registrations" && (
          <div className="hidden lg:block glass overflow-hidden border-white/10">
            {/* Table content (same as before) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-space border-collapse">
                {/* ... existing table children ... */}
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      TEAM & DOMAIN
                    </th>
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      TEAM LEAD
                    </th>
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      MEMBERS
                    </th>
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      CONTACT
                    </th>
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      DATE
                    </th>
                    <th className="px-8 py-6 text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      <tr>
                        <td colSpan="6" className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <Loader2
                              size={40}
                              className="animate-spin text-neon-blue"
                            />
                            <p className="text-gray-500 font-orbitron tracking-widest">
                              LOADING DATA...
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : filteredTeams.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-8 py-20 text-center text-gray-600 font-orbitron tracking-widest"
                        >
                          NO REGISTRATIONS FOUND
                        </td>
                      </tr>
                    ) : (
                      filteredTeams.map((team, idx) => (
                        <motion.tr
                          key={team._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/2 transition-colors group"
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                {getIcon(team.domain)}
                              </div>
                              <div>
                                <div className="font-bold text-white group-hover:text-neon-blue transition-colors">
                                  {team.teamName}
                                </div>
                                <div className="text-xs text-gray-500 uppercase tracking-tighter">
                                  {team.domain}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-medium text-white">
                              {team.teamLead.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.teamLead.college}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm">
                            <div className="flex items-center gap-2">
                              <Users size={14} className="text-gray-500" />
                              <span className="font-bold">
                                {team.teammates.length + 1}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="text-xs font-medium text-gray-300">
                              {team.teamLead.email}
                            </div>
                            <div className="text-xs text-gray-500">
                              {team.teamLead.phone}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-xs text-gray-500">
                            {new Date(team.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-6">
                            <button className="p-2 text-white/20 hover:text-white transition-colors">
                              <ArrowRight size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Mobile View */}
        {activeTab === "Registrations" && (
          <div className="lg:hidden space-y-6">
            {loading ? (
              <div className="flex flex-col items-center gap-4 py-20">
                <Loader2 size={40} className="animate-spin text-neon-blue" />
                <p className="text-gray-500 font-orbitron tracking-widest text-sm">
                  LOADING DATA...
                </p>
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="text-center py-20 text-gray-600 font-orbitron tracking-widest text-sm">
                NO REGISTRATIONS FOUND
              </div>
            ) : (
              filteredTeams.map((team, idx) => (
                <motion.div
                  key={team._id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass p-6 border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        {getIcon(team.domain)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">
                          {team.teamName}
                        </div>
                        <div className="text-[10px] text-neon-blue font-orbitron tracking-widest uppercase">
                          {team.domain}
                        </div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-orbitron text-gray-400">
                      {new Date(team.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-[10px] font-orbitron text-gray-500 tracking-widest uppercase mb-1">
                        TEAM LEAD
                      </div>
                      <div className="text-sm font-medium text-white">
                        {team.teamLead.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {team.teamLead.college}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-orbitron text-gray-500 tracking-widest uppercase mb-1">
                        CONTACT
                      </div>
                      <div className="text-sm text-white truncate">
                        {team.teamLead.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {team.teamLead.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users size={16} />
                      <span className="text-sm font-bold text-white">
                        {team.teammates.length + 1} Members
                      </span>
                    </div>
                    <button className="flex items-center gap-2 text-neon-blue font-orbitron font-bold text-[10px] tracking-widest">
                      VIEW DETAILS <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between text-gray-600 font-space text-[10px] uppercase tracking-widest">
          <div>
            Showing {filteredTeams.length} of {teams.length} registrations
          </div>
          <div>Database: MongoDB Atlas (Cloud)</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
