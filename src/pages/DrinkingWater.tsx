import { Card } from "@/components/ui/card";
import { drinkingWaterData } from "@/data/provinces";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DrinkingWater() {
  const chartData = {
    labels: drinkingWaterData.map((d) => d.province),
    datasets: [
      {
        label: "Water Access (%)",
        data: drinkingWaterData.map((d) => d.accessPercent),
        backgroundColor: drinkingWaterData.map((d) =>
          d.province === "Karnali" ? "hsl(350, 85%, 70% / 0.85)" : "hsl(210, 100%, 98% / 0.85)"
        ),
        borderColor: drinkingWaterData.map((d) =>
          d.province === "Karnali" ? "hsl(350, 85%, 65%)" : "hsl(189, 94%, 55%)"
        ),
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Drinking Water Access by Province (2021 Census)" },
    },
    scales: {
      x: { 
        beginAtZero: true, 
        max: 100,
        title: { display: true, text: "Access Percentage (%)" } 
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Drinking Water Access</h1>
        <p className="text-muted-foreground">2021 Census Data - Water Infrastructure Analysis</p>
      </div>

      <Card className="card-space p-6">
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="mt-4 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <p className="text-sm text-destructive font-semibold">
            ⚠️ Karnali province has the lowest water access at 88.6%, highlighting critical infrastructure needs
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 bg-destructive/10 border-destructive/20">
          <h3 className="text-xl font-bold mb-4 text-destructive">Problems</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Karnali province faces severe water access challenges (88.6%) due to remote terrain</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Contamination of water sources in rural and mountainous areas</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Seasonal water scarcity affecting agriculture and daily life</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Inadequate water treatment and distribution infrastructure</span>
            </li>
          </ul>
        </Card>

        <Card className="card-space p-6 bg-primary/10 border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-primary">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Build water treatment plants in underserved provinces like Karnali</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Implement rainwater harvesting systems in rural communities</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Develop gravity-fed water supply systems in mountainous regions</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Promote community-based water management and conservation programs</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
