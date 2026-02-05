import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button as TabButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Layers, MapPin } from "lucide-react";
import { nasaPopulationData } from "@/data/nasaPopulation";
import { literacyData } from "@/data/literacy";
import { gdpData } from "@/data/gdp";
import { temperatureData } from "@/data/temperature";
import { precipitationData } from "@/data/precipitation";
import { elevationData } from "@/data/elevation";
import { landCoverData } from "@/data/landCover";
import { urbanGrowthData } from "@/data/urbanGrowth";
import { airPollutionData } from "@/data/airPollution";
import { nightlightsData } from "@/data/nightlights";
import { getProvinceByDistrict } from "@/data/provinceMapping";
import { DistrictGeoJSON } from "@/components/DistrictGeoJSON";

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface DistrictData {
  district: string;
  province: string;
  population: number;
  literacyRate: number;
  gdp: number;
  perCapitaIncome: number;
  meanTemp: number;
  rainfall: number;
  meanElevation: number;
  minElevation: number;
  maxElevation: number;
  forestPct: number;
  croplandPct: number;
  grasslandPct: number;
  urbanPct: number;
  waterPct: number;
  barrenPct: number;
  urbanExtentPct: number;
  pm25: number;
  nightlight: number;
}

type ThematicLayer = "default" | "pollution" | "forest" | "literacy" | "urbanization" | "healthcare";

// Map center (Nepal)
const NEPAL_CENTER: [number, number] = [28.3949, 84.1240];
const NEPAL_ZOOM = 7;

