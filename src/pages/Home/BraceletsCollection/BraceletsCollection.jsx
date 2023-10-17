import { useState, useEffect } from "react";
import BraceletsAllCollection from "./BraceletsAllCollection";

const BraceletsCollection = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("Bracelets");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://shine-on-server.vercel.app/jewelryAll"
        );
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
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-3">
        Bracelets Collection
      </h1>
      {loading ? (
        <p className="text-center text-3xl font-bold text-red-400">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredData.map((bracelets) => (
            <BraceletsAllCollection key={bracelets._id} bracelets={bracelets}></BraceletsAllCollection>
          ))}
        </div>
      )}
    </div>
  );
};

export default BraceletsCollection;
