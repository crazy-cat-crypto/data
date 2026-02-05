import { useState } from "react";
import { disasterRiskData } from "@/data/disasterRisk";
import { lifeExpectancyData } from "@/data/lifeExpectancy";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Heart, AlertCircle, Lightbulb } from "lucide-react";

export default function DisasterRisk() {
  const [selectedDistrict, setSelectedDistrict] = useState(disasterRiskData[0].district);

  const selected = disasterRiskData.find((d) => d.district === selectedDistrict) || disasterRiskData[0];
  const lifeExpectancy = lifeExpectancyData.find(d => d.district === selectedDistrict);

  const getRiskColor = (level: number) => {
    if (level >= 5) return "hsl(0, 100%, 40%)";
    if (level >= 4) return "hsl(25, 95%, 50%)";
    return "hsl(60, 90%, 50%)";
  };

  const getRiskBgColor = (level: number) => {
    if (level >= 5) return "bg-red-950/50 border-red-500/50";
    if (level >= 4) return "bg-orange-950/50 border-orange-500/50";
    return "bg-yellow-950/50 border-yellow-500/50";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Disaster Risk Analysis</h1>
        <p className="text-muted-foreground">Flood & Landslide risk by district</p>
      </div>

      <div className="max-w-md mx-auto">
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border max-h-[400px]">
            {disasterRiskData.map((district) => (
              <SelectItem key={district.district} value={district.district}>
                {district.district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`card-space p-6 ${getRiskBgColor(selected.riskLevel)}`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" style={{ color: getRiskColor(selected.riskLevel) }} />
            Disaster Risk
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Deaths (Last 5 Years)</p>
              <p className="text-4xl font-bold">{selected.deaths}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Risk Level</p>
              <div 
                className="inline-block px-4 py-2 rounded-lg text-lg font-bold"
                style={{ backgroundColor: getRiskColor(selected.riskLevel), color: "white" }}
              >
                {selected.risk}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Risk Indicator</p>
              <div className="h-8 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-500" 
                  style={{ 
                    width: `${(selected.riskLevel / 5) * 100}%`,
                    backgroundColor: getRiskColor(selected.riskLevel)
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>Very High</span>
              </div>
            </div>
          </div>
        </Card>

        {lifeExpectancy && (
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Life Expectancy
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {lifeExpectancy.lifeExpectancy}
                </div>
                <p className="text-sm text-muted-foreground">years</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Life expectancy in disaster-prone areas can be impacted by recurring emergencies, infrastructure damage, and limited healthcare access during crises.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">All Districts by Risk Level</h2>
        <div className="grid gap-3">
          {disasterRiskData.map(d => (
            <div 
              key={d.district}
              className={`p-4 rounded-lg flex justify-between items-center cursor-pointer transition-all ${
                d.district === selectedDistrict ? 'ring-2 ring-primary' : ''
              } ${getRiskBgColor(d.riskLevel)}`}
              onClick={() => setSelectedDistrict(d.district)}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5" style={{ color: getRiskColor(d.riskLevel) }} />
                <div>
                  <p className="font-semibold">{d.district}</p>
                  <p className="text-xs text-muted-foreground">{d.deaths} deaths</p>
                </div>
              </div>
              <div 
                className="px-3 py-1 rounded text-sm font-bold"
                style={{ backgroundColor: getRiskColor(d.riskLevel), color: "white" }}
              >
                {d.risk}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 border-destructive/50">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-destructive mb-2">Problems</h3>
              <ul className="space-y-2 text-sm">
                <li>• Very High-risk districts (Kavrepalanchok, Lalitpur, Dhading) face recurring floods/landslides</li>
                <li>• Kathmandu valley lacks proper drainage, worsening urban flooding</li>
                <li>• Moderate risk areas like Banke, Bardiya lack disaster preparedness plans</li>
                <li>• Life expectancy impacted in disaster-prone areas due to infrastructure damage</li>
                <li>• Women and children disproportionately affected during disasters</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="card-space p-6 border-primary/50">
          <div className="flex items-start gap-3 mb-4">
            <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li>• Build early-warning systems with SMS alerts for vulnerable districts</li>
                <li>• Strengthen river embankments and relocate high-risk households</li>
                <li>• Introduce community-based disaster management with periodic drills</li>
                <li>• Smart urban drainage planning and flood zoning laws</li>
                <li>• Pre-position medical supplies and mobile clinics in risk zones</li>
                <li>• Provide gender-sensitive relief planning and safe shelters</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
