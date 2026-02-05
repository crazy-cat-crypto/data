import { hdiData } from "@/data/hdi";
import { gdpData } from "@/data/gdp";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Lightbulb } from "lucide-react";
import { Scatter } from "react-chartjs-2";
import { polynomialRegression, predictValue, downloadCSV } from "@/utils/forecasting";

export default function HDIIncomeRelation() {
  // Match HDI and GDP per capita by year (2011-2022)
  const matchedData = hdiData.map(h => {
    const gdp = gdpData.find(g => g.year === h.year);
    return gdp ? { year: h.year, hdi: h.hdi, perCapita: gdp.gdpPerCapita } : null;
  }).filter(Boolean) as { year: number; hdi: number; perCapita: number }[];

  const perCapitaValues = matchedData.map(d => d.perCapita);
  const hdiValues = matchedData.map(d => d.hdi);

  // Linear regression
  const linearModel = polynomialRegression(perCapitaValues, hdiValues, 1);
  
  // Polynomial regression (degree 2)
  const polyModel = polynomialRegression(perCapitaValues, hdiValues, 2);

  // Generate fitted curves
  const minPC = Math.min(...perCapitaValues);
  const maxPC = Math.max(...perCapitaValues);
  const fittedX = Array.from({ length: 50 }, (_, i) => minPC + (maxPC - minPC) * i / 49);
  const linearFitted = fittedX.map(x => predictValue(x, linearModel.coefficients));
  const polyFitted = fittedX.map(x => predictValue(x, polyModel.coefficients));

  // Choose best model
  const bestModel = polyModel.rSquared > linearModel.rSquared ? polyModel : linearModel;
  const bestModelName = polyModel.rSquared > linearModel.rSquared ? "Polynomial (Degree 2)" : "Linear";
  const bestFitted = polyModel.rSquared > linearModel.rSquared ? polyFitted : linearFitted;

  // Calculate slope interpretation (for linear model)
  const slope = linearModel.coefficients[1];
  const deltaHDIPer1000 = slope * 1000;

  const chartData = {
    datasets: [
      {
        label: "HDI vs GDP Per Capita (2011-2022)",
        data: matchedData.map(d => ({ x: d.perCapita, y: d.hdi })),
        backgroundColor: "hsl(189, 94%, 55%)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: `Linear Fit (R² = ${linearModel.rSquared.toFixed(4)})`,
        data: fittedX.map((x, i) => ({ x, y: linearFitted[i] })),
        borderColor: "hsl(210, 100%, 60%)",
        backgroundColor: "transparent",
        showLine: true,
        pointRadius: 0,
        borderDash: [5, 5],
      },
      {
        label: `Polynomial Fit (R² = ${polyModel.rSquared.toFixed(4)})`,
        data: fittedX.map((x, i) => ({ x, y: polyFitted[i] })),
        borderColor: "hsl(280, 100%, 70%)",
        backgroundColor: "transparent",
        showLine: true,
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
          label: (context: any) => {
            if (context.datasetIndex === 0) {
              const point = matchedData[context.dataIndex];
              return `Year ${point.year}: $${point.perCapita} → HDI ${point.hdi.toFixed(3)}`;
            }
            return `${context.dataset.label}`;
          }
        }
      }
    },
    scales: {
      y: { 
        ticks: { color: "hsl(210, 100%, 98%)" },
        title: { display: true, text: "Human Development Index (HDI)", color: "hsl(210, 100%, 98%)" }
      },
      x: { 
        ticks: { color: "hsl(210, 100%, 98%)" },
        title: { display: true, text: "GDP Per Capita (USD)", color: "hsl(210, 100%, 98%)" }
      }
    }
  };

  const exportData = () => {
    const data = matchedData.map(d => ({
      year: d.year,
      gdp_per_capita: d.perCapita,
      hdi: d.hdi.toFixed(4),
      linear_predicted: predictValue(d.perCapita, linearModel.coefficients).toFixed(4),
      poly_predicted: predictValue(d.perCapita, polyModel.coefficients).toFixed(4)
    }));
    downloadCSV(data, "hdi_vs_income_scatter.csv");
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">HDI vs Income Relationship</h1>
        <p className="text-muted-foreground">Correlation between GDP per capita and Human Development Index</p>
      </div>

      <Card className="card-space p-6 bg-primary/10">
        <h3 className="text-lg font-bold mb-2">Model Summary</h3>
        <p className="text-sm mb-2">
          <strong>Best Fit Model:</strong> {bestModelName} | <strong>R² = {bestModel.rSquared.toFixed(4)}</strong>
        </p>
        {bestModelName === "Linear" && (
          <>
            <p className="text-sm mb-2">
              <strong>Equation:</strong> HDI = {linearModel.coefficients[0].toFixed(4)} + {linearModel.coefficients[1].toFixed(6)} × (GDP per capita)
            </p>
            <p className="text-sm">
              <strong>Interpretation:</strong> Each $1,000 increase in GDP per capita is associated with approximately <strong>+{deltaHDIPer1000.toFixed(4)}</strong> increase in HDI.
            </p>
          </>
        )}
        {bestModelName === "Polynomial (Degree 2)" && (
          <p className="text-sm">
            <strong>Equation:</strong> HDI = {polyModel.coefficients[0].toFixed(4)} + {polyModel.coefficients[1].toFixed(6)} × PC + {polyModel.coefficients[2].toFixed(9)} × PC²
          </p>
        )}
        <p className="text-sm mt-2 text-muted-foreground">
          The positive correlation confirms that economic growth (measured by GDP per capita) is strongly associated with human development improvements. However, HDI captures more than income alone—including health and education outcomes.
        </p>
      </Card>

      <Card className="card-space p-6">
        <div className="flex gap-2 mb-4">
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <Scatter data={chartData} options={chartOptions} />
      </Card>

      <Card className="card-space p-6">
        <h2 className="text-xl font-bold mb-4">Data Points (2011-2022)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">Year</th>
                <th className="text-right p-2">GDP Per Capita (USD)</th>
                <th className="text-right p-2">HDI</th>
                <th className="text-right p-2">Linear Predicted</th>
                <th className="text-right p-2">Poly Predicted</th>
              </tr>
            </thead>
            <tbody>
              {matchedData.map(d => (
                <tr key={d.year} className="border-b border-border/50">
                  <td className="p-2 font-medium">{d.year}</td>
                  <td className="text-right p-2">${d.perCapita}</td>
                  <td className="text-right p-2">{d.hdi.toFixed(3)}</td>
                  <td className="text-right p-2">{predictValue(d.perCapita, linearModel.coefficients).toFixed(3)}</td>
                  <td className="text-right p-2">{predictValue(d.perCapita, polyModel.coefficients).toFixed(3)}</td>
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
                <li>• Income growth alone doesn't guarantee proportional HDI improvement</li>
                <li>• Nepal's HDI lags behind income levels compared to regional peers</li>
                <li>• Education and health investments haven't kept pace with GDP growth</li>
                <li>• Income inequality means national per-capita figures mask district-level disparities</li>
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
                <li>• Target HDI gains through direct health and education investments, not just GDP growth</li>
                <li>• Focus on quality of growth: ensure income gains reach all districts</li>
                <li>• Prioritize female education and maternal health to accelerate HDI improvements</li>
                <li>• Use HDI-GDP correlation to set evidence-based policy targets</li>
                <li>• Monitor district-level HDI to identify regions falling behind national trends</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
