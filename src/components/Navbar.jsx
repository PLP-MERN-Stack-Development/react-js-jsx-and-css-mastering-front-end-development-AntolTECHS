import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Button from "./Button";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="font-bold text-lg">
          Task Manager
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Tasks
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          About
        </NavLink>
      </div>
      <Button variant="secondary" onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Button>
    </nav>
  );
}
