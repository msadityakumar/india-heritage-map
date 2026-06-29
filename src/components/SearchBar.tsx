import { useState, useRef, useEffect } from "react";
import type { Monument } from "../data/monuments";

interface SearchBarProps {
  monuments: Monument[];
  onSelect: (monument: Monument) => void;
}

export default function SearchBar({ monuments, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? monuments
        .filter(
          (m) =>
            m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.state.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleSelect(m: Monument) {
    onSelect(m);
    setQuery("");
    setOpen(false);
  }

  return (
    <div className="search-bar" ref={containerRef}>
      <input
        className="search-input"
        type="text"
        placeholder="Search monuments or states…"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      {open && results.length > 0 && (
        <ul className="search-dropdown" role="listbox">
          {results.map((m) => (
            <li
              key={m.id}
              className="search-result"
              role="option"
              aria-selected={false}
              onMouseDown={() => handleSelect(m)}
            >
              <span className="search-result-name">{m.name}</span>
              <span className="search-result-meta">{m.state}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
