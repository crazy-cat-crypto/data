import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DistrictInfoCard } from "@/components/DistrictInfoCard";
import { nasaPopulationData } from "@/data/nasaPopulation";
import { landCoverData } from "@/data/landCover";
import { urbanGrowthData } from "@/data/urbanGrowth";
import { airPollutionData } from "@/data/airPollution";
import { nightlightsData } from "@/data/nightlights";
import { elevationData } from "@/data/elevation";
import { provinceMapping, getProvinceByDistrict } from "@/data/provinceMapping";
import { getFocusResults, FocusArea } from "@/utils/areasOfFocus";
import { getDistrictCoordinates } from "@/data/districtCoordinates";
import { Search, MapPin, AlertCircle } from "lucide-react";

// Nepal bounds
const NEPAL_BOUNDS: [[number, number], [number, number]] = [
  [80.0, 26.3], // Southwest
  [88.2, 30.5], // Northeast
];

export default function EarthMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [viewMode, setViewMode] = useState<"explorer" | "focus">("explorer");
  const [focusArea, setFocusArea] = useState<FocusArea>("healthcare");
  const [mapToken, setMapToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");

  const allDistricts = provinceMapping.map(p => p.district).sort();

  const getDistrictInfo = (district: string) => {
    const province = getProvinceByDistrict(district) || "Unknown";
    const popData = nasaPopulationData.find(d => d.district === district);
    const landData = landCoverData.find(d => d.district === district);
    const urbanData = urbanGrowthData.find(d => d.district === district);
    const airData = airPollutionData.find(d => d.district === district);
    const nightData = nightlightsData.find(d => d.district === district);
    const elevData = elevationData.find(d => d.district === district);

    if (!popData || !landData || !urbanData || !airData || !nightData || !elevData) {
      return null;
    }

    return {
      district,
      province,
      population: popData.population,
      nightlight: nightData.meanNTLRadiance,
      forest: landData.forestPct,
      cropland: landData.croplandPct,
      grassland: landData.grasslandPct,
      urban: landData.urbanPct,
      water: landData.waterPct,
      barren: landData.barrenPct,
      urbanExtent: urbanData.urbanExtentPct,
      pm25: airData.pm25,
      meanElevation: elevData.meanElevation,
      minElevation: elevData.minElevation,
      maxElevation: elevData.maxElevation,
    };
  };

  const districtInfo = selectedDistrict ? getDistrictInfo(selectedDistrict) : null;
  const focusResults = viewMode === "focus" ? getFocusResults(focusArea) : [];

  useEffect(() => {
    if (!mapContainer.current || !mapToken) return;

    mapboxgl.accessToken = mapToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [84.1, 28.4],
      zoom: 6.5,
      pitch: 45,
      bearing: 0,
      maxBounds: NEPAL_BOUNDS,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.FullscreenControl(), "top-right");

    map.current.on("load", () => {
      if (map.current) {
        map.current.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
        map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  const handleSearch = () => {
    if (searchDistrict && map.current) {
      setSelectedDistrict(searchDistrict);
      
      // Get district coordinates and zoom to it
      const coords = getDistrictCoordinates(searchDistrict);
      if (coords) {
        map.current.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 10,
          pitch: 45,
          bearing: 0,
          duration: 2000,
          essential: true
        });
      }
    }
  };

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapToken(tokenInput.trim());
    }
  };

  if (!mapToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Mapbox Token Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To use the interactive 3D Earth Map, please enter your Mapbox public token.
              You can get one for free at{" "}
              <a
                href="https://mapbox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-secondary/50 rounded-md">
                <p className="text-xs text-muted-foreground mb-2">You can use this token:</p>
                <code className="text-xs font-mono break-all select-all bg-background text-primary p-2 rounded block border border-primary/20">
                  pk.eyJ1Ijoic2lydTEyIiwiYSI6ImNtZ2JzYXZsNjB0OHoybHF0bHljOWk0M3YifQ.KHF_UzO7dCXfVciSr_VvEQ
                </code>
              </div>
              <input
                type="text"
                placeholder="Paste your Mapbox token here..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <Button onClick={handleTokenSubmit} className="w-full">
                Load Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold glow-text">🌍 Earth Map</h1>
          <p className="text-muted-foreground mt-1">
            Interactive 3D visualization of Nepal's districts with comprehensive data
          </p>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="explorer">Data Explorer</TabsTrigger>
          <TabsTrigger value="focus">Areas of Focus</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative">
                <div ref={mapContainer} className="h-[600px] w-full" />
                
                {/* Search Overlay */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="flex gap-2 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <Select value={searchDistrict} onValueChange={setSearchDistrict}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Search district..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {allDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district} ({getProvinceByDistrict(district)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSearch} size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
                  <h3 className="text-sm font-semibold mb-2">Map Features</h3>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• 3D terrain with realistic elevation</p>
                    <p>• 77 districts across 7 provinces</p>
                    <p>• Click districts for detailed info</p>
                    <p>• Use controls to navigate</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            <TabsContent value="explorer" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">District Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {districtInfo ? (
                    <DistrictInfoCard 
                      districtInfo={districtInfo} 
                      onClose={() => setSelectedDistrict(null)} 
                    />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Select a district to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Districts:</span>
                    <span className="font-medium">77</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provinces:</span>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Population:</span>
                    <span className="font-medium">
                      {nasaPopulationData.reduce((sum, d) => sum + d.population, 0).toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="focus" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Focus Area</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={focusArea} onValueChange={(v) => setFocusArea(v as FocusArea)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare Need</SelectItem>
                      <SelectItem value="airQuality">Air Quality Concern</SelectItem>
                      <SelectItem value="deforestation">Deforestation Risk</SelectItem>
                      <SelectItem value="urbanGrowth">Urban Growth Pressure</SelectItem>
                      <SelectItem value="agricultural">Agricultural Potential</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="max-h-[500px] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-sm">Priority Districts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {focusResults.length > 0 ? (
                    focusResults.map((result, idx) => (
                      <div
                        key={result.district}
                        className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                        onClick={() => setSelectedDistrict(result.district)}
                      >
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-medium text-sm">{result.district}</span>
                          <Badge variant={idx < 5 ? "destructive" : "secondary"}>
                            {result.score}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{result.reason}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Select a focus area to view priority districts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>About Data Explorer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              The Data Explorer mode allows you to interactively explore comprehensive data for all 77
              districts of Nepal. Click on any district or use the search to view:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Population and development metrics</li>
              <li>Land cover distribution (forest, cropland, urban, etc.)</li>
              <li>Urbanization levels and growth patterns</li>
              <li>Air quality measurements (PM2.5)</li>
              <li>Elevation data (mean, min, max)</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Areas of Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              The Areas of Focus mode identifies priority zones for local leaders and policymakers based
              on integrated datasets. Each focus area highlights districts that need attention:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>Healthcare Need:</strong> High population, difficult terrain</li>
              <li><strong>Air Quality Concern:</strong> High PM2.5 pollution levels</li>
              <li><strong>Deforestation Risk:</strong> Low forest cover, high cropland</li>
              <li><strong>Urban Growth Pressure:</strong> Rapid urbanization challenges</li>
              <li><strong>Agricultural Potential:</strong> Optimal farming conditions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
