import React, { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";

export default function Settings() {
  let { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <div className="container mt-16">
        <h2 className="dark:text-white text-3xl">
          <i className="fa-solid fa-circle-arrow-right fa-flip-horizontal me-2 text-main"></i>
          الإعدادات
        </h2>

        <div className="mt-4 flex items-center">
          <i className="fa-solid fa-circle-arrow-right fa-flip-horizontal me-2 text-main"></i>
          {theme === "dark" ? (
            <p className="text-white">تغيير إالى الوضع النهاري</p>
          ) : (
            <p>تغيير إالى الوضع الليلي</p>
          )}

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-2 py-1 border rounded-lg bg-gray-200 dark:bg-gray-800 dark:text-white ms-2"
          >
            {theme === "dark" ? "☀️ الوضع النهاري" : "🌙 الوضع الليلي"}
          </button>
        </div>
      </div>
    </>
  );
}