export default function MapPortal() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [thematicLayer, setThematicLayer] = useState<ThematicLayer>("default");
  const [viewMode, setViewMode] = useState<"explorer" | "focus">("explorer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Try alternative GeoJSON URL
    const urls = [
      "https://raw.githubusercontent.com/mesaugat/geoJSON-Nepal/master/nepal-districts.geojson",
      "https://raw.githubusercontent.com/okfnepal/nepal-geojson/master/districts.geojson"
    ];
    
    const tryFetch = async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setGeoJsonData(data);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error(`Failed to load from ${url}:`, err);
        }
      }
      setError("⚠️ District data could not be loaded. The GeoJSON file may be unavailable.");
      setLoading(false);
    };
    
    tryFetch();
  }, []);

  const getDistrictData = (districtName: string): DistrictData | null => {
    const pop = nasaPopulationData.find((d) => d.district === districtName);
    const lit = literacyData.find((d) => d.district === districtName);
    const temp = temperatureData.find((d) => d.district === districtName);
    const precip = precipitationData.find((d) => d.district === districtName);
    const elev = elevationData.find((d) => d.district === districtName);
    const land = landCoverData.find((d) => d.district === districtName);
    const urban = urbanGrowthData.find((d) => d.district === districtName);
    const air = airPollutionData.find((d) => d.district === districtName);
    const night = nightlightsData.find((d) => d.district === districtName);
    const province = getProvinceByDistrict(districtName);

    if (!pop || !lit || !temp || !precip || !elev || !land || !urban || !air || !night) {
      return null;
    }

    // Use latest GDP data (2023)
    const latestGDP = gdpData[gdpData.length - 1];

    return {
      district: districtName,
      province: province || "Unknown",
      population: pop.population,
      literacyRate: lit.total,
      gdp: latestGDP.gdpReal,
      perCapitaIncome: latestGDP.gdpPerCapita,
      meanTemp: temp.temp,
      rainfall: precip.precipAnomalyPct,
      meanElevation: elev.meanElevation,
      minElevation: elev.minElevation,
      maxElevation: elev.maxElevation,
      forestPct: land.forestPct,
      croplandPct: land.croplandPct,
      grasslandPct: land.grasslandPct,
      urbanPct: land.urbanPct,
      waterPct: land.waterPct,
      barrenPct: land.barrenPct,
      urbanExtentPct: urban.urbanExtentPct,
      pm25: air.pm25,
      nightlight: night.meanNTLRadiance,
    };
  };

  const getColorForThematic = (districtName: string): string => {
    const data = getDistrictData(districtName);
    if (!data) return "#cccccc";

    switch (thematicLayer) {
      case "pollution":
        if (data.pm25 > 50) return "#8B0000";
        if (data.pm25 > 35) return "#DC143C";
        if (data.pm25 > 25) return "#FF6347";
        if (data.pm25 > 15) return "#FFA07A";
        return "#90EE90";

      case "forest":
        if (data.forestPct > 55) return "#006400";
        if (data.forestPct > 45) return "#228B22";
        if (data.forestPct > 35) return "#32CD32";
        if (data.forestPct > 25) return "#90EE90";
        return "#FFE4B5";

      case "literacy":
        if (data.literacyRate > 85) return "#00008B";
        if (data.literacyRate > 75) return "#4169E1";
        if (data.literacyRate > 65) return "#87CEEB";
        if (data.literacyRate > 55) return "#B0E0E6";
        return "#FFE4E1";

      case "urbanization":
        if (data.urbanExtentPct > 30) return "#4B0082";
        if (data.urbanExtentPct > 20) return "#8B008B";
        if (data.urbanExtentPct > 10) return "#BA55D3";
        if (data.urbanExtentPct > 5) return "#DDA0DD";
        return "#F0E68C";

      case "healthcare":
        const healthScore = (data.population / 100000) * (data.meanElevation / 1000) * (100 - data.urbanExtentPct) / 100;
        if (healthScore > 20) return "#8B0000";
        if (healthScore > 10) return "#DC143C";
        if (healthScore > 5) return "#FF6347";
        if (healthScore > 2) return "#FFA07A";
        return "#90EE90";

      default:
        return "#3388ff";
    }
  };

  const districtData = selectedDistrict ? getDistrictData(selectedDistrict) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold glow-text">🗺️ Nepal Data Map Portal</h1>
          <p className="text-muted-foreground mt-1">
            Interactive district-level data visualization for Nepal's 77 districts
          </p>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-2 mb-6">
        <TabButton
          variant={viewMode === "explorer" ? "default" : "outline"}
          onClick={() => setViewMode("explorer")}
        >
          District Data Explorer
        </TabButton>
        <TabButton
          variant={viewMode === "focus" ? "default" : "outline"}
          onClick={() => setViewMode("focus")}
        >
          Areas of Focus
        </TabButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Nepal District Map
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <Select value={thematicLayer} onValueChange={(v) => setThematicLayer(v as ThematicLayer)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default View</SelectItem>
                        <SelectItem value="pollution">Air Pollution</SelectItem>
                        <SelectItem value="forest">Forest Cover</SelectItem>
                        <SelectItem value="literacy">Literacy Rate</SelectItem>
                        <SelectItem value="urbanization">Urbanization</SelectItem>
                        <SelectItem value="healthcare">Healthcare Need</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full relative">
                  <MapContainer
                    center={NEPAL_CENTER}
                    zoom={NEPAL_ZOOM}
                    className="h-full w-full"
                    scrollWheelZoom={true}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DistrictGeoJSON
                      data={geoJsonData}
                      thematicLayer={thematicLayer}
                      getColorForThematic={getColorForThematic}
                      onDistrictClick={setSelectedDistrict}
                    />
                  </MapContainer>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-[1000] pointer-events-none">
                      <div className="bg-card px-6 py-3 rounded-lg shadow-lg border">
                        <p className="text-sm font-medium">Loading district boundaries...</p>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-[1000]">
                      <div className="bg-destructive/10 px-6 py-4 rounded-lg shadow-lg border border-destructive max-w-md text-center">
                        <p className="text-destructive font-medium mb-3">{error}</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.location.reload()}
                        >
                          Retry
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs">
                  {thematicLayer === "pollution" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#8B0000" }}></div>
                        <span>Very High (&gt;50 µg/m³)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#DC143C" }}></div>
                        <span>High (35-50 µg/m³)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FF6347" }}></div>
                        <span>Moderate (25-35 µg/m³)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FFA07A" }}></div>
                        <span>Low (15-25 µg/m³)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#90EE90" }}></div>
                        <span>Very Low (&lt;15 µg/m³)</span>
                      </div>
                    </>
                  )}
                  {thematicLayer === "forest" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#006400" }}></div>
                        <span>Very High (&gt;55%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#228B22" }}></div>
                        <span>High (45-55%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#32CD32" }}></div>
                        <span>Moderate (35-45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#90EE90" }}></div>
                        <span>Low (25-35%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FFE4B5" }}></div>
                        <span>Very Low (&lt;25%)</span>
                      </div>
                    </>
                  )}
                  {thematicLayer === "literacy" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#00008B" }}></div>
                        <span>Very High (&gt;85%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#4169E1" }}></div>
                        <span>High (75-85%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#87CEEB" }}></div>
                        <span>Moderate (65-75%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#B0E0E6" }}></div>
                        <span>Low (55-65%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FFE4E1" }}></div>
                        <span>Very Low (&lt;55%)</span>
                      </div>
                    </>
                  )}
                  {thematicLayer === "urbanization" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#4B0082" }}></div>
                        <span>Very High (&gt;30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#8B008B" }}></div>
                        <span>High (20-30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#BA55D3" }}></div>
                        <span>Moderate (10-20%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#DDA0DD" }}></div>
                        <span>Low (5-10%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#F0E68C" }}></div>
                        <span>Very Low (&lt;5%)</span>
                      </div>
                    </>
                  )}
                  {thematicLayer === "healthcare" && (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#8B0000" }}></div>
                        <span>Critical Need</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#DC143C" }}></div>
                        <span>High Need</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FF6347" }}></div>
                        <span>Moderate Need</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#FFA07A" }}></div>
                        <span>Low Need</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4" style={{ backgroundColor: "#90EE90" }}></div>
                        <span>Well Served</span>
                      </div>
                    </>
                  )}
                  {thematicLayer === "default" && (
                    <p className="text-muted-foreground">Select a thematic layer to view legend</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {viewMode === "explorer" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">District Details</CardTitle>
                    {selectedDistrict && (
                      <Button variant="ghost" size="sm" onClick={() => setSelectedDistrict(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {districtData ? (
                    <div className="space-y-4 max-h-[700px] overflow-y-auto">
                      <div>
                        <h3 className="font-semibold text-lg">{districtData.district}</h3>
                        <Badge variant="secondary">{districtData.province}</Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Population & Development</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Population:</span>
                              <span className="font-medium">{districtData.population.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Literacy Rate:</span>
                              <span className="font-medium">{districtData.literacyRate.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Nightlight Radiance:</span>
                              <span className="font-medium">{districtData.nightlight.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Economy</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">GDP:</span>
                              <span className="font-medium">NPR {(districtData.gdp / 1000).toFixed(1)}B</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Per Capita:</span>
                              <span className="font-medium">NPR {districtData.perCapitaIncome.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Climate</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Mean Temp:</span>
                              <span className="font-medium">{districtData.meanTemp.toFixed(1)}°C</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rainfall Anomaly:</span>
                              <span className="font-medium">{districtData.rainfall.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Elevation</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Mean:</span>
                              <span className="font-medium">{districtData.meanElevation.toFixed(0)}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Min:</span>
                              <span className="font-medium">{districtData.minElevation.toFixed(0)}m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Max:</span>
                              <span className="font-medium">{districtData.maxElevation.toFixed(0)}m</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Land Cover</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Forest:</span>
                              <span className="font-medium">{districtData.forestPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Cropland:</span>
                              <span className="font-medium">{districtData.croplandPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Grassland:</span>
                              <span className="font-medium">{districtData.grasslandPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Urban:</span>
                              <span className="font-medium">{districtData.urbanPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Water:</span>
                              <span className="font-medium">{districtData.waterPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Barren:</span>
                              <span className="font-medium">{districtData.barrenPct.toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Urbanization & Environment</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Urban Extent:</span>
                              <span className="font-medium">{districtData.urbanExtentPct.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">PM2.5:</span>
                              <span className="font-medium">{districtData.pm25.toFixed(1)} µg/m³</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Click on any district to view detailed data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {viewMode === "focus" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Focus Areas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a thematic layer from the map dropdown to identify priority zones for:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-1">🏥 Healthcare Need</h4>
                      <p className="text-xs text-muted-foreground">
                        High population, difficult terrain, low urbanization
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-1">🌫️ Air Quality Concern</h4>
                      <p className="text-xs text-muted-foreground">
                        PM2.5 &gt; 35 µg/m³ with high urban extent
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-1">🌳 Deforestation Risk</h4>
                      <p className="text-xs text-muted-foreground">
                        Forest cover &lt; 30% and cropland &gt; 40%
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-1">🏗️ Urban Growth Pressure</h4>
                      <p className="text-xs text-muted-foreground">
                        High nightlight, high density, limited land
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <h4 className="font-medium mb-1">📚 Education Gaps</h4>
                      <p className="text-xs text-muted-foreground">
                        Low literacy rate requiring intervention
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About District Data Explorer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Explore comprehensive district-level data across Nepal's 77 districts using an interactive
              2D map powered by OpenStreetMap and Leaflet.js.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Click any district to view detailed statistics</li>
              <li>Hover to see district names</li>
              <li>All data integrated from official sources</li>
              <li>No tokens or accounts required</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thematic Layers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Switch between different thematic visualizations to identify patterns and priority areas:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Air Pollution:</strong> PM2.5 levels across districts</li>
              <li><strong>Forest Cover:</strong> Percentage of forested land</li>
              <li><strong>Literacy Rate:</strong> Educational attainment levels</li>
              <li><strong>Urbanization:</strong> Urban extent and growth patterns</li>
              <li><strong>Healthcare Need:</strong> Priority zones based on multiple factors</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
