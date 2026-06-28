import type { Monument } from "../data/monuments";

interface SidePanelProps {
  monument: Monument | null;
  onClose: () => void;
}

export default function SidePanel({ monument, onClose }: SidePanelProps) {
  if (!monument) return null;

  return (
    <aside className="side-panel">
      <button className="side-panel-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <p className="side-panel-eyebrow">
        {monument.state} &middot; {monument.era}
      </p>
      <h2 className="side-panel-title">{monument.name}</h2>
      <p className="side-panel-dynasty">{monument.dynasty} dynasty</p>
      <p className="side-panel-description">{monument.description}</p>
    </aside>
  );
}
