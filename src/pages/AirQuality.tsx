import { aqiData, aqiHealthImpacts } from "@/data/airQuality";
import { Card } from "@/components/ui/card";
import { AlertCircle, Lightbulb, Wind } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function AirQuality() {
  const actual = aqiData.filter(d => d.type === "actual");
  const predicted = aqiData.filter(d => d.type === "predicted");

  const chartData = {
    labels: aqiData.map(d => d.year),
    datasets: [
      {
        label: "Actual AQI",
        data: [...actual.map(d => d.aqi), ...Array(predicted.length).fill(null)],
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55%)",
        pointRadius: 5,
      },
      {
        label: "Predicted AQI",
        data: [...Array(actual.length).fill(null), ...predicted.map(d => d.aqi)],
        borderColor: "hsl(0, 100%, 60%)",
        backgroundColor: "hsl(0, 100%, 60%)",
        borderDash: [5, 5],
        pointRadius: 4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, labels: { color: "hsl(210, 100%, 98%)" } },
    },
    scales: {
      y: { ticks: { color: "hsl(210, 100%, 98%)" } },
      x: { ticks: { color: "hsl(210, 100%, 98%)" } }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Air Quality & Health</h1>
        <p className="text-muted-foreground">Kathmandu AQI trends and health impacts</p>
      </div>

      <Card className="card-space p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wind className="h-6 w-6 text-primary" />
          AQI Trends (2017-2031)
        </h2>
        <Line data={chartData} options={chartOptions} />
        <p className="text-xs text-muted-foreground mt-4">
          💡 Did you know? Every 10 µg/m³ rise in PM2.5 reduces average life expectancy by ~0.98 years.
        </p>
      </Card>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">AQI Health Impact Scale</h2>
        <div className="space-y-3">
          {aqiHealthImpacts.map(impact => (
            <div key={impact.range} className="p-4 rounded-lg border" style={{ borderColor: impact.color, backgroundColor: `${impact.color}20` }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-bold" style={{ color: impact.color }}>{impact.level}</span>
                  <span className="text-sm text-muted-foreground ml-2">({impact.range})</span>
                </div>
              </div>
              <p className="text-sm mb-2">{impact.impact}</p>
              <p className="text-xs font-semibold">Action: {impact.action}</p>
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
                <li>• Rising AQI in Kathmandu → Major health & economic burden</li>
                <li>• High AQI increases respiratory & cardiovascular diseases</li>
                <li>• Urbanization without green buffers worsens air pollution</li>
                <li>• Vehicle emissions and industrial pollution major contributors</li>
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
                <li>• Promote electric vehicles and stricter emission laws</li>
                <li>• Expand public transport to reduce private vehicle use</li>
                <li>• Launch awareness programs and free health camps</li>
                <li>• Expand urban greenery and rooftop gardens</li>
                <li>• Enforce green building codes and air purifier subsidies</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
