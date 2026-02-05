import { Card } from "@/components/ui/card";
import { Mail, ExternalLink } from "lucide-react";

const teamMembers = [
  { name: "Bedant Gautam", email: "bdntx1@gmail.com" },
  { name: "Pratyush Subedi", email: "pratyushsubedi60@gmail.com" },
  { name: "Ashish Rana", email: "ahishrana34@gmail.com" },
  { name: "Saksham Gyawali", email: "sakshamgyawali92@gmail.com" },
  { name: "Sirjal Adhikari", email: "sirjaladhikari80@gmail.com" },
];

const resources = [
  { name: "Nepal Census Data", url: "https://censusnepal.cbs.gov.np/" },
  { name: "Nepal Districts List", url: "https://www.scribd.com/document/519346477/List-of-districts-in-Nepal" },
  { name: "NASA EarthData - CIESIN ESDIS", url: "https://search.earthdata.nasa.gov/search?q=CIESIN%20ESDIS" },
  { name: "NASA Worldview", url: "https://www.earthdata.nasa.gov/data/tools/worldview" },
  { name: "MODIS Vegetation Index", url: "https://modis.gsfc.nasa.gov/data/dataprod/mod13.php" },
  { name: "Urban Heat Islands - NASA", url: "https://mynasadata.larc.nasa.gov/basic-page/urban-heat-islands" },
  { name: "NASA Digital Elevation Model", url: "https://www.earthdata.nasa.gov/about/competitive-programs/measures/new-nasa-digital-elevation-model" },
  { name: "Climate Change & Landslides - NASA", url: "https://www.nasa.gov/centers-and-facilities/goddard/climate-change-could-trigger-more-landslides-in-high-mountain-asia/" },
  { name: "Hydro Nepal", url: "https://hydro.naxa.com.np" },
  { name: "DRR Portal Nepal", url: "http://www.drrportal.gov.np/" },
  { name: "International Migration Report", url: "https://censusnepal.cbs.gov.np/results/files/result-folder/International%20Migration%20in%20Nepal%20Report.pdf" },
  { name: "Nepal Population Data", url: "https://censusnepal.cbs.gov.np/results/population" },
  { name: "Risk Profile of Nepal", url: "http://drrportal.gov.np/risk-profile-of-nepal" },
  { name: "Districts of Nepal Info", url: "https://namastesindhupalchowk.com/blog/district-of-nepal" },
  { name: "Ministry of Finance Nepal", url: "https://mof.gov.np/" },
  { name: "NASA Official", url: "https://www.nasa.gov/" },
  { name: "Global Forest Watch", url: "https://www.globalforestwatch.org/" },
  { name: "IWA Online", url: "https://iwaponline.com/" },
  { name: "ResearchGate", url: "https://www.researchgate.net/" },
  { name: "Ministry of Water Supply", url: "https://mows.gov.np/" },
  { name: "Drinking Water & Sewerage", url: "https://dwssm.gov.np/" },
  { name: "UNICEF", url: "https://www.unicef.org/" },
  { name: "Nagarik Network", url: "https://nagariknetwork.com/" },
  { name: "Immigration Nepal", url: "http://immigration.gov.np/" },
  { name: "Trading Economics", url: "https://tradingeconomics.com/" },
  { name: "The Water Project", url: "https://thewaterproject.org/" },
  { name: "ScienceDirect", url: "https://www.sciencedirect.com/" },
  { name: "Public Health Update", url: "https://publichealthupdate.com/" },
  { name: "KP Adhne", url: "https://kpadhne.com/" },
  { name: "Columbia University", url: "https://www.columbia.edu/content/columbia-university-admissions" },
  { name: "Nepalog", url: "https://nepalog.com/" },
  { name: "Country Economy", url: "https://countryeconomy.com" },
  { name: "Time and Date", url: "https://www.timeanddate.com/" },
  { name: "World Bank", url: "https://www.worldbank.org/ext/en/home" },
  { name: "Tourism Sector Report", url: "https://ibn.gov.np/uploads/documents/tourism-sector-full-versionpdf-1746-132-1730779901.pdf" },
  { name: "Energy Sector Report", url: "http://wecs.gov.np/source/ESR_2024.pdf" },
  { name: "World Bank GDP Data", url: "https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=NP" },
  { name: "Nepal GDP Per Capita", url: "https://tradingeconomics.com/nepal/gdp-per-capita" },
  { name: "ICIMOD Library", url: "https://lib.icimod.org/records/6tty1-6rq61" },
  { name: "Environment Statistics Nepal", url: "https://www.scribd.com/document/774544772/Environment-Statistics-of-Nepal-2024" },
];

export default function About() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold glow-text">About Us</h1>
        <p className="text-muted-foreground">NASA Space Apps Challenge 2025</p>
      </div>

      <Card className="card-space p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Team</h2>
        <p className="text-center text-muted-foreground mb-8">
          Meet the team behind Nepal Data Observatory - dedicated to leveraging data for sustainable development
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card
              key={member.email}
              className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg"
            >
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="card-space p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Project Mission</h2>
        <p className="text-center text-lg max-w-3xl mx-auto">
          Leverage data-driven insights to empower Nepal's sustainable development through population, 
          energy, environment, and disaster-risk analytics.
        </p>
      </Card>

      <Card className="card-space p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Data Resources</h2>
        <p className="text-center text-muted-foreground mb-8">
          All data sources and references used in this project
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 p-4 rounded-lg border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-card transition-all hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4 text-primary shrink-0" />
              <span className="text-sm group-hover:text-primary transition-colors line-clamp-2">
                {resource.name}
              </span>
            </a>
          ))}
        </div>
      </Card>
    </div>
  );
}
