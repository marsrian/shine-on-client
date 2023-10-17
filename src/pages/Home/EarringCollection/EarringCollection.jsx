import { useState, useEffect } from "react";
import EarringAllCollection from "./EarringAllCollection";

const EarringCollection = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Earrings");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://shine-on-server.vercel.app/jewelryAll");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredData = data.filter((item) => item.category === category);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">Earrings Collection</h1>
      {loading ? (
          <p className="text-center text-3xl font-bold text-red-400">
            Loading...
          </p>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredData.map((earring) => (
              <EarringAllCollection key={earring._id} earring={earring}></EarringAllCollection>
            ))}
          </div>
        )}
    </div>
  );
};

export default EarringCollection;