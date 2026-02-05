import { useEffect } from "react";
import { GeoJSON } from "react-leaflet";
import { useMap } from "react-leaflet";

interface DistrictGeoJSONProps {
  data: any;
  thematicLayer: string;
  getColorForThematic: (districtName: string) => string;
  onDistrictClick: (districtName: string) => void;
}

export function DistrictGeoJSON({ 
  data, 
  thematicLayer, 
  getColorForThematic, 
  onDistrictClick 
}: DistrictGeoJSONProps) {
  const map = useMap();

  useEffect(() => {
    if (data) {
      map.fitBounds([
        [26.3, 80.0],
        [30.5, 88.2]
      ]);
    }
  }, [data, map]);

  // Always return fragment to maintain consistent children structure
  if (!data) {
    return <></>;
  }

  return (
    <GeoJSON
      key={`geojson-${thematicLayer}`}
      data={data}
      style={(feature) => ({
        fillColor: getColorForThematic(feature?.properties?.DISTRICT || ""),
        weight: 1,
        opacity: 1,
        color: "#666",
        fillOpacity: 0.7,
      })}
      onEachFeature={(feature, layer) => {
        const districtName = feature.properties.DISTRICT;
        layer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 3,
              color: "#000",
              fillOpacity: 0.9,
            });
            layer.bindTooltip(districtName, { permanent: false, direction: "top" }).openTooltip();
          },
          mouseout: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 1,
              color: "#666",
              fillOpacity: 0.7,
            });
            layer.closeTooltip();
          },
          click: () => {
            onDistrictClick(districtName);
          },
        });
      }}
    />
  );
}
