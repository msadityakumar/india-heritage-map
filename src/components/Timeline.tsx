import type { Monument } from "../data/monuments";

function parseEraYear(era: string): number {
  const bce = /bce/i.test(era);
  const match = era.match(/(\d+)(?:st|nd|rd|th)/);
  if (!match) return 9999;
  const century = parseInt(match[1]);
  const year = (century - 1) * 100 + 50;
  return bce ? -year : year;
}

function cloudinaryResize(url: string, transform: string) {
  return url.replace("/upload/", `/upload/${transform}/`);
}

interface TimelineProps {
  monuments: Monument[];
  onSelect: (m: Monument) => void;
}

export default function Timeline({ monuments, onSelect }: TimelineProps) {
  if (monuments.length === 0) {
    return (
      <div className="timeline-view timeline-empty">
        <p>No monuments match the current filters.</p>
      </div>
    );
  }

  const sorted = [...monuments].sort((a, b) => parseEraYear(a.era) - parseEraYear(b.era));

  return (
    <div className="timeline-view">
      <div className="timeline-track">
        {sorted.map((m, i) => (
          <div key={m.id} className="timeline-item">
            <button className="timeline-card" onClick={() => onSelect(m)}>
              {m.imageUrl && (
                <img
                  className="timeline-thumbnail"
                  src={cloudinaryResize(m.imageUrl, "w_390,h_220,c_fill,q_auto,f_auto")}
                  alt={m.name}
                />
              )}
              <div className="timeline-card-body">
                <span className="timeline-era-badge">{m.era}</span>
                <p className="timeline-card-name">{m.name}</p>
                <p className="timeline-card-meta">{m.dynasty}</p>
                <p className="timeline-card-meta">{m.state}</p>
              </div>
            </button>
            <div className={`timeline-stem ${i % 2 === 0 ? "tall" : "short"}`} />
            <div className="timeline-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}
