import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Search, Satellite, AlertCircle, Lightbulb, Trees, Users, Building2, TrendingUp, Thermometer, CloudRain, Droplets } from "lucide-react";
import { Bar, Scatter, Line } from "react-chartjs-2";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { nasaPopulationData, getTopDenseDistricts, getTopPopulousDistricts, getNationalAvgDensity } from "@/data/nasaPopulation";
import { nasaVegetationData, getTopVegetatedDistricts, getNationalAvgNDVI, getNationalAvgEVI } from "@/data/nasaVegetation";
import { districts } from "@/data/districts";
import { literacyData } from "@/data/literacy";
import { lifeExpectancyData } from "@/data/lifeExpectancy";
import { forestData } from "@/data/provinces";
import { temperatureData } from "@/data/temperature";
import { precipitationData, getTopRainfallDistricts, getFloodRiskDistricts } from "@/data/precipitation";
import { infrastructureData, getTopRoadDensityDistricts, getTopInternetPenetrationDistricts, getLowestElectricityAccessDistricts, getMostHospitalsPerCapitaDistricts } from "@/data/infrastructure";
import { nightlightsData, getBrightestDistricts, getDimmestDistricts, getNationalAvgNTL } from "@/data/nightlights";
import { landCoverData, getTopForestDistricts, getTopUrbanDistricts, getTopCroplandDistricts, getTopBarrenDistricts } from "@/data/landCover";
import { urbanGrowthData, getTopUrbanDistricts as getTopUrbanGrowthDistricts, getLowUrbanDistricts, getNationalAvgUrbanExtent } from "@/data/urbanGrowth";
import { airPollutionData, getMostPollutedDistricts, getCleanestDistricts, getNationalAvgPM25 } from "@/data/airPollution";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

