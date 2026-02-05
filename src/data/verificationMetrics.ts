export interface VerificationMetric {
  id: string;
  title: string;
  nasaDataSource: string;
  nepalDataSource: string;
  expectedOutcome: string;
  targetYear: number;
  currentProgress: number;
  verificationStatus: "verified" | "on-track" | "needs-attention";
  chartType: "line" | "bar" | "progress" | "map" | "scatter" | "dual-axis";
  category: "population" | "climate" | "water" | "forest" | "infrastructure" | "education" | "disaster";
}

export interface TimeSeriesData {
  year: number;
  value: number;
  projected?: boolean;
}

export interface DistrictMetric {
  district: string;
  value: number;
  change: number;
}

export const verificationMetrics: VerificationMetric[] = [
  {
    id: "urban-planning",
    title: "Population & Urban Planning",
    nasaDataSource: "VIIRS Nighttime Lights (Urban Expansion)",
    nepalDataSource: "Census Migration Flows 2011–2021",
    expectedOutcome: "30% reduction in Kathmandu migration by 2030",
    targetYear: 2030,
    currentProgress: 45,
    verificationStatus: "on-track",
    chartType: "line",
    category: "population"
  },
  {
    id: "temperature-adaptation",
    title: "Temperature & Climate Adaptation",
    nasaDataSource: "MODIS Land Surface Temperature (LST) + NDVI",
    nepalDataSource: "Crop yield & renewable projects (AEPC)",
    expectedOutcome: "1.5°C reduction in urban temperature by 2035",
    targetYear: 2035,
    currentProgress: 32,
    verificationStatus: "on-track",
    chartType: "dual-axis",
    category: "climate"
  },
  {
    id: "flood-management",
    title: "Rainfall & Flood Management",
    nasaDataSource: "IMERG Precipitation Intensity",
    nepalDataSource: "NDRRMA Flood Damage Reports",
    expectedOutcome: "70% reduction in flood damage by 2032",
    targetYear: 2032,
    currentProgress: 55,
    verificationStatus: "verified",
    chartType: "map",
    category: "disaster"
  },
  {
    id: "forest-conservation",
    title: "Forest Conservation",
    nasaDataSource: "MODIS NDVI & Global Forest Watch",
    nepalDataSource: "CFUG Community Forest Data",
    expectedOutcome: "10% increase in national forest cover by 2035",
    targetYear: 2035,
    currentProgress: 68,
    verificationStatus: "verified",
    chartType: "bar",
    category: "forest"
  },
  {
    id: "air-quality",
    title: "Air Quality Improvement",
    nasaDataSource: "MERRA-2 Aerosol Optical Depth (AOD)",
    nepalDataSource: "Department of Transport EV Registrations",
    expectedOutcome: "30% reduction in PM2.5 by 2030",
    targetYear: 2030,
    currentProgress: 38,
    verificationStatus: "on-track",
    chartType: "scatter",
    category: "climate"
  },
  {
    id: "water-access",
    title: "Water Access Improvement",
    nasaDataSource: "Rainfall patterns + Terrain elevation (SRTM)",
    nepalDataSource: "DWSSM Water Access Records",
    expectedOutcome: "100% clean water access by 2035",
    targetYear: 2035,
    currentProgress: 78,
    verificationStatus: "verified",
    chartType: "progress",
    category: "water"
  },
  {
    id: "education-connectivity",
    title: "Education & Connectivity",
    nasaDataSource: "Solar Irradiation (CERES)",
    nepalDataSource: "NTA Internet Coverage & Literacy Rates",
    expectedOutcome: "95% literacy by 2035",
    targetYear: 2035,
    currentProgress: 72,
    verificationStatus: "on-track",
    chartType: "line",
    category: "education"
  },
  {
    id: "electricity-infrastructure",
    title: "Electricity & Infrastructure",
    nasaDataSource: "Elevation (SRTM) + Terrain Mapping",
    nepalDataSource: "NEA Electrification Records",
    expectedOutcome: "100% electricity access by 2032",
    targetYear: 2032,
    currentProgress: 85,
    verificationStatus: "verified",
    chartType: "map",
    category: "infrastructure"
  },
  {
    id: "disaster-reduction",
    title: "Disaster Risk Reduction",
    nasaDataSource: "Elevation (DEM) + IMERG Rainfall Anomalies",
    nepalDataSource: "NDRRMA Disaster Incidents",
    expectedOutcome: "60% reduction in casualties by 2030",
    targetYear: 2030,
    currentProgress: 50,
    verificationStatus: "on-track",
    chartType: "map",
    category: "disaster"
  },
  {
    id: "data-hubs",
    title: "Local Data Hubs",
    nasaDataSource: "Dashboard Analytics & Usage Data",
    nepalDataSource: "Local Resource Data & District Planning",
    expectedOutcome: "77 districts using data dashboards for planning",
    targetYear: 2030,
    currentProgress: 62,
    verificationStatus: "on-track",
    chartType: "progress",
    category: "infrastructure"
  }
];

