import type { Monument } from "../data/monuments";

interface SidePanelProps {
  monument: Monument | null;
  onClose: () => void;
}

function cloudinaryResize(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

export default function SidePanel({ monument, onClose }: SidePanelProps) {
  if (!monument) return null;

  return (
    <aside className="side-panel">
      <button className="side-panel-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      {monument.imageUrl && (
        <img
          className="side-panel-image"
          src={cloudinaryResize(monument.imageUrl, "w_720,h_400,c_fill,q_auto,f_auto")}
          alt={monument.name}
        />
      )}
      <div className="side-panel-body">
        <p className="side-panel-eyebrow">
          {monument.state} &middot; {monument.era}
        </p>
        <h2 className="side-panel-title">{monument.name}</h2>
        <p className="side-panel-dynasty">{monument.dynasty} dynasty</p>
        <p className="side-panel-description">{monument.description}</p>
      </div>
    </aside>
  );
}
