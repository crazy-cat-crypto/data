import { useState } from "react";
import { districts } from "@/data/districts";
import { temperatureData } from "@/data/temperature";
import { literacyData } from "@/data/literacy";
import { lifeExpectancyData } from "@/data/lifeExpectancy";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, MapPin, TrendingUp, Home, Thermometer, BookOpen, Heart, AlertCircle, Lightbulb } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Districts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0].district);

  const filteredDistricts = districts.filter((d) =>
    d.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selected = districts.find((d) => d.district === selectedDistrict) || districts[0];
  const tempData = temperatureData.find((d) => d.district === selectedDistrict);
  const litData = literacyData.find((d) => d.district === selectedDistrict);
  const lifeExpData = lifeExpectancyData.find((d) => d.district === selectedDistrict);

  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [selected.male, selected.female],
        backgroundColor: ["hsl(189, 94%, 55%)", "hsl(25, 95%, 60%)"],
        borderColor: ["hsl(189, 94%, 55%)", "hsl(25, 95%, 60%)"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "hsl(210, 100%, 98%)",
          font: { size: 12 },
        },
      },
    },
  };

  const getColorForTemp = (temp: number) => {
    if (temp >= 25) return "hsl(0, 100%, 50%)";
    if (temp >= 20) return "hsl(25, 95%, 60%)";
    if (temp >= 15) return "hsl(60, 90%, 50%)";
    if (temp >= 10) return "hsl(180, 70%, 50%)";
    if (temp >= 0) return "hsl(210, 100%, 60%)";
    return "hsl(240, 100%, 70%)";
  };

  const literacyChartData = litData ? {
    labels: ['Total', 'Male', 'Female'],
    datasets: [{
      label: 'Literacy Rate (%)',
      data: [litData.total, litData.male, litData.female],
      backgroundColor: ['hsl(189, 94%, 55%)', 'hsl(210, 100%, 60%)', 'hsl(25, 95%, 60%)'],
      borderColor: ['hsl(189, 94%, 65%)', 'hsl(210, 100%, 70%)', 'hsl(25, 95%, 70%)'],
      borderWidth: 2,
    }]
  } : null;

  const literacyChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed.y.toFixed(1)}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { color: "hsl(210, 100%, 98%)" },
        grid: { color: "hsl(222, 30%, 20%)" },
      },
      x: {
        ticks: { color: "hsl(210, 100%, 98%)" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">District Explorer</h1>
        <p className="text-muted-foreground">Explore demographic data across all 77 districts of Nepal</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search districts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-full sm:w-[300px] bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border max-h-[400px]">
            {filteredDistricts.map((district) => (
              <SelectItem key={district.district} value={district.district}>
                {district.district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-space p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            {selected.district}
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Population
              </span>
              <span className="font-semibold">{selected.totalPopulation.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Area
              </span>
              <span className="font-semibold">{selected.areaSqKm.toLocaleString()} km²</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Population Density</span>
              <span className="font-semibold">{selected.populationDensity}/km²</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <Home className="h-4 w-4" />
                Households
              </span>
              <span className="font-semibold">{selected.households.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Growth Rate
              </span>
              <span className={`font-semibold ${selected.growthRate >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {selected.growthRate > 0 ? '+' : ''}{selected.growthRate}%
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Sex Ratio</span>
              <span className="font-semibold">{selected.sexRatio}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Avg Household Size</span>
              <span className="font-semibold">{selected.avgHouseholdSize} persons</span>
            </div>
          </div>
        </Card>

        <Card className="card-space p-6">
          <h3 className="text-xl font-bold mb-4">Gender Distribution</h3>
          <div className="max-w-sm mx-auto">
            <Pie data={genderData} options={chartOptions} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Male</p>
              <p className="text-2xl font-bold text-primary">{selected.male.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {((selected.male / selected.totalPopulation) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm text-muted-foreground">Female</p>
              <p className="text-2xl font-bold text-accent">{selected.female.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                {((selected.female / selected.totalPopulation) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Temperature Section */}
      {tempData && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Thermometer className="h-6 w-6 text-primary" />
              Temperature
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2" style={{ color: getColorForTemp(tempData.temp) }}>
                  {tempData.temp}°C
                </div>
                <p className="text-sm text-muted-foreground">Annual Average (2019)</p>
              </div>
              <div>
                <div className="h-8 bg-secondary rounded-full overflow-hidden relative">
                  <div 
                    className="h-full transition-all duration-500" 
                    style={{ 
                      width: `${((tempData.temp + 10) / 40) * 100}%`,
                      backgroundColor: getColorForTemp(tempData.temp)
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>-10°C</span>
                  <span>30°C</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-space p-6 border-destructive/50">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-destructive mb-2">Problems (Temperature)</h3>
                  <ul className="space-y-2 text-sm">
                    {tempData.temp >= 25 && (
                      <>
                        <li>• Extreme heat causes health risks and heat stress for residents</li>
                        <li>• High temperatures lead to crop stress and water scarcity</li>
                        <li>• Reduced worker productivity in outdoor sectors</li>
                      </>
                    )}
                    {tempData.temp < 10 && (
                      <>
                        <li>• Very low temperatures limit agricultural productivity</li>
                        <li>• Cold-related health issues affect vulnerable populations</li>
                        <li>• Harsh climate increases migration to warmer regions</li>
                      </>
                    )}
                    {tempData.temp >= 10 && tempData.temp < 25 && (
                      <>
                        <li>• Seasonal temperature variations affect agriculture</li>
                        <li>• Climate adaptation needed for sustainable development</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="card-space p-6 border-primary/50">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Solutions (Temperature)</h3>
                  <ul className="space-y-2 text-sm">
                    {tempData.temp >= 25 && (
                      <>
                        <li>• Promote green roofing and water harvesting systems</li>
                        <li>• Introduce heat-tolerant crop varieties</li>
                        <li>• Expand tree cover and establish cooling centers</li>
                      </>
                    )}
                    {tempData.temp < 10 && (
                      <>
                        <li>• Build solar-heated community halls and shelters</li>
                        <li>• Provide government subsidies for warm clothing</li>
                        <li>• Improve greenhouse farming techniques</li>
                      </>
                    )}
                    {tempData.temp >= 10 && tempData.temp < 25 && (
                      <>
                        <li>• Implement climate-smart agriculture practices</li>
                        <li>• Develop irrigation and water management systems</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Literacy Section */}
      {litData && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Literacy Rate
            </h2>
            <div className="h-[300px]">
              <Bar data={literacyChartData!} options={literacyChartOptions} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold text-primary">{litData.total}%</p>
              </div>
              <div className="text-center p-4 bg-[hsl(210,100%,60%)]/10 rounded-lg border border-[hsl(210,100%,60%)]/20">
                <p className="text-sm text-muted-foreground">Male</p>
                <p className="text-2xl font-bold" style={{color: 'hsl(210, 100%, 60%)'}}>{litData.male}%</p>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-muted-foreground">Female</p>
                <p className="text-2xl font-bold text-accent">{litData.female}%</p>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-space p-6 border-destructive/50">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-destructive mb-2">Problems (Literacy)</h3>
                  <ul className="space-y-2 text-sm">
                    {litData.female < 60 && <li>• Very low female literacy limits women's empowerment and opportunities</li>}
                    {litData.total < 70 && <li>• Low overall literacy hinders economic development and innovation</li>}
                    {(litData.male - litData.female) > 15 && <li>• Large gender gap in literacy requires targeted interventions</li>}
                    <li>• Poor rural school infrastructure affects education quality</li>
                    <li>• Limited access to advanced education and vocational training</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="card-space p-6 border-primary/50">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Solutions (Literacy)</h3>
                  <ul className="space-y-2 text-sm">
                    {litData.female < 70 && <li>• Launch female-focused adult education programs</li>}
                    {litData.female < 70 && <li>• Provide scholarships and incentives for girls' education</li>}
                    <li>• Improve school infrastructure in rural areas</li>
                    <li>• Implement mobile teaching units for remote communities</li>
                    <li>• Introduce e-learning with solar power in schools</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Life Expectancy Section */}
      {lifeExpData && (
        <>
          <Card className="card-space p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Life Expectancy
            </h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2 text-primary">
                  {lifeExpData.lifeExpectancy}
                </div>
                <p className="text-sm text-muted-foreground">Years (Average at Birth)</p>
              </div>
              <div className="relative">
                <div className="h-8 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 bg-primary" 
                    style={{ width: `${(lifeExpData.lifeExpectancy / 85) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>60 years</span>
                  <span className="text-primary font-semibold">{lifeExpData.lifeExpectancy} years</span>
                  <span>85 years</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-lg font-bold text-primary">
                    {lifeExpData.lifeExpectancy >= 73 ? 'High' : lifeExpData.lifeExpectancy >= 70 ? 'Moderate' : 'Low'}
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground">National Avg</p>
                  <p className="text-lg font-bold text-primary">71.3 years</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-xs text-muted-foreground">Difference</p>
                  <p className={`text-lg font-bold ${lifeExpData.lifeExpectancy >= 71.3 ? 'text-primary' : 'text-destructive'}`}>
                    {lifeExpData.lifeExpectancy >= 71.3 ? '+' : ''}{(lifeExpData.lifeExpectancy - 71.3).toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-space p-6 border-destructive/50">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-destructive mb-2">Problems (Life Expectancy)</h3>
                  <ul className="space-y-2 text-sm">
                    {lifeExpData.lifeExpectancy < 70 && <li>• Below-average life expectancy indicates poor healthcare access</li>}
                    <li>• Limited healthcare facilities in rural and remote areas</li>
                    <li>• Malnutrition and food insecurity affect health outcomes</li>
                    <li>• Poor sanitation and water quality lead to preventable diseases</li>
                    {lifeExpData.lifeExpectancy < 70 && <li>• Maternal and child mortality remain concerns</li>}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="card-space p-6 border-primary/50">
              <div className="flex items-start gap-3 mb-4">
                <Lightbulb className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Solutions (Life Expectancy)</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Expand rural hospitals and mobile health clinics</li>
                    <li>• Implement comprehensive health insurance schemes</li>
                    <li>• Launch nutrition programs for mothers and children</li>
                    <li>• Improve clean water access and sanitation infrastructure</li>
                    <li>• Establish telemedicine and helicopter medical response</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
