import { energyConsumption } from "@/data/energy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Zap, AlertTriangle } from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Energy() {
  const years = energyConsumption.map((e) => e.Year);
  const actualData = energyConsumption.map((e) => e.Actual);
  const expectedData = energyConsumption.map((e) => e.Expected);

  // Adjusted forecast after 2023 collapse (slower recovery)
  const adjustedData = energyConsumption.map((e, idx) => {
    if (e.Year < 2023) return null;
    if (e.Year === 2023) return e.Actual;
    const baselineGap = 532 - 672; // -140 PJ
    const recoveryRate = 0.6; // Slower recovery
    const yearsAfter = e.Year - 2023;
    return 532 + yearsAfter * 20 * recoveryRate; // Gradual recovery
  });

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Expected Growth",
        data: expectedData,
        borderColor: "hsl(25, 95%, 60%)",
        backgroundColor: "hsl(25, 95%, 60% / 0.1)",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: "Actual Data",
        data: actualData,
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55% / 0.2)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Adjusted Forecast (Post-Collapse)",
        data: adjustedData,
        borderColor: "hsl(0, 84%, 60%)",
        backgroundColor: "hsl(0, 84%, 60% / 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointRadius: 4,
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
          font: { size: 13 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y} PJ`,
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
          callback: (value: any) => value + " PJ",
        },
        grid: {
          color: "hsl(222, 30%, 20%)",
        },
      },
    },
  };

  const downloadCSV = () => {
    const csv = [
      ["Year", "Actual", "Expected", "Adjusted Forecast"],
      ...energyConsumption.map((e, idx) => [
        e.Year,
        e.Actual || "",
        e.Expected,
        adjustedData[idx] !== null ? Math.round(adjustedData[idx]!) : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nepal-energy-consumption.csv";
    a.click();
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Energy Consumption Analysis</h1>
        <p className="text-muted-foreground">Nepal's national energy trends with 2023 anomaly impact</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-space p-6 bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">2021 Baseline</span>
          </div>
          <p className="text-3xl font-bold">626 PJ</p>
          <p className="text-xs text-muted-foreground mt-1">Actual consumption</p>
        </Card>

        <Card className="card-space p-6 bg-gradient-to-br from-destructive/20 to-destructive/5">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-sm font-medium text-muted-foreground">2023 Anomaly</span>
          </div>
          <p className="text-3xl font-bold text-destructive">532 PJ</p>
          <p className="text-xs text-muted-foreground mt-1">-140 PJ gap (-20.8%)</p>
        </Card>

        <Card className="card-space p-6 bg-gradient-to-br from-accent/20 to-accent/5">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">2031 Projection</span>
          </div>
          <p className="text-3xl font-bold text-accent">803 PJ</p>
          <p className="text-xs text-muted-foreground mt-1">Expected growth path</p>
        </Card>
      </div>

      <Card className="card-space p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Actual vs Expected (2011-2031)</h2>
          <Button onClick={downloadCSV} variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
        <div className="h-[450px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card>

      <Card className="card-space p-6 bg-destructive/5 border-destructive/20">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-6 w-6 text-destructive mt-1" />
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-destructive">2023 Energy Collapse Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Nepal experienced a significant energy consumption anomaly in 2023, where actual consumption (532 PJ)
              fell dramatically below expected levels (672 PJ), creating a 140 PJ gap representing a 20.8% shortfall.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gap Impact</p>
                <p className="text-2xl font-bold text-destructive">-140 PJ</p>
              </div>
              <div className="p-4 bg-card rounded-lg border border-border">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Deviation</p>
                <p className="text-2xl font-bold text-destructive">-20.8%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="card-space p-6">
        <h3 className="text-xl font-bold mb-4">Historical Data Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 text-left font-semibold">Year</th>
                <th className="py-3 text-right font-semibold">Actual (PJ)</th>
                <th className="py-3 text-right font-semibold">Expected (PJ)</th>
                <th className="py-3 text-right font-semibold">Difference</th>
              </tr>
            </thead>
            <tbody>
              {energyConsumption.map((e) => {
                const diff = e.Actual !== null ? e.Actual - e.Expected : null;
                const isAnomaly = e.Year === 2023;

                return (
                  <tr
                    key={e.Year}
                    className={`border-b border-border/50 hover:bg-secondary/50 ${
                      isAnomaly ? "bg-destructive/10" : ""
                    }`}
                  >
                    <td className="py-3 font-medium">{e.Year}</td>
                    <td className="py-3 text-right font-semibold">
                      {e.Actual !== null ? e.Actual : "-"}
                    </td>
                    <td className="py-3 text-right text-muted-foreground">{e.Expected}</td>
                    <td
                      className={`py-3 text-right ${
                        diff !== null
                          ? diff < 0
                            ? "text-destructive font-semibold"
                            : "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {diff !== null ? (diff > 0 ? "+" : "") + diff : "-"}
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
