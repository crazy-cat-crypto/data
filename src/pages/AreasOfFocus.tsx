import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { DistrictInfoCard } from "@/components/DistrictInfoCard";
import { nasaPopulationData } from "@/data/nasaPopulation";
import { landCoverData } from "@/data/landCover";
import { urbanGrowthData } from "@/data/urbanGrowth";
import { airPollutionData } from "@/data/airPollution";
import { nightlightsData } from "@/data/nightlights";
import { elevationData } from "@/data/elevation";
import { temperatureData } from "@/data/temperature";
import { lifeExpectancyData } from "@/data/lifeExpectancy";
import { getProvinceByDistrict } from "@/data/provinceMapping";

// Nepal bounds
const NEPAL_BOUNDS: [[number, number], [number, number]] = [
  [80.0, 26.3], // Southwest
  [88.2, 30.5], // Northeast
];

interface DistrictRisk {
  district: string;
  riskLevel: "high" | "medium" | "low";
  riskScore: number;
  factors: string[];
}

export default function AreasOfFocus() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [mapToken, setMapToken] = useState<string>("");
  const [tokenInput, setTokenInput] = useState<string>("");
  const [districtRisks, setDistrictRisks] = useState<DistrictRisk[]>([]);

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

  const calculateDistrictRisk = (district: string): DistrictRisk => {
    const popData = nasaPopulationData.find(d => d.district === district);
    const airData = airPollutionData.find(d => d.district === district);
    const landData = landCoverData.find(d => d.district === district);
    const tempData = temperatureData.find(d => d.district === district);
    const lifeData = lifeExpectancyData.find(d => d.district === district);

    let riskScore = 0;
    const factors: string[] = [];

    // High population density = risk
    if (popData && popData.densityPerSqKm > 300) {
      riskScore += 30;
      factors.push("High population density");
    }

    // High pollution = risk
    if (airData && airData.pm25 > 40) {
      riskScore += 25;
      factors.push("High air pollution");
    }

    // High UHI = risk
    if (tempData && tempData.uhiIndex > 10) {
      riskScore += 20;
      factors.push("High urban heat island");
    }

    // Low forest cover = risk
    if (landData && landData.forestPct < 20) {
      riskScore += 15;
      factors.push("Low forest cover");
    }

    // Low life expectancy = risk
    if (lifeData && lifeData.lifeExpectancy < 70) {
      riskScore += 10;
      factors.push("Lower life expectancy");
    }

    let riskLevel: "high" | "medium" | "low" = "low";
    if (riskScore >= 60) riskLevel = "high";
    else if (riskScore >= 30) riskLevel = "medium";

    return {
      district,
      riskLevel,
      riskScore,
      factors: factors.length > 0 ? factors : ["No major risk factors"],
    };
  };

  useEffect(() => {
    // Calculate risks for all districts
    const risks = nasaPopulationData.map(d => calculateDistrictRisk(d.district));
    setDistrictRisks(risks.sort((a, b) => b.riskScore - a.riskScore));
  }, []);

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

  const handleTokenSubmit = () => {
    if (tokenInput.trim()) {
      setMapToken(tokenInput.trim());
    }
  };

  const districtInfo = selectedDistrict ? getDistrictInfo(selectedDistrict) : null;

  const getRiskColor = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
    }
  };

  const getRiskIcon = (level: "high" | "medium" | "low") => {
    switch (level) {
      case "high": return <AlertTriangle className="h-4 w-4" />;
      case "medium": return <AlertCircle className="h-4 w-4" />;
      case "low": return <CheckCircle className="h-4 w-4" />;
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
              To use the Areas of Focus Map, please enter your Mapbox public token.
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
                <code className="text-xs font-mono break-all select-all bg-background p-2 rounded block">
                  pk.eyJ1Ijoic2lydTEyIiwiYSI6ImNtZ2JzYXZsNjB0OHoybHF0bHljOWk0M3YifQ.KHF_UzO7dCXfVciSr_VvEQ
                </code>
              </div>
              <input
                type="text"
                placeholder="Paste your Mapbox token here..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
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
          <h1 className="text-4xl font-bold glow-text">🎯 Areas of Focus</h1>
          <p className="text-muted-foreground mt-1">
            Risk-level visualization for policy and planning decisions
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <div ref={mapContainer} className="h-[600px] w-full" />
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <h3 className="text-sm font-semibold mb-3">Risk Level Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded"></div>
                    <span className="text-xs">High Risk (Score ≥ 60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Medium Risk (Score 30-59)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded"></div>
                    <span className="text-xs">Low Risk (Score &lt; 30)</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Risk factors: Population density, pollution, UHI, forest cover, life expectancy
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
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
                  <p className="text-sm">Select a district from the list to view details</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="max-h-[400px] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-sm">All Districts by Risk</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {districtRisks.map((risk) => (
                <div
                  key={risk.district}
                  className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors"
                  onClick={() => setSelectedDistrict(risk.district)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{risk.district}</span>
                    <div className={`flex items-center gap-1 ${getRiskColor(risk.riskLevel)}`}>
                      {getRiskIcon(risk.riskLevel)}
                      <Badge variant={
                        risk.riskLevel === "high" ? "destructive" : 
                        risk.riskLevel === "medium" ? "default" : 
                        "secondary"
                      }>
                        {risk.riskScore}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {risk.factors.join(" • ")}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>About Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            The Areas of Focus map provides a comprehensive risk assessment for Nepal's 77 districts based on multiple factors:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>Population Density:</strong> Higher density increases infrastructure and resource demands</li>
            <li><strong>Air Pollution (PM2.5):</strong> High pollution levels affect public health and quality of life</li>
            <li><strong>Urban Heat Island (UHI):</strong> Elevated urban temperatures indicate climate vulnerability</li>
            <li><strong>Forest Cover:</strong> Low forest percentage indicates environmental degradation risks</li>
            <li><strong>Life Expectancy:</strong> Lower life expectancy suggests healthcare and development needs</li>
          </ul>
          <p className="mt-3">
            Districts are color-coded to help policymakers quickly identify areas requiring intervention:
            <span className="text-red-500 font-semibold"> Red</span> for high-priority,
            <span className="text-yellow-500 font-semibold"> Yellow</span> for moderate concern, and
            <span className="text-green-500 font-semibold"> Green</span> for low-risk regions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
