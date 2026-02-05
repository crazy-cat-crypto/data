import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Lightbulb } from "lucide-react";
import { Line } from "react-chartjs-2";
import { forecast, downloadCSV } from "@/utils/forecasting";

const tourismData = [
  { year: 2011, arrivals: 736 },
  { year: 2012, arrivals: 803 },
  { year: 2013, arrivals: 793 },
  { year: 2014, arrivals: 790 },
  { year: 2015, arrivals: 539 },
  { year: 2016, arrivals: 753 },
  { year: 2017, arrivals: 940 },
  { year: 2018, arrivals: 1173 },
  { year: 2019, arrivals: 1197 },
  { year: 2020, arrivals: 151 },
  { year: 2021, arrivals: 230 },
  { year: 2022, arrivals: 615 },
  { year: 2023, arrivals: 1014 }
];

const REVENUE_PER_TOURIST = 537; // $41/day × 13.1 days

export default function TourismForecast() {
  const [showExpected, setShowExpected] = useState(true);
  const [showPostShock, setShowPostShock] = useState(true);

  // Expected forecast (trained on 2011-2019, no COVID)
  const preCovid = tourismData.filter(d => d.year <= 2019);
  const preCOVIDYears = preCovid.map(d => d.year);
  const preCOVIDArrivals = preCovid.map(d => d.arrivals);
  const futureYears = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  
  const expectedForecast = forecast(preCOVIDYears, preCOVIDArrivals, futureYears, 2);
  
  // Post-shock forecast (trained on all 2011-2023 data)
  const allYears = tourismData.map(d => d.year);
  const allArrivals = tourismData.map(d => d.arrivals);
  const postShockFutureYears = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031];
  
  const postShockForecast = forecast(allYears, allArrivals, postShockFutureYears, 2);

  // Calculate losses
  const actualData = tourismData.filter(d => d.year >= 2020 && d.year <= 2023);
  const lossData = actualData.map(d => {
    const expected = expectedForecast.future.find(f => f.year === d.year);
    if (!expected) return null;
    const diff = expected.predicted - d.arrivals;
    const annualLoss = diff * 1000 * REVENUE_PER_TOURIST;
    return {
      year: d.year,
      expected: expected.predicted,
      actual: d.arrivals,
      diff: diff,
      annualLoss: annualLoss
    };
  }).filter(Boolean);

  const cumulativeLoss2020_2023 = lossData.reduce((sum, d) => sum + (d?.annualLoss || 0), 0);

  // Projected future loss (2024-2031)
  const futurePostShock = postShockFutureYears.map((year, i) => {
    const expected = expectedForecast.future.find(f => f.year === year);
    const postShock = postShockForecast.future[i];
    if (!expected) return null;
    const diff = expected.predicted - postShock.predicted;
    const projectedLoss = diff * 1000 * REVENUE_PER_TOURIST;
    return {
      year,
      expected: expected.predicted,
      postShock: postShock.predicted,
      diff,
      projectedLoss
    };
  }).filter(Boolean);

  const projectedLoss2024_2031 = futurePostShock.reduce((sum, d) => sum + (d?.projectedLoss || 0), 0);

  const chartData = {
    labels: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
    datasets: [
      {
        label: "Actual Arrivals (2011-2023)",
        data: [...tourismData.map(d => d.arrivals), ...Array(8).fill(null)],
        borderColor: "hsl(189, 94%, 55%)",
        backgroundColor: "hsl(189, 94%, 55%)",
        pointRadius: 5,
      },
      ...(showExpected ? [{
        label: "Expected (No-COVID Counterfactual)",
        data: [...Array(9).fill(null), ...expectedForecast.future.map(f => f.predicted)],
        borderColor: "hsl(210, 100%, 60%)",
        borderDash: [5, 5],
        pointRadius: 0,
      }] : []),
      ...(showPostShock ? [{
        label: "Post-Shock Adjusted Forecast",
        data: [...Array(13).fill(null), ...postShockForecast.future.map(f => f.predicted)],
        borderColor: "hsl(120, 60%, 50%)",
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
          label: (context: any) => `${context.dataset.label}: ${context.parsed.y?.toFixed(0) || ''}k tourists`
        }
      }
    },
    scales: {
      y: { 
        ticks: { color: "hsl(210, 100%, 98%)" },
        title: { display: true, text: "Tourist Arrivals (thousands)", color: "hsl(210, 100%, 98%)" }
      },
      x: { ticks: { color: "hsl(210, 100%, 98%)" } }
    }
  };

  const exportData = () => {
    const data = [
      ...lossData.map(d => ({
        year: d!.year,
        expected_k: d!.expected.toFixed(0),
        actual_k: d!.actual,
        postShock_k: "N/A",
        diff_k: d!.diff.toFixed(0),
        annual_loss_USD_M: (d!.annualLoss / 1e6).toFixed(2),
        type: "Realized Loss"
      })),
      ...futurePostShock.map(d => ({
        year: d!.year,
        expected_k: d!.expected.toFixed(0),
        actual_k: "N/A",
        postShock_k: d!.postShock.toFixed(0),
        diff_k: d!.diff.toFixed(0),
        annual_loss_USD_M: (d!.projectedLoss / 1e6).toFixed(2),
        type: "Projected Loss"
      }))
    ];
    downloadCSV(data, "tourism_loss_analysis_2020_2031.csv");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">Tourism Forecast & Loss Analysis</h1>
        <p className="text-muted-foreground">Tourist arrivals prediction with COVID-19 impact assessment</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6 bg-destructive/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Cumulative Loss (2020-2023)</h3>
          <p className="text-3xl font-bold text-destructive">${(cumulativeLoss2020_2023 / 1e6).toFixed(2)}M</p>
          <p className="text-xs text-muted-foreground mt-1">Realized revenue loss vs expected</p>
        </Card>

        <Card className="card-space p-6 bg-accent/10">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Projected Additional Loss (2024-2031)</h3>
          <p className="text-3xl font-bold text-accent">${(projectedLoss2024_2031 / 1e6).toFixed(2)}M</p>
          <p className="text-xs text-muted-foreground mt-1">If recovery stays below pre-COVID trajectory</p>
        </Card>
      </div>

      <Card className="card-space p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            <strong>Expected Forecast:</strong> Trained on 2011-2019 (pre-COVID) | 
            <strong> Post-Shock Forecast:</strong> Trained on 2011-2023 (full data)
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Revenue calculation: Tourist arrivals × 1000 × $537 per tourist ($41/day × 13.1 days)
          </p>
        </div>

        <div className="flex gap-2 mb-4">
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setShowExpected(!showExpected)} variant="outline" size="sm">
            {showExpected ? "Hide" : "Show"} Expected
          </Button>
          <Button onClick={() => setShowPostShock(!showPostShock)} variant="outline" size="sm">
            {showPostShock ? "Hide" : "Show"} Post-Shock
          </Button>
        </div>

        <Line data={chartData} options={chartOptions} />
      </Card>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">Annual Loss Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Year</th>
                <th className="text-right p-2">Expected (k)</th>
                <th className="text-right p-2">Actual/Post-Shock (k)</th>
                <th className="text-right p-2">Difference (k)</th>
                <th className="text-right p-2">Annual Loss ($M)</th>
                <th className="text-right p-2">Cumulative ($M)</th>
              </tr>
            </thead>
            <tbody>
              {lossData.map((d, i) => {
                const cumulative = lossData.slice(0, i + 1).reduce((s, x) => s + (x?.annualLoss || 0), 0);
                return (
                  <tr key={d!.year} className="border-b border-border/50">
                    <td className="p-2 font-medium">{d!.year}</td>
                    <td className="text-right p-2">{d!.expected.toFixed(0)}</td>
                    <td className="text-right p-2">{d!.actual}</td>
                    <td className="text-right p-2 text-destructive">{d!.diff.toFixed(0)}</td>
                    <td className="text-right p-2 text-destructive">${(d!.annualLoss / 1e6).toFixed(2)}M</td>
                    <td className="text-right p-2 font-bold">${(cumulative / 1e6).toFixed(2)}M</td>
                  </tr>
                );
              })}
              {futurePostShock.map((d, i) => {
                const cumulative = cumulativeLoss2020_2023 + futurePostShock.slice(0, i + 1).reduce((s, x) => s + (x?.projectedLoss || 0), 0);
                return (
                  <tr key={d!.year} className="border-b border-border/50 bg-primary/10">
                    <td className="p-2 font-medium">{d!.year}</td>
                    <td className="text-right p-2">{d!.expected.toFixed(0)}</td>
                    <td className="text-right p-2">{d!.postShock.toFixed(0)}</td>
                    <td className="text-right p-2 text-accent">{d!.diff.toFixed(0)}</td>
                    <td className="text-right p-2 text-accent">${(d!.projectedLoss / 1e6).toFixed(2)}M</td>
                    <td className="text-right p-2 font-bold">${(cumulative / 1e6).toFixed(2)}M</td>
                  </tr>
                );
              })}
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
                <li>• COVID-19 caused 87% drop in tourism arrivals (2020), devastating hotels, guides, and airlines</li>
                <li>• Over ${(cumulativeLoss2020_2023 / 1e6).toFixed(0)}M revenue lost 2020-2023, affecting GDP & jobs</li>
                <li>• Recovery slower than pre-COVID trajectory; may never reach expected levels</li>
                <li>• Projected additional ${(projectedLoss2024_2031 / 1e6).toFixed(0)}M loss 2024-2031 if scarring persists</li>
                <li>• Heavy reliance on seasonal trekking tourism increases vulnerability</li>
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
                <li>• Launch aggressive marketing campaigns targeting new source markets</li>
                <li>• Invest in domestic tourism infrastructure and promote local travel</li>
                <li>• Diversify: cultural tourism, medical tourism, digital nomad visas</li>
                <li>• Digitize permits and travel booking systems for easier access</li>
                <li>• Create emergency tourism funds and insurance for workers</li>
                <li>• Speed up airport upgrades and expand visa-on-arrival to more countries</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
