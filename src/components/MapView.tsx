import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
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

function MapController({ target }: { target: Monument | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 8), { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

function ClusterLayer({
  monuments,
  onSelect,
}: {
  monuments: Monument[];
  onSelect: (m: Monument) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({ maxClusterRadius: 60, spiderfyOnMaxZoom: true });

    monuments.forEach((m) => {
      L.marker([m.lat, m.lng], { icon: pinIcon })
        .on("click", () => onSelect(m))
        .addTo(group);
    });

    map.addLayer(group);
    return () => { map.removeLayer(group); };
  }, [monuments, onSelect, map]);

  return null;
}

interface MapViewProps {
  monuments: Monument[];
  onSelect: (monument: Monument) => void;
  flyTarget: Monument | null;
}

export default function MapView({ monuments, onSelect, flyTarget }: MapViewProps) {
  return (
    <MapContainer
      center={[22.5, 79]}
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
      <MapController target={flyTarget} />
      <ClusterLayer monuments={monuments} onSelect={onSelect} />
    </MapContainer>
  );
}
