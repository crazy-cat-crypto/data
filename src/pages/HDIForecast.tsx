import { useState } from "react";
import { hdiData } from "@/data/hdi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Lightbulb } from "lucide-react";
import { Line } from "react-chartjs-2";
import { forecast, calculateCAGR, predictValue, downloadCSV } from "@/utils/forecasting";

export default function HDIForecast() {
  const [showCAGR, setShowCAGR] = useState(true);
  
  // Prepare data
  const years = hdiData.map(d => d.year);
  const hdiValues = hdiData.map(d => d.hdi);
  const futureYears = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  
  // Polynomial forecast (degree 2)
  const { historical, future, model } = forecast(years, hdiValues, futureYears, 2);
  
  // CAGR projection
  const cagr = calculateCAGR(hdiData[0].hdi, hdiData[hdiData.length - 1].hdi, hdiData.length - 1);
  const cagrProjection = futureYears.map(year => {
    const yearsFromBase = year - 2022;
    return hdiData[hdiData.length - 1].hdi * Math.pow(1 + cagr, yearsFromBase);
  });

  const predicted2031 = future[future.length - 1];

  const chartData = {
    labels: [...years, ...futureYears],
    datasets: [
      {
        label: "Actual HDI (2011-2022)",
        data: [...hdiValues, ...Array(futureYears.length).fill(null)],
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55%)",
        pointRadius: 4,
      },
      {
        label: "Fitted Model (2011-2022)",
        data: [...historical.map(h => h.predicted), ...Array(futureYears.length).fill(null)],
        borderColor: "hsl(210, 100%, 60%)",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Forecast (2023-2031)",
        data: [...Array(years.length).fill(null), ...future.map(f => f.predicted)],
        borderColor: "hsl(280, 100%, 70%)",
        backgroundColor: "hsl(280, 100%, 70%)",
        pointRadius: 0,
      },
      {
        label: "95% CI Upper",
        data: [...Array(years.length).fill(null), ...future.map(f => f.upperCI)],
        borderColor: "transparent",
        backgroundColor: "hsl(280, 100%, 70%, 0.1)",
        fill: "+1",
        pointRadius: 0,
      },
      {
        label: "95% CI Lower",
        data: [...Array(years.length).fill(null), ...future.map(f => f.lowerCI)],
        borderColor: "transparent",
        backgroundColor: "hsl(280, 100%, 70%, 0.1)",
        fill: false,
        pointRadius: 0,
      },
      ...(showCAGR ? [{
        label: `CAGR Projection (${(cagr * 100).toFixed(2)}%)`,
        data: [...Array(years.length).fill(null), ...cagrProjection],
        borderColor: "hsl(120, 60%, 50%)",
        borderDash: [10, 5],
        pointRadius: 0,
      }] : [])
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, labels: { color: "hsl(210, 100%, 98%)" } },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y?.toFixed(3) || ''}`
        }
      }
    },
    scales: {
      y: { 
        ticks: { color: "hsl(210, 100%, 98%)" },
        title: { display: true, text: "HDI", color: "hsl(210, 100%, 98%)" }
      },
      x: { ticks: { color: "hsl(210, 100%, 98%)" } }
    }
  };

  const exportData = () => {
    const data = [
      ...years.map((year, i) => ({
        year,
        actual: hdiValues[i],
        predicted: historical[i].predicted.toFixed(4),
        lower_CI: historical[i].lowerCI.toFixed(4),
        upper_CI: historical[i].upperCI.toFixed(4),
        model: "Polynomial Degree 2"
      })),
      ...futureYears.map((year, i) => ({
        year,
        actual: "N/A",
        predicted: future[i].predicted.toFixed(4),
        lower_CI: future[i].lowerCI.toFixed(4),
        upper_CI: future[i].upperCI.toFixed(4),
        model: "Polynomial Degree 2"
      }))
    ];
    downloadCSV(data, "hdi_forecast_2011_2031.csv");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">HDI Forecast to 2031</h1>
        <p className="text-muted-foreground">Human Development Index projection based on 2011-2022 data</p>
      </div>

      <Card className="card-space p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            <strong>Model:</strong> Polynomial Regression (Degree 2) | <strong>R² = {model.rSquared.toFixed(4)}</strong> | 
            Training Period: 2011-2022 | Forecast: 2023-2031
          </p>
          <p className="text-lg mt-2">
            <strong>Predicted HDI 2031:</strong> {predicted2031.predicted.toFixed(3)} 
            (95% CI: {predicted2031.lowerCI.toFixed(3)} – {predicted2031.upperCI.toFixed(3)})
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Historical CAGR (2011-2022): {(cagr * 100).toFixed(2)}% per year
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowCAGR(!showCAGR)} variant="outline" size="sm">
            {showCAGR ? "Hide" : "Show"} CAGR Projection
          </Button>
        </div>

        <Line data={chartData} options={chartOptions} />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 border-destructive/50">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-destructive mb-2">Problems</h3>
              <ul className="space-y-2 text-sm">
                <li>• HDI growth slowed during COVID-19 (2020-2021), showing vulnerability to external shocks</li>
                <li>• Recovery to pre-pandemic trajectory uncertain; model shows modest growth to 2031</li>
                <li>• Current trajectory suggests HDI will remain below 0.65 by 2031, limiting Nepal's development potential</li>
                <li>• Regional disparities: national HDI masks significant variations across districts</li>
                <li>• Education and health components need acceleration to match income gains</li>
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
                <li>• Prioritize health infrastructure investment in low-HDI districts (Terai and mountain regions)</li>
                <li>• Accelerate female education programs to close literacy gaps</li>
                <li>• Expand vocational training and skill development programs</li>
                <li>• Target income growth through hydropower exports and manufacturing</li>
                <li>• Strengthen social safety nets to protect HDI gains during crises</li>
                <li>• Set district-level HDI targets with dedicated resource allocation</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">Forecast Data Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Year</th>
                <th className="text-right p-2">Actual HDI</th>
                <th className="text-right p-2">Predicted HDI</th>
                <th className="text-right p-2">Lower CI (95%)</th>
                <th className="text-right p-2">Upper CI (95%)</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year, i) => (
                <tr key={year} className="border-b border-border/50">
                  <td className="p-2 font-medium">{year}</td>
                  <td className="text-right p-2">{hdiValues[i].toFixed(3)}</td>
                  <td className="text-right p-2">{historical[i].predicted.toFixed(3)}</td>
                  <td className="text-right p-2">{historical[i].lowerCI.toFixed(3)}</td>
                  <td className="text-right p-2">{historical[i].upperCI.toFixed(3)}</td>
                </tr>
              ))}
              {futureYears.map((year, i) => (
                <tr key={year} className="border-b border-border/50 bg-primary/10">
                  <td className="p-2 font-medium">{year}</td>
                  <td className="text-right p-2 text-muted-foreground">—</td>
                  <td className="text-right p-2 font-bold">{future[i].predicted.toFixed(3)}</td>
                  <td className="text-right p-2">{future[i].lowerCI.toFixed(3)}</td>
                  <td className="text-right p-2">{future[i].upperCI.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