// Urban brightness data for secondary cities
export const urbanBrightnessData: TimeSeriesData[] = [
  { year: 2011, value: 15 },
  { year: 2013, value: 18 },
  { year: 2015, value: 22 },
  { year: 2017, value: 28 },
  { year: 2019, value: 35 },
  { year: 2021, value: 42 },
  { year: 2023, value: 48, projected: true },
  { year: 2025, value: 55, projected: true },
  { year: 2027, value: 62, projected: true },
  { year: 2030, value: 70, projected: true }
];

// Temperature and NDVI correlation data
export const temperatureNDVIData: TimeSeriesData[] = [
  { year: 2015, value: 28.5 },
  { year: 2017, value: 28.8 },
  { year: 2019, value: 29.2 },
  { year: 2021, value: 29.0 },
  { year: 2023, value: 28.5, projected: true },
  { year: 2025, value: 28.0, projected: true },
  { year: 2027, value: 27.5, projected: true },
  { year: 2030, value: 27.2, projected: true },
  { year: 2035, value: 27.0, projected: true }
];

export const ndviData: TimeSeriesData[] = [
  { year: 2015, value: 0.45 },
  { year: 2017, value: 0.48 },
  { year: 2019, value: 0.52 },
  { year: 2021, value: 0.55 },
  { year: 2023, value: 0.58, projected: true },
  { year: 2025, value: 0.62, projected: true },
  { year: 2027, value: 0.65, projected: true },
  { year: 2030, value: 0.68, projected: true },
  { year: 2035, value: 0.72, projected: true }
];

// Forest cover by province
export const forestCoverData: DistrictMetric[] = [
  { district: "Province 1", value: 42.5, change: 8.2 },
  { district: "Madhesh", value: 18.3, change: 5.5 },
  { district: "Bagmati", value: 35.8, change: 9.1 },
  { district: "Gandaki", value: 48.2, change: 11.3 },
  { district: "Lumbini", value: 28.9, change: 7.8 },
  { district: "Karnali", value: 55.6, change: 12.5 },
  { district: "Sudurpashchim", value: 38.4, change: 8.9 }
];

// EV adoption vs PM2.5 reduction
export const evAdoptionData = [
  { evs: 500, pm25: 180, district: "Kathmandu" },
  { evs: 120, pm25: 145, district: "Lalitpur" },
  { evs: 80, pm25: 155, district: "Bhaktapur" },
  { evs: 200, pm25: 135, district: "Pokhara" },
  { evs: 150, pm25: 128, district: "Butwal" },
  { evs: 90, pm25: 138, district: "Biratnagar" },
  { evs: 60, pm25: 148, district: "Nepalgunj" },
  { evs: 40, pm25: 155, district: "Dharan" }
];

// Water access by province (%)
export const waterAccessData: DistrictMetric[] = [
  { district: "Province 1", value: 82, change: 15 },
  { district: "Madhesh", value: 68, change: 22 },
  { district: "Bagmati", value: 88, change: 12 },
  { district: "Gandaki", value: 85, change: 18 },
  { district: "Lumbini", value: 72, change: 25 },
  { district: "Karnali", value: 58, change: 30 },
  { district: "Sudurpashchim", value: 75, change: 20 }
];

// Literacy and internet coverage correlation
export const literacyData: TimeSeriesData[] = [
  { year: 2000, value: 48.6 },
  { year: 2005, value: 56.5 },
  { year: 2010, value: 65.9 },
  { year: 2015, value: 71.2 },
  { year: 2020, value: 76.3 },
  { year: 2023, value: 79.5, projected: true },
  { year: 2025, value: 82.0, projected: true },
  { year: 2030, value: 88.5, projected: true },
  { year: 2035, value: 95.0, projected: true }
];

export const internetCoverageData: TimeSeriesData[] = [
  { year: 2000, value: 0.4 },
  { year: 2005, value: 1.2 },
  { year: 2010, value: 7.9 },
  { year: 2015, value: 21.0 },
  { year: 2020, value: 64.5 },
  { year: 2023, value: 78.0, projected: true },
  { year: 2025, value: 85.0, projected: true },
  { year: 2030, value: 92.0, projected: true },
  { year: 2035, value: 98.0, projected: true }
];

// Electrification by district (%)
export const electrificationData: DistrictMetric[] = [
  { district: "Kathmandu", value: 99, change: 5 },
  { district: "Lalitpur", value: 98, change: 6 },
  { district: "Bhaktapur", value: 97, change: 7 },
  { district: "Kaski", value: 95, change: 12 },
  { district: "Chitawan", value: 92, change: 15 },
  { district: "Jhapa", value: 90, change: 18 },
  { district: "Morang", value: 88, change: 20 },
  { district: "Rupandehi", value: 85, change: 22 },
  { district: "Kailali", value: 78, change: 28 },
  { district: "Humla", value: 45, change: 40 }
];

export const getCategoryMetrics = (category: string) => {
  return verificationMetrics.filter(m => m.category === category);
};

export const getMetricById = (id: string) => {
  return verificationMetrics.find(m => m.id === id);
};