import { useState, useEffect } from "react";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import SearchBar from "./components/SearchBar";
import FilterBar, { type Filters } from "./components/FilterBar";
import Timeline from "./components/Timeline";
import type { Monument } from "./data/monuments";
import "./App.css";

const EMPTY_FILTERS: Filters = { dynasty: "", era: "", state: "" };

function App() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Monument | null>(null);
  const [flyTarget, setFlyTarget] = useState<Monument | null>(null);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [view, setView] = useState<"map" | "timeline">("map");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL ?? ""}/api/monuments`)
      .then((res) => res.json())
      .then((data: Monument[]) => setMonuments(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredMonuments = monuments.filter(
    (m) =>
      (!filters.dynasty || m.dynasty === filters.dynasty) &&
      (!filters.era || m.era === filters.era) &&
      (!filters.state || m.state === filters.state)
  );

  function handleSearchSelect(m: Monument) {
    setFilters(EMPTY_FILTERS);
    setView("map");
    setSelected(m);
    setFlyTarget(m);
  }

  function handleTimelineSelect(m: Monument) {
    setView("map");
    setSelected(m);
    setFlyTarget(m);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-title">
          <h1>Monuments of India</h1>
          <p>An interactive map of the country&rsquo;s historical and architectural heritage</p>
        </div>
        <div className="view-toggle">
          <button
            className={`view-toggle-btn ${view === "map" ? "active" : ""}`}
            onClick={() => setView("map")}
          >
            Map
          </button>
          <button
            className={`view-toggle-btn ${view === "timeline" ? "active" : ""}`}
            onClick={() => setView("timeline")}
          >
            Timeline
          </button>
        </div>
        <SearchBar monuments={monuments} onSelect={handleSearchSelect} />
      </header>
      <FilterBar monuments={monuments} filters={filters} onChange={setFilters} />
      <main className="app-main">
        {loading ? (
          <p className="loading">Loading monuments…</p>
        ) : view === "timeline" ? (
          <Timeline monuments={filteredMonuments} onSelect={handleTimelineSelect} />
        ) : (
          <MapView monuments={filteredMonuments} onSelect={setSelected} flyTarget={flyTarget} />
        )}
        {view === "map" && (
          <SidePanel monument={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
