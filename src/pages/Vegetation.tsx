import { useState } from "react";
import { vegetationData } from "@/data/vegetation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trees, Users, AlertCircle, Lightbulb } from "lucide-react";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Vegetation() {
  const [viewMode, setViewMode] = useState<"area" | "households">("area");

  const pieData = {
    labels: vegetationData.map(v => v.type),
    datasets: [{
      data: viewMode === "area" ? vegetationData.map(v => v.areaPercent) : vegetationData.map(v => v.householdPercent),
      backgroundColor: [
        "hsl(120, 60%, 50%)",
        "hsl(30, 80%, 50%)",
        "hsl(200, 70%, 50%)",
        "hsl(60, 90%, 50%)"
      ],
      borderWidth: 2,
    }]
  };

  const barData = {
    labels: vegetationData.map(v => v.type),
    datasets: [{
      label: viewMode === "area" ? "Area (hectares)" : "Households",
      data: viewMode === "area" ? vegetationData.map(v => v.areaHa) : vegetationData.map(v => v.households),
      backgroundColor: "hsl(189, 94%, 55%)",
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, labels: { color: "hsl(210, 100%, 98%)" } },
    }
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: { ticks: { color: "hsl(210, 100%, 98%)" } },
      x: { ticks: { color: "hsl(210, 100%, 98%)", font: { size: 10 } } }
    }
  };

  const totalArea = vegetationData.reduce((sum, v) => sum + v.areaHa, 0);
  const totalHouseholds = vegetationData.reduce((sum, v) => sum + v.households, 0);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Vegetation & Forestry</h1>
        <p className="text-muted-foreground">Community forest coverage and household involvement</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant={viewMode === "area" ? "default" : "outline"} onClick={() => setViewMode("area")}>
          <Trees className="h-4 w-4 mr-2" />
          View by Area
        </Button>
        <Button variant={viewMode === "households" ? "default" : "outline"} onClick={() => setViewMode("households")}>
          <Users className="h-4 w-4 mr-2" />
          View by Households
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6">
          <h2 className="text-xl font-bold mb-4">Distribution by {viewMode === "area" ? "Area" : "Households"}</h2>
          <div className="max-w-sm mx-auto">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </Card>

        <Card className="card-space p-6">
          <h2 className="text-xl font-bold mb-4">Comparison</h2>
          <Bar data={barData} options={barOptions} />
        </Card>
      </div>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">Detailed Statistics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Vegetation Type</th>
                <th className="text-right p-2">Area (ha)</th>
                <th className="text-right p-2">Area %</th>
                <th className="text-right p-2">Households</th>
                <th className="text-right p-2">Household %</th>
              </tr>
            </thead>
            <tbody>
              {vegetationData.map(v => (
                <tr key={v.type} className="border-b border-border/50">
                  <td className="p-2 font-medium">{v.type}</td>
                  <td className="text-right p-2">{v.areaHa.toLocaleString()}</td>
                  <td className="text-right p-2">{v.areaPercent}%</td>
                  <td className="text-right p-2">{v.households.toLocaleString()}</td>
                  <td className="text-right p-2">{v.householdPercent}%</td>
                </tr>
              ))}
              <tr className="font-bold border-t-2 border-border">
                <td className="p-2">TOTAL</td>
                <td className="text-right p-2">{totalArea.toLocaleString()}</td>
                <td className="text-right p-2">100%</td>
                <td className="text-right p-2">{totalHouseholds.toLocaleString()}</td>
                <td className="text-right p-2">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 border-destructive/50">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-destructive mb-2">Problems</h3>
              <ul className="space-y-2 text-sm">
                <li>• Over 80% forest cover faces deforestation due to firewood and timber demand</li>
                <li>• Shrub areas (8.4%) expanding, indicating degraded forests and poor soil health</li>
                <li>• Grassland area minimal (1.1%), limiting fodder for livestock</li>
                <li>• Plantation forests sometimes monoculture, reducing biodiversity</li>
                <li>• Illegal logging and overuse threaten sustainable forest management</li>
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
                <li>• Promote sustainable forest management with strict monitoring against illegal logging</li>
                <li>• Encourage agroforestry and mixed plantations to balance ecological needs</li>
                <li>• Expand grassland and integrate fodder species to support livelihoods</li>
                <li>• Strengthen community forest user groups (CFUGs) with technical support</li>
                <li>• Introduce alternative energy sources to reduce firewood dependency</li>
                <li>• Implement reforestation programs in degraded shrub areas</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
