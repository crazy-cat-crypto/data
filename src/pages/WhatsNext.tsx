import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Sprout, Sparkles, Target, Brain, MapPin, GraduationCap, Building2, Droplet, Zap, Shield } from "lucide-react";

const WhatsNext = () => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-lg px-4 py-2">
          🚀 What's Next for Nepal
        </Badge>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          The Road Ahead — Vision 2035
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our portal envisions a data-informed Nepal — where every leader and citizen understands their district's strengths, risks, and opportunities.
        </p>
      </div>

      <div className="grid gap-6">
        <Card className="border-purple-500/20 bg-gradient-to-br from-card to-purple-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <CardTitle className="text-2xl">Predictive Data Governance</CardTitle>
                <CardDescription>Forecasting risks before they happen</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Combine rainfall, population, temperature, and health data to predict floods, droughts, disease outbreaks, and migration patterns before they happen.
            </p>
            <p className="text-foreground/90">
              Enable proactive decision-making through AI-powered analytics and early warning systems that protect communities and resources.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Risk Forecasting</Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">AI Analytics</Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Early Warning</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl">Localized Decision Systems</CardTitle>
                <CardDescription>District-level data dashboards</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Enable all 77 district leaders to use comprehensive data dashboards to prioritize budget allocation, development projects, and emergency response.
            </p>
            <p className="text-foreground/90">
              Real-time monitoring of health, education, environment, and infrastructure metrics will drive evidence-based policymaking at local levels.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">District Dashboards</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Budget Planning</Badge>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Evidence-Based Policy</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-500" />
              <div>
                <CardTitle className="text-2xl">Community Empowerment</CardTitle>
                <CardDescription>Data literacy for all citizens</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Launch nationwide data literacy programs for citizens. Train youth to interpret and report local environmental and social data for community-driven change.
            </p>
            <p className="text-foreground/90">
              Local leaders and communities will use map insights to decide priorities — from where to build hospitals to where to plant trees.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Data Literacy</Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Youth Training</Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Community Voice</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-gradient-to-br from-card to-cyan-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-cyan-500" />
              <div>
                <CardTitle className="text-2xl">Smart & Sustainable Cities</CardTitle>
                <CardDescription>Future-ready urban development</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Promote solar-powered transport and energy-efficient buildings in all major cities. Monitor light pollution, urban heat zones, and air quality via satellite data.
            </p>
            <p className="text-foreground/90">
              Transform Kathmandu Valley, Pokhara, and regional centers into models of sustainable urban living with green infrastructure and smart resource management.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Solar Transport</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Green Buildings</Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Satellite Monitoring</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-teal-500/20 bg-gradient-to-br from-card to-teal-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplet className="h-8 w-8 text-teal-500" />
              <div>
                <CardTitle className="text-2xl">Water & Energy Security Goals</CardTitle>
                <CardDescription>Universal access by 2035</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              <strong>Water Security:</strong> Ensure 100% access to safe drinking water in Karnali, Sudurpaschim, and all remote districts by 2035.
            </p>
            <p className="text-foreground/90">
              <strong>Energy Security:</strong> Expand clean, renewable energy access to all 77 districts through micro-hydro, solar, and wind projects.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">100% Water Access</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Clean Energy</Badge>
              <Badge className="bg-teal-500/20 text-teal-300 border-teal-500/30">Universal Coverage</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-card to-yellow-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-yellow-500" />
              <div>
                <CardTitle className="text-2xl">Youth and Innovation</CardTitle>
                <CardDescription>Building tomorrow's solutions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Encourage young developers, planners, and scientists to use open NASA and national data to build future-ready tools for Nepal.
            </p>
            <p className="text-foreground/90">
              Support innovation hubs, hackathons, and research grants focused on climate adaptation, sustainable agriculture, and smart governance solutions.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Youth Leadership</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Innovation Hubs</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Open Data</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-gradient-to-br from-card to-orange-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-orange-500" />
              <div>
                <CardTitle className="text-2xl">Transparency & Accountability</CardTitle>
                <CardDescription>Public data for public good</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-foreground/90">
              Use this data portal as a public accountability tool. Reward districts that show measurable improvements in literacy, forest cover, air quality, and water access.
            </p>
            <p className="text-foreground/90">
              Enable citizens to track government performance and development progress through transparent, real-time data visualization.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Public Portal</Badge>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Performance Tracking</Badge>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Transparency</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-pink-500/20 bg-gradient-to-br from-card to-pink-950/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-pink-500" />
              <div>
                <CardTitle className="text-2xl">Long-Term Impact — Vision 2035</CardTitle>
                <CardDescription>Measurable national goals</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/90 font-medium">
              By 2035, our integrated data platform aims to achieve:
            </p>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">🌳</span>
                <div>
                  <p className="font-medium">Forest Cover</p>
                  <p className="text-sm text-muted-foreground">10% increase in national forest cover</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">💧</span>
                <div>
                  <p className="font-medium">Water Access</p>
                  <p className="text-sm text-muted-foreground">100% universal access to safe drinking water</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">💨</span>
                <div>
                  <p className="font-medium">Air Quality</p>
                  <p className="text-sm text-muted-foreground">30% reduction in PM2.5 pollution in major cities</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">📚</span>
                <div>
                  <p className="font-medium">Education</p>
                  <p className="text-sm text-muted-foreground">95% literacy rate across all districts</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">⚡</span>
                <div>
                  <p className="font-medium">Energy</p>
                  <p className="text-sm text-muted-foreground">100% renewable energy adoption nationwide</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-pink-500/10 p-3 rounded-lg">
                <span className="text-pink-500 text-2xl">📈</span>
                <div>
                  <p className="font-medium">Development</p>
                  <p className="text-sm text-muted-foreground">Improved HDI and economic opportunity in all 77 districts</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">2035 Vision</Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">Measurable Goals</Badge>
              <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30">National Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-4">
          <p className="text-sm text-foreground/80 text-center">
            <strong>NOTE:</strong> THIS IS THE VISION OF THE TEAM OF CODE4EARTH FOR NEPAL THAT OUR PLATFORM AIMS TO ACHIEVE AND WE ARE GOING TO WORK FOR IT IN THE NEAR FUTURE TOO
          </p>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Conclusion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            "What's Next" is not just about technology — it's about people. A Nepal where leaders use data to act wisely, and communities thrive through sustainable growth.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsNext;
