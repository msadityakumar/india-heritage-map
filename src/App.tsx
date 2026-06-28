import { useState } from "react";
import MapView from "./components/MapView";
import SidePanel from "./components/SidePanel";
import { monuments, type Monument } from "./data/monuments";
import "./App.css";

function App() {
  const [selected, setSelected] = useState<Monument | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Monuments of India</h1>
        <p>An interactive map of the country&rsquo;s historical and architectural heritage</p>
      </header>
      <main className="app-main">
        <MapView monuments={monuments} onSelect={setSelected} />
        <SidePanel monument={selected} onClose={() => setSelected(null)} />
      </main>
    </div>
  );
}

export default App;
