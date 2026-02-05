import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { temperatureData } from "@/data/temperature";
import { disasterRiskData } from "@/data/disasterRisk";

export default function Map() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [hoveredTemp, setHoveredTemp] = useState<{ district: string; temp: number } | null>(null);
  const [hoveredRisk, setHoveredRisk] = useState<{ district: string; risk: string; level: number } | null>(null);

  // Temperature color scale (blue to red)
  const getTempColor = (temp: number) => {
    const minTemp = Math.min(...temperatureData.map(d => d.temp));
    const maxTemp = Math.max(...temperatureData.map(d => d.temp));
    const normalized = (temp - minTemp) / (maxTemp - minTemp);
    
    // Blue (cool) to Red (hot)
    const hue = (1 - normalized) * 240; // 240 = blue, 0 = red
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Risk level color scale
  const getRiskColor = (level: number) => {
    const colors = {
      5: "hsl(0, 84%, 60%)",      // Very High - Red
      4: "hsl(25, 95%, 60%)",      // High - Orange
      3: "hsl(45, 100%, 50%)",     // Moderate - Yellow
      2: "hsl(120, 60%, 50%)",     // Low - Green
      1: "hsl(140, 60%, 50%)",     // Very Low - Light Green
    };
    return colors[level as keyof typeof colors] || colors[3];
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Interactive District Maps</h1>
        <p className="text-muted-foreground">
          Explore temperature patterns and disaster risk levels across Nepal's districts
        </p>
      </div>

      <Tabs defaultValue="temperature" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="temperature">Temperature Map</TabsTrigger>
          <TabsTrigger value="risk">Disaster Risk Map</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-6">
          <Card className="card-space p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Temperature Heatmap</h2>
              <p className="text-sm text-muted-foreground">
                District-level average temperatures. Hover over districts to see details.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-xs text-muted-foreground">Cool</span>
                <div className="flex-1 h-4 rounded" style={{
                  background: "linear-gradient(to right, hsl(240, 70%, 50%), hsl(180, 70%, 50%), hsl(120, 70%, 50%), hsl(60, 70%, 50%), hsl(0, 70%, 50%))"
                }} />
                <span className="text-xs text-muted-foreground">Hot</span>
              </div>
            </div>

            {hoveredTemp && (
              <div className="mb-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="font-bold text-primary">{hoveredTemp.district}</p>
                <p className="text-sm text-muted-foreground">
                  Average Temperature: <span className="font-semibold text-foreground">{hoveredTemp.temp}°C</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {temperatureData.map((item) => (
                <div
                  key={item.district}
                  className="p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: getTempColor(item.temp),
                    borderColor: hoveredDistrict === item.district ? "hsl(189, 94%, 55%)" : "transparent"
                  }}
                  onMouseEnter={() => {
                    setHoveredDistrict(item.district);
                    setHoveredTemp({ district: item.district, temp: item.temp });
                  }}
                  onMouseLeave={() => {
                    setHoveredDistrict(null);
                    setHoveredTemp(null);
                  }}
                >
                  <p className="text-xs font-semibold text-white drop-shadow-md">{item.district}</p>
                  <p className="text-sm font-bold text-white drop-shadow-md">{item.temp}°C</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card className="card-space p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">Flood & Landslide Risk Map</h2>
              <p className="text-sm text-muted-foreground">
                District-level disaster risk assessment. Hover over districts to see details.
              </p>
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(140, 60%, 50%)" }} />
                  <span className="text-xs text-muted-foreground">Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(120, 60%, 50%)" }} />
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(45, 100%, 50%)" }} />
                  <span className="text-xs text-muted-foreground">Moderate</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(25, 95%, 60%)" }} />
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: "hsl(0, 84%, 60%)" }} />
                  <span className="text-xs text-muted-foreground">Very High</span>
                </div>
              </div>
            </div>

            {hoveredRisk && (
              <div className="mb-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="font-bold text-destructive">{hoveredRisk.district}</p>
                <p className="text-sm text-muted-foreground">
                  Risk Level: <span className="font-semibold text-foreground">{hoveredRisk.risk}</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {disasterRiskData.map((item) => (
                <div
                  key={item.district}
                  className="p-3 rounded-lg border-2 transition-all cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: getRiskColor(item.riskLevel),
                    borderColor: hoveredDistrict === item.district ? "hsl(189, 94%, 55%)" : "transparent"
                  }}
                  onMouseEnter={() => {
                    setHoveredDistrict(item.district);
                    setHoveredRisk({ district: item.district, risk: item.risk, level: item.riskLevel });
                  }}
                  onMouseLeave={() => {
                    setHoveredDistrict(null);
                    setHoveredRisk(null);
                  }}
                >
                  <p className="text-xs font-semibold text-white drop-shadow-md">{item.district}</p>
                  <p className="text-sm font-bold text-white drop-shadow-md">{item.risk}</p>
                  <p className="text-xs text-white/80 drop-shadow-md">{item.deaths} deaths</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-space p-6">
            <h3 className="text-xl font-bold mb-4">Risk Assessment Summary</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-muted-foreground mb-1">Very High Risk</p>
                <p className="text-2xl font-bold text-destructive">
                  {disasterRiskData.filter(d => d.riskLevel === 5).length} districts
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">High Risk</p>
                <p className="text-2xl font-bold text-accent">
                  {disasterRiskData.filter(d => d.riskLevel === 4).length} districts
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Moderate Risk</p>
                <p className="text-2xl font-bold text-primary">
                  {disasterRiskData.filter(d => d.riskLevel === 3).length} districts
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
