import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
      © {new Date().getFullYear()} Task Manager | Built with React & Tailwind CSS
    </footer>
  );
}
