import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, BarChart3, Users, AlertTriangle, Trees, Zap, TrendingUp, Info, Map, Globe, MoreHorizontal, Building2, TreePine, Droplet, Satellite, Target, Lightbulb, Rocket, CheckCircle2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/code4earth-logo-new.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "NASA Data", href: "/nasa-data", icon: Satellite },
  { name: "Districts", href: "/districts", icon: MapPin },
  { name: "Earth Map", href: "/earth-map", icon: Globe },
  { name: "Comparison", href: "/comparison", icon: BarChart3 },
  { name: "Heat Map", href: "/map", icon: Map },
  { name: "Disaster Risk", href: "/disaster-risk", icon: AlertTriangle },
  { name: "Prediction", href: "/prediction", icon: TrendingUp },
];

const provincesItems = [
  { name: "Hospitals", href: "/provinces/hospitals", icon: Building2 },
  { name: "Forest", href: "/provinces/forest", icon: TreePine },
  { name: "Drinking Water", href: "/provinces/drinking-water", icon: Droplet },
];

const insightsItems = [
  { name: "National Problems & Insights", href: "/national-problems", icon: Target },
  { name: "Data-Driven Solutions", href: "/data-solutions", icon: Lightbulb },
  { name: "What's Next for Nepal", href: "/whats-next", icon: Rocket },
  { name: "Verification Dashboard", href: "/verification-dashboard", icon: CheckCircle2 },
];

const additionalItems = [
  { name: "GDP Forecast", href: "/forecasts/gdp", icon: TrendingUp },
  { name: "Migration", href: "/migration", icon: Users },
  { name: "Vegetation", href: "/vegetation", icon: Trees },
  { name: "Energy", href: "/energy", icon: Zap },
  { name: "Tourism Forecast", href: "/forecasts/tourism" },
  { name: "HDI Forecast", href: "/forecasts/hdi" },
  { name: "GDP vs HDI", href: "/forecasts/hdi-income" },
  { name: "Air Quality", href: "/air-quality" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center gap-8">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} alt="CODE4EARTH" className="h-12 object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navigation.slice(0, 2).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground glow-border"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  insightsItems.some(item => location.pathname === item.href)
                    ? "bg-primary text-primary-foreground glow-border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}>
                  <Target className="h-4 w-4" />
                  <span>Insights</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  {insightsItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="cursor-pointer flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {navigation.slice(2).map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground glow-border"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  provincesItems.some(item => location.pathname === item.href)
                    ? "bg-primary text-primary-foreground glow-border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}>
                  <MapPin className="h-4 w-4" />
                  <span>Provinces</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  {provincesItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="cursor-pointer flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  additionalItems.some(item => location.pathname === item.href)
                    ? "bg-primary text-primary-foreground glow-border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}>
                  <MoreHorizontal className="h-4 w-4" />
                  <span>Additional</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border-border z-50">
                  {additionalItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link to={item.href} className="cursor-pointer flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to="/about"
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  location.pathname === "/about"
                    ? "bg-primary text-primary-foreground glow-border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link
                to="/contact"
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  location.pathname === "/contact"
                    ? "bg-primary text-primary-foreground glow-border"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Connect With Us</span>
              </Link>
            </div>
          </div>

          <div className="flex md:hidden overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {navigation.slice(0, 2).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <item.icon className="h-3 w-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                insightsItems.some(item => location.pathname === item.href)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}>
                <Target className="h-3 w-3" />
                <span>Insights</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                {insightsItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {navigation.slice(2).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <item.icon className="h-3 w-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                provincesItems.some(item => location.pathname === item.href)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}>
                <MapPin className="h-3 w-3" />
                <span>Provinces</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                {provincesItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="cursor-pointer">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                additionalItems.some(item => location.pathname === item.href)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}>
                <MoreHorizontal className="h-3 w-3" />
                <span>More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border z-50">
                {additionalItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link to={item.href} className="cursor-pointer flex items-center gap-2">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/about"
              className={cn(
                "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                location.pathname === "/about"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <Info className="h-3 w-3" />
              <span>About</span>
            </Link>
            <Link
              to="/contact"
              className={cn(
                "flex items-center space-x-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                location.pathname === "/contact"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              <MessageCircle className="h-3 w-3" />
              <span>Contact</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t border-border/50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>CODE4EARTH • NASA Space Apps Challenge 2025</p>
          <p className="mt-1">Data sourced from Nepal Census 2021 & National Energy Authority</p>
        </div>
      </footer>
    </div>
  );
}
