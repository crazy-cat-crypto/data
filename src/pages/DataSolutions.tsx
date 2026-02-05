import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Wind, Trees, GraduationCap, Shield, Database, Thermometer, Droplets, Droplet, Zap } from "lucide-react";

const DataSolutions = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          🛠️ Data-Driven Solutions
        </Badge>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Empowering Action Through Data
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Each dataset points toward tangible solutions that leaders and communities can take. This section recommends district-wise interventions to close development gaps and protect the environment.
        </p>
      </div>

      <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-4 max-w-4xl mx-auto mb-6 animate-pulse">
        <p className="text-center font-semibold text-cyan-300">
          📊 NOTE: THE VERIFICATION OF ALL THE EXPECTED OUTCOME IS DONE IN VERIFICATION DASHBOARD UNDER INSIGHTS SO PLEASE CHECK VERIFICATION DASHBOARD
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl">Population & Urban Planning</CardTitle>
                <CardDescription>Balanced development and migration control</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Secondary Urban Centers:</strong> Develop Itahari, Butwal, and Nepalgunj as economic hubs to reduce migration pressure on Kathmandu Valley.
            </p>
            <p className="text-foreground/90">
              Promote rural employment through digital opportunities, agricultural modernization, and local entrepreneurship. Encourage affordable housing programs in dense cities.
            </p>
            <div className="bg-blue-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 30% reduction in Kathmandu migration by 2030</li>
                <li>• 50,000+ affordable housing units in major cities</li>
                <li>• Rural employment rate increase by 25%</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Smart Cities</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Rural Jobs</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Affordable Housing</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-gradient-to-br from-card to-red-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Thermometer className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle className="text-2xl">Temperature & Climate Adaptation</CardTitle>
                <CardDescription>Building resilience to climate change</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Urban Cooling:</strong> Promote reforestation and rooftop greening in hot urban areas to reduce heat island effects.
            </p>
            <p className="text-foreground/90">
              Introduce climate-resilient crops (drought-tolerant maize, millet) and encourage solar and wind energy transition in Terai and hill regions.
            </p>
            <div className="bg-red-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 1.5°C urban temperature reduction by 2035</li>
                <li>• 40% adoption of climate-resilient crops</li>
                <li>• 60% renewable energy usage in Terai</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Urban Cooling</Badge>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Resilient Crops</Badge>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">Renewable Energy</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-gradient-to-br from-card to-cyan-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-cyan-500" />
              <div>
                <CardTitle className="text-2xl">Rainfall & Flood/Drought Management</CardTitle>
                <CardDescription>Smart water resource management</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Flood Control:</strong> Construct sustainable drainage systems in flood-prone Terai areas (Saptari, Siraha, Rautahat).
            </p>
            <p className="text-foreground/90">
              Implement rainwater harvesting systems in dry hill districts. Use NASA rainfall data for flood early warning systems to protect communities.
            </p>
            <div className="bg-cyan-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 70% reduction in flood damage by 2032</li>
                <li>• 5,000+ rainwater harvesting systems installed</li>
                <li>• Early warning system covering 20 districts</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Flood Control</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Rainwater Harvesting</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Early Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trees className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl">Forest Conservation</CardTitle>
                <CardDescription>Community-led reforestation programs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Reforestation Drives:</strong> Strengthen community forest programs in Bara, Parsa, and Nawalpur. Provide carbon incentives for conservation efforts.
            </p>
            <p className="text-foreground/90">
              Launch targeted reforestation drives in degraded districts and protect high biodiversity zones (Ilam, Sankhuwasabha) through local monitoring.
            </p>
            <div className="bg-green-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 10% increase in national forest cover by 2035</li>
                <li>• 100,000+ hectares reforested</li>
                <li>• 50% reduction in landslide incidents</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Reforestation</Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Community Forestry</Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Carbon Incentives</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-card to-purple-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Wind className="h-8 w-8 text-purple-500" />
              <div>
                <CardTitle className="text-2xl">Air Quality Improvement</CardTitle>
                <CardDescription>Clean air initiatives for cities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Clean Transport:</strong> Promote electric vehicles and renewable energy industries in Kathmandu Valley, Rupandehi, and Morang.
            </p>
            <p className="text-foreground/90">
              Restrict open burning, introduce waste recycling zones, and develop green belts in industrial areas to reduce PM2.5 levels.
            </p>
            <div className="bg-purple-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 30% reduction in PM2.5 by 2030</li>
                <li>• 50,000+ electric vehicles on roads</li>
                <li>• 80% reduction in open burning incidents</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Electric Vehicles</Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Green Belts</Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Waste Recycling</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-500/20 bg-gradient-to-br from-card to-teal-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplet className="h-8 w-8 text-teal-500" />
              <div>
                <CardTitle className="text-2xl">Water Access Improvement</CardTitle>
                <CardDescription>Universal clean water access</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Priority Districts:</strong> Focus on clean water supply in Karnali, Jajarkot, and Kalikot regions.
            </p>
            <p className="text-foreground/90">
              Build rural rainwater harvesting and solar filtration plants. Use elevation and rainfall data to plan efficient pipeline systems.
            </p>
            <div className="bg-teal-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 100% access to clean water by 2035</li>
                <li>• 10,000+ solar filtration plants installed</li>
                <li>• 90% reduction in waterborne diseases</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Clean Water</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Solar Filtration</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Pipeline Systems</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 bg-gradient-to-br from-card to-indigo-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-indigo-500" />
              <div>
                <CardTitle className="text-2xl">Education & Connectivity</CardTitle>
                <CardDescription>Bridging the digital divide</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Digital Classrooms:</strong> Build solar-powered digital classrooms in remote districts like Humla and Mugu.
            </p>
            <p className="text-foreground/90">
              Deploy low-cost internet towers to reduce digital gaps. Provide leadership training to teachers and youth for sustainable development.
            </p>
            <div className="bg-indigo-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 95% literacy rate by 2035</li>
                <li>• 5,000+ digital classrooms established</li>
                <li>• 80% internet coverage in rural areas</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Digital Classrooms</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Internet Towers</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Teacher Training</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-card to-yellow-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle className="text-2xl">Electricity & Infrastructure</CardTitle>
                <CardDescription>Renewable energy for all</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Off-Grid Solutions:</strong> Build micro-hydro projects and solar grids for rural areas like Dolpa and Rukum West.
            </p>
            <p className="text-foreground/90">
              Prioritize electrification of health posts and schools. Use NASA terrain and elevation data for optimal power infrastructure planning.
            </p>
            <div className="bg-yellow-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 100% electricity access by 2032</li>
                <li>• 1,000+ micro-hydro and solar projects</li>
                <li>• 100% renewable energy adoption</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Micro-Hydro</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Solar Grids</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Health & Schools</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-gradient-to-br from-card to-orange-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-orange-500" />
              <div>
                <CardTitle className="text-2xl">Disaster Risk Reduction</CardTitle>
                <CardDescription>Predictive & preventive measures</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Use elevation and rainfall data to plan flood control in Terai and landslide prevention in mountain districts.
            </p>
            <div className="bg-orange-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 60% reduction in disaster casualties by 2030</li>
                <li>• Early warning systems in 30 districts</li>
                <li>• 100,000+ people protected annually</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Flood Control</Badge>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Landslide Prevention</Badge>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Early Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-500/20 bg-gradient-to-br from-card to-pink-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-pink-500" />
              <div>
                <CardTitle className="text-2xl">Local Data Hubs</CardTitle>
                <CardDescription>Empowering local governments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Empower local governments to use this portal for district-level planning — helping allocate resources to health, education, forest, and agriculture.
            </p>
            <div className="bg-pink-500/10 p-3 rounded-lg mt-3">
              <p className="text-sm font-medium">Expected Outcomes:</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• 77 districts using data dashboards</li>
                <li>• 50% improvement in resource allocation</li>
                <li>• Real-time decision making capability</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Data Portal</Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Resource Planning</Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Local Governance</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Each problem identified by NASA data has a data-backed, practical, and measurable solution that can be executed by provincial and local governments with community participation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSolutions;
