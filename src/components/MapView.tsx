import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import type { Monument } from "../data/monuments";

// Default Leaflet marker icons reference image files in a way that breaks
// with most bundlers (Vite included). Easiest fix: skip the default icon
// entirely and draw our own pin with a div + CSS instead of a PNG.
const pinIcon = L.divIcon({
  className: "monument-pin",
  html: `<div class="monument-pin-dot"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface MapViewProps {
  monuments: Monument[];
  onSelect: (monument: Monument) => void;
}

export default function MapView({ monuments, onSelect }: MapViewProps) {
  return (
    <MapContainer
      center={[22.5, 79]} // roughly the geographic center of India
      zoom={5}
      minZoom={4}
      className="map-container"
      scrollWheelZoom
    >
      {/* OpenStreetMap tiles — free, no API key, no signup required */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {monuments.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={pinIcon}
          eventHandlers={{ click: () => onSelect(m) }}
        />
      ))}
    </MapContainer>
  );
}
