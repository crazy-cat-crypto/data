import { migrationData } from "@/data/migration";
import { Card } from "@/components/ui/card";
import { AlertCircle, Lightbulb, Plane, Users } from "lucide-react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Migration() {
  const topDistricts = migrationData.filter(d => d.district !== "Nepal");
  
  const chartData = {
    labels: topDistricts.map(d => d.district),
    datasets: [
      {
        label: "Male",
        data: topDistricts.map(d => d.maleNum),
        backgroundColor: "hsl(210, 100%, 60%)",
      },
      {
        label: "Female",
        data: topDistricts.map(d => d.femaleNum),
        backgroundColor: "hsl(25, 95%, 60%)",
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
      y: { stacked: true, ticks: { color: "hsl(210, 100%, 98%)" } },
      x: { stacked: true, ticks: { color: "hsl(210, 100%, 98%)" } }
    }
  };

  const nepalData = migrationData.find(d => d.district === "Nepal")!;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Brain Drain & Migration</h1>
        <p className="text-muted-foreground">District-wise migration patterns</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-space p-6">
          <div className="flex items-center gap-3 mb-2">
            <Plane className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">Total Migrants</h3>
          </div>
          <p className="text-3xl font-bold">{nepalData.totalNum.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{nepalData.totalPercent}% of population</p>
        </Card>

        <Card className="card-space p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="text-sm font-medium text-muted-foreground">Male Migrants</h3>
          </div>
          <p className="text-3xl font-bold">{nepalData.maleNum.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{nepalData.malePercent}% of male population</p>
        </Card>

        <Card className="card-space p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-medium text-muted-foreground">Female Migrants</h3>
          </div>
          <p className="text-3xl font-bold">{nepalData.femaleNum.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-1">{nepalData.femalePercent}% of female population</p>
        </Card>
      </div>

      <Card className="card-space p-6">
        <h2 className="text-2xl font-bold mb-4">Top 10 Districts by Brain Drain</h2>
        <Bar data={chartData} options={chartOptions} />
      </Card>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">District Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">District</th>
                <th className="text-right p-2">Total</th>
                <th className="text-right p-2">Total %</th>
                <th className="text-right p-2">Male</th>
                <th className="text-right p-2">Male %</th>
                <th className="text-right p-2">Female</th>
                <th className="text-right p-2">Female %</th>
              </tr>
            </thead>
            <tbody>
              {topDistricts.map(d => (
                <tr key={d.district} className="border-b border-border/50">
                  <td className="p-2 font-medium">{d.district}</td>
                  <td className="text-right p-2">{d.totalNum.toLocaleString()}</td>
                  <td className="text-right p-2">{d.totalPercent}%</td>
                  <td className="text-right p-2">{d.maleNum.toLocaleString()}</td>
                  <td className="text-right p-2">{d.malePercent}%</td>
                  <td className="text-right p-2">{d.femaleNum.toLocaleString()}</td>
                  <td className="text-right p-2">{d.femalePercent}%</td>
                </tr>
              ))}
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
                <li>• High skilled youth migration ("brain drain") weakens national workforce and economy</li>
                <li>• Over 12% of population in districts like Kanchanpur and Kailali have migrated</li>
                <li>• Female migration significantly lower (2.6% national) due to social restrictions</li>
                <li>• Loss of productive age population impacts local development</li>
                <li>• Family separation causes social challenges</li>
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
                <li>• Incentivize return migration with tax benefits and skill recognition</li>
                <li>• Invest in local job creation and entrepreneurship programs</li>
                <li>• Encourage diaspora investment in Nepal through special schemes</li>
                <li>• Ensure safe migration channels for women with proper protection</li>
                <li>• Develop digital infrastructure to enable remote work opportunities</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
