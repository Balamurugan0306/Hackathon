const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// Admin Credentials
const ADMIN_EMAIL = "admin@cce.com";
const ADMIN_PASSWORD = "Mahesh@cce";

// Admin Login
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // In production, use JWT. For now, returning success.
    res.status(200).json({ success: true, token: "nexus_admin_token_2026" });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
});

// Middleware to protect admin routes (Simplified static check for hackathon PRO)
const protect = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "Bearer nexus_admin_token_2026") {
    next();
  } else {
    res.status(401).json({ success: false, error: "Not authorized" });
  }
};

// @desc    Register a new team
// @route   POST /api/register
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { teamName, domain, teamLead, teammates } = req.body;

    // Basic verification
    if (!teamLead || !teamName || !domain) {
      return res
        .status(400)
        .json({ success: false, error: "Please provide all required fields" });
    }

    // Check if team name exists
    const existingTeam = await Team.findOne({ teamName: teamName.trim() });
    if (existingTeam) {
      return res
        .status(400)
        .json({ success: false, error: "Team name already exists" });
    }

    const team = await Team.create({
      teamName,
      domain,
      teamLead,
      teammates,
    });

    res.status(201).json({ success: true, data: team });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const Setting = require("../models/Setting");

// ... (existing code)

// @desc    Get all registered teams
// @route   GET /api/admin/teams
// @access  Private (Admin Role Simplified)
router.get("/admin/teams", protect, async (req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get teams by domain
// @route   GET /api/admin/domain/:domain
// @access  Private (Admin Role Simplified)
router.get("/admin/domain/:domain", protect, async (req, res) => {
  try {
    const domainEvent = req.params.domain.replace(/-/g, " "); // Decode hyphenated param if any
    const teams = await Team.find({
      domain: new RegExp("^" + domainEvent + "$", "i"),
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: teams.length, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Settings Endpoints
// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
router.get("/settings", async (req, res) => {
  try {
    const settings = await Setting.find({});
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json({ success: true, data: settingsObj });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Update a setting
// @route   POST /api/settings
// @access  Private (Admin)
router.post("/admin/settings", protect, async (req, res) => {
  const { key, value } = req.body;
  try {
    let setting = await Setting.findOne({ key });
    if (setting) {
      setting.value = value;
      await setting.save();
    } else {
      setting = await Setting.create({ key, value });
    }
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
