import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Calendar,
  Plus,
  Trash2,
  ArrowRight,
  Loader2,
  CheckCircle,
  BrainCircuit,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const InputField = ({ label, icon: Icon, error, type = "text", ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500 mb-1">
      {label}
    </label>
    <div
      className={`relative flex items-center glass p-px ${error ? "border-red-500/50" : "border-white/10 group-focus-within:border-neon-blue/50"}`}
    >
      <div className="absolute left-4 text-gray-400 group-focus-within:text-neon-blue transition-colors">
        {Icon && <Icon size={18} />}
      </div>
      <input
        className="w-full bg-white/5 border-none outline-none px-12 py-4 rounded-2xl font-space text-white placeholder-white/20 transition-all focus:bg-white/10"
        type={type}
        {...props}
      />
    </div>
    {error && (
      <span className="text-[10px] text-red-400 font-space mt-1">{error}</span>
    )}
  </div>
);

const SectionTitle = ({ children, step }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-8 h-8 rounded-lg bg-neon-blue flex items-center justify-center font-orbitron font-black text-black text-sm shrink-0">
      {step}
    </div>
    <h3 className="text-xl font-orbitron font-bold text-white tracking-widest uppercase">
      {children}
    </h3>
  </div>
);

const SelectField = ({ label, icon: Icon, error, options, ...props }) => (
  <div className="flex flex-col gap-2 group">
    <label className="text-[10px] font-orbitron font-bold uppercase tracking-widest text-gray-500 mb-1">
      {label}
    </label>
    <div
      className={`relative flex items-center glass p-px ${error ? "border-red-500/50" : "border-white/10 group-focus-within:border-neon-blue/50"}`}
    >
      <div className="absolute left-4 text-gray-400 group-focus-within:text-neon-blue transition-colors z-10">
        {Icon && <Icon size={18} />}
      </div>
      <select
        className={`w-full bg-white/5 border-none outline-none pl-12 pr-6 py-4 rounded-2xl font-space appearance-none cursor-pointer focus:bg-white/10 transition-all ${
          !props.value ? "text-white/20" : "text-white"
        }`}
        {...props}
      >
        <option value="" disabled className="bg-black">
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-black text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
    {error && (
      <span className="text-[10px] text-red-400 font-space mt-1">{error}</span>
    )}
  </div>
);

const RegistrationForm = ({ initialDomain }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    domain: initialDomain || "",
    teamLead: {
      name: "",
      college: "",
      year: "",
      department: "",
      email: "",
      phone: "",
    },
    teammates: [],
    driveLink: "", 
  });

  const [errors, setErrors] = useState({});

  const domains = [
    "AI / ML",
    "Blockchain",
    "Cybersecurity",
    "Social Innovation",
    "IoT",
  ];

  const validate = () => {
    let newErrors = {};
    if (!formData.teamName) newErrors.teamName = "Team name is required";
    if (!formData.domain) newErrors.domain = "Domain is required";

    // Team Lead Validation
    const leadFields = [
      "name",
      "college",
      "year",
      "department",
      "email",
      "phone",
    ];
    leadFields.forEach((field) => {
      if (!formData.teamLead[field])
        newErrors[`lead_${field}`] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    });

    if (
      formData.teamLead.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teamLead.email)
    ) {
      newErrors.lead_email = "Invalid email format";
    }

    if (formData.teamLead.phone && !/^\d{10}$/.test(formData.teamLead.phone)) {
      newErrors.lead_phone = "Phone must be 10 digits";
    }

    // Teammates Validation
    formData.teammates.forEach((m, idx) => {
      leadFields.forEach((field) => {
        if (!m[field])
          newErrors[`m${idx}_${field}`] =
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      });
      if (m.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email))
        newErrors[`m${idx}_email`] = "Invalid email";
      if (m.phone && !/^\d{10}$/.test(m.phone))
        newErrors[`m${idx}_phone`] = "10 digits required";
    });

    
    // Drive link validation
    if (!formData.driveLink) {
      newErrors.driveLink = "Drive link is required";
    } 
    else if (!/^https:\/\/drive\.google\.com\/(file\/d\/|drive\/folders\/|open\?id=).+/.test(formData.driveLink)) {
      newErrors.driveLink = "Enter a valid Google Drive link";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadChange = (e) => {
    setFormData({
      ...formData,
      teamLead: { ...formData.teamLead, [e.target.name]: e.target.value },
    });
  };

  const handleTeammateChange = (idx, e) => {
    const newTeammates = [...formData.teammates];
    newTeammates[idx] = {
      ...newTeammates[idx],
      [e.target.name]: e.target.value,
    };
    setFormData({ ...formData, teammates: newTeammates });
  };

  const addTeammate = () => {
    if (formData.teammates.length < 3) {
      setFormData({
        ...formData,
        teammates: [
          ...formData.teammates,
          {
            name: "",
            college: "",
            year: "",
            department: "",
            email: "",
            phone: "",
          },
        ],
      });
    } else {
      toast.error("Maximum 4 members allowed per team");
    }
  };

  const removeTeammate = (idx) => {
    const newTeammates = [...formData.teammates];
    newTeammates.splice(idx, 1);
    setFormData({ ...formData, teammates: newTeammates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData,
      );
      if (response.data.success) {
        setSubmitted(true);
        toast.success("Registration successful!");
        // Trigger confetti
        import("canvas-confetti").then((confetti) => confetti.default());
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass p-12 text-center max-w-2xl mx-auto border-neon-blue/30">
        <div className="w-20 h-20 bg-neon-blue/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-neon-blue" />
        </div>
        <h2 className="text-4xl font-orbitron font-black text-white mb-6 tracking-widest">
          REGISTRATION COMPLETE
        </h2>
        <p className="text-gray-400 font-space text-lg mb-10 leading-relaxed">
          Your team{" "}
          <span className="text-neon-blue font-bold">
            "{formData.teamName}"
          </span>{" "}
          has been registered for{" "}
          <span className="text-neon-purple font-bold">{formData.domain}</span>.
          Check your email for further instructions.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-10 py-5 rounded-full glass border-white/20 text-white font-orbitron font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
        >
          BACK TO HOME
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/5 blur-[100px] -z-10" />

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* WhatsApp Group Notice */}
      <div className="glass p-5 border border-green-500/20 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <MessageCircle className="text-green-400" size={20} />
          Join the official WhatsApp group for announcements and updates.
        </div>

        <a
          href="https://chat.whatsapp.com/BY6g6y3mvCNAtukn6nUSpA?mode=hq2tcla"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-lg bg-green-500 text-white font-orbitron text-xs font-bold tracking-widest hover:bg-green-600 transition-all"
        >
          JOIN GROUP
        </a>

      </div>
      <div className="glass p-5 border border-green-500/20 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <MessageCircle className="text-green-400" size={20} />
          Join the official WhatsApp group for queries.
        </div>

        <a
          href="https://chat.whatsapp.com/D19cv0MDfcULtwcO2SAxZo"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-lg bg-green-500 text-white font-orbitron text-xs font-bold tracking-widest hover:bg-green-600 transition-all"
        >
          JOIN GROUP
        </a>

      </div>
      
        {/* Team Info */}
        <section>
          <SectionTitle step="01">TEAM INFORMATION</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputField
              label="TEAM NAME"
              icon={User}
              name="teamName"
              value={formData.teamName}
              onChange={(e) =>
                setFormData({ ...formData, teamName: e.target.value })
              }
              placeholder="Enter your team name"
              error={errors.teamName}
            />
            <SelectField
              label="SELECTED DOMAIN"
              name="domain"
              icon={BrainCircuit}
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
              error={errors.domain}
              options={domains}
            />
          </div>
        </section>

        {/* Team Lead */}
        <section>
          <SectionTitle step="02">TEAM LEAD DETAILS</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InputField
              label="FULL NAME"
              name="name"
              icon={User}
              value={formData.teamLead.name}
              onChange={handleLeadChange}
              error={errors.lead_name}
              placeholder="John Doe"
            />
            <InputField
              label="COLLEGE"
              name="college"
              icon={Building2}
              value={formData.teamLead.college}
              onChange={handleLeadChange}
              error={errors.lead_college}
              placeholder="Tech University"
            />
            <SelectField
              label="YEAR"
              name="year"
              icon={Calendar}
              value={formData.teamLead.year}
              onChange={handleLeadChange}
              error={errors.lead_year}
              options={["1", "2", "3", "4"]}
            />
            <InputField
              label="DEPARTMENT"
              name="department"
              icon={GraduationCap}
              value={formData.teamLead.department}
              onChange={handleLeadChange}
              error={errors.lead_department}
              placeholder="Computer Science"
            />
            <InputField
              label="EMAIL"
              name="email"
              icon={Mail}
              value={formData.teamLead.email}
              onChange={handleLeadChange}
              error={errors.lead_email}
              placeholder="john@example.com"
            />
            <InputField
              label="PHONE NUMBER"
              name="phone"
              icon={Phone}
              value={formData.teamLead.phone}
              onChange={handleLeadChange}
              error={errors.lead_phone}
              placeholder="9876543210"
            />
          </div>
        </section>

        {/* Teammates */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <SectionTitle step="03">TEAMMATES (UP TO 3)</SectionTitle>
            <button
              type="button"
              onClick={addTeammate}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue font-orbitron font-bold text-xs hover:bg-neon-blue hover:text-black transition-all w-full md:w-auto"
            >
              <Plus size={16} /> ADD MEMBER
            </button>
          </div>

          <AnimatePresence>
            {formData.teammates.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-6 md:p-10 mb-8 border-white/5 relative"
              >
                <button
                  type="button"
                  onClick={() => removeTeammate(idx)}
                  className="absolute top-4 right-4 p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
                <div className="text-xs font-orbitron font-black text-white/20 mb-6 uppercase tracking-[0.4em]">
                  Member {idx + 1}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InputField
                    label="FULL NAME"
                    name="name"
                    icon={User}
                    value={member.name}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_name`]}
                  />
                  <InputField
                    label="COLLEGE"
                    name="college"
                    icon={Building2}
                    value={member.college}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_college`]}
                  />
                  <SelectField
                    label="YEAR"
                    name="year"
                    icon={Calendar}
                    value={member.year}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_year`]}
                    options={["1", "2", "3", "4"]}
                  />
                  <InputField
                    label="DEPARTMENT"
                    name="department"
                    icon={GraduationCap}
                    value={member.department}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_department`]}
                  />
                  <InputField
                    label="EMAIL"
                    name="email"
                    icon={Mail}
                    value={member.email}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_email`]}
                  />
                  <InputField
                    label="PHONE NUMBER"
                    name="phone"
                    icon={Phone}
                    value={member.phone}
                    onChange={(e) => handleTeammateChange(idx, e)}
                    error={errors[`m${idx}_phone`]}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {formData.teammates.length === 0 && (
            <div className="text-center py-12 glass border-dashed border-white/10 text-gray-500 font-space italic">
              No teammates added yet. Teams can have up to 4 members total
              including the lead.
            </div>
          )}

        </section>

        <section>
          <SectionTitle step="04">DRIVE LINK</SectionTitle>

          <div className="grid grid-cols-1 gap-6">

            <InputField
              label="GOOGLE DRIVE LINK"
              name="driveLink"
              icon={ArrowRight}
              value={formData.driveLink}
              onChange={(e) =>
                setFormData({ ...formData, driveLink: e.target.value })
              }
              placeholder="https://drive.google.com/..."
              error={errors.driveLink}
            />

            {/* PPT Template Info */}
            <div className="glass p-5 border border-white/10 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <p className="text-sm text-gray-400 font-space">
                Use our official <span className="text-neon-blue font-bold">PPT Template</span> for submission.
              </p>

              <a
                href="/Chakravyuha_1.0_Template.pptx"
                download
                className="px-5 py-2 rounded-lg bg-neon-blue text-black font-orbitron text-xs font-bold tracking-widest hover:opacity-90 transition-all"
              >
                DOWNLOAD TEMPLATE
              </a>

            </div>

          </div>
        </section>
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
          <p className="text-gray-500 font-space text-sm">
            By registering, you agree to our{" "}
            <span className="text-neon-blue">Terms & Conditions</span> and{" "}
            <span className="text-neon-blue">Code of Conduct</span>.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-white text-black font-orbitron font-black text-sm tracking-widest flex items-center gap-3 disabled:opacity-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "SUBMIT APPLICATION"
            )}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
