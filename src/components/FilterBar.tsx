import type { Monument } from "../data/monuments";

export interface Filters {
  dynasty: string;
  era: string;
  state: string;
}

interface FilterBarProps {
  monuments: Monument[];
  filters: Filters;
  onChange: (f: Filters) => void;
}

export default function FilterBar({ monuments, filters, onChange }: FilterBarProps) {
  function unique(key: keyof Pick<Monument, "dynasty" | "era" | "state">) {
    return [...new Set(monuments.map((m) => m[key]))].sort();
  }

  function set(key: keyof Filters, value: string) {
    onChange({ ...filters, [key]: value });
  }

  const active = Object.values(filters).some(Boolean);

  return (
    <div className="filter-bar">
      <span className="filter-label">Filter</span>

      <select className="filter-select" value={filters.dynasty} onChange={(e) => set("dynasty", e.target.value)}>
        <option value="">All dynasties</option>
        {unique("dynasty").map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      <select className="filter-select" value={filters.era} onChange={(e) => set("era", e.target.value)}>
        <option value="">All eras</option>
        {unique("era").map((e) => <option key={e} value={e}>{e}</option>)}
      </select>

      <select className="filter-select" value={filters.state} onChange={(e) => set("state", e.target.value)}>
        <option value="">All states</option>
        {unique("state").map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      {active && (
        <button className="filter-clear" onClick={() => onChange({ dynasty: "", era: "", state: "" })}>
          Clear all
        </button>
      )}
    </div>
  );
}
