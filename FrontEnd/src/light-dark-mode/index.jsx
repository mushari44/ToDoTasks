import useLocalStorage from "./useLocalStorage";
import { MdDarkMode } from "react-icons/md";
import React from "react";
export default function LightDarkMode() {
  const [theme, setTheme] = useLocalStorage("them", "dark");
  function handleToggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("Setting theme to:", newTheme);
  }
  React.useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]); // Re-run when theme changes
  return (
    <div className="light-dark-mode" data-theme={theme}>
      <div className="container">
        <MdDarkMode
          onClick={handleToggleTheme}
          className="theme-mode"
        ></MdDarkMode>
        <p>theme mode : {theme}</p>
      </div>
    </div>
  );
}
