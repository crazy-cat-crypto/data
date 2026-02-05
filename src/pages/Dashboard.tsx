import { Users, TrendingUp, MapPin, Zap, Activity, Globe } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { nepalTotal } from "@/data/districts";
import { energyConsumption } from "@/data/energy";

export default function Dashboard() {
  const energy2021 = energyConsumption.find(e => e.Year === 2021);
  const energy2031 = energyConsumption.find(e => e.Year === 2031);
  const projectedPopulation2031 = Math.round(nepalTotal.totalPopulation * Math.pow(1 + nepalTotal.growthRate / 100, 10));

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-5xl font-bold glow-text">
          Nepal Data Observatory
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive analysis of Nepal's population demographics and energy consumption patterns
          spanning 77 districts with projections through 2031
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Population"
          value={nepalTotal.totalPopulation.toLocaleString()}
          subtitle="Census 2021 baseline"
          icon={Users}
          trend={`+${nepalTotal.growthRate}% annual growth`}
          color="primary"
        />
        
        <StatCard
          title="Population Density"
          value={`${nepalTotal.populationDensity}/km²`}
          subtitle={`Across ${nepalTotal.areaSqKm.toLocaleString()} km²`}
          icon={MapPin}
          color="accent"
        />
        
        <StatCard
          title="2031 Projection"
          value={projectedPopulation2031.toLocaleString()}
          subtitle="Expected population"
          icon={TrendingUp}
          trend="Based on current growth rate"
          color="primary"
        />

        <StatCard
          title="Energy (2021)"
          value={`${energy2021?.Actual} PJ`}
          subtitle="Actual consumption"
          icon={Zap}
          color="accent"
        />

        <StatCard
          title="Energy (2031)"
          value={`${energy2031?.Expected} PJ`}
          subtitle="Projected consumption"
          icon={Activity}
          trend="Expected growth trajectory"
          color="accent"
        />

        <StatCard
          title="Total Districts"
          value="77"
          subtitle="Comprehensive coverage"
          icon={Globe}
          color="primary"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="card-space p-6 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Population Insights
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Total Households</span>
              <span className="font-semibold">{nepalTotal.households.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Male Population</span>
              <span className="font-semibold">{nepalTotal.male.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Female Population</span>
              <span className="font-semibold">{nepalTotal.female.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Sex Ratio</span>
              <span className="font-semibold">{nepalTotal.sexRatio}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Avg Household Size</span>
              <span className="font-semibold">{nepalTotal.avgHouseholdSize} persons</span>
            </div>
          </div>
        </div>

        <div className="card-space p-6 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-accent" />
            Energy Overview
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">2021 Baseline</span>
              <span className="font-semibold">{energy2021?.Actual} PJ</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">2023 Anomaly</span>
              <span className="font-semibold text-destructive">532 PJ (Collapse)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Expected 2023</span>
              <span className="font-semibold">672 PJ</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Gap Impact</span>
              <span className="font-semibold text-destructive">-140 PJ (-20.8%)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">2031 Projection</span>
              <span className="font-semibold">{energy2031?.Expected} PJ</span>
            </div>
          </div>
        </div>
      </div>

      <Card className="card-space p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 glow-text">Mission</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Leverage data-driven insights to empower Nepal's sustainable development through population, 
              energy, environment, and disaster-risk analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="p-4 bg-card/80 backdrop-blur rounded-lg border border-primary/20">
              <p className="font-semibold mb-2 text-primary">Accessible Data</p>
              <p className="text-sm text-muted-foreground">
                Visual data for 77 districts & 7 provinces
              </p>
            </div>
            <div className="p-4 bg-card/80 backdrop-blur rounded-lg border border-accent/20">
              <p className="font-semibold mb-2 text-accent">Prediction Models</p>
              <p className="text-sm text-muted-foreground">
                Population, GDP, HDI, tourism & energy forecasts
              </p>
            </div>
            <div className="p-4 bg-card/80 backdrop-blur rounded-lg border border-primary/20">
              <p className="font-semibold mb-2 text-primary">Challenge Identification</p>
              <p className="text-sm text-muted-foreground">
                Province & district-specific issues
              </p>
            </div>
            <div className="p-4 bg-card/80 backdrop-blur rounded-lg border border-accent/20">
              <p className="font-semibold mb-2 text-accent">Policy Solutions</p>
              <p className="text-sm text-muted-foreground">
                Targeted recommendations for decision-makers
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="card-space p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Explore the Data</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Navigate through districts, provinces, compare data, analyze trends, and create custom predictions
          using the navigation menu above
        </p>
      </div>
    </div>
  );
}
