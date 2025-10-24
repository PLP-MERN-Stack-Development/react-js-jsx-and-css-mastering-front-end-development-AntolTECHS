import React from "react";
import Card from "../components/Card";
import APIList from "../components/APIList";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl font-semibold mb-2">Welcome to Task Manager</h2>
        <p>
          This project demonstrates React component architecture, state
          management, and API integration with Tailwind CSS styling.
        </p>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Fetched Data (API)</h2>
        <APIList />
      </Card>
    </div>
  );
}
