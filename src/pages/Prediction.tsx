import { useState } from "react";
import { nepalTotal } from "@/data/districts";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Prediction() {
  const [growthRate, setGrowthRate] = useState(0.92);
  const baseYear = 2021;
  const basePop = nepalTotal.totalPopulation;

  const years = Array.from({ length: 11 }, (_, i) => baseYear + i);
  const projections = years.map((year) => {
    const yearsElapsed = year - baseYear;
    return Math.round(basePop * Math.pow(1 + growthRate / 100, yearsElapsed));
  });

  const chartData = {
    labels: years,
    datasets: [
      {
        label: `Projection (${growthRate}% growth)`,
        data: projections,
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55% / 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "hsl(210, 100%, 98%)",
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Population: ${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "hsl(210, 100%, 98%)",
        },
        grid: {
          color: "hsl(222, 30%, 20%)",
        },
      },
      y: {
        ticks: {
          color: "hsl(210, 100%, 98%)",
          callback: (value: any) => (value / 1000000).toFixed(1) + "M",
        },
        grid: {
          color: "hsl(222, 30%, 20%)",
        },
      },
    },
  };

  const downloadCSV = () => {
    const csv = [
      ["Year", "Projected Population"],
      ...years.map((year, idx) => [year, projections[idx]]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nepal-population-prediction-${growthRate}pct.csv`;
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Population Prediction</h1>
        <p className="text-muted-foreground">Forecast Nepal's population growth with customizable rates</p>
      </div>

      <Card className="card-space p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-semibold">Annual Growth Rate</span>
            </div>
            <span className="text-3xl font-bold text-primary">{growthRate.toFixed(2)}%</span>
          </div>

          <div className="space-y-2">
            <Slider
              value={[growthRate]}
              onValueChange={(value) => setGrowthRate(value[0])}
              min={-2}
              max={5}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-2% (Decline)</span>
              <span>0% (Stable)</span>
              <span>+5% (Rapid Growth)</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setGrowthRate(0.2)}
              className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-all"
            >
              <p className="text-xs text-muted-foreground">Low</p>
              <p className="font-bold">0.2%</p>
            </button>
            <button
              onClick={() => setGrowthRate(0.92)}
              className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg border border-primary/20 transition-all"
            >
              <p className="text-xs text-muted-foreground">Current</p>
              <p className="font-bold text-primary">0.92%</p>
            </button>
            <button
              onClick={() => setGrowthRate(1.6)}
              className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg border border-border transition-all"
            >
              <p className="text-xs text-muted-foreground">High</p>
              <p className="font-bold">1.6%</p>
            </button>
          </div>
        </div>
      </Card>

      <Card className="card-space p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projection Chart (2021-2031)</h2>
          <Button onClick={downloadCSV} variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="card-space p-6">
        <h3 className="text-xl font-bold mb-4">Yearly Projections</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 text-left font-semibold">Year</th>
                <th className="py-3 text-right font-semibold">Population</th>
                <th className="py-3 text-right font-semibold">Change</th>
                <th className="py-3 text-right font-semibold">% Growth</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year, idx) => {
                const pop = projections[idx];
                const prevPop = idx > 0 ? projections[idx - 1] : basePop;
                const change = pop - prevPop;
                const pctChange = ((change / prevPop) * 100).toFixed(2);

                return (
                  <tr key={year} className="border-b border-border/50 hover:bg-secondary/50">
                    <td className="py-3 font-medium">{year}</td>
                    <td className="py-3 text-right font-semibold">{pop.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">
                      {idx > 0 ? `+${change.toLocaleString()}` : "-"}
                    </td>
                    <td className="py-3 text-right text-primary">
                      {idx > 0 ? `+${pctChange}%` : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
