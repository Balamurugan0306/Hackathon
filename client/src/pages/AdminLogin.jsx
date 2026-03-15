import { useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData,
      );
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("Welcome back, Commander");
        navigate("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "ACCESS DENIED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <Navbar />

      {/* Background Glows */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-neon-blue/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-neon-purple/10 blur-[150px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass p-10 border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <ShieldCheck size={120} className="text-neon-blue" />
          </div>

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="text-neon-blue" size={32} />
            </div>
            <h2 className="text-3xl font-orbitron font-black text-white tracking-widest uppercase">
              ADMIN <span className="text-neon-blue">ACCESS</span>
            </h2>
            <p className="text-gray-500 font-space text-sm mt-3 uppercase tracking-tighter">
              Authorized Personnel Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-orbitron font-bold text-gray-400 tracking-widest uppercase ml-1">
                Security ID (Email)
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder="admin@nexus.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-neon-blue/50 outline-none px-12 py-4 rounded-xl font-space text-white transition-all"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-orbitron font-bold text-gray-400 tracking-widest uppercase ml-1">
                Verification Key
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-neon-blue/50 outline-none px-12 py-4 rounded-xl font-space text-white transition-all"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 rounded-xl bg-neon-blue text-black font-orbitron font-black text-lg tracking-widest flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "AUTHENTICATE"}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center text-[10px] font-space text-gray-600 uppercase tracking-widest">
            Level 5 Encryption Active
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
