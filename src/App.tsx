import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import type { Monument } from "./data/monuments";
import "./App.css";

function App() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Monument | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? ""}/api/monuments`)
      .then((res) => res.json())
      .then((data: Monument[]) => setMonuments(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Monuments of India</h1>
        <p>An interactive map of the country&rsquo;s historical and architectural heritage</p>
      </header>
      <main className="app-main">
        {loading ? (
          <p className="loading">Loading monuments…</p>
        ) : (
          <MapView monuments={monuments} onSelect={setSelected} />
        )}
        <SidePanel monument={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}

export default App;
