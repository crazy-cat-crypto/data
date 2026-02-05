import { Card } from "@/components/ui/card";
import { forestData } from "@/data/provinces";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Forest() {
  const barChartData = {
    labels: forestData.map((d) => d.province),
    datasets: [
      {
        label: "Forest Area (ha)",
        data: forestData.map((d) => d.forestHa),
        backgroundColor: "hsl(210, 100%, 98% / 0.85)",
        borderColor: "hsl(189, 94%, 55%)",
        borderWidth: 2,
      },
      {
        label: "Forest Coverage (%)",
        data: forestData.map((d) => d.forestPercent),
        backgroundColor: "hsl(210, 100%, 98% / 0.7)",
        borderColor: "hsl(25, 95%, 60%)",
        borderWidth: 2,
        yAxisID: "y1",
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Forest Coverage by Province" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Forest Area (ha)" } },
      y1: { 
        beginAtZero: true, 
        position: "right" as const,
        title: { display: true, text: "Coverage (%)" },
        max: 100,
      },
    },
  };

  const pieChartData = {
    labels: forestData.map((d) => d.province),
    datasets: [
      {
        label: "Forest Area Distribution",
        data: forestData.map((d) => d.forestHa),
        backgroundColor: [
          "hsl(189, 94%, 55%)",
          "hsl(160, 90%, 50%)",
          "hsl(140, 80%, 50%)",
          "hsl(120, 70%, 50%)",
          "hsl(100, 60%, 50%)",
          "hsl(80, 50%, 50%)",
          "hsl(60, 40%, 50%)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "right" as const },
      title: { display: true, text: "National Forest Distribution" },
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Forest Coverage by Province</h1>
        <p className="text-muted-foreground">2021 Census Data - Environmental Analysis</p>
      </div>

      <Card className="card-space p-6">
        <div className="h-96">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </Card>

      <Card className="card-space p-6">
        <div className="h-96">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 bg-destructive/10 border-destructive/20">
          <h3 className="text-xl font-bold mb-4 text-destructive">Problems</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Madhesh province has lowest forest coverage (27%) facing deforestation pressure</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Illegal logging and encroachment threatening forest ecosystems</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Climate change impacts on forest health and biodiversity</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Human-wildlife conflict in forest-adjacent communities</span>
            </li>
          </ul>
        </Card>

        <Card className="card-space p-6 bg-primary/10 border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-primary">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Implement community-based forest management programs</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Launch reforestation initiatives in low-coverage provinces like Madhesh</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Strengthen forest monitoring systems using satellite technology</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Promote sustainable forest products and ecotourism opportunities</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
