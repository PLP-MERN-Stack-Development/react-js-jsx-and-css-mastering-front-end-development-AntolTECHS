import React, { useEffect, useState } from "react";

export default function APIList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">API Data</h2>
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.id} className="border-b py-1">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
