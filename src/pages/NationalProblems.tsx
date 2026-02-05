import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Building2, Leaf, TreePine, Users, Activity, Thermometer, Droplets, Wind, GraduationCap, Droplet, Zap } from "lucide-react";

const NationalProblems = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          🌍 National Problems & Insights
        </Badge>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Challenges Highlighted by NASA Data
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Using NASA Earth Observation datasets combined with national statistics, our portal identifies Nepal's most pressing socio-environmental and developmental challenges. The data clearly reveals interconnected issues across geography, environment, and society.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-orange-500/20 bg-gradient-to-br from-card to-orange-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-orange-500" />
              <div>
                <CardTitle className="text-2xl">Population & Urban Pressure</CardTitle>
                <CardDescription>High density districts facing overpopulation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Critical Districts:</strong> Kathmandu, Lalitpur, Bhaktapur, and Morang show extreme population density causing overpopulation, waste buildup, housing shortages, and traffic congestion.
            </p>
            <p className="text-foreground/90">
              Migration from rural to urban areas is increasing unemployment in cities while rural depopulation causes agricultural decline in hill and mountain regions.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">Urban Sprawl</Badge>
              <Badge variant="destructive">Housing Crisis</Badge>
              <Badge variant="destructive">Traffic Congestion</Badge>
              <Badge variant="destructive">Rural Depopulation</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-gradient-to-br from-card to-red-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Thermometer className="h-8 w-8 text-red-500" />
              <div>
                <CardTitle className="text-2xl">Rising Temperature & Climate Change</CardTitle>
                <CardDescription>Extreme heat and glacier melt</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Terai Belt:</strong> Districts like Banke, Bardiya, and Rupandehi are recording higher temperatures and extreme heat days — overall 2°C rise compared to 1980s average.
            </p>
            <p className="text-foreground/90">
              <strong>Mountain Regions:</strong> Mustang and Dolpa are facing glacier melt and reduced snow cover, threatening water supply for downstream communities.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">+2°C Temperature Rise</Badge>
              <Badge variant="destructive">Glacier Melt</Badge>
              <Badge variant="destructive">Extreme Heat Days</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl">Rainfall Imbalance</CardTitle>
                <CardDescription>Floods in Terai, droughts in hills</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Flooding:</strong> Terai regions like Saptari, Siraha, and Rautahat experience severe seasonal flooding affecting agriculture and infrastructure.
            </p>
            <p className="text-foreground/90">
              <strong>Drought:</strong> Hill districts like Mustang and Manang suffer from water scarcity. Erratic rainfall is disrupting agriculture and water availability nationwide.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Seasonal Flooding</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Water Scarcity</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Erratic Patterns</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <TreePine className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl">Deforestation & Land Degradation</CardTitle>
                <CardDescription>Forest loss and soil erosion</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Critical Deforestation:</strong> Forest cover is critically low in Bara, Parsa, and Kapilvastu districts due to agricultural expansion and illegal logging.
            </p>
            <p className="text-foreground/90">
              <strong>Landslide Risk:</strong> Hill districts like Dolakha and Sindhupalchok face high risk from slope instability caused by excessive forest use and soil erosion.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Low Forest Cover</Badge>
              <Badge variant="secondary">Soil Erosion</Badge>
              <Badge variant="secondary">Landslide Risk</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-card to-purple-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Wind className="h-8 w-8 text-purple-500" />
              <div>
                <CardTitle className="text-2xl">Air Pollution Crisis</CardTitle>
                <CardDescription>Hazardous PM2.5 levels in major cities</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Severe Pollution:</strong> Kathmandu Valley, Rupandehi, and Morang have dangerous PM2.5 levels (&gt;50 µg/m³) due to industries, open burning, and vehicle emissions.
            </p>
            <p className="text-foreground/90">
              Poor air quality is leading to respiratory issues, reduced life expectancy, and decreased productivity across urban populations.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">PM2.5 &gt; 50 µg/m³</Badge>
              <Badge variant="destructive">Respiratory Issues</Badge>
              <Badge variant="destructive">Industrial Emissions</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-gradient-to-br from-card to-cyan-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplet className="h-8 w-8 text-cyan-500" />
              <div>
                <CardTitle className="text-2xl">Water Scarcity</CardTitle>
                <CardDescription>Limited access to safe drinking water</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Critical Districts:</strong> Karnali and Sudurpaschim provinces have severely limited access to safe drinking water despite good rainfall potential.
            </p>
            <p className="text-foreground/90">
              Jajarkot, Kalikot, and Achham have &lt;60% access to clean water, affecting health, hygiene, and quality of life for thousands of families.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">&lt;60% Access</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Health Impact</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Infrastructure Gap</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-indigo-500/20 bg-gradient-to-br from-card to-indigo-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-indigo-500" />
              <div>
                <CardTitle className="text-2xl">Education & Digital Divide</CardTitle>
                <CardDescription>Literacy gaps and limited connectivity</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Low Literacy:</strong> Mountain districts like Humla and Mugu have literacy rates below 60%, limiting economic opportunities and social mobility.
            </p>
            <p className="text-foreground/90">
              Internet access is critically low in Karnali and Sudurpaschim provinces. Educational inequality is widening income gaps between urban and rural populations.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Low Literacy</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">No Internet</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Income Inequality</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-card to-yellow-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle className="text-2xl">Electricity & Infrastructure Gaps</CardTitle>
                <CardDescription>Power outages slowing development</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>No Grid Access:</strong> Remote districts like Dolpa and Rukum West lack stable grid connections, relying on expensive diesel generators or having no power at all.
            </p>
            <p className="text-foreground/90">
              Frequent power outages are slowing economic growth, limiting educational opportunities, and preventing the establishment of modern healthcare facilities.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">No Grid Access</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Power Outages</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Development Delay</Badge>
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
            NASA's datasets help visualize how urbanization, pollution, deforestation, and inequality are shaping Nepal's future — guiding where immediate policy and local action are needed.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NationalProblems;