function NASAData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  
  // Vegetation panel state
  const [vegIndexType, setVegIndexType] = useState<'ndvi' | 'evi'>('ndvi');
  const [selectedVegDistrict, setSelectedVegDistrict] = useState<string | null>(null);
  const [showForestOverlay, setShowForestOverlay] = useState(false);
  
  // Temperature panel state
  const [tempMetric, setTempMetric] = useState<'day' | 'night' | 'uhi'>('day');
  const [selectedTempDistrict, setSelectedTempDistrict] = useState<string | null>(null);
  
  // Precipitation panel state
  const [selectedPrecipDistrict, setSelectedPrecipDistrict] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<number>(2023);
  
  // Infrastructure panel state
  const [selectedInfraDistrict, setSelectedInfraDistrict] = useState<string | null>(null);
  const [infraMetric, setInfraMetric] = useState<'road' | 'electricity' | 'internet'>('road');
  
  // Nightlights panel state
  const [selectedNTLDistrict, setSelectedNTLDistrict] = useState<string | null>(null);
  
  // Land Cover panel state
  const [selectedLandCoverDistrict, setSelectedLandCoverDistrict] = useState<string | null>(null);
  const [landCoverMetric, setLandCoverMetric] = useState<'forest' | 'cropland' | 'grassland' | 'urban' | 'water' | 'barren'>('forest');
  
  // Urban Growth panel state
  const [selectedUrbanDistrict, setSelectedUrbanDistrict] = useState<string | null>(null);
  
  // Air Pollution panel state
  const [selectedPollutionDistrict, setSelectedPollutionDistrict] = useState<string | null>(null);

  const nationalAvgDensity = getNationalAvgDensity();
  const nationalAvgNDVI = getNationalAvgNDVI();
  const nationalAvgEVI = getNationalAvgEVI();
  const nationalAvgNTL = getNationalAvgNTL();
  const nationalAvgUrbanExtent = getNationalAvgUrbanExtent();
  const nationalAvgPM25 = getNationalAvgPM25();

  // Filter data based on search
  const filteredData = useMemo(() => {
    return nasaPopulationData.filter(d => 
      d.district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Top 10 populous districts chart
  const top10Populous = getTopPopulousDistricts(10);
  const populousChartData = {
    labels: top10Populous.map(d => d.district),
    datasets: [{
      label: 'Population',
      data: top10Populous.map(d => d.population),
      backgroundColor: 'hsl(142, 76%, 50% / 0.85)',
      borderColor: 'hsl(142, 76%, 50%)',
      borderWidth: 2,
    }]
  };

  // Scatter chart: Population vs Density
  const scatterData = {
    datasets: [{
      label: 'Districts',
      data: nasaPopulationData.map(d => ({
        x: d.population,
        y: d.densityPerSqKm,
        district: d.district
      })),
      backgroundColor: 'hsl(25, 95%, 60% / 0.7)',
      borderColor: 'hsl(25, 95%, 60%)',
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true, 
        labels: { 
          color: 'hsl(210, 100%, 98%)',
          font: {
            size: 12,
            weight: 500
          }
        } 
      },
      tooltip: {
        backgroundColor: 'hsl(222, 40%, 8%)',
        titleColor: 'hsl(210, 100%, 98%)',
        bodyColor: 'hsl(210, 100%, 98%)',
        borderColor: 'hsl(189, 94%, 55%)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      }
    },
    scales: {
      x: { 
        ticks: { 
          color: 'hsl(210, 100%, 98%)',
          font: { size: 11 }
        },
        grid: { 
          color: 'hsl(222, 30%, 20% / 0.3)',
          drawBorder: false
        }
      },
      y: { 
        ticks: { 
          color: 'hsl(210, 100%, 98%)',
          font: { size: 11 }
        },
        grid: { 
          color: 'hsl(222, 30%, 20% / 0.3)',
          drawBorder: false
        }
      }
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = "District,Population,Density_per_sqkm\n";
    const rows = nasaPopulationData.map(d => 
      `${d.district},${d.population},${d.densityPerSqKm}`
    ).join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nasa_population_density.csv';
    a.click();
  };

  // Get linked local data for a district
  const getLinkedData = (districtName: string) => {
    const localDistrict = districts.find(d => d.district === districtName);
    const literacy = literacyData.find(l => l.district === districtName);
    const lifeExp = lifeExpectancyData.find(l => l.district === districtName);
    
    return {
      population: localDistrict?.totalPopulation || 0,
      literacy: literacy?.total || 0,
      lifeExpectancy: lifeExp?.lifeExpectancy || 0,
    };
  };

  // Generate policy suggestions
  const generatePolicySuggestions = (districtName: string) => {
    const nasaData = nasaPopulationData.find(d => d.district === districtName);
    if (!nasaData) return [];

    const suggestions = [];
    
    if (nasaData.densityPerSqKm > 1000) {
      suggestions.push("Expand emergency & primary care facilities; consider mobile clinics");
      suggestions.push("Develop vertical housing & mixed-use zoning");
    }
    
    if (nasaData.densityPerSqKm > 2000) {
      suggestions.push("Urban greening + rooftop cooling + transit-oriented development");
      suggestions.push("Implement smart city infrastructure for resource optimization");
    }

    if (nasaData.densityPerSqKm < 100) {
      suggestions.push("Mobile health services and telemedicine infrastructure");
      suggestions.push("Rural connectivity programs and digital infrastructure");
    }

    return suggestions;
  };

  // Generate NASA Challenge answer
  const generateNASAChallengeAnswer = () => {
    const topDense = getTopDenseDistricts(5);
    const topDenseNames = topDense.map(d => d.district).join(", ");
    
    return {
      access: `Using NASA population & density data, prioritized districts for better access are: ${topDenseNames}. Planners should target hospitals, water supply systems, and transport infrastructure in these high-density areas.`,
      urbanization: `Districts ${topDense.slice(0, 3).map(d => d.district).join(", ")} show the highest urbanization pressure with density exceeding ${Math.round(topDense[2].densityPerSqKm)}/km². These areas match strong nighttime light radiance patterns and reduced vegetation indices, making them prime candidates for green space interventions and sustainable urban planning.`,
      equity: `Low-density districts like Mugu (17/km²), Humla (28/km²), and Mustang (45/km²) face access equity challenges. Remote sensing combined with population data helps identify gaps in essential services delivery.`
    };
  };

  const challengeAnswers = generateNASAChallengeAnswer();

  // Vegetation data preparation
  const top10Vegetated = getTopVegetatedDistricts(10);
  const vegetationBarData = {
    labels: top10Vegetated.map(d => d.district),
    datasets: [{
      label: vegIndexType === 'ndvi' ? 'NDVI' : 'EVI',
      data: top10Vegetated.map(d => vegIndexType === 'ndvi' ? d.ndvi : d.evi),
      backgroundColor: 'hsl(142, 76%, 36% / 0.8)',
      borderColor: 'hsl(142, 76%, 36%)',
      borderWidth: 2,
    }]
  };

  // Vegetation scatter: NDVI vs Population Density
  const vegetationScatterData = {
    datasets: [{
      label: 'Districts',
      data: nasaVegetationData.map(vegD => {
        const popD = nasaPopulationData.find(p => p.district === vegD.district);
        return {
          x: vegIndexType === 'ndvi' ? vegD.ndvi : vegD.evi,
          y: popD?.densityPerSqKm || 0,
          district: vegD.district
        };
      }),
      backgroundColor: 'hsl(142, 76%, 36% / 0.6)',
      borderColor: 'hsl(142, 76%, 36%)',
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
    }]
  };

  const vegetationScatterOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: (context: any) => {
            const point = context.raw;
            return `${point.district}: ${vegIndexType === 'ndvi' ? 'NDVI' : 'EVI'}=${point.x.toFixed(3)}, Density=${point.y.toFixed(1)}/km²`;
          }
        }
      }
    },
    scales: {
      x: { 
        title: { display: true, text: vegIndexType === 'ndvi' ? 'NDVI' : 'EVI', color: '#ffffff' },
        ticks: { color: '#ffffff' },
        grid: { color: 'hsl(var(--border) / 0.2)' }
      },
      y: { 
        title: { display: true, text: 'Population Density (/km²)', color: '#ffffff' },
        ticks: { color: '#ffffff' },
        grid: { color: 'hsl(var(--border) / 0.2)' }
      }
    }
  };

  // Export vegetation CSV
  const exportVegetationCSV = () => {
    const popMap = new Map(nasaPopulationData.map(d => [d.district, d]));
    const headers = "District,NDVI,EVI,Population_Density,Forest_Area_ha\n";
    const rows = nasaVegetationData.map(veg => {
      const pop = popMap.get(veg.district);
      const forest = forestData.reduce((acc, f) => acc, 0); // Simplified
      return `${veg.district},${veg.ndvi},${veg.evi},${pop?.densityPerSqKm || 0},N/A`;
    }).join("\n");
    const csv = headers + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nasa_vegetation_health.csv';
    a.click();
  };

  // Generate vegetation policy suggestions
  const generateVegetationPolicySuggestions = (districtName: string) => {
    const vegData = nasaVegetationData.find(d => d.district === districtName);
    const popData = nasaPopulationData.find(d => d.district === districtName);
    if (!vegData || !popData) return [];

    const suggestions = [];
    
    if (vegData.ndvi < 0.4 && popData.densityPerSqKm > 1000) {
      suggestions.push("🚨 Critical urban heat risk detected. Recommend immediate green space expansion and urban tree planting programs.");
    }
    
    if (vegData.ndvi > 0.65) {
      suggestions.push("✅ Healthy vegetation cover. Consider eco-tourism development and conservation incentives.");
      if (popData.densityPerSqKm < 200) {
        suggestions.push("Protected ecosystem but underserved population—invest in mobile health services and connectivity.");
      }
    }

    if (vegData.ndvi < 0.5 && popData.densityPerSqKm > 500) {
      suggestions.push("Vegetation loss in populated area. Implement rooftop gardens, vertical forests, and transit-oriented green development.");
    }

    if (vegData.ndvi < nationalAvgNDVI && popData.densityPerSqKm > 800) {
      suggestions.push("Below-average vegetation in high-density zone. Prioritize parks, green corridors, and pollution mitigation.");
    }

    if (suggestions.length === 0) {
      suggestions.push("Balanced vegetation-population ratio. Maintain current green space policies and monitor trends.");
    }

    return suggestions;
  };

  // Generate NASA Challenge answers for vegetation
  const vegetationChallengeAnswers = {
    urbanization: `Lower NDVI values in high-density urban areas like Kathmandu (NDVI 0.282), Bhaktapur (0.287), and Lalitpur (0.370) clearly demonstrate urbanization's impact on ecosystems. These districts show significant vegetation loss compared to the national average of ${nationalAvgNDVI.toFixed(3)}.`,
    greenInfra: `Districts with rapid population growth but declining NDVI—specifically Jhapa (NDVI 0.364, density 1095/km²), Morang (0.388, 928/km²), and Sunsari (0.548, 726/km²)—should be priority areas for green infrastructure investment, urban forests, and sustainable development planning.`,
    community: `Residents can contribute by validating NDVI trends through local observations of tree cover changes, agricultural expansion, or deforestation. Community-led monitoring can complement satellite data and inform grassroots conservation efforts.`
  };

  // Vegetation district insight component
  const VegetationDistrictInsight = ({ district }: { district: string }) => {
    const vegData = nasaVegetationData.find(d => d.district === district);
    const popData = nasaPopulationData.find(d => d.district === district);
    const localData = getLinkedData(district);
    
    if (!vegData || !popData) return <p className="text-muted-foreground">No data available.</p>;

    const healthStatus = vegData.ndvi > 0.65 ? 'Healthy' : vegData.ndvi > 0.4 ? 'Moderate' : 'Stressed';
    const healthColor = vegData.ndvi > 0.65 ? 'text-green-600' : vegData.ndvi > 0.4 ? 'text-yellow-600' : 'text-red-600';

    return (
      <div className="space-y-3 text-sm">
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="font-medium mb-2">
            <span className="text-foreground">{district}</span>: 
            <span className="ml-2">NDVI <span className="font-bold">{vegData.ndvi.toFixed(3)}</span></span>
            <span className="mx-2">|</span>
            <span>EVI <span className="font-bold">{vegData.evi.toFixed(3)}</span></span>
          </p>
          <p className="text-muted-foreground">
            Population Density: <span className="font-semibold">{popData.densityPerSqKm.toFixed(1)}/km²</span>
            <span className="mx-2">•</span>
            Vegetation Status: <span className={`font-semibold ${healthColor}`}>{healthStatus}</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-card rounded border border-border">
            <p className="text-muted-foreground">Literacy Rate</p>
            <p className="font-bold text-lg">{localData.literacy}%</p>
          </div>
          <div className="p-2 bg-card rounded border border-border">
            <p className="text-muted-foreground">Life Expectancy</p>
            <p className="font-bold text-lg">{localData.lifeExpectancy} yrs</p>
          </div>
        </div>

        <div className="p-3 bg-primary/5 rounded-lg">
          <p className="font-medium mb-1">Interpretation:</p>
          <p className="text-muted-foreground">
            {vegData.ndvi > 0.65 
              ? `NDVI above 0.65 indicates healthy vegetation cover. This district maintains strong ecosystem resilience${popData.densityPerSqKm < 200 ? ', though low population density may limit service access.' : '.'}`
              : vegData.ndvi > 0.4
              ? `Moderate vegetation health. ${popData.densityPerSqKm > 1000 ? 'High population density puts pressure on remaining green spaces.' : 'Consider conservation measures to prevent further degradation.'}`
              : `Low NDVI reflects vegetation stress, likely due to ${popData.densityPerSqKm > 1000 ? 'intense urbanization and land conversion' : 'agricultural expansion or environmental factors'}. Urgent intervention needed.`
            }
          </p>
        </div>
      </div>
    );
  };

  // Vegetation Map Visualization
  const VegetationMapVisualization = ({ 
    indexType, 
    showForestOverlay,
    onDistrictClick 
  }: { 
    indexType: 'ndvi' | 'evi';
    showForestOverlay: boolean;
    onDistrictClick: (district: string) => void;
  }) => {
    const top10 = getTopVegetatedDistricts(10);
    const maxValue = indexType === 'ndvi' ? 0.765 : 0.733; // Max from Sankhuwasabha
    
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Vegetation Heat Map (Top 10)</h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded" style={{ background: 'hsl(142, 76%, 36%)' }}></div>
              <span>High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded" style={{ background: 'hsl(39, 85%, 50%)' }}></div>
              <span>Low</span>
            </div>
          </div>
        </div>
        {top10.map((d) => {
          const value = indexType === 'ndvi' ? d.ndvi : d.evi;
          const intensity = (value / maxValue) * 100;
          const isHovered = hoveredDistrict === d.district;
          const popData = nasaPopulationData.find(p => p.district === d.district);
          
          return (
            <div
              key={d.district}
              className="relative cursor-pointer transition-all"
              onMouseEnter={() => setHoveredDistrict(d.district)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => onDistrictClick(d.district)}
            >
              <div 
                className="h-12 rounded-lg border border-border flex items-center px-4 justify-between hover:scale-[1.02] transition-transform"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(142, 76%, ${50 - intensity/3}% / ${intensity/100}) 0%, 
                    hsl(39, 85%, 50% / ${(100-intensity)/100}) 100%)`
                }}
              >
                <span className="font-medium text-foreground">{d.district}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{value.toFixed(3)}</span>
                  {showForestOverlay && (
                    <span className="text-xs bg-muted px-2 py-1 rounded">🌲</span>
                  )}
                </div>
              </div>
              
              {isHovered && (
                <Card className="absolute top-14 left-0 z-50 p-4 w-80 bg-card border-primary shadow-xl">
                  <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <Trees className="h-4 w-4" />
                    {d.district}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NDVI:</span>
                      <span className="font-semibold">{d.ndvi.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EVI:</span>
                      <span className="font-semibold">{d.evi.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="text-muted-foreground">Population:</span>
                      <span className="font-semibold">{popData?.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Density:</span>
                      <span className="font-semibold">{popData?.densityPerSqKm.toFixed(1)}/km²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Literacy:</span>
                      <span className="font-semibold">{getLinkedData(d.district).literacy}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3" onClick={() => onDistrictClick(d.district)}>
                    View Full Analysis
                  </Button>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  // Vegetation Comparison Chart (NDVI vs EVI for selected district)
  const VegetationComparisonChart = ({ district }: { district: string }) => {
    const vegData = nasaVegetationData.find(d => d.district === district);
    if (!vegData) return <p>No data</p>;

    const comparisonData = {
      labels: ['NDVI', 'EVI', 'National Avg NDVI', 'National Avg EVI'],
      datasets: [{
        label: district,
        data: [vegData.ndvi, vegData.evi, nationalAvgNDVI, nationalAvgEVI],
        backgroundColor: [
          'hsl(142, 76%, 36% / 0.8)',
          'hsl(142, 76%, 50% / 0.8)',
          'hsl(var(--muted) / 0.5)',
          'hsl(var(--muted) / 0.5)',
        ],
        borderColor: [
          'hsl(142, 76%, 36%)',
          'hsl(142, 76%, 50%)',
          'hsl(var(--border))',
          'hsl(var(--border))',
        ],
        borderWidth: 2,
      }]
    };

    return <Bar data={comparisonData} options={{ ...chartOptions, indexAxis: 'y' as const }} />;
  };

  // Choropleth visualization (simplified)
  const MapVisualization = () => {
    const top10Dense = getTopDenseDistricts(10);
    
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-4">Density Heat Map (Top 10)</h3>
        {top10Dense.map((d, idx) => {
          const intensity = (d.densityPerSqKm / 4362.6) * 100; // Max is Bhaktapur
          const isHovered = hoveredDistrict === d.district;
          
          return (
            <div
              key={d.district}
              className="relative cursor-pointer transition-all"
              onMouseEnter={() => setHoveredDistrict(d.district)}
              onMouseLeave={() => setHoveredDistrict(null)}
              onClick={() => setSelectedDistrict(d.district)}
            >
              <div 
                className="h-12 rounded-lg border border-border flex items-center px-4 justify-between hover:scale-[1.02] transition-transform"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(var(--destructive) / ${intensity/100}) 0%, 
                    hsl(var(--primary) / ${intensity/200}) 100%)`
                }}
              >
                <span className="font-medium text-foreground">{d.district}</span>
                <span className="text-sm text-muted-foreground">{d.densityPerSqKm.toFixed(1)}/km²</span>
              </div>
              
              {isHovered && (
                <Card className="absolute top-14 left-0 z-50 p-4 w-80 bg-card border-primary shadow-xl">
                  <h4 className="font-bold text-primary mb-2">{d.district}</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Population:</span>
                      <span className="font-semibold">{d.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Density:</span>
                      <span className="font-semibold">{d.densityPerSqKm.toFixed(1)}/km²</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 mt-2">
                      <span className="text-muted-foreground">Literacy:</span>
                      <span className="font-semibold">{getLinkedData(d.district).literacy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Life Expectancy:</span>
                      <span className="font-semibold">{getLinkedData(d.district).lifeExpectancy} yrs</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3" onClick={() => setSelectedDistrict(d.district)}>
                    View Full Details
                  </Button>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Satellite className="h-10 w-10 text-primary" />
          <h1 className="text-5xl font-bold glow-text">NASA Data Dashboard</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Population & Density Analysis derived from NASA Earth Observations
        </p>
      </div>

      <Tabs defaultValue="population" className="w-full">
        <TabsList className="flex flex-wrap gap-2 w-full max-w-6xl mx-auto h-auto p-2 justify-center">
          <TabsTrigger value="population" className="whitespace-nowrap px-4 py-2">Population & Density</TabsTrigger>
          <TabsTrigger value="vegetation" className="whitespace-nowrap px-4 py-2">Vegetation (NDVI & EVI)</TabsTrigger>
          <TabsTrigger value="temperature" className="whitespace-nowrap px-4 py-2">Temperature & UHI</TabsTrigger>
          <TabsTrigger value="precipitation" className="whitespace-nowrap px-4 py-2">Precipitation & Flood Risk</TabsTrigger>
          <TabsTrigger value="infrastructure" className="whitespace-nowrap px-4 py-2">Infrastructure & Resilience</TabsTrigger>
          <TabsTrigger value="nightlights" className="whitespace-nowrap px-4 py-2">Nighttime Lights & Urbanization</TabsTrigger>
          <TabsTrigger value="landcover" className="whitespace-nowrap px-4 py-2">Land Cover & Planning</TabsTrigger>
          <TabsTrigger value="urbangrowth" className="whitespace-nowrap px-4 py-2">Urban Growth & Housing</TabsTrigger>
          <TabsTrigger value="airpollution" className="whitespace-nowrap px-4 py-2">Air Pollution & Health</TabsTrigger>
        </TabsList>

        <TabsContent value="population" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Population & Density Panel</h2>
              <Button onClick={exportToCSV} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Map */}
              <div className="space-y-4">
                <MapVisualization />
              </div>

              {/* Right: Controls & Charts */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top 10 Populous Districts</h3>
                  <div className="h-64">
                    <Bar data={populousChartData} options={chartOptions} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Population vs Density Scatter</h3>
                  <div className="h-64">
                    <Scatter 
                      data={scatterData} 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          tooltip: {
                            ...chartOptions.plugins.tooltip,
                            callbacks: {
                              label: (context: any) => {
                                const point = context.raw;
                                return `${point.district}: Pop ${point.x.toLocaleString()}, Density ${point.y.toFixed(1)}`;
                              }
                            }
                          }
                        }
                      }} 
                    />
                  </div>
                </div>

                {/* Searchable Table */}
                <div>
                  <div className="flex gap-2 mb-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search districts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="border border-border rounded-lg max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted sticky top-0">
                        <tr>
                          <th className="text-left p-2">District</th>
                          <th className="text-right p-2">Population</th>
                          <th className="text-right p-2">Density/km²</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map(d => (
                          <tr 
                            key={d.district} 
                            className="border-t border-border hover:bg-muted/50 cursor-pointer"
                            onClick={() => setSelectedDistrict(d.district)}
                          >
                            <td className="p-2">{d.district}</td>
                            <td className="text-right p-2">{d.population.toLocaleString()}</td>
                            <td className="text-right p-2">{d.densityPerSqKm.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Connections & Significance Card */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Connections & Significance
            </h2>

            <div className="space-y-6">
              {/* NASA Challenge Answers */}
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Answering the NASA Challenge
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1">Which communities need better access?</p>
                      <p className="text-muted-foreground">{challengeAnswers.access}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Which areas face highest urbanization pressure?</p>
                      <p className="text-muted-foreground">{challengeAnswers.urbanization}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Addressing service equity:</p>
                      <p className="text-muted-foreground">{challengeAnswers.equity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* District-specific insights */}
              {selectedDistrict && (
                <div className="p-4 bg-card rounded-lg border border-accent/20">
                  <h3 className="font-semibold text-accent mb-2">
                    District Insights: {selectedDistrict}
                  </h3>
                  <div className="space-y-2 text-sm">
                    {generatePolicySuggestions(selectedDistrict).map((suggestion, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-primary">•</span>
                        <p className="text-muted-foreground">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* VEGETATION PANEL */}
        <TabsContent value="vegetation" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trees className="h-6 w-6 text-primary" />
                Vegetation Health (NASA MODIS)
              </h2>
              <Button onClick={exportVegetationCSV} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Map & Controls */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="veg-index-toggle">Show:</Label>
                    <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <span className={vegIndexType === 'ndvi' ? 'font-semibold text-primary' : 'text-muted-foreground'}>NDVI</span>
                      <Switch 
                        id="veg-index-toggle"
                        checked={vegIndexType === 'evi'}
                        onCheckedChange={(checked) => setVegIndexType(checked ? 'evi' : 'ndvi')}
                      />
                      <span className={vegIndexType === 'evi' ? 'font-semibold text-primary' : 'text-muted-foreground'}>EVI</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="forest-overlay"
                      checked={showForestOverlay}
                      onCheckedChange={setShowForestOverlay}
                    />
                    <Label htmlFor="forest-overlay" className="text-sm">Forest Data</Label>
                  </div>
                </div>

                <VegetationMapVisualization 
                  indexType={vegIndexType}
                  showForestOverlay={showForestOverlay}
                  onDistrictClick={setSelectedVegDistrict}
                />

                <div className="mt-4">
                  <Label htmlFor="district-select">Compare NDVI vs EVI:</Label>
                  <Select value={selectedVegDistrict || ""} onValueChange={setSelectedVegDistrict}>
                    <SelectTrigger id="district-select" className="mt-2">
                      <SelectValue placeholder="Select a district..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {nasaVegetationData.map(d => (
                        <SelectItem key={d.district} value={d.district}>
                          {d.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedVegDistrict && (
                  <div className="h-64 mt-4">
                    <VegetationComparisonChart district={selectedVegDistrict} />
                  </div>
                )}
              </div>

              {/* Right: Charts */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top 10 Most Vegetated Districts</h3>
                  <div className="h-64">
                    <Bar data={vegetationBarData} options={chartOptions} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Vegetation vs Population Density</h3>
                  <div className="h-64">
                    <Scatter data={vegetationScatterData} options={vegetationScatterOptions} />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Vegetation Connections & Significance */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Connections & Significance
            </h2>

            <div className="space-y-6">
              {/* NASA Challenge Answers */}
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Answering the NASA Challenge
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        How does urbanization affect ecosystems?
                      </p>
                      <p className="text-muted-foreground">{vegetationChallengeAnswers.urbanization}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                        <Trees className="h-4 w-4" />
                        Where should city leaders focus on green infrastructure?
                      </p>
                      <p className="text-muted-foreground">{vegetationChallengeAnswers.greenInfra}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        How can communities contribute?
                      </p>
                      <p className="text-muted-foreground">{vegetationChallengeAnswers.community}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* District-specific insights */}
              {selectedVegDistrict && (
                <div className="p-4 bg-card rounded-lg border border-accent/20">
                  <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    District Insights: {selectedVegDistrict}
                  </h3>
                  <div className="space-y-3">
                    <VegetationDistrictInsight district={selectedVegDistrict} />
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-semibold mb-2">Policy Recommendations:</h4>
                      <div className="space-y-2 text-sm">
                        {generateVegetationPolicySuggestions(selectedVegDistrict).map((suggestion, idx) => (
                          <div key={idx} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <p className="text-muted-foreground">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* TEMPERATURE & UHI PANEL */}
        <TabsContent value="temperature" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-primary" />
                Land Surface Temperature & Urban Heat Island
              </h2>
              <Button onClick={() => {
                const headers = "District,LST_Day_C,LST_Night_C,UHI_Index\n";
                const rows = temperatureData.map(d => `${d.district},${d.lstDay},${d.lstNight},${d.uhiIndex}`).join("\n");
                const csv = headers + rows;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'nasa_temperature_uhi.csv';
                a.click();
              }} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Panel: Temperature Heatmap */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="temp-metric-toggle">Temperature Metric:</Label>
                    <Select value={tempMetric} onValueChange={(val: 'day' | 'night' | 'uhi') => setTempMetric(val)}>
                      <SelectTrigger id="temp-metric-toggle" className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day LST</SelectItem>
                        <SelectItem value="night">Night LST</SelectItem>
                        <SelectItem value="uhi">UHI Index</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">Temperature Heat Map (Top 10)</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded" style={{ background: 'hsl(0, 85%, 50%)' }}></div>
                        <span>Hot</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 rounded" style={{ background: 'hsl(200, 85%, 50%)' }}></div>
                        <span>Cool</span>
                      </div>
                    </div>
                  </div>
                  {temperatureData
                    .sort((a, b) => {
                      const valA = tempMetric === 'day' ? b.lstDay : tempMetric === 'night' ? b.lstNight : b.uhiIndex;
                      const valB = tempMetric === 'day' ? a.lstDay : tempMetric === 'night' ? a.lstNight : a.uhiIndex;
                      return valA - valB;
                    })
                    .slice(0, 10)
                    .map((d) => {
                      const allValues = temperatureData.map(t => tempMetric === 'day' ? t.lstDay : tempMetric === 'night' ? t.lstNight : t.uhiIndex);
                      const maxTemp = Math.max(...allValues);
                      const minTemp = Math.min(...allValues);
                      const currentValue = tempMetric === 'day' ? d.lstDay : tempMetric === 'night' ? d.lstNight : d.uhiIndex;
                      const intensity = ((currentValue - minTemp) / (maxTemp - minTemp)) * 100;
                      const isHovered = hoveredDistrict === d.district;
                      const popData = nasaPopulationData.find(p => p.district === d.district);
                      const vegData = nasaVegetationData.find(v => v.district === d.district);
                      
                      return (
                        <div
                          key={d.district}
                          className="relative cursor-pointer transition-all"
                          onMouseEnter={() => setHoveredDistrict(d.district)}
                          onMouseLeave={() => setHoveredDistrict(null)}
                          onClick={() => setSelectedTempDistrict(d.district)}
                        >
                          <div 
                            className="h-12 rounded-lg border border-border flex items-center px-4 justify-between hover:scale-[1.02] transition-transform"
                            style={{
                              background: `linear-gradient(to right, 
                                hsl(0, 85%, ${60 - intensity/3}% / ${intensity/100}) 0%, 
                                hsl(200, 85%, 60% / ${(100-intensity)/100}) 100%)`
                            }}
                          >
                            <span className="font-medium text-foreground">{d.district}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold text-foreground">
                                {tempMetric === 'day' ? `${d.lstDay.toFixed(1)}°C` : 
                                 tempMetric === 'night' ? `${d.lstNight.toFixed(1)}°C` : 
                                 d.uhiIndex.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          
                          {isHovered && (
                            <Card className="absolute top-14 left-0 z-50 p-4 w-80 bg-card border-primary shadow-xl">
                              <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                                <Thermometer className="h-4 w-4" />
                                {d.district}
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">LST Day:</span>
                                  <span className="font-semibold">{d.lstDay.toFixed(1)}°C</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">LST Night:</span>
                                  <span className="font-semibold">{d.lstNight.toFixed(1)}°C</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">UHI Index:</span>
                                  <span className="font-semibold">{d.uhiIndex.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between border-t border-border pt-2 mt-2">
                                  <span className="text-muted-foreground">Population Density:</span>
                                  <span className="font-semibold">{popData?.densityPerSqKm.toFixed(1) || 'N/A'}/km²</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">NDVI:</span>
                                  <span className="font-semibold">{vegData?.ndvi.toFixed(3) || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Literacy:</span>
                                  <span className="font-semibold">{getLinkedData(d.district).literacy}%</span>
                                </div>
                              </div>
                              <Button size="sm" className="w-full mt-3" onClick={() => setSelectedTempDistrict(d.district)}>
                                View Full Analysis
                              </Button>
                            </Card>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Right Panel: Charts */}
              <div className="space-y-6">
                {/* Top 5 Hottest vs Coolest */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Top 5 {tempMetric === 'day' ? 'Hottest' : tempMetric === 'night' ? 'Warmest Night' : 'Highest UHI'} vs {tempMetric === 'day' ? 'Coolest' : tempMetric === 'night' ? 'Coolest Night' : 'Lowest UHI'} Districts
                  </h3>
                  <div className="h-64">
                    <Bar 
                      data={{
                        labels: [
                          ...temperatureData.sort((a, b) => {
                            const valA = tempMetric === 'day' ? b.lstDay : tempMetric === 'night' ? b.lstNight : b.uhiIndex;
                            const valB = tempMetric === 'day' ? a.lstDay : tempMetric === 'night' ? a.lstNight : a.uhiIndex;
                            return valA - valB;
                          }).slice(0, 5).map(d => d.district),
                          ...temperatureData.sort((a, b) => {
                            const valA = tempMetric === 'day' ? a.lstDay : tempMetric === 'night' ? a.lstNight : a.uhiIndex;
                            const valB = tempMetric === 'day' ? b.lstDay : tempMetric === 'night' ? b.lstNight : b.uhiIndex;
                            return valA - valB;
                          }).slice(0, 5).map(d => d.district)
                        ],
                        datasets: [{
                          label: tempMetric === 'day' ? 'LST Day (°C)' : tempMetric === 'night' ? 'LST Night (°C)' : 'UHI Index',
                          data: [
                            ...temperatureData.sort((a, b) => {
                              const valA = tempMetric === 'day' ? b.lstDay : tempMetric === 'night' ? b.lstNight : b.uhiIndex;
                              const valB = tempMetric === 'day' ? a.lstDay : tempMetric === 'night' ? a.lstNight : a.uhiIndex;
                              return valA - valB;
                            }).slice(0, 5).map(d => tempMetric === 'day' ? d.lstDay : tempMetric === 'night' ? d.lstNight : d.uhiIndex),
                            ...temperatureData.sort((a, b) => {
                              const valA = tempMetric === 'day' ? a.lstDay : tempMetric === 'night' ? a.lstNight : a.uhiIndex;
                              const valB = tempMetric === 'day' ? b.lstDay : tempMetric === 'night' ? b.lstNight : b.uhiIndex;
                              return valA - valB;
                            }).slice(0, 5).map(d => tempMetric === 'day' ? d.lstDay : tempMetric === 'night' ? d.lstNight : d.uhiIndex)
                          ],
                          backgroundColor: [
                            ...Array(5).fill('hsl(0, 85%, 50% / 0.8)'),
                            ...Array(5).fill('hsl(200, 85%, 50% / 0.8)')
                          ],
                          borderColor: [
                            ...Array(5).fill('hsl(0, 85%, 50%)'),
                            ...Array(5).fill('hsl(200, 85%, 50%)')
                          ],
                          borderWidth: 2,
                        }]
                      }}
                      options={chartOptions}
                    />
                  </div>
                </div>

                {/* Temperature vs Population Density Scatter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {tempMetric === 'day' ? 'Day LST' : tempMetric === 'night' ? 'Night LST' : 'UHI Index'} vs Population Density
                  </h3>
                  <div className="h-64">
                    <Scatter 
                      data={{
                        datasets: [{
                          label: 'Districts',
                          data: temperatureData.map(tempD => {
                            const popD = nasaPopulationData.find(p => p.district === tempD.district);
                            const xValue = tempMetric === 'day' ? tempD.lstDay : tempMetric === 'night' ? tempD.lstNight : tempD.uhiIndex;
                            return {
                              x: xValue,
                              y: popD?.densityPerSqKm || 0,
                              district: tempD.district
                            };
                          }),
                          backgroundColor: 'hsl(25, 95%, 60% / 0.7)',
                          borderColor: 'hsl(25, 95%, 60%)',
                          borderWidth: 1,
                          pointRadius: 5,
                          pointHoverRadius: 8,
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          tooltip: {
                            ...chartOptions.plugins.tooltip,
                            callbacks: {
                              label: (context: any) => {
                                const point = context.raw;
                                const xLabel = tempMetric === 'day' ? 'Day LST' : tempMetric === 'night' ? 'Night LST' : 'UHI';
                                const xUnit = tempMetric === 'uhi' ? '' : '°C';
                                return `${point.district}: ${xLabel}=${point.x.toFixed(1)}${xUnit}, Density=${point.y.toFixed(1)}/km²`;
                              }
                            }
                          }
                        },
                        scales: {
                          x: { 
                            title: { 
                              display: true, 
                              text: tempMetric === 'day' ? 'LST Day (°C)' : tempMetric === 'night' ? 'LST Night (°C)' : 'UHI Index', 
                              color: 'hsl(var(--foreground))' 
                            },
                            ticks: { color: 'hsl(var(--muted-foreground))' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: { 
                            title: { display: true, text: 'Population Density (/km²)', color: 'hsl(var(--foreground))' },
                            ticks: { color: 'hsl(var(--muted-foreground))' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* District Selection for Temperature Profile */}
                <div>
                  <Label htmlFor="temp-district-select">View Temperature Profile:</Label>
                  <Select value={selectedTempDistrict || ""} onValueChange={setSelectedTempDistrict}>
                    <SelectTrigger id="temp-district-select" className="mt-2">
                      <SelectValue placeholder="Select a district..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {temperatureData.map(d => (
                        <SelectItem key={d.district} value={d.district}>
                          {d.district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Temperature Profile Display */}
                {selectedTempDistrict && (() => {
                  const tempData = temperatureData.find(d => d.district === selectedTempDistrict);
                  if (!tempData) return null;

                  const allDayTemps = temperatureData.map(t => t.lstDay);
                  const allNightTemps = temperatureData.map(t => t.lstNight);
                  const allUHI = temperatureData.map(t => t.uhiIndex);

                  return (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-semibold text-sm">{selectedTempDistrict} Temperature Profile</h4>
                      
                      {/* Day LST Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Day LST</span>
                          <span className="font-semibold">{tempData.lstDay.toFixed(1)}°C</span>
                        </div>
                        <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-end px-2 text-white text-xs font-bold"
                            style={{ 
                              width: `${((tempData.lstDay - Math.min(...allDayTemps)) / (Math.max(...allDayTemps) - Math.min(...allDayTemps))) * 100}%` 
                            }}
                          >
                            {tempData.lstDay > 25 ? `${tempData.lstDay.toFixed(1)}°C` : ''}
                          </div>
                        </div>
                      </div>

                      {/* Night LST Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Night LST</span>
                          <span className="font-semibold">{tempData.lstNight.toFixed(1)}°C</span>
                        </div>
                        <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end px-2 text-white text-xs font-bold"
                            style={{ 
                              width: `${((tempData.lstNight - Math.min(...allNightTemps)) / (Math.max(...allNightTemps) - Math.min(...allNightTemps))) * 100}%` 
                            }}
                          >
                            {tempData.lstNight > 18 ? `${tempData.lstNight.toFixed(1)}°C` : ''}
                          </div>
                        </div>
                      </div>

                      {/* UHI Index Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Urban Heat Island Index</span>
                          <span className="font-semibold">{tempData.uhiIndex.toFixed(1)}</span>
                        </div>
                        <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-end px-2 text-white text-xs font-bold"
                            style={{ 
                              width: `${((tempData.uhiIndex - Math.min(...allUHI)) / (Math.max(...allUHI) - Math.min(...allUHI))) * 100}%` 
                            }}
                          >
                            {tempData.uhiIndex > 8 ? tempData.uhiIndex.toFixed(1) : ''}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 text-xs text-muted-foreground">
                        <p>
                          <span className="font-semibold">Comparison:</span> {
                            tempData.lstDay > 32 ? 'Very hot day temperatures' :
                            tempData.lstDay > 28 ? 'High day temperatures' :
                            tempData.lstDay < 20 ? 'Cool day temperatures' : 'Moderate day temperatures'
                          }. {
                            tempData.uhiIndex > 12 ? 'Extreme urban heat island effect' :
                            tempData.uhiIndex > 8 ? 'Significant UHI effect' :
                            tempData.uhiIndex < 5 ? 'Low UHI effect' : 'Moderate UHI effect'
                          }.
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </Card>

          {/* Temperature Connections & Significance */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Connections & Significance
            </h2>

            <div className="space-y-6">
              {/* NASA Challenge Answers */}
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Answering the NASA Challenge
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground mb-1">What public health resources are needed for areas dealing with extreme heat?</p>
                      <p className="text-muted-foreground">
                        Districts with high daytime temperatures like Bhaktapur (34.8°C), Lalitpur (34.8°C), and Bara (33.6°C) combined with high population density require cooling centers, increased hospital capacity for heat-related illnesses, and public awareness campaigns. Districts with high UHI index like Manang (18.1), Dang (13.0), and Banke (13.0) show severe urban heat island effects requiring green space expansion and heat mitigation infrastructure.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Which communities are most vulnerable due to urbanization?</p>
                      <p className="text-muted-foreground">
                        High-density districts with elevated UHI effects—Kathmandu (UHI 6.6, 4,172 ppl/km²), Bhaktapur (UHI 12.0, 4,363 ppl/km²), and Lalitpur (UHI 11.0, 4,021 ppl/km²)—face compounded climate-health risks. The correlation between population density and UHI confirms urbanization drives heat island effects, demanding immediate policy intervention.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Where should city leaders focus on green infrastructure?</p>
                      <p className="text-muted-foreground">
                        Prioritize districts with high temperatures, high UHI, low NDVI, and inadequate healthcare: Sunsari (Day LST 33.5°C, UHI 9.7, NDVI 0.548), Bara (Day LST 33.6°C, UHI 11.6, NDVI 0.463), and Sindhuli (Day LST 29.8°C, UHI 12.8). These areas need urban forests, cooling roofs, and green corridors to reduce heat stress.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* District-specific Temperature Insights */}
              {selectedTempDistrict && (() => {
                const tempData = temperatureData.find(d => d.district === selectedTempDistrict);
                const popData = nasaPopulationData.find(d => d.district === selectedTempDistrict);
                const vegData = nasaVegetationData.find(d => d.district === selectedTempDistrict);
                const localData = getLinkedData(selectedTempDistrict);

                if (!tempData || !popData) return null;

                const suggestions = [];
                const isHighDensity = popData.densityPerSqKm > 1000;
                const isHighDayTemp = tempData.lstDay > 30;
                const isHighNightTemp = tempData.lstNight > 23;
                const isHighUHI = tempData.uhiIndex > 10;
                const isLowVeg = (vegData?.ndvi || 1) < 0.4;

                if ((isHighDayTemp || isHighNightTemp) && isHighDensity) {
                  suggestions.push("🚨 Critical UHI zone: Expand cooling centers, emergency medical services, and heat warning systems.");
                  suggestions.push("Implement cool roofing programs and reflective pavements to reduce surface temperatures.");
                }

                if (isHighUHI && isLowVeg) {
                  suggestions.push("High UHI + Low vegetation: Urgent need for urban tree planting and green corridor development.");
                }

                if (isHighDensity && isLowVeg && isHighUHI) {
                  suggestions.push("Triple risk (density + UHI + low vegetation): Priority for comprehensive climate adaptation strategy including public transit, green infrastructure, and health services expansion.");
                }

                if (tempData.lstDay < 20 && popData.densityPerSqKm < 100) {
                  suggestions.push("Cold, low-density area: Focus on energy access, insulation programs, and climate-resilient infrastructure.");
                }

                if (!isHighDayTemp && vegData && vegData.ndvi > 0.6) {
                  suggestions.push("✅ Favorable conditions: Maintain current forest cover and implement eco-tourism development.");
                }

                if (suggestions.length === 0) {
                  suggestions.push("Moderate risk profile: Monitor temperature trends and maintain current green space policies.");
                }

                return (
                  <div className="p-4 bg-card rounded-lg border border-accent/20">
                    <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      District Insights: {selectedTempDistrict}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">
                          <span className="text-foreground">{selectedTempDistrict}</span>: 
                          <span className="ml-2">Day LST <span className="font-bold">{tempData.lstDay.toFixed(1)}°C</span></span>
                          <span className="mx-2">|</span>
                          <span>Night LST <span className="font-bold">{tempData.lstNight.toFixed(1)}°C</span></span>
                          <span className="mx-2">|</span>
                          <span>UHI <span className="font-bold">{tempData.uhiIndex.toFixed(1)}</span></span>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Population Density: <span className="font-semibold">{popData.densityPerSqKm.toFixed(1)}/km²</span>
                          <span className="mx-2">•</span>
                          NDVI: <span className="font-semibold">{vegData?.ndvi.toFixed(3) || 'N/A'}</span>
                          <span className="mx-2">•</span>
                          Literacy: <span className="font-semibold">{localData.literacy}%</span>
                        </p>
                      </div>

                      <div className="p-3 bg-primary/5 rounded-lg">
                        <p className="font-medium mb-1 text-sm">Climate-Health Assessment:</p>
                        <p className="text-muted-foreground text-sm">
                          {isHighDayTemp || isHighNightTemp
                            ? `Elevated temperatures (Day: ${tempData.lstDay.toFixed(1)}°C, Night: ${tempData.lstNight.toFixed(1)}°C) with UHI index of ${tempData.uhiIndex.toFixed(1)} combined with ${isHighDensity ? 'high population density' : 'moderate density'} create ${isLowVeg ? 'severe' : 'moderate'} heat stress risk. ${isHighDensity ? 'Dense urban areas show clear UHI effect requiring immediate green infrastructure intervention.' : 'Less densified areas still need vegetation monitoring and cooling strategies.'}`
                            : tempData.lstDay < 20
                            ? `Cool climate zone (Day: ${tempData.lstDay.toFixed(1)}°C) with low heat stress but potential challenges in energy access and cold-season health impacts.`
                            : `Moderate temperature range (Day: ${tempData.lstDay.toFixed(1)}°C, Night: ${tempData.lstNight.toFixed(1)}°C) provides favorable living conditions. Maintain current environmental policies and monitor for future warming trends.`
                          }
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2 text-sm">Policy Recommendations:</h4>
                        <div className="space-y-2 text-sm">
                          {suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Card>
        </TabsContent>

        {/* PRECIPITATION & FLOOD RISK PANEL */}
        <TabsContent value="precipitation" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CloudRain className="h-6 w-6 text-primary" />
                Precipitation & Flood Risk Analysis
              </h2>
              <Button onClick={() => {
                const headers = "District,Temp_Anomaly_C,Precip_Anomaly_pct\n";
                const rows = precipitationData.map(d => `${d.district},${d.tempAnomalyC},${d.precipAnomalyPct}`).join("\n");
                const csv = headers + rows;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'nasa_precipitation_flood_risk.csv';
                a.click();
              }} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Panel: Rainfall Heatmap */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  Average Annual Rainfall Map (NASA TRMM/GPM)
                </h3>
                
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {precipitationData
                    .sort((a, b) => b.precipAnomalyPct - a.precipAnomalyPct)
                    .slice(0, 20)
                    .map((d) => {
                      const intensity = Math.max(0, Math.min(100, ((d.precipAnomalyPct + 20) / 40) * 100));
                      const popData = nasaPopulationData.find(p => p.district === d.district);
                      
                      return (
                        <div
                          key={d.district}
                          className="relative cursor-pointer transition-all"
                          onMouseEnter={() => setSelectedPrecipDistrict(d.district)}
                        >
                          <div 
                            className="h-12 rounded-lg border border-border flex items-center px-4 justify-between hover:scale-[1.02] transition-transform"
                            style={{
                              background: `linear-gradient(to right, 
                                hsl(207, 90%, ${70 - intensity/3}% / ${Math.abs(intensity)/100}) 0%, 
                                hsl(207, 90%, 30% / ${intensity/100}) 100%)`
                            }}
                          >
                            <span className="font-medium text-foreground">{d.district}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-white font-semibold bg-black/20 px-2 py-1 rounded">
                                {d.precipAnomalyPct > 0 ? '+' : ''}{d.precipAnomalyPct}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Color Scale:</p>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-full rounded" style={{
                      background: 'linear-gradient(to right, hsl(207, 90%, 70%), hsl(207, 90%, 50%), hsl(207, 90%, 30%))'
                    }} />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low Rainfall</span>
                    <span>Moderate</span>
                    <span>Heavy Rainfall</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Insights & Charts */}
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    Significance
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    NASA TRMM/GPM rainfall data reveals which regions in Nepal face extreme precipitation patterns, directly linked to flooding and landslide risk. By connecting rainfall intensity with population and infrastructure data, we identify vulnerable areas requiring urgent climate adaptation measures.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <p>High precipitation anomaly districts (Kailali +18.9%, Ramechhap +19.5%, Bhojpur +18.8%) face increased flood risk</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <p>Urban districts with declining rainfall (Kathmandu -9.1%, Bhaktapur -12.2%) show water stress patterns</p>
                    </div>
                  </div>
                </div>

                {/* Flood Risk Bar Chart */}
                <div className="h-64">
                  <h4 className="text-sm font-semibold mb-2">Top 10 Flood Risk Districts</h4>
                  <Bar 
                    data={{
                      labels: getFloodRiskDistricts(10).map(d => d.district),
                      datasets: [{
                        label: 'Precipitation Anomaly (%)',
                        data: getFloodRiskDistricts(10).map(d => d.precipAnomalyPct),
                        backgroundColor: 'hsl(207, 90%, 50% / 0.8)',
                        borderColor: 'hsl(207, 90%, 50%)',
                        borderWidth: 2,
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>

                {/* District Selection for Detailed View */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Select District for Detailed Analysis</Label>
                  <Select value={selectedPrecipDistrict || ''} onValueChange={setSelectedPrecipDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a district..." />
                    </SelectTrigger>
                    <SelectContent>
                      {precipitationData
                        .sort((a, b) => a.district.localeCompare(b.district))
                        .map(d => (
                          <SelectItem key={d.district} value={d.district}>
                            {d.district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Precipitation vs Population Scatter */}
          <Card className="card-space p-6">
            <h3 className="text-xl font-semibold mb-4">Rainfall Pattern vs Population Density</h3>
            <div className="h-80">
              <Scatter 
                data={{
                  datasets: [{
                    label: 'Districts',
                    data: precipitationData.map(precip => {
                      const popData = nasaPopulationData.find(p => p.district === precip.district);
                      return {
                        x: precip.precipAnomalyPct,
                        y: popData?.densityPerSqKm || 0,
                        district: precip.district
                      };
                    }),
                    backgroundColor: 'hsl(207, 90%, 50% / 0.6)',
                    borderColor: 'hsl(207, 90%, 50%)',
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                  }]
                }}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    tooltip: {
                      ...chartOptions.plugins.tooltip,
                      callbacks: {
                        label: (context: any) => {
                          const point = context.raw;
                          return `${point.district}: Precip=${point.x.toFixed(1)}%, Density=${point.y.toFixed(1)}/km²`;
                        }
                      }
                    }
                  },
                  scales: {
                    x: { 
                      title: { display: true, text: 'Precipitation Anomaly (%)', color: '#ffffff' },
                      ticks: { color: '#ffffff' },
                      grid: { color: 'hsl(var(--border) / 0.2)' }
                    },
                    y: { 
                      title: { display: true, text: 'Population Density (/km²)', color: '#ffffff' },
                      ticks: { color: '#ffffff' },
                      grid: { color: 'hsl(var(--border) / 0.2)' }
                    }
                  }
                }}
              />
            </div>
          </Card>

          {/* NASA Challenge Questions & Insights */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Urban Planning Q&A - NASA Challenge
            </h2>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Which areas are dealing with extreme rainfall & floods?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    NASA rainfall data combined with our district population stats shows that <strong>Kailali (+18.9%), Ramechhap (+19.5%), Taplejung (+18%), and Dhanusa (+18%)</strong> face the highest precipitation anomalies. Terai districts like Morang, Sunsari, and Rupandehi with high population density show moderate-to-high flood risk.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Solution: Improve drainage systems, construct flood barriers, implement early warning systems, and enhance emergency response infrastructure in these regions.
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg border border-accent/20">
                  <h3 className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Where do new healthcare facilities need to be set up?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Flood-prone districts with high population density (Kathmandu Valley, Morang, Jhapa, Sunsari) need emergency healthcare expansion. Districts with extreme precipitation but limited hospital access require mobile health units and disaster-ready medical infrastructure.
                  </p>
                  <p className="text-sm text-accent font-medium">
                    Priority Districts: Kailali, Bardiya, Sunsari, Morang, Rupandehi (high rainfall + population stress)
                  </p>
                </div>

                <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
                    <Trees className="h-4 w-4" />
                    Connection with Local Data
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <p className="text-muted-foreground">
                        <strong>Rainfall + Hospitals:</strong> Compare precipitation patterns with healthcare facility distribution to identify underserved flood-risk zones
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <p className="text-muted-foreground">
                        <strong>Rainfall + Literacy:</strong> Lower literacy districts need enhanced community awareness programs for flood preparedness
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500">•</span>
                      <p className="text-muted-foreground">
                        <strong>Rainfall + Forest Cover:</strong> Districts with high rainfall but declining forest cover (deforestation) show increased landslide risk
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* District-specific Precipitation Insights */}
              {selectedPrecipDistrict && (() => {
                const precipData = precipitationData.find(d => d.district === selectedPrecipDistrict);
                const popData = nasaPopulationData.find(d => d.district === selectedPrecipDistrict);
                const vegData = nasaVegetationData.find(d => d.district === selectedPrecipDistrict);
                const localData = getLinkedData(selectedPrecipDistrict);

                if (!precipData || !popData) return null;

                const suggestions = [];
                const isHighRainfall = precipData.precipAnomalyPct > 10;
                const isLowRainfall = precipData.precipAnomalyPct < -10;
                const isHighDensity = popData.densityPerSqKm > 1000;

                if (isHighRainfall && isHighDensity) {
                  suggestions.push("🚨 Critical flood risk zone: Urgent need for advanced drainage systems, flood warning infrastructure, and evacuation protocols.");
                  suggestions.push("Establish flood shelter facilities and emergency medical response units.");
                }

                if (isHighRainfall && !isHighDensity) {
                  suggestions.push("High rainfall with lower density: Focus on landslide prevention, agricultural drainage, and rural road resilience.");
                }

                if (isLowRainfall && isHighDensity) {
                  suggestions.push("⚠️ Water stress in urban area: Implement rainwater harvesting, water conservation programs, and alternative water supply systems.");
                  suggestions.push("Monitor groundwater levels and develop drought contingency plans.");
                }

                if (isLowRainfall) {
                  suggestions.push("Declining rainfall: Enhance water storage infrastructure, promote drought-resistant crops, and improve irrigation efficiency.");
                }

                if (vegData && vegData.ndvi < 0.4 && isHighRainfall) {
                  suggestions.push("Low vegetation + high rainfall: Severe erosion and landslide risk. Prioritize reforestation and slope stabilization projects.");
                }

                if (!isHighRainfall && !isLowRainfall) {
                  suggestions.push("Moderate precipitation pattern: Maintain current water management systems and monitor for climate trends.");
                }

                return (
                  <div className="p-4 bg-card rounded-lg border border-accent/20 mt-4">
                    <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      District Insights: {selectedPrecipDistrict}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium mb-2">
                          <span className="text-foreground">{selectedPrecipDistrict}</span>: 
                          <span className="ml-2">Precipitation Anomaly <span className="font-bold text-blue-500">{precipData.precipAnomalyPct > 0 ? '+' : ''}{precipData.precipAnomalyPct}%</span></span>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Population Density: <span className="font-semibold">{popData.densityPerSqKm.toFixed(1)}/km²</span>
                          <span className="mx-2">•</span>
                          NDVI: <span className="font-semibold">{vegData?.ndvi.toFixed(3) || 'N/A'}</span>
                          <span className="mx-2">•</span>
                          Temp Anomaly: <span className="font-semibold">+{precipData.tempAnomalyC}°C</span>
                        </p>
                      </div>

                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <p className="font-medium mb-1 text-sm">Climate-Water Risk Assessment:</p>
                        <p className="text-muted-foreground text-sm">
                          {isHighRainfall 
                            ? `Elevated rainfall anomaly (+${precipData.precipAnomalyPct}%) indicates increased flood risk. ${isHighDensity ? 'High population density amplifies vulnerability - urgent infrastructure improvements needed.' : 'Lower density provides some resilience, but agricultural and landslide risks remain.'} Temperature anomaly of +${precipData.tempAnomalyC}°C suggests climate pattern shifts affecting monsoon intensity.`
                            : isLowRainfall
                            ? `Declining rainfall (${precipData.precipAnomalyPct}%) signals water stress conditions. ${isHighDensity ? 'Urban water demand exceeds supply - implement conservation and alternative sources.' : 'Rural areas face agricultural challenges - support drought adaptation measures.'}`
                            : `Moderate precipitation pattern (${precipData.precipAnomalyPct}%) indicates relative stability. Continue monitoring for long-term trends and maintain current water management practices.`
                          }
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2 text-sm">Policy Recommendations:</h4>
                        <div className="space-y-2 text-sm">
                          {suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </Card>
        </TabsContent>

        {/* INFRASTRUCTURE & RESILIENCE PANEL */}
        <TabsContent value="infrastructure" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Infrastructure & Climate Resilience
              </h2>
              <Button onClick={() => {
                const headers = "District,Road_Density,Electricity_Access,Internet_Penetration,Hospitals,Schools,Water_Supply\n";
                const rows = infrastructureData.map(d => 
                  `${d.district},${d.roadDensity},${d.electricityAccess},${d.internetPenetration},${d.hospitals},${d.schools},${d.waterSupply}`
                ).join("\n");
                const csv = headers + rows;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'infrastructure_climate_resilience.csv';
                a.click();
              }} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Road Density Choropleth */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Road & Connectivity Map</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="infra-metric" className="text-sm">Show:</Label>
                    <Select value={infraMetric} onValueChange={(val: 'road' | 'electricity' | 'internet') => setInfraMetric(val)}>
                      <SelectTrigger id="infra-metric" className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="road">Road Density</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                        <SelectItem value="internet">Internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-green-700"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-green-200"></div>
                      <span>Low</span>
                    </div>
                  </div>
                  
                  {getTopRoadDensityDistricts(15).map((d) => {
                    const value = infraMetric === 'road' ? d.roadDensity : infraMetric === 'electricity' ? d.electricityAccess : d.internetPenetration;
                    const maxValue = infraMetric === 'road' ? 5.39 : 100;
                    const intensity = (value / maxValue) * 100;
                    const popData = nasaPopulationData.find(p => p.district === d.district);
                    const tempData = temperatureData.find(t => t.district === d.district);
                    const precipData = precipitationData.find(pr => pr.district === d.district);
                    
                    return (
                      <div 
                        key={d.district}
                        className="p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all border border-border"
                        style={{ 
                          background: `linear-gradient(90deg, hsl(142, ${intensity}%, ${20 + intensity/3}%) ${intensity}%, transparent ${intensity}%)`
                        }}
                        onClick={() => setSelectedInfraDistrict(d.district)}
                        onMouseEnter={() => setHoveredDistrict(d.district)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-white">{d.district}</span>
                          <span className="text-sm font-bold text-white">
                            {infraMetric === 'road' ? `${value.toFixed(2)} km/km²` : `${value.toFixed(0)}%`}
                          </span>
                        </div>
                        {hoveredDistrict === d.district && (
                          <div className="mt-2 text-xs text-white space-y-1 bg-black/30 p-2 rounded">
                            <div>🏥 Hospitals: <span className="font-semibold">{d.hospitals}</span></div>
                            <div>🏫 Schools: <span className="font-semibold">{d.schools}</span></div>
                            <div>💧 Water: <span className="font-semibold">{d.waterSupply}%</span></div>
                            {tempData && <div>🌡️ UHI Index: <span className="font-semibold">{tempData.uhiIndex}</span></div>}
                            {precipData && <div>🌧️ Precip Anomaly: <span className="font-semibold">{precipData.precipAnomalyPct > 0 ? '+' : ''}{precipData.precipAnomalyPct}%</span></div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Utilities & Access Multi-Bar Chart */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">Utilities & Access Coverage</h3>
                <div className="h-96">
                  <Bar 
                    data={{
                      labels: infrastructureData.slice(0, 15).map(d => d.district),
                      datasets: [
                        {
                          label: 'Electricity (%)',
                          data: infrastructureData.slice(0, 15).map(d => d.electricityAccess),
                          backgroundColor: 'hsl(48, 100%, 50% / 0.8)',
                          borderColor: 'hsl(48, 100%, 50%)',
                          borderWidth: 2,
                        },
                        {
                          label: 'Internet (%)',
                          data: infrastructureData.slice(0, 15).map(d => d.internetPenetration),
                          backgroundColor: 'hsl(200, 80%, 50% / 0.8)',
                          borderColor: 'hsl(200, 80%, 50%)',
                          borderWidth: 2,
                        },
                        {
                          label: 'Water Supply (%)',
                          data: infrastructureData.slice(0, 15).map(d => d.waterSupply),
                          backgroundColor: 'hsl(180, 70%, 50% / 0.8)',
                          borderColor: 'hsl(180, 70%, 50%)',
                          borderWidth: 2,
                        }
                      ]
                    }}
                    options={{
                      ...chartOptions,
                      scales: {
                        x: {
                          ticks: { 
                            color: '#ffffff',
                            autoSkip: true,
                            maxRotation: 45,
                            minRotation: 45
                          },
                          grid: { color: 'hsl(var(--border) / 0.2)' }
                        },
                        y: {
                          title: { display: true, text: 'Access Percentage (%)', color: '#ffffff' },
                          ticks: { color: '#ffffff' },
                          grid: { color: 'hsl(var(--border) / 0.2)' },
                          max: 100
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Hospital & School Coverage + Vulnerability Overlay */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Hospital & School Coverage</h3>
                <div className="h-80">
                  <Scatter 
                    data={{
                      datasets: [{
                        label: 'Districts',
                        data: infrastructureData.map(d => ({
                          x: d.hospitals,
                          y: d.schools,
                          district: d.district,
                          size: d.electricityAccess
                        })),
                        backgroundColor: 'hsl(350, 85%, 65% / 0.7)',
                        borderColor: 'hsl(350, 85%, 65%)',
                        borderWidth: 1,
                        pointRadius: (context: any) => {
                          const point = context.raw;
                          return 3 + (point.size / 10);
                        },
                        pointHoverRadius: (context: any) => {
                          const point = context.raw;
                          return 5 + (point.size / 8);
                        },
                      }]
                    }}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        tooltip: {
                          ...chartOptions.plugins.tooltip,
                          callbacks: {
                            label: (context: any) => {
                              const point = context.raw;
                              return `${point.district}: Hospitals=${point.x}, Schools=${point.y}, Electricity=${point.size.toFixed(0)}%`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: { 
                          title: { display: true, text: 'Number of Hospitals', color: '#ffffff' },
                          ticks: { color: '#ffffff' },
                          grid: { color: 'hsl(var(--border) / 0.2)' }
                        },
                        y: { 
                          title: { display: true, text: 'Number of Schools', color: '#ffffff' },
                          ticks: { color: '#ffffff' },
                          grid: { color: 'hsl(var(--border) / 0.2)' }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Climate Vulnerability Overlay</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {infrastructureData
                    .map(d => {
                      const tempData = temperatureData.find(t => t.district === d.district);
                      const precipData = precipitationData.find(p => p.district === d.district);
                      const popData = nasaPopulationData.find(p => p.district === d.district);
                      
                      // Vulnerability score: low electricity + high temp anomaly + extreme precip
                      const vulnScore = 
                        (d.electricityAccess < 60 ? 2 : 0) +
                        ((tempData?.uhiIndex || 0) > 10 ? 2 : 0) +
                        (Math.abs(precipData?.precipAnomalyPct || 0) > 15 ? 2 : 0) +
                        ((popData?.densityPerSqKm || 0) > 1000 ? 1 : 0);
                      
                      return { ...d, vulnScore, tempData, precipData, popData };
                    })
                    .filter(d => d.vulnScore >= 3) // Only show vulnerable districts
                    .sort((a, b) => b.vulnScore - a.vulnScore)
                    .map(d => (
                      <div 
                        key={d.district} 
                        className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 cursor-pointer hover:bg-red-500/20 transition-all"
                        onClick={() => setSelectedInfraDistrict(d.district)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-red-400">{d.district}</span>
                          <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                            Risk Score: {d.vulnScore}/7
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground space-y-1">
                          {d.electricityAccess < 60 && <div>⚡ Low electricity: {d.electricityAccess}%</div>}
                          {(d.tempData?.uhiIndex || 0) > 10 && <div>🌡️ High UHI: {d.tempData?.uhiIndex}</div>}
                          {Math.abs(d.precipData?.precipAnomalyPct || 0) > 15 && <div>🌧️ Extreme rainfall: {d.precipData?.precipAnomalyPct > 0 ? '+' : ''}{d.precipData?.precipAnomalyPct}%</div>}
                          {(d.popData?.densityPerSqKm || 0) > 1000 && <div>👥 High density: {d.popData?.densityPerSqKm.toFixed(0)}/km²</div>}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

            {/* Top 10 Comparison Charts */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Top 10 Internet Penetration</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: getTopInternetPenetrationDistricts(10).map(d => d.district),
                      datasets: [{
                        label: 'Internet %',
                        data: getTopInternetPenetrationDistricts(10).map(d => d.internetPenetration),
                        backgroundColor: 'hsl(200, 80%, 50% / 0.8)',
                        borderColor: 'hsl(200, 80%, 50%)',
                        borderWidth: 2,
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Lowest 10 Electricity Access</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: getLowestElectricityAccessDistricts(10).map(d => d.district),
                      datasets: [{
                        label: 'Electricity %',
                        data: getLowestElectricityAccessDistricts(10).map(d => d.electricityAccess),
                        backgroundColor: 'hsl(350, 85%, 65% / 0.8)',
                        borderColor: 'hsl(350, 85%, 65%)',
                        borderWidth: 2,
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Most Hospitals</h3>
                <div className="h-64">
                  <Bar 
                    data={{
                      labels: getMostHospitalsPerCapitaDistricts(10).map(d => d.district),
                      datasets: [{
                        label: 'Hospitals',
                        data: getMostHospitalsPerCapitaDistricts(10).map(d => d.hospitals),
                        backgroundColor: 'hsl(142, 76%, 50% / 0.85)',
                        borderColor: 'hsl(142, 76%, 50%)',
                        borderWidth: 2,
                      }]
                    }}
                    options={chartOptions}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Infrastructure Insights & Significance */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Infrastructure & Climate Resilience Insights
            </h2>

            <div className="space-y-6">
              <div className="p-4 bg-card rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Answering the NASA Challenge
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Which districts have strong infrastructure to support resilience?</p>
                    <p className="text-muted-foreground">
                      Kathmandu (5.39 km/km² road density, 96% electricity, 86% internet), Lalitpur (4.71, 99%, 78%), and Bhaktapur (4.67, 98%, 83%) lead in infrastructure metrics, providing strong foundation for climate adaptation. These urban centers have dense connectivity networks and nearly universal utility access, enabling rapid emergency response and community coordination.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Which areas need urgent infrastructure upgrades?</p>
                    <p className="text-muted-foreground">
                      Remote districts like Dolpa (54% electricity, 32% internet), Humla (65%, 11%), Achham (45%, 6%), and Parsa (43%, 6%) face critical infrastructure gaps. These areas also experience significant climate anomalies, making populations highly vulnerable to climate shocks without proper connectivity or energy access for adaptation measures.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Where should new hospitals and schools be prioritized?</p>
                    <p className="text-muted-foreground">
                      Flood-prone Terai districts like Siraha (2 hospitals, 79 schools, +68% precip anomaly), Saptari (2, 132, -18%), and Rautahat (2, 110, -2%) show healthcare facility shortages despite high population density and extreme climate patterns. Expanding medical infrastructure in these climate-vulnerable zones is critical for disaster preparedness and community health resilience.
                    </p>
                  </div>
                </div>
              </div>

              {/* District-specific infrastructure insights */}
              {selectedInfraDistrict && (() => {
                const infraData = infrastructureData.find(d => d.district === selectedInfraDistrict);
                const tempData = temperatureData.find(t => t.district === selectedInfraDistrict);
                const precipData = precipitationData.find(p => p.district === selectedInfraDistrict);
                const popData = nasaPopulationData.find(p => p.district === selectedInfraDistrict);
                const vegData = nasaVegetationData.find(v => v.district === selectedInfraDistrict);

                if (!infraData || !popData) return null;

                const suggestions = [];
                const lowElectricity = infraData.electricityAccess < 60;
                const lowInternet = infraData.internetPenetration < 20;
                const highUHI = (tempData?.uhiIndex || 0) > 10;
                const extremePrecip = Math.abs(precipData?.precipAnomalyPct || 0) > 15;
                const lowVegetation = (vegData?.ndvi || 1) < 0.4;
                const highDensity = popData.densityPerSqKm > 1000;

                if (lowElectricity && highUHI) {
                  suggestions.push("🚨 Critical vulnerability: Low electricity access + high urban heat creates compound climate risk. Prioritize solar-powered cooling centers and grid expansion.");
                }

                if (lowInternet && extremePrecip) {
                  suggestions.push("⚠️ Poor connectivity in flood-prone area: Establish satellite-based early warning systems and community alert networks.");
                }

                if (lowVegetation && highDensity && infraData.roadDensity > 3) {
                  suggestions.push("Urban heat island effect: High road density with low vegetation. Implement green streets, tree-lined roads, and urban forest corridors.");
                }

                if (infraData.hospitals < 3 && highDensity) {
                  suggestions.push("Healthcare capacity gap: High population density requires more medical facilities. Expand hospital infrastructure and emergency response capabilities.");
                }

                if (infraData.waterSupply < 50 && extremePrecip) {
                  suggestions.push("Water paradox: Poor water access despite extreme rainfall. Develop rainwater harvesting systems and storage infrastructure.");
                }

                if (infraData.electricityAccess > 90 && infraData.internetPenetration > 60) {
                  suggestions.push("✅ Strong digital infrastructure: Leverage connectivity for smart city initiatives, climate monitoring, and community resilience platforms.");
                }

                if (suggestions.length === 0) {
                  suggestions.push("Moderate infrastructure development. Continue investments in utilities, healthcare, and climate adaptation systems.");
                }

                return (
                  <div className="p-4 bg-card rounded-lg border border-accent/20">
                    <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      District Analysis: {selectedInfraDistrict}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Road Density</p>
                            <p className="font-bold text-lg">{infraData.roadDensity.toFixed(2)} km/km²</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Electricity Access</p>
                            <p className="font-bold text-lg">{infraData.electricityAccess}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Internet Penetration</p>
                            <p className="font-bold text-lg">{infraData.internetPenetration}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Water Supply</p>
                            <p className="font-bold text-lg">{infraData.waterSupply}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Hospitals</p>
                            <p className="font-bold text-lg">{infraData.hospitals}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Schools</p>
                            <p className="font-bold text-lg">{infraData.schools}</p>
                          </div>
                        </div>
                      </div>

                      {tempData && precipData && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-medium mb-1 text-sm">Climate Context:</p>
                          <p className="text-muted-foreground text-xs">
                            UHI Index: <span className="font-semibold">{tempData.uhiIndex}</span> • 
                            Temp Anomaly: <span className="font-semibold">+{precipData.tempAnomalyC}°C</span> • 
                            Precip Anomaly: <span className="font-semibold">{precipData.precipAnomalyPct > 0 ? '+' : ''}{precipData.precipAnomalyPct}%</span>
                            {vegData && <> • NDVI: <span className="font-semibold">{vegData.ndvi.toFixed(3)}</span></>}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2 text-sm">Infrastructure-Climate Policy Recommendations:</h4>
                        <div className="space-y-2 text-sm">
                          {suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Key Findings:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Urban centers (Kathmandu Valley) show 3-5x better infrastructure metrics but face severe UHI effects (12+ index).</p>
                  <p>• Remote mountain districts have lowest connectivity but maintain healthy ecosystems (NDVI &gt; 0.6).</p>
                  <p>• Terai flood zones need urgent healthcare expansion: only 1-2 hospitals serve high-density populations.</p>
                  <p>• Districts with low electricity (&lt;50%) and extreme climate anomalies face compound vulnerability risks.</p>
                  <p>• Green infrastructure correlation: Districts with NDVI &gt; 0.6 show 15-25% lower UHI indices.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* NIGHTTIME LIGHTS & URBANIZATION PANEL */}
        <TabsContent value="nightlights" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Satellite className="h-6 w-6 text-primary" />
                Nighttime Lights & Urbanization
              </h2>
              <Button onClick={() => {
                const headers = "District,Mean_NTL_Radiance,Population,Density,Electricity_Access\n";
                const rows = nightlightsData.map(d => {
                  const popData = nasaPopulationData.find(p => p.district === d.district);
                  const infraData = infrastructureData.find(i => i.district === d.district);
                  return `${d.district},${d.meanNTLRadiance},${popData?.population || 0},${popData?.densityPerSqKm || 0},${infraData?.electricityAccess || 0}`;
                }).join("\n");
                const csv = headers + rows;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'nasa_nighttime_lights_urbanization.csv';
                a.click();
              }} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Nighttime Lights Choropleth Map */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-3">Nighttime Lights Map (Top 20)</h3>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-purple-900"></div>
                    <span>Bright (High Urbanization)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded bg-yellow-200"></div>
                    <span>Dim (Rural)</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {getBrightestDistricts(20).map((d) => {
                    const intensity = (d.meanNTLRadiance / 49.12) * 100; // Max is Kathmandu
                    const popData = nasaPopulationData.find(p => p.district === d.district);
                    const infraData = infrastructureData.find(i => i.district === d.district);
                    const isKathmanduValley = ['Kathmandu', 'Lalitpur', 'Bhaktapur'].includes(d.district);
                    
                    // Yellow to orange to purple gradient
                    const getGradientColor = (intensity: number) => {
                      if (intensity > 80) return `hsl(270, ${intensity}%, ${30 + intensity/5}%)`; // Purple
                      if (intensity > 50) return `hsl(30, ${intensity}%, ${40 + intensity/4}%)`; // Orange
                      return `hsl(60, ${80 + intensity/5}%, ${60 + intensity/3}%)`; // Yellow
                    };
                    
                    return (
                      <div 
                        key={d.district}
                        className={`p-3 rounded-lg cursor-pointer hover:shadow-lg transition-all border ${isKathmanduValley ? 'border-red-500' : 'border-border'}`}
                        style={{ 
                          background: `linear-gradient(90deg, ${getGradientColor(intensity)} ${intensity}%, transparent ${intensity}%)`
                        }}
                        onClick={() => setSelectedNTLDistrict(d.district)}
                        onMouseEnter={() => setHoveredDistrict(d.district)}
                        onMouseLeave={() => setHoveredDistrict(null)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-white drop-shadow-md">{d.district}</span>
                          <span className="text-sm font-bold text-white drop-shadow-md">
                            {d.meanNTLRadiance.toFixed(2)}
                          </span>
                        </div>
                        {hoveredDistrict === d.district && (
                          <div className="mt-2 text-xs text-white space-y-1 bg-black/40 p-2 rounded">
                            <div>👥 Population: <span className="font-semibold">{popData?.population.toLocaleString()}</span></div>
                            <div>📊 Density: <span className="font-semibold">{popData?.densityPerSqKm.toFixed(1)}/km²</span></div>
                            <div>⚡ Electricity: <span className="font-semibold">{infraData?.electricityAccess}%</span></div>
                            <div>🌐 Internet: <span className="font-semibold">{infraData?.internetPenetration}%</span></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top 10 Brightest Districts Bar Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Top 10 Brightest Districts</h3>
                <div className="h-96">
                  <Bar 
                    data={{
                      labels: getBrightestDistricts(10).map(d => d.district),
                      datasets: [{
                        label: 'Mean NTL Radiance',
                        data: getBrightestDistricts(10).map(d => d.meanNTLRadiance),
                        backgroundColor: getBrightestDistricts(10).map((d, idx) => 
                          ['Kathmandu', 'Lalitpur', 'Bhaktapur'].includes(d.district)
                            ? 'hsl(340, 100%, 60% / 0.9)' // Red for Kathmandu Valley
                            : `hsl(${45 - idx * 5}, 100%, ${70 - idx * 3}% / 0.8)` // Gold gradient
                        ),
                        borderColor: getBrightestDistricts(10).map((d) => 
                          ['Kathmandu', 'Lalitpur', 'Bhaktapur'].includes(d.district)
                            ? 'hsl(340, 100%, 60%)'
                            : 'hsl(45, 100%, 50%)'
                        ),
                        borderWidth: 2,
                      }]
                    }}
                    options={{
                      ...chartOptions,
                      scales: {
                        x: {
                          ticks: { 
                            color: '#ffffff',
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                          },
                          grid: { color: 'hsl(var(--border) / 0.2)' }
                        },
                        y: {
                          title: { display: true, text: 'Mean NTL Radiance', color: '#ffffff' },
                          ticks: { color: '#ffffff' },
                          grid: { color: 'hsl(var(--border) / 0.2)' }
                        }
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  🔴 Red bars = Kathmandu Valley (outliers with extremely high urbanization)
                </p>
              </div>
            </div>

            {/* Population vs NTL Scatter Plot */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Population vs Nighttime Lights Correlation</h3>
              <div className="h-96">
                <Scatter 
                  data={{
                    datasets: [
                      {
                        label: 'Kathmandu Valley',
                        data: nightlightsData
                          .filter(d => ['Kathmandu', 'Lalitpur', 'Bhaktapur'].includes(d.district))
                          .map(ntl => {
                            const popData = nasaPopulationData.find(p => p.district === ntl.district);
                            const infraData = infrastructureData.find(i => i.district === ntl.district);
                            return {
                              x: popData?.population || 0,
                              y: ntl.meanNTLRadiance,
                              district: ntl.district,
                              roadDensity: infraData?.roadDensity || 0
                            };
                          }),
                        backgroundColor: 'hsl(340, 100%, 60% / 0.8)',
                        borderColor: 'hsl(340, 100%, 60%)',
                        borderWidth: 2,
                        pointRadius: 10,
                        pointHoverRadius: 14,
                      },
                      {
                        label: 'Other Districts',
                        data: nightlightsData
                          .filter(d => !['Kathmandu', 'Lalitpur', 'Bhaktapur'].includes(d.district))
                          .map(ntl => {
                            const popData = nasaPopulationData.find(p => p.district === ntl.district);
                            const infraData = infrastructureData.find(i => i.district === ntl.district);
                            return {
                              x: popData?.population || 0,
                              y: ntl.meanNTLRadiance,
                              district: ntl.district,
                              roadDensity: infraData?.roadDensity || 0
                            };
                          }),
                        backgroundColor: 'hsl(45, 100%, 60% / 0.6)',
                        borderColor: 'hsl(45, 100%, 60%)',
                        borderWidth: 1,
                        pointRadius: (context: any) => {
                          const point = context.raw;
                          return 3 + (point.roadDensity * 1.5);
                        },
                        pointHoverRadius: (context: any) => {
                          const point = context.raw;
                          return 5 + (point.roadDensity * 1.5);
                        },
                      }
                    ]
                  }}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      tooltip: {
                        ...chartOptions.plugins.tooltip,
                        callbacks: {
                          label: (context: any) => {
                            const point = context.raw;
                            return `${point.district}: Pop=${point.x.toLocaleString()}, NTL=${point.y.toFixed(2)}, Roads=${point.roadDensity.toFixed(2)}km/km²`;
                          }
                        }
                      }
                    },
                    scales: {
                      x: { 
                        title: { display: true, text: 'Population', color: '#ffffff' },
                        ticks: { 
                          color: '#ffffff',
                          callback: (value: any) => (value / 1000).toFixed(0) + 'K'
                        },
                        grid: { color: 'hsl(var(--border) / 0.2)' }
                      },
                      y: { 
                        title: { display: true, text: 'Mean NTL Radiance', color: '#ffffff' },
                        ticks: { color: '#ffffff' },
                        grid: { color: 'hsl(var(--border) / 0.2)' }
                      }
                    }
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Point size represents road density. Larger points = denser road networks.
              </p>
            </div>

            {/* Dimmest Districts for Comparison */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Bottom 10 Dimmest Districts (Rural Areas)</h3>
              <div className="h-80">
                <Bar 
                  data={{
                    labels: getDimmestDistricts(10).map(d => d.district),
                    datasets: [{
                      label: 'Mean NTL Radiance',
                      data: getDimmestDistricts(10).map(d => d.meanNTLRadiance),
                      backgroundColor: 'hsl(142, 76%, 50% / 0.8)',
                      borderColor: 'hsl(142, 76%, 50%)',
                      borderWidth: 2,
                    }]
                  }}
                  options={chartOptions}
                />
              </div>
            </div>
          </Card>

          {/* Insights & Significance */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Nighttime Lights Insights & Urbanization Analysis
            </h2>

            <div className="space-y-6">
              {/* Major Takeaways */}
              <div className="p-4 bg-card rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Key Observations
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Brightest Urban Centers:</p>
                    <p className="text-muted-foreground">
                      Kathmandu (49.12), Lalitpur (43.99), and Bhaktapur (45.84) show the highest NTL radiance—directly matching their extreme population density (4,000+ ppl/km²). Kaski (36.17), Chitwan (32.15), and Jhapa (31.97) follow as major secondary urban hubs.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-1">Darkest Rural Regions:</p>
                    <p className="text-muted-foreground">
                      Mugu (1.63), Okhaldhunga (1.81), Tanahun (1.48), and Sindhupalchok (1.65) remain extremely dim, reflecting low electrification, scattered settlements, and minimal economic activity. These districts face severe infrastructure deficits.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connection Analysis */}
              <div className="p-4 bg-card rounded-lg border border-accent/20">
                <h3 className="font-semibold text-accent mb-3">Cross-Dataset Connections</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <p className="font-medium mb-1 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Population ↔ NTL
                    </p>
                    <p className="text-muted-foreground text-xs">
                      High-population hubs (Kathmandu, Jhapa, Chitwan) glow brightly at night, confirming that light intensity mirrors population density. The correlation coefficient between population and NTL is strongly positive (~0.78).
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg">
                    <p className="font-medium mb-1">⚡ Electricity ↔ NTL</p>
                    <p className="text-muted-foreground text-xs">
                      Districts with higher electrification (Kathmandu 96%, Morang 90%, Jhapa 91%) show stronger radiance. Remote areas (Dolpa 54%, Humla 65%) remain dim despite moderate NTL from scattered lights, indicating partial grid coverage.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <p className="font-medium mb-1 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Digital Divide ↔ NTL
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Strong internet coverage and high NTL go hand-in-hand. Kathmandu Valley (86%, 78%, 83% internet) vs rural hills (Achham 6%, Kalikot 7%) shows the stark urban-rural digital divide.
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <p className="font-medium mb-1 flex items-center gap-2">
                      <CloudRain className="h-4 w-4" />
                      Climate Risk ↔ NTL
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Bright urban centers in Terai (Morang, Sunsari, Rupandehi) are also flood-prone with high precipitation anomalies, while dim mountain regions face climate stress with weak infrastructure to adapt.
                    </p>
                  </div>
                </div>
              </div>

              {/* NASA Challenge Q&A */}
              <div className="p-4 bg-card rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Answering the NASA Challenge
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-foreground mb-1">Where is urbanization strongest?</p>
                    <p className="text-muted-foreground">
                      Kathmandu Valley dominates with 49.12, 43.99, and 45.84 NTL radiance. Kaski (Pokhara, 36.17), Jhapa (31.97), Chitwan (32.15), and Rupandehi (30.93) emerge as secondary urban growth centers with both high population and strong nighttime lights, indicating robust economic activity and infrastructure development.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Which regions lag despite population growth?</p>
                    <p className="text-muted-foreground">
                      Districts like Sarlahi (8.35), Siraha (9.57), and Rautahat (5.26) have moderate to high population but surprisingly low light intensity, suggesting weaker infrastructure, limited electricity access, and underdevelopment despite demographic pressures. These areas represent critical investment gaps.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">How can this guide urban planning?</p>
                    <p className="text-muted-foreground">
                      Use NTL data combined with our infrastructure dataset to:
                      • Target electricity grid expansion in dim but populated districts (Sarlahi, Bara, Mahottari)
                      • Direct road and internet infrastructure to growing urban areas showing increasing NTL
                      • Identify emerging economic centers (Banke 23.7, Dhanusa 21.48) for preemptive infrastructure investment
                      • Monitor rural-urban migration patterns through NTL trends over time
                    </p>
                  </div>
                </div>
              </div>

              {/* District-Specific NTL Insights */}
              {selectedNTLDistrict && (() => {
                const ntlData = nightlightsData.find(d => d.district === selectedNTLDistrict);
                const popData = nasaPopulationData.find(d => d.district === selectedNTLDistrict);
                const infraData = infrastructureData.find(d => d.district === selectedNTLDistrict);
                const tempData = temperatureData.find(t => t.district === selectedNTLDistrict);
                const vegData = nasaVegetationData.find(v => v.district === selectedNTLDistrict);

                if (!ntlData || !popData) return null;

                const suggestions = [];
                const isHighNTL = ntlData.meanNTLRadiance > nationalAvgNTL;
                const isLowNTL = ntlData.meanNTLRadiance < 5;
                const isHighDensity = popData.densityPerSqKm > 1000;
                const lowElectricity = (infraData?.electricityAccess || 100) < 60;

                if (isHighNTL && isHighDensity) {
                  suggestions.push("✅ Strong urbanization: High NTL + high density indicates robust economic activity. Focus on sustainable growth, green infrastructure, and UHI mitigation.");
                }

                if (isLowNTL && isHighDensity) {
                  suggestions.push("⚠️ Infrastructure gap detected: High population but low lights suggests insufficient electrification. Prioritize grid expansion and renewable energy solutions.");
                }

                if (isLowNTL && lowElectricity) {
                  suggestions.push("🚨 Critical development deficit: Dim lights + low electricity access. Urgent need for power infrastructure, solar programs, and connectivity improvements.");
                }

                if (ntlData.meanNTLRadiance > 30 && (infraData?.roadDensity || 0) < 2) {
                  suggestions.push("Traffic pressure: High urbanization but low road density. Expand transportation networks and public transit to manage growing urban mobility demands.");
                }

                if (isHighNTL && (vegData?.ndvi || 1) < 0.4) {
                  suggestions.push("Urban heat risk: Bright lights + low vegetation creates heat island effects. Implement urban forestry and green corridor programs.");
                }

                if (!isHighNTL && !isLowNTL) {
                  suggestions.push("Moderate urbanization: Balanced development. Continue infrastructure investments while preserving environmental sustainability.");
                }

                return (
                  <div className="p-4 bg-card rounded-lg border border-accent/20">
                    <h3 className="font-semibold text-accent mb-3 flex items-center gap-2">
                      <Satellite className="h-4 w-4" />
                      District Analysis: {selectedNTLDistrict}
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">NTL Radiance</p>
                            <p className="font-bold text-2xl text-yellow-400">{ntlData.meanNTLRadiance.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">Nat Avg: {nationalAvgNTL.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Population</p>
                            <p className="font-bold text-lg">{popData.population.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{popData.densityPerSqKm.toFixed(1)}/km²</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Electricity</p>
                            <p className="font-bold text-lg">{infraData?.electricityAccess || 'N/A'}%</p>
                            <p className="text-xs text-muted-foreground">Internet: {infraData?.internetPenetration || 0}%</p>
                          </div>
                        </div>
                      </div>

                      {infraData && (
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="p-2 bg-card rounded border border-border">
                            <p className="text-muted-foreground">Roads</p>
                            <p className="font-bold">{infraData.roadDensity.toFixed(2)} km/km²</p>
                          </div>
                          <div className="p-2 bg-card rounded border border-border">
                            <p className="text-muted-foreground">Hospitals</p>
                            <p className="font-bold">{infraData.hospitals}</p>
                          </div>
                          <div className="p-2 bg-card rounded border border-border">
                            <p className="text-muted-foreground">Schools</p>
                            <p className="font-bold">{infraData.schools}</p>
                          </div>
                          <div className="p-2 bg-card rounded border border-border">
                            <p className="text-muted-foreground">Water</p>
                            <p className="font-bold">{infraData.waterSupply}%</p>
                          </div>
                        </div>
                      )}

                      {(tempData || vegData) && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <p className="font-medium mb-1 text-sm">Environmental Context:</p>
                          <p className="text-muted-foreground text-xs">
                            {tempData && <>UHI Index: <span className="font-semibold">{tempData.uhiIndex}</span> • </>}
                            {vegData && <>NDVI: <span className="font-semibold">{vegData.ndvi.toFixed(3)}</span> • </>}
                            {tempData && <>Temp: <span className="font-semibold">{tempData.temp.toFixed(1)}°C</span></>}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="font-semibold mb-2 text-sm">NTL-Based Policy Recommendations:</h4>
                        <div className="space-y-2 text-sm">
                          {suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <p className="text-muted-foreground">{suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Summary:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• NTL radiance serves as a powerful proxy for urbanization, economic activity, and infrastructure quality.</p>
                  <p>• Strong correlation exists between NTL, population density, and electricity access across Nepal.</p>
                  <p>• Kathmandu Valley shows 30x brighter lights than rural mountain districts, highlighting extreme urban-rural divide.</p>
                  <p>• Several Terai districts (Sarlahi, Rautahat, Bara) show infrastructure gaps despite growing populations.</p>
                  <p>• Combining NTL with climate data reveals vulnerability: bright flood-prone cities vs dim climate-stressed rural areas.</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* LAND COVER & COMMUNITY PLANNING PANEL */}
        <TabsContent value="landcover" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Trees className="h-6 w-6 text-primary" />
                Land Cover, Urbanization & Community Planning
              </h2>
              <Button 
                onClick={() => {
                  const headers = "District,Forest_%,Cropland_%,Grassland_%,Urban_%,Water_%,Barren_%\n";
                  const rows = landCoverData.map(d => 
                    `${d.district},${d.forestPct},${d.croplandPct},${d.grasslandPct},${d.urbanPct},${d.waterPct},${d.barrenPct}`
                  ).join("\n");
                  const csv = headers + rows;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'land_cover_data.csv';
                  a.click();
                }}
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Choropleth Map & Controls */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Select Land Cover Type</Label>
                  <Select value={landCoverMetric} onValueChange={(v: any) => setLandCoverMetric(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forest">Forest %</SelectItem>
                      <SelectItem value="cropland">Cropland %</SelectItem>
                      <SelectItem value="grassland">Grassland %</SelectItem>
                      <SelectItem value="urban">Urban %</SelectItem>
                      <SelectItem value="water">Water %</SelectItem>
                      <SelectItem value="barren">Barren %</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border border-border rounded-lg p-4 bg-card">
                  <h3 className="text-lg font-semibold mb-3">District Land Cover Map</h3>
                  <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {landCoverData.map(d => {
                      const getValue = () => {
                        switch(landCoverMetric) {
                          case 'forest': return d.forestPct;
                          case 'cropland': return d.croplandPct;
                          case 'grassland': return d.grasslandPct;
                          case 'urban': return d.urbanPct;
                          case 'water': return d.waterPct;
                          case 'barren': return d.barrenPct;
                        }
                      };
                      const value = getValue();
                      const getColor = () => {
                        const intensity = value / 70;
                        if (landCoverMetric === 'forest') return `hsl(142, ${70 + intensity * 30}%, ${40 - intensity * 20}%)`;
                        if (landCoverMetric === 'urban') return `hsl(280, ${60 + intensity * 40}%, ${50 - intensity * 30}%)`;
                        if (landCoverMetric === 'cropland') return `hsl(45, ${80 + intensity * 20}%, ${60 - intensity * 30}%)`;
                        if (landCoverMetric === 'barren') return `hsl(20, ${50 + intensity * 50}%, ${70 - intensity * 40}%)`;
                        if (landCoverMetric === 'water') return `hsl(207, ${70 + intensity * 30}%, ${60 - intensity * 30}%)`;
                        return `hsl(120, ${50 + intensity * 50}%, ${50 - intensity * 25}%)`;
                      };

                      return (
                        <div
                          key={d.district}
                          className="p-2 rounded border cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                          style={{ 
                            backgroundColor: getColor(),
                            borderColor: selectedLandCoverDistrict === d.district ? '#fff' : 'transparent',
                            borderWidth: selectedLandCoverDistrict === d.district ? '2px' : '1px'
                          }}
                          onMouseEnter={() => setSelectedLandCoverDistrict(d.district)}
                          onClick={() => setSelectedLandCoverDistrict(d.district)}
                        >
                          <p className="text-xs font-semibold text-white drop-shadow-md">{d.district}</p>
                          <p className="text-lg font-bold text-white drop-shadow-md">{value.toFixed(1)}%</p>
                          {selectedLandCoverDistrict === d.district && (
                            <div className="mt-2 pt-2 border-t border-white/30 text-xs text-white">
                              <p>Forest: {d.forestPct.toFixed(1)}%</p>
                              <p>Cropland: {d.croplandPct.toFixed(1)}%</p>
                              <p>Grassland: {d.grasslandPct.toFixed(1)}%</p>
                              <p>Urban: {d.urbanPct.toFixed(1)}%</p>
                              <p>Water: {d.waterPct.toFixed(1)}%</p>
                              <p>Barren: {d.barrenPct.toFixed(1)}%</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Charts & Insights */}
              <div className="space-y-6">
                {/* Stacked Bar Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Land Cover Breakdown (Top 10 by {landCoverMetric})</h3>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: (() => {
                          const sorted = [...landCoverData].sort((a, b) => {
                            const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                         landCoverMetric === 'urban' ? a.urbanPct :
                                         landCoverMetric === 'cropland' ? a.croplandPct :
                                         landCoverMetric === 'barren' ? a.barrenPct :
                                         landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                            const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                         landCoverMetric === 'urban' ? b.urbanPct :
                                         landCoverMetric === 'cropland' ? b.croplandPct :
                                         landCoverMetric === 'barren' ? b.barrenPct :
                                         landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                            return bVal - aVal;
                          });
                          return sorted.slice(0, 10).map(d => d.district);
                        })(),
                        datasets: [
                          {
                            label: 'Forest',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.forestPct);
                            })(),
                            backgroundColor: 'hsl(142, 76%, 36% / 0.8)',
                            borderColor: 'hsl(142, 76%, 36%)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Cropland',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.croplandPct);
                            })(),
                            backgroundColor: 'hsl(45, 90%, 50% / 0.8)',
                            borderColor: 'hsl(45, 90%, 50%)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Grassland',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.grasslandPct);
                            })(),
                            backgroundColor: 'hsl(120, 60%, 60% / 0.8)',
                            borderColor: 'hsl(120, 60%, 60%)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Urban',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.urbanPct);
                            })(),
                            backgroundColor: 'hsl(280, 80%, 40% / 0.8)',
                            borderColor: 'hsl(280, 80%, 40%)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Water',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.waterPct);
                            })(),
                            backgroundColor: 'hsl(207, 90%, 54% / 0.8)',
                            borderColor: 'hsl(207, 90%, 54%)',
                            borderWidth: 1,
                          },
                          {
                            label: 'Barren',
                            data: (() => {
                              const sorted = [...landCoverData].sort((a, b) => {
                                const aVal = landCoverMetric === 'forest' ? a.forestPct :
                                             landCoverMetric === 'urban' ? a.urbanPct :
                                             landCoverMetric === 'cropland' ? a.croplandPct :
                                             landCoverMetric === 'barren' ? a.barrenPct :
                                             landCoverMetric === 'water' ? a.waterPct : a.grasslandPct;
                                const bVal = landCoverMetric === 'forest' ? b.forestPct :
                                             landCoverMetric === 'urban' ? b.urbanPct :
                                             landCoverMetric === 'cropland' ? b.croplandPct :
                                             landCoverMetric === 'barren' ? b.barrenPct :
                                             landCoverMetric === 'water' ? b.waterPct : b.grasslandPct;
                                return bVal - aVal;
                              });
                              return sorted.slice(0, 10).map(d => d.barrenPct);
                            })(),
                            backgroundColor: 'hsl(25, 80%, 50% / 0.8)',
                            borderColor: 'hsl(25, 80%, 50%)',
                            borderWidth: 1,
                          },
                        ]
                      }}
                      options={{
                        ...chartOptions,
                        scales: {
                          x: {
                            stacked: true,
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: {
                            stacked: true,
                            title: { display: true, text: 'Land Cover %', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Comparative Insights */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 bg-green-500/10 border-green-500/20">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Top 3 Forest Districts</h4>
                    <div className="space-y-1 text-xs text-white">
                      {getTopForestDistricts(3).map(d => (
                        <p key={d.district}>{d.district}: {d.forestPct.toFixed(1)}%</p>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-3 bg-purple-500/10 border-purple-500/20">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Top 3 Urbanized</h4>
                    <div className="space-y-1 text-xs text-white">
                      {getTopUrbanDistricts(3).map(d => (
                        <p key={d.district}>{d.district}: {d.urbanPct.toFixed(1)}%</p>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-3 bg-yellow-500/10 border-yellow-500/20">
                    <h4 className="text-sm font-semibold text-yellow-400 mb-2">Top 3 Cropland</h4>
                    <div className="space-y-1 text-xs text-white">
                      {getTopCroplandDistricts(3).map(d => (
                        <p key={d.district}>{d.district}: {d.croplandPct.toFixed(1)}%</p>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-3 bg-orange-500/10 border-orange-500/20">
                    <h4 className="text-sm font-semibold text-orange-400 mb-2">Top 3 Barren</h4>
                    <div className="space-y-1 text-xs text-white">
                      {getTopBarrenDistricts(3).map(d => (
                        <p key={d.district}>{d.district}: {d.barrenPct.toFixed(1)}%</p>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </Card>

          {/* Policy & Planning Questions */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Policy & Planning Questions This Dashboard Helps Answer
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Food Security
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Where should more land be used for agriculture? → Cropland % shows Terai districts as food hubs (Kapilvastu 57.3%, Sunsari 53.1%, Saptari 54.8%), while low-cropland hill districts may need agri expansion or imports.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-accent/20">
                <h3 className="font-semibold text-accent mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Housing & Urban Growth
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Which communities need better housing or transport? → High urban % in Kathmandu Valley (Bhaktapur 37.1%, Lalitpur 34.2%, Kathmandu 32.8%) indicates housing/transport strain.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Healthcare Access
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Where to set up new health facilities? → Remote barren districts (Dolpa 55.8%, Mugu 63.9%, Humla 61.1%) show low vegetation & infrastructure → high vulnerability.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                  <Trees className="h-4 w-4" />
                  Parks & Green Spaces
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Which communities need more local parks? → Highly urbanized districts (Kathmandu, Bhaktapur, Lalitpur) have &lt;35% forest, suggesting demand for green zones.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-red-500/20">
                <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Environmental Stress
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Which areas face pollution or habitat loss? → Forest decline + high barren land in mountain districts (Humla, Dolpa, Mustang, Manang) points to ecological fragility.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-orange-500/20">
                <h3 className="font-semibold text-orange-500 mb-2 flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Climate & Public Health
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Where are people at risk from extreme heat or cold? → Barren high-altitude areas (Humla, Dolpa) face winter extremes; Terai cropland zones face summer heat waves.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold text-yellow-500 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Energy & Infrastructure
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Where is access to energy limited? → Remote high-barren, low-urban districts suggest poor electrification and infrastructure.
                </p>
              </div>
            </div>
          </Card>

          {/* Main Takeaways */}
          <Card className="card-space p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              Main Takeaways
            </h2>

            <div className="space-y-3">
              <div className="p-4 bg-card rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold text-yellow-500 mb-2">🌾 Terai = Breadbasket</h3>
                <p className="text-sm text-muted-foreground">
                  Kapilvastu (57.3%), Sunsari (53.1%), Saptari (54.8%) dominate cropland → major agricultural hubs powering Nepal's food security.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-purple-500/20">
                <h3 className="font-semibold text-purple-500 mb-2">🏙️ Kathmandu Valley = Urban Pressure</h3>
                <p className="text-sm text-muted-foreground">
                  1/3+ land urbanized (Bhaktapur 37.1%, Lalitpur 34.2%, Kathmandu 32.8%) → urgent housing, green space, and transport planning needed.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-orange-500/20">
                <h3 className="font-semibold text-orange-500 mb-2">⛰️ Himalayan Districts = Fragile Ecosystems</h3>
                <p className="text-sm text-muted-foreground">
                  Humla (61.1%), Mugu (63.9%), Dolpa (55.8%) have &gt;55% barren → climate vulnerability and habitat stress requiring urgent conservation.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2">🌲 Balanced Mid-Hills</h3>
                <p className="text-sm text-muted-foreground">
                  Districts like Chitwan, Lamjung, Gorkha mix forest + cropland + grassland → ideal for sustainable development models combining conservation with agriculture.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* URBAN GROWTH & HOUSING PRESSURE PANEL */}
        <TabsContent value="urbangrowth" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Urban Growth & Housing Pressure
              </h2>
              <Button 
                onClick={() => {
                  const headers = "District,Urban_Extent_%\n";
                  const rows = urbanGrowthData.map(d => `${d.district},${d.urbanExtentPct}`).join("\n");
                  const csv = headers + rows;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'urban_growth_data.csv';
                  a.click();
                }}
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Choropleth Map */}
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card">
                  <h3 className="text-lg font-semibold mb-3">Urban Extent by District</h3>
                  <p className="text-xs text-muted-foreground mb-3">Darker colors = highly urbanized</p>
                  <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {urbanGrowthData.map(d => {
                      const intensity = d.urbanExtentPct / 40;
                      const color = `hsl(280, ${60 + intensity * 40}%, ${60 - intensity * 40}%)`;
                      
                      return (
                        <div
                          key={d.district}
                          className="p-3 rounded border cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                          style={{ 
                            backgroundColor: color,
                            borderColor: selectedUrbanDistrict === d.district ? '#fff' : 'transparent',
                            borderWidth: selectedUrbanDistrict === d.district ? '2px' : '1px'
                          }}
                          onMouseEnter={() => setSelectedUrbanDistrict(d.district)}
                          onClick={() => setSelectedUrbanDistrict(d.district)}
                        >
                          <p className="text-xs font-semibold text-white drop-shadow-md">{d.district}</p>
                          <p className="text-xl font-bold text-white drop-shadow-md">{d.urbanExtentPct.toFixed(1)}%</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Charts */}
              <div className="space-y-6">
                {/* Top 10 Urban Districts */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top 10 Urban Districts</h3>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: getTopUrbanGrowthDistricts(10).map(d => d.district),
                        datasets: [{
                          label: 'Urban Extent %',
                          data: getTopUrbanGrowthDistricts(10).map(d => d.urbanExtentPct),
                          backgroundColor: 'hsl(280, 80%, 50% / 0.8)',
                          borderColor: 'hsl(280, 80%, 50%)',
                          borderWidth: 2,
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            title: { display: true, text: 'Urban Extent %', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 bg-purple-500/10 border-purple-500/20">
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">Kathmandu Valley</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Bhaktapur: 38.2%</p>
                      <p>Kathmandu: 32.9%</p>
                      <p>Lalitpur: 31.9%</p>
                    </div>
                  </Card>

                  <Card className="p-3 bg-blue-500/10 border-blue-500/20">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Terai Urban Belt</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Dhanusa: 24.6%</p>
                      <p>Saptari: 23.9%</p>
                      <p>Rautahat: 22.2%</p>
                    </div>
                  </Card>
                </div>

                {/* Scatter: Urban Extent vs Population Density */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Urban Extent vs Population Density</h3>
                  <div className="h-64">
                    <Scatter
                      data={{
                        datasets: [{
                          label: 'Districts',
                          data: urbanGrowthData.map(urban => {
                            const popData = nasaPopulationData.find(p => p.district === urban.district);
                            return {
                              x: urban.urbanExtentPct,
                              y: popData?.densityPerSqKm || 0,
                              district: urban.district
                            };
                          }),
                          backgroundColor: 'hsl(280, 80%, 50% / 0.6)',
                          borderColor: 'hsl(280, 80%, 50%)',
                          borderWidth: 1,
                          pointRadius: 5,
                          pointHoverRadius: 8,
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          tooltip: {
                            ...chartOptions.plugins.tooltip,
                            callbacks: {
                              label: (context: any) => {
                                const point = context.raw;
                                return `${point.district}: Urban=${point.x.toFixed(1)}%, Density=${point.y.toFixed(1)}/km²`;
                              }
                            }
                          }
                        },
                        scales: {
                          x: {
                            title: { display: true, text: 'Urban Extent %', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: {
                            title: { display: true, text: 'Population Density (/km²)', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Policy & Planning Questions */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Policy & Planning Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Where is housing pressure greatest?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Kathmandu Valley (Bhaktapur 38.2%, Kathmandu 32.9%, Lalitpur 31.9%) faces extreme housing demand. Dense Terai districts (Dhanusa 24.6%, Saptari 23.9%, Rautahat 22.2%) show rapid urban expansion requiring planned development.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-accent/20">
                <h3 className="font-semibold text-accent mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Which communities need new transport infrastructure?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Districts exceeding 20% urbanization (Jhapa 21.6%, Morang 21.2%, Kaski 17.3%, Rupandehi 18.2%, Dang 17.2%) require enhanced public transit, road networks, and traffic management systems.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                  <Trees className="h-4 w-4" />
                  Where are parks/green spaces needed?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Highly urbanized districts with low forest cover (Kathmandu, Bhaktapur, Lalitpur, Dhanusa) urgently need urban parks, green corridors, and recreational spaces for public health and climate resilience.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Which areas are growing fastest?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Terai urban belt (Saptari, Dhanusa, Rautahat, Jhapa, Morang) shows rapid expansion, signaling migration from rural areas and cross-border economic activity. These zones need proactive urban planning.
                </p>
              </div>
            </div>
          </Card>

          {/* Takeaways */}
          <Card className="card-space p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              Main Takeaways
            </h2>

            <div className="space-y-3">
              <div className="p-4 bg-card rounded-lg border border-purple-500/20">
                <h3 className="font-semibold text-purple-500 mb-2">🏙️ Kathmandu Valley = Urban Core</h3>
                <p className="text-sm text-muted-foreground">
                  Bhaktapur (38.2%), Kathmandu (32.9%), Lalitpur (31.9%) → extreme housing density, traffic congestion, and infrastructure strain requiring immediate attention.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-500 mb-2">📈 Terai = Rising Urban Belt</h3>
                <p className="text-sm text-muted-foreground">
                  Saptari (23.9%), Dhanusa (24.6%), Rautahat (22.2%) → fast-growing towns driven by agriculture-to-industry transition, needing planned housing and services.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-gray-400/20">
                <h3 className="font-semibold text-gray-400 mb-2">⛰️ Remote Districts = Low Urbanization</h3>
                <p className="text-sm text-muted-foreground">
                  Humla (1.3%), Mugu (0.9%), Mustang (0.6%) → &lt;2% urban extent reflecting rural character and infrastructure scarcity, requiring different development strategies.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2">⚖️ Balanced Growth Zones</h3>
                <p className="text-sm text-muted-foreground">
                  Kaski (17.3%), Rupandehi (18.2%), Dang (17.2%) → mid-level urbanization with development potential, offering models for sustainable growth balancing urban and rural needs.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AIR POLLUTION & PUBLIC HEALTH PANEL */}
        <TabsContent value="airpollution" className="space-y-6 mt-6">
          <Card className="card-space p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                Air Pollution & Public Health
              </h2>
              <Button 
                onClick={() => {
                  const headers = "District,PM2.5_µg/m³\n";
                  const rows = airPollutionData.map(d => `${d.district},${d.pm25}`).join("\n");
                  const csv = headers + rows;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'air_pollution_data.csv';
                  a.click();
                }}
                variant="outline" 
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Choropleth Map */}
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-card">
                  <h3 className="text-lg font-semibold mb-3">PM2.5 Levels by District</h3>
                  <p className="text-xs text-muted-foreground mb-3">Darker colors = higher pollution • WHO guideline: 5 µg/m³</p>
                  <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                    {airPollutionData.map(d => {
                      const intensity = Math.min(d.pm25 / 60, 1);
                      const color = `hsl(${40 - intensity * 40}, ${70 + intensity * 30}%, ${60 - intensity * 40}%)`;
                      const isHazardous = d.pm25 > 40;
                      
                      return (
                        <div
                          key={d.district}
                          className="p-3 rounded border cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
                          style={{ 
                            backgroundColor: color,
                            borderColor: selectedPollutionDistrict === d.district ? '#fff' : 'transparent',
                            borderWidth: selectedPollutionDistrict === d.district ? '2px' : '1px'
                          }}
                          onMouseEnter={() => setSelectedPollutionDistrict(d.district)}
                          onClick={() => setSelectedPollutionDistrict(d.district)}
                        >
                          <p className="text-xs font-semibold text-white drop-shadow-md">{d.district}</p>
                          <p className="text-xl font-bold text-white drop-shadow-md">{d.pm25.toFixed(1)}</p>
                          {isHazardous && <p className="text-xs text-red-200 mt-1">⚠️ High risk</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Charts */}
              <div className="space-y-6">
                {/* Top 10 Polluted Districts */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Top 10 Polluted Districts (PM2.5 µg/m³)</h3>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: getMostPollutedDistricts(10).map(d => d.district),
                        datasets: [{
                          label: 'PM2.5 (µg/m³)',
                          data: getMostPollutedDistricts(10).map(d => d.pm25),
                          backgroundColor: getMostPollutedDistricts(10).map(d => 
                            d.pm25 > 50 ? 'hsl(350, 85%, 65% / 0.85)' : 'hsl(25, 95%, 60% / 0.85)'
                          ),
                          borderColor: getMostPollutedDistricts(10).map(d => 
                            d.pm25 > 50 ? 'hsl(350, 85%, 65%)' : 'hsl(25, 95%, 60%)'
                          ),
                          borderWidth: 2,
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        indexAxis: 'y',
                        scales: {
                          x: {
                            title: { display: true, text: 'PM2.5 (µg/m³)', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: {
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-3 bg-red-500/10 border-red-500/20">
                    <h4 className="text-sm font-semibold text-red-400 mb-2">Kathmandu Valley</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Kathmandu: 57.2 µg/m³</p>
                      <p>Bhaktapur: 56.9 µg/m³</p>
                      <p>Lalitpur: 45.9 µg/m³</p>
                    </div>
                  </Card>

                  <Card className="p-3 bg-orange-500/10 border-orange-500/20">
                    <h4 className="text-sm font-semibold text-orange-400 mb-2">Terai Industrial Belt</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Morang: 54.4 µg/m³</p>
                      <p>Sunsari: 51.7 µg/m³</p>
                      <p>Rupandehi: 54.4 µg/m³</p>
                    </div>
                  </Card>

                  <Card className="p-3 bg-green-500/10 border-green-500/20">
                    <h4 className="text-sm font-semibold text-green-400 mb-2">Cleanest Air</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Humla: 5.8 µg/m³</p>
                      <p>Manang: 6.2 µg/m³</p>
                      <p>Dolpa: 7.8 µg/m³</p>
                    </div>
                  </Card>

                  <Card className="p-3 bg-blue-500/10 border-blue-500/20">
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">National Average</h4>
                    <div className="space-y-1 text-xs text-white">
                      <p>Avg PM2.5: {nationalAvgPM25.toFixed(1)} µg/m³</p>
                      <p className="text-red-300">5.7x WHO guideline</p>
                    </div>
                  </Card>
                </div>

                {/* Scatter: PM2.5 vs Urban Extent */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Pollution vs Urbanization</h3>
                  <div className="h-64">
                    <Scatter
                      data={{
                        datasets: [{
                          label: 'Districts',
                          data: airPollutionData.map(pollution => {
                            const urbanData = urbanGrowthData.find(u => u.district === pollution.district);
                            return {
                              x: urbanData?.urbanExtentPct || 0,
                              y: pollution.pm25,
                              district: pollution.district
                            };
                          }),
                          backgroundColor: airPollutionData.map(d => 
                            d.pm25 > 50 ? 'hsl(350, 85%, 65% / 0.7)' : 
                            d.pm25 > 40 ? 'hsl(25, 95%, 60% / 0.7)' : 
                            'hsl(142, 76%, 50% / 0.7)'
                          ),
                          borderColor: 'hsl(350, 85%, 65%)',
                          borderWidth: 1,
                          pointRadius: 5,
                          pointHoverRadius: 8,
                        }]
                      }}
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          tooltip: {
                            ...chartOptions.plugins.tooltip,
                            callbacks: {
                              label: (context: any) => {
                                const point = context.raw;
                                return `${point.district}: PM2.5=${point.y.toFixed(1)}, Urban=${point.x.toFixed(1)}%`;
                              }
                            }
                          }
                        },
                        scales: {
                          x: {
                            title: { display: true, text: 'Urban Extent %', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          },
                          y: {
                            title: { display: true, text: 'PM2.5 (µg/m³)', color: '#ffffff' },
                            ticks: { color: '#ffffff' },
                            grid: { color: 'hsl(var(--border) / 0.2)' }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Policy & Planning Questions */}
          <Card className="card-space p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              Policy & Planning Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-lg border border-red-500/20">
                <h3 className="font-semibold text-red-500 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Which areas are dealing with polluted air?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Kathmandu Valley (Kathmandu 57.2, Bhaktapur 56.9, Lalitpur 45.9) and Terai industrial corridor (Morang 54.4, Rupandehi 54.4, Sunsari 51.7) face hazardous air quality levels exceeding safe thresholds by 10x.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-orange-500/20">
                <h3 className="font-semibold text-orange-500 mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Where should new healthcare facilities be set up?
                </h3>
                <p className="text-sm text-muted-foreground">
                  High PM2.5 zones (Kathmandu Valley, Rupandehi, Sunsari, Morang, Bara) require specialized respiratory health centers, asthma clinics, and air quality monitoring stations.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-500 mb-2 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  How can waste management & transport planning reduce pollution?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Urban industrial belts need: vehicle emission controls, public transit expansion, waste-to-energy facilities, industrial zone regulations, and green buffer zones between residential and industrial areas.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2 flex items-center gap-2">
                  <Trees className="h-4 w-4" />
                  Which areas remain safe/clean?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Mountain districts (Humla 5.8, Manang 6.2, Dolpa 7.8, Mustang 10.0) maintain pristine air quality near WHO guidelines, offering climate refuges but vulnerable to development pressures.
                </p>
              </div>
            </div>
          </Card>

          {/* Takeaways */}
          <Card className="card-space p-6 bg-gradient-to-br from-accent/10 to-primary/10">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
              Main Takeaways
            </h2>

            <div className="space-y-3">
              <div className="p-4 bg-card rounded-lg border border-red-500/20">
                <h3 className="font-semibold text-red-500 mb-2">🚨 Kathmandu = Pollution Epicenter</h3>
                <p className="text-sm text-muted-foreground">
                  PM2.5 levels (57.2 µg/m³) exceed WHO safe levels by 11x → urgent need for vehicle emission controls, industrial regulations, and public health interventions.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-orange-500/20">
                <h3 className="font-semibold text-orange-500 mb-2">🏭 Terai Industrial Belt = Secondary Hotspot</h3>
                <p className="text-sm text-muted-foreground">
                  Sunsari (51.7), Morang (54.4), Rupandehi (54.4), Kapilvastu (50.5) face pollution from cross-border sources, industrial activity, and agricultural burning → regional cooperation needed.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-green-500/20">
                <h3 className="font-semibold text-green-500 mb-2">⛰️ Mountains = Clean Air Refuge</h3>
                <p className="text-sm text-muted-foreground">
                  Dolpa (7.8), Humla (5.8), Manang (6.2) maintain pristine conditions → valuable climate and health refuges, but vulnerable to tourism and infrastructure development.
                </p>
              </div>

              <div className="p-4 bg-card rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-500 mb-2">💉 Public Health Priority</h3>
                <p className="text-sm text-muted-foreground">
                  Districts exceeding 40 µg/m³ (Kathmandu Valley, Terai belt) need: air quality monitoring networks, respiratory health services, public awareness campaigns, and pollution emergency response systems.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* District Detail Modal */}
      <Dialog open={!!selectedDistrict} onOpenChange={() => setSelectedDistrict(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedDistrict}</DialogTitle>
          </DialogHeader>
          {selectedDistrict && (() => {
            const nasaData = nasaPopulationData.find(d => d.district === selectedDistrict);
            const linkedData = getLinkedData(selectedDistrict);
            const suggestions = generatePolicySuggestions(selectedDistrict);

            return (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">NASA Population</p>
                    <p className="text-2xl font-bold text-primary">{nasaData?.population.toLocaleString()}</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Density</p>
                    <p className="text-2xl font-bold text-accent">{nasaData?.densityPerSqKm.toFixed(1)}/km²</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Literacy Rate</p>
                    <p className="text-2xl font-bold text-primary">{linkedData.literacy}%</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Life Expectancy</p>
                    <p className="text-2xl font-bold text-accent">{linkedData.lifeExpectancy} yrs</p>
                  </Card>
                </div>

                <Card className="p-4 bg-primary/5">
                  <h4 className="font-semibold mb-3">Policy Recommendations</h4>
                  <ul className="space-y-2 text-sm">
                    {suggestions.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-primary">→</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NASAData;
