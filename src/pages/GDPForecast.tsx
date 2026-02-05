import { useState } from "react";
import { gdpData } from "@/data/gdp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Lightbulb } from "lucide-react";
import { Line } from "react-chartjs-2";
import { forecast, downloadCSV } from "@/utils/forecasting";

export default function GDPForecast() {
  const [view, setView] = useState<"gdpReal" | "perCapita">("gdpReal");
  
  // Prepare data
  const years = gdpData.map(d => d.year);
  const gdpReal = gdpData.map(d => d.gdpReal / 1e9); // Convert to billions
  const gdpPerCapita = gdpData.map(d => d.gdpPerCapita);
  const futureYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  
  // GDP Real forecast
  const gdpRealForecast = forecast(years, gdpReal, futureYears, 2);
  const predicted2031Real = gdpRealForecast.future[gdpRealForecast.future.length - 1];
  
  // GDP Per Capita forecast
  const perCapitaForecast = forecast(years, gdpPerCapita, futureYears, 2);
  const predicted2031PerCapita = perCapitaForecast.future[perCapitaForecast.future.length - 1];

  const isGDPReal = view === "gdpReal";
  const currentForecast = isGDPReal ? gdpRealForecast : perCapitaForecast;
  const currentActual = isGDPReal ? gdpReal : gdpPerCapita;
  const currentPredicted2031 = isGDPReal ? predicted2031Real : predicted2031PerCapita;
  const yLabel = isGDPReal ? "GDP Real (Billion USD)" : "GDP Per Capita (USD)";

  const chartData = {
    labels: [...years, ...futureYears],
    datasets: [
      {
        label: `Actual ${isGDPReal ? "GDP Real" : "GDP Per Capita"} (2011-2023)`,
        data: [...currentActual, ...Array(futureYears.length).fill(null)],
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55%)",
        pointRadius: 4,
      },
      {
        label: "Fitted Model (2011-2023)",
        data: [...currentForecast.historical.map(h => h.predicted), ...Array(futureYears.length).fill(null)],
        borderColor: "hsl(210, 100%, 60%)",
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: "Forecast (2024-2031)",
        data: [...Array(years.length).fill(null), ...currentForecast.future.map(f => f.predicted)],
        borderColor: "hsl(280, 100%, 70%)",
        backgroundColor: "hsl(280, 100%, 70%)",
        pointRadius: 0,
      },
      {
        label: "95% CI Upper",
        data: [...Array(years.length).fill(null), ...currentForecast.future.map(f => f.upperCI)],
        borderColor: "transparent",
        backgroundColor: "hsl(280, 100%, 70%, 0.1)",
        fill: "+1",
        pointRadius: 0,
      },
      {
        label: "95% CI Lower",
        data: [...Array(years.length).fill(null), ...currentForecast.future.map(f => f.lowerCI)],
        borderColor: "transparent",
        backgroundColor: "hsl(280, 100%, 70%, 0.1)",
        fill: false,
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, labels: { color: "hsl(210, 100%, 98%)" } },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y?.toFixed(2) || ''}`
        }
      }
    },
    scales: {
      y: { 
        ticks: { color: "hsl(210, 100%, 98%)" },
        title: { display: true, text: yLabel, color: "hsl(210, 100%, 98%)" }
      },
      x: { ticks: { color: "hsl(210, 100%, 98%)" } }
    }
  };

  const exportData = () => {
    const data = [
      ...years.map((year, i) => ({
        year,
        actual: currentActual[i].toFixed(2),
        predicted: currentForecast.historical[i].predicted.toFixed(2),
        lower_CI: currentForecast.historical[i].lowerCI.toFixed(2),
        upper_CI: currentForecast.historical[i].upperCI.toFixed(2),
        model: "Polynomial Degree 2"
      })),
      ...futureYears.map((year, i) => ({
        year,
        actual: "N/A",
        predicted: currentForecast.future[i].predicted.toFixed(2),
        lower_CI: currentForecast.future[i].lowerCI.toFixed(2),
        upper_CI: currentForecast.future[i].upperCI.toFixed(2),
        model: "Polynomial Degree 2"
      }))
    ];
    const filename = isGDPReal ? "gdp_real_forecast_2011_2031.csv" : "gdp_per_capita_forecast_2011_2031.csv";
    downloadCSV(data, filename);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">GDP Forecast to 2031</h1>
        <p className="text-muted-foreground">Real GDP and Per Capita GDP projections based on 2011-2023 data</p>
      </div>

      <div className="flex gap-2 justify-center">
        <Button 
          onClick={() => setView("gdpReal")} 
          variant={view === "gdpReal" ? "default" : "outline"}
        >
          GDP Real
        </Button>
        <Button 
          onClick={() => setView("perCapita")} 
          variant={view === "perCapita" ? "default" : "outline"}
        >
          GDP Per Capita
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Predicted GDP Real 2031</h3>
          </div>
          <p className="text-3xl font-bold">${predicted2031Real.predicted.toFixed(2)}B</p>
          <p className="text-xs text-muted-foreground mt-1">
            95% CI: ${predicted2031Real.lowerCI.toFixed(2)}B – ${predicted2031Real.upperCI.toFixed(2)}B
          </p>
        </Card>

        <Card className="card-space p-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Predicted GDP Per Capita 2031</h3>
          </div>
          <p className="text-3xl font-bold">${predicted2031PerCapita.predicted.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            95% CI: ${predicted2031PerCapita.lowerCI.toFixed(0)} – ${predicted2031PerCapita.upperCI.toFixed(0)}
          </p>
        </Card>
      </div>

      <Card className="card-space p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            <strong>Model:</strong> Polynomial Regression (Degree 2) | <strong>R² = {currentForecast.model.rSquared.toFixed(4)}</strong> | 
            Training Period: 2011-2023 | Forecast: 2024-2031
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
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
                <li>• GDP growth decelerated during COVID-19, showing economic vulnerability</li>
                <li>• Per capita income growth modest compared to regional peers</li>
                <li>• Projected 2031 per capita GDP still below $1,500, limiting purchasing power</li>
                <li>• Heavy reliance on remittances (25% of GDP) creates instability</li>
                <li>• Limited manufacturing base and export diversification</li>
                <li>• Infrastructure bottlenecks constrain productivity and investment</li>
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
                <li>• Accelerate hydropower development to unlock $2-3B annual export potential</li>
                <li>• Establish Special Economic Zones to attract FDI and boost manufacturing</li>
                <li>• Invest in digital infrastructure and promote IT/BPO sector growth</li>
                <li>• Expand tourism infrastructure to capture pre-pandemic growth trajectory</li>
                <li>• Improve ease of doing business to attract private sector investment</li>
                <li>• Develop agricultural value chains to increase rural incomes</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">
          {isGDPReal ? "GDP Real Forecast Data" : "GDP Per Capita Forecast Data"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Year</th>
                <th className="text-right p-2">Actual</th>
                <th className="text-right p-2">Predicted</th>
                <th className="text-right p-2">Lower CI (95%)</th>
                <th className="text-right p-2">Upper CI (95%)</th>
              </tr>
            </thead>
            <tbody>
              {years.map((year, i) => (
                <tr key={year} className="border-b border-border/50">
                  <td className="p-2 font-medium">{year}</td>
                  <td className="text-right p-2">{currentActual[i].toFixed(2)}</td>
                  <td className="text-right p-2">{currentForecast.historical[i].predicted.toFixed(2)}</td>
                  <td className="text-right p-2">{currentForecast.historical[i].lowerCI.toFixed(2)}</td>
                  <td className="text-right p-2">{currentForecast.historical[i].upperCI.toFixed(2)}</td>
                </tr>
              ))}
              {futureYears.map((year, i) => (
                <tr key={year} className="border-b border-border/50 bg-primary/10">
                  <td className="p-2 font-medium">{year}</td>
                  <td className="text-right p-2 text-muted-foreground">—</td>
                  <td className="text-right p-2 font-bold">{currentForecast.future[i].predicted.toFixed(2)}</td>
                  <td className="text-right p-2">{currentForecast.future[i].lowerCI.toFixed(2)}</td>
                  <td className="text-right p-2">{currentForecast.future[i].upperCI.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
