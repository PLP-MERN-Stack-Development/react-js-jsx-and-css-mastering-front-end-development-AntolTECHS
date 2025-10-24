import React from "react";
import Card from "../components/Card";

export default function About() {
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2">About This App</h2>
      <p>
        This Task Manager app was built using React.js and Tailwind CSS. It
        demonstrates state management with hooks, reusable components, and API
        integration.
      </p>
    </Card>
  );
}
