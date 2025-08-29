import { useEffect, useState } from "react";
import "./App.css";
import { fetch_locations } from "../utilities/fetch_locations";
import { generate_schema_struct } from "../utilities/generate_schema_struct";
import { copy_schema_data } from "../utilities/copy_schema_data";

function App() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState(null);
  const [text, setText] = useState("");

  // Fetch data once
  const data_fetcher = async () => {
    const data = await fetch_locations();
    setLocations(data.response.locations);
  };

  useEffect(() => {
    data_fetcher();
  }, []);

  // Filter locations only when text is not empty
  const filteredLocations =
    text.trim() === "" || location !== null // hide if a location is chosen
      ? []
      : locations.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );

  const location_choice = (item) => {
    setLocation(item);
    setText(""); // clear search input
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full z-20 shadow-md p-4">
        <p className="text-2xl font-bold mb-2">FIND LOCATION</p>
        <input
          className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          type="search"
          placeholder="Type to search..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (location) setLocation(null); // reset choice when typing again
          }}
        />
      </div>

      {filteredLocations.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-md my-1">
          {filteredLocations.map((item) => (
            <div key={item.id || item.name}>
              <p
                onClick={() => location_choice(item)}
                className="text-black cursor-pointer hover:text-gray-600 transition-all duration-300"
              >
                {item.name}
              </p>
              <p className="text-xs text-gray-400">
                ...................................................................
              </p>
            </div>
          ))}
        </div>
      )}

      {location && (
        <div className="p-4 rounded-md bg-gray-50">
          <button
            onClick={() =>
              copy_schema_data(JSON.stringify(generate_schema_struct(location)))
            }
            className="bg-indigo-500 text-white font-semibold px-4 py-1 m-2 rounded-md hover:bg-indigo-600 transition-all duration-300 cursor-pointer"
          >
            COPY SCHEMA
          </button>
          <div className="text-left">
            <pre>
              {JSON.stringify(generate_schema_struct(location), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
