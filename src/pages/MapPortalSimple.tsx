import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const NEPAL_CENTER: [number, number] = [28.3949, 84.1240];

export default function MapPortalSimple() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/okfnepal/nepal-geojson/master/districts.geojson")
      .then((res) => res.json())
      .then((data) => {
        setGeoJsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nepal District Map (Simplified)</h1>
      
      <div style={{ height: "600px", width: "100%" }}>
        <MapContainer
          center={NEPAL_CENTER}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />
          {geoJsonData && (
            <GeoJSON
              data={geoJsonData}
              style={() => ({
                fillColor: "#3388ff",
                weight: 1,
                color: "#666",
                fillOpacity: 0.5,
              })}
            />
          )}
        </MapContainer>
      </div>
      
      {loading && <p className="mt-4">Loading map data...</p>}
    </div>
  );
}
