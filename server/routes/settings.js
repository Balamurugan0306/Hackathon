const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");
const { protect } = require("../middleware/authMiddleware");

// @desc    Get all settings
// @route   GET /api/settings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const settings = await Setting.find({});
    // Return as an object for easier access
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
router.post("/", protect, async (req, res) => {
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
