import { Card } from "@/components/ui/card";
import { hospitalsData } from "@/data/provinces";
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

export default function Hospitals() {
  const chartData = {
    labels: hospitalsData.map((d) => d.province),
    datasets: [
      {
        label: "Number of Hospitals",
        data: hospitalsData.map((d) => d.hospitals),
        backgroundColor: "hsl(210, 100%, 98% / 0.85)",
        borderColor: "hsl(189, 94%, 55%)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" as const },
      title: { display: true, text: "Hospitals by Province (2021 Census)" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Number of Hospitals" } },
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Hospitals by Province</h1>
        <p className="text-muted-foreground">2021 Census Data - Healthcare Infrastructure Analysis</p>
      </div>

      <Card className="card-space p-6">
        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 bg-destructive/10 border-destructive/20">
          <h3 className="text-xl font-bold mb-4 text-destructive">Problems</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Unequal distribution of healthcare facilities across provinces</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Karnali province has significantly fewer hospitals (1,265) compared to Bagmati (3,576)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Remote areas face challenges in accessing quality healthcare services</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive">•</span>
              <span>Shortage of specialized medical equipment and trained healthcare workers</span>
            </li>
          </ul>
        </Card>

        <Card className="card-space p-6 bg-primary/10 border-primary/20">
          <h3 className="text-xl font-bold mb-4 text-primary">Solutions</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Establish more healthcare facilities in underserved provinces like Karnali</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Implement telemedicine programs to improve healthcare access in remote areas</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Increase investment in medical education and training programs</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Develop mobile health clinics and community health worker programs</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
