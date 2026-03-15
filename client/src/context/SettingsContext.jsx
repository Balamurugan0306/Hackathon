import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    registrationDeadline: "2026-03-16T12:30:00.000Z", // March 16, 2026, 6:00 PM IST
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/settings");
      if (response.data.success) {
        setSettings((prev) => ({ ...prev, ...response.data.data }));
      }
    } catch (error) {
      console.error("Failed to fetch settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.post(
        "http://localhost:5000/api/admin/settings",
        { key, value },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (response.data.success) {
        setSettings((prev) => ({ ...prev, [key]: value }));
        return true;
      }
    } catch (error) {
      console.error("Failed to update setting:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const isRegistrationEnded = () => {
    const now = new Date().getTime();
    const deadline = new Date(settings.registrationDeadline).getTime();
    return now >= deadline;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        loading,
        isRegistrationEnded,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext };
