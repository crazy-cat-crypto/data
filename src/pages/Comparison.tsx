import { districts } from "@/data/districts";
import { temperatureData } from "@/data/temperature";
import { literacyData } from "@/data/literacy";
import { lifeExpectancyData } from "@/data/lifeExpectancy";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Comparison() {
  const [viewMode, setViewMode] = useState<"population" | "temperature" | "literacy" | "life">("population");

  const sortedByPopulation = [...districts].sort((a, b) => b.totalPopulation - a.totalPopulation);
  const top10Pop = sortedByPopulation.slice(0, 10);
  const bottom10Pop = sortedByPopulation.slice(-10).reverse();

  // Temperature comparisons
  const sortedByTemp = [...temperatureData].sort((a, b) => b.temp - a.temp);
  const top10Hot = sortedByTemp.slice(0, 10);
  const top10Cold = [...temperatureData].sort((a, b) => a.temp - b.temp).slice(0, 10);

  // Literacy comparisons
  const sortedByLiteracy = [...literacyData].sort((a, b) => b.total - a.total);
  const top10Literacy = sortedByLiteracy.slice(0, 10);
  const bottom10Literacy = [...literacyData].sort((a, b) => a.total - b.total).slice(0, 10);

  // Life expectancy comparisons
  const sortedByLife = [...lifeExpectancyData].sort((a, b) => b.lifeExpectancy - a.lifeExpectancy);
  const top10Life = sortedByLife.slice(0, 10);
  const bottom10Life = [...lifeExpectancyData].sort((a, b) => a.lifeExpectancy - b.lifeExpectancy).slice(0, 10);

  const chartOptions = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Population: ${context.parsed.x.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "hsl(210, 100%, 98%)",
          callback: (value: any) => (value / 1000000).toFixed(1) + "M",
        },
        grid: {
          color: "hsl(222, 30%, 20%)",
        },
      },
      y: {
        ticks: {
          color: "hsl(210, 100%, 98%)",
          font: { size: 11 },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const top10PopData = {
    labels: top10Pop.map((d) => d.district),
    datasets: [
      {
        data: top10Pop.map((d) => d.totalPopulation),
        backgroundColor: "hsl(189, 94%, 55%)",
        borderColor: "hsl(189, 94%, 65%)",
        borderWidth: 1,
      },
    ],
  };

  const bottom10PopData = {
    labels: bottom10Pop.map((d) => d.district),
    datasets: [
      {
        data: bottom10Pop.map((d) => d.totalPopulation),
        backgroundColor: "hsl(25, 95%, 60%)",
        borderColor: "hsl(25, 95%, 70%)",
        borderWidth: 1,
      },
    ],
  };

  const temperatureChartData = (isHot: boolean) => ({
    labels: (isHot ? top10Hot : top10Cold).map(d => d.district),
    datasets: [{
      label: "Temperature (°C)",
      data: (isHot ? top10Hot : top10Cold).map(d => d.temp),
      backgroundColor: isHot ? "hsl(0, 100%, 60%)" : "hsl(210, 100%, 60%)",
      borderColor: isHot ? "hsl(0, 100%, 70%)" : "hsl(210, 100%, 70%)",
      borderWidth: 1,
    }]
  });

  const literacyChartData = (isTop: boolean) => ({
    labels: (isTop ? top10Literacy : bottom10Literacy).map(d => d.district),
    datasets: [
      {
        label: 'Total %',
        data: (isTop ? top10Literacy : bottom10Literacy).map(d => d.total),
        backgroundColor: "hsl(189, 94%, 55%)",
      },
      {
        label: 'Male %',
        data: (isTop ? top10Literacy : bottom10Literacy).map(d => d.male),
        backgroundColor: "hsl(210, 100%, 60%)",
      },
      {
        label: 'Female %',
        data: (isTop ? top10Literacy : bottom10Literacy).map(d => d.female),
        backgroundColor: "hsl(25, 95%, 60%)",
      }
    ]
  });

  const lifeExpectancyChartData = (isTop: boolean) => ({
    labels: (isTop ? top10Life : bottom10Life).map(d => d.district),
    datasets: [{
      label: "Life Expectancy (Years)",
      data: (isTop ? top10Life : bottom10Life).map(d => d.lifeExpectancy),
      backgroundColor: isTop ? "hsl(189, 94%, 55%)" : "hsl(25, 95%, 60%)",
      borderColor: isTop ? "hsl(189, 94%, 65%)" : "hsl(25, 95%, 70%)",
      borderWidth: 1,
    }]
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">District Comparison</h1>
        <p className="text-muted-foreground">Compare districts across multiple indicators</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant={viewMode === "population" ? "default" : "outline"} onClick={() => setViewMode("population")}>
          Population
        </Button>
        <Button variant={viewMode === "temperature" ? "default" : "outline"} onClick={() => setViewMode("temperature")}>
          Temperature
        </Button>
        <Button variant={viewMode === "literacy" ? "default" : "outline"} onClick={() => setViewMode("literacy")}>
          Literacy
        </Button>
        <Button variant={viewMode === "life" ? "default" : "outline"} onClick={() => setViewMode("life")}>
          Life Expectancy
        </Button>
      </div>

      {viewMode === "population" && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Top 10 Most Populated Districts</h2>
            <div className="h-[500px]">
              <Bar data={top10PopData} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {top10Pop.slice(0, 5).map((district, idx) => (
                <div key={district.district} className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">#{idx + 1}</div>
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{(district.totalPopulation / 1000000).toFixed(2)}M</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-accent">Top 10 Least Populated Districts</h2>
            <div className="h-[500px]">
              <Bar data={bottom10PopData} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {bottom10Pop.slice(0, 5).map((district) => (
                <div key={district.district} className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.totalPopulation.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{district.populationDensity}/km²</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {viewMode === "temperature" && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6" style={{color: 'hsl(0, 100%, 60%)'}}>Top 10 Hottest Districts</h2>
            <div className="h-[500px]">
              <Bar data={temperatureChartData(true)} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {top10Hot.slice(0, 5).map((district, idx) => (
                <div key={district.district} className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                  <div className="text-2xl font-bold" style={{color: 'hsl(0, 100%, 60%)'}}>#{idx + 1}</div>
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.temp}°C</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6" style={{color: 'hsl(210, 100%, 60%)'}}>Top 10 Coldest Districts</h2>
            <div className="h-[500px]">
              <Bar data={temperatureChartData(false)} options={chartOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {top10Cold.slice(0, 5).map((district, idx) => (
                <div key={district.district} className="text-center p-3" style={{backgroundColor: 'hsl(210, 100%, 60%, 0.1)', border: '1px solid hsl(210, 100%, 60%, 0.2)', borderRadius: '0.5rem'}}>
                  <div className="text-2xl font-bold" style={{color: 'hsl(210, 100%, 60%)'}}>#{idx + 1}</div>
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.temp}°C</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {viewMode === "literacy" && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Top 10 Highest Literacy Districts</h2>
            <div className="h-[500px]">
              <Bar data={literacyChartData(true)} options={{...chartOptions, indexAxis: 'y' as const}} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {top10Literacy.slice(0, 5).map((district, idx) => (
                <div key={district.district} className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">#{idx + 1}</div>
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.total}%</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-accent">Top 10 Lowest Literacy Districts</h2>
            <div className="h-[500px]">
              <Bar data={literacyChartData(false)} options={{...chartOptions, indexAxis: 'y' as const}} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {bottom10Literacy.slice(0, 5).map((district) => (
                <div key={district.district} className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">Total: {district.total}%</div>
                  <div className="text-xs text-muted-foreground">Female: {district.female}%</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {viewMode === "life" && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-primary">Top 10 Highest Life Expectancy</h2>
            <div className="h-[500px]">
              <Bar data={lifeExpectancyChartData(true)} options={{...chartOptions, indexAxis: 'y' as const}} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {top10Life.slice(0, 5).map((district, idx) => (
                <div key={district.district} className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">#{idx + 1}</div>
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.lifeExpectancy} years</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 text-accent">Top 10 Lowest Life Expectancy</h2>
            <div className="h-[500px]">
              <Bar data={lifeExpectancyChartData(false)} options={{...chartOptions, indexAxis: 'y' as const}} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
              {bottom10Life.slice(0, 5).map((district) => (
                <div key={district.district} className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-sm font-medium truncate">{district.district}</div>
                  <div className="text-xs text-muted-foreground">{district.lifeExpectancy} years</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
