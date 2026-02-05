import { nasaPopulationData } from "@/data/nasaPopulation";
import { landCoverData } from "@/data/landCover";
import { urbanGrowthData } from "@/data/urbanGrowth";
import { airPollutionData } from "@/data/airPollution";
import { nightlightsData } from "@/data/nightlights";
import { elevationData } from "@/data/elevation";

export type FocusArea = 
  | "healthcare" 
  | "airQuality" 
  | "deforestation" 
  | "urbanGrowth" 
  | "agricultural";

export interface FocusResult {
  district: string;
  score: number;
  reason: string;
}

// Healthcare Need: high population, low urban extent, high elevation
export function calculateHealthcareNeed(): FocusResult[] {
  const results: FocusResult[] = [];
  
  nasaPopulationData.forEach(popData => {
    const urbanData = urbanGrowthData.find(u => u.district === popData.district);
    const elevData = elevationData.find(e => e.district === popData.district);
    
    if (urbanData && elevData) {
      // Normalize scores (0-100)
      const popScore = Math.min(100, (popData.population / 2000000) * 100);
      const urbanScore = 100 - (urbanData.urbanExtentPct * 2.5); // Lower urban = higher score
      const elevScore = Math.min(100, (elevData.meanElevation / 4000) * 100);
      
      const score = (popScore * 0.4) + (urbanScore * 0.3) + (elevScore * 0.3);
      
      if (score > 50) {
        results.push({
          district: popData.district,
          score: Math.round(score),
          reason: `High population (${popData.population.toLocaleString()}), low urbanization (${urbanData.urbanExtentPct.toFixed(1)}%), difficult terrain (${elevData.meanElevation}m)`
        });
      }
    }
  });
  
  return results.sort((a, b) => b.score - a.score).slice(0, 15);
}

// Air Quality Concern: PM2.5 > 35 and high urban extent
export function calculateAirQualityConcern(): FocusResult[] {
  const results: FocusResult[] = [];
  
  airPollutionData.forEach(airData => {
    const urbanData = urbanGrowthData.find(u => u.district === airData.district);
    
    if (urbanData && airData.pm25 > 35) {
      const pm25Score = Math.min(100, (airData.pm25 / 60) * 100);
      const urbanScore = urbanData.urbanExtentPct * 2.5;
      
      const score = (pm25Score * 0.6) + (urbanScore * 0.4);
      
      results.push({
        district: airData.district,
        score: Math.round(score),
        reason: `High PM2.5 (${airData.pm25.toFixed(1)} µg/m³), urban extent ${urbanData.urbanExtentPct.toFixed(1)}%`
      });
    }
  });
  
  return results.sort((a, b) => b.score - a.score);
}

// Deforestation Risk: forest < 30% and cropland > 40%
export function calculateDeforestationRisk(): FocusResult[] {
  const results: FocusResult[] = [];
  
  landCoverData.forEach(landData => {
    if (landData.forestPct < 30 && landData.croplandPct > 40) {
      const forestScore = 100 - ((landData.forestPct / 30) * 100);
      const cropScore = ((landData.croplandPct - 40) / 20) * 100;
      
      const score = (forestScore * 0.6) + (cropScore * 0.4);
      
      results.push({
        district: landData.district,
        score: Math.round(score),
        reason: `Low forest (${landData.forestPct.toFixed(1)}%), high cropland (${landData.croplandPct.toFixed(1)}%)`
      });
    }
  });
  
  return results.sort((a, b) => b.score - a.score);
}

// Urban Growth Pressure: high nightlight + high population density + low land availability
export function calculateUrbanGrowthPressure(): FocusResult[] {
  const results: FocusResult[] = [];
  
  nightlightsData.forEach(nightData => {
    const popData = nasaPopulationData.find(p => p.district === nightData.district);
    const urbanData = urbanGrowthData.find(u => u.district === nightData.district);
    const landData = landCoverData.find(l => l.district === nightData.district);
    
    if (popData && urbanData && landData) {
      const nightScore = Math.min(100, (nightData.meanNTLRadiance / 40) * 100);
      const densityScore = Math.min(100, (popData.densityPerSqKm / 5000) * 100);
      const landAvailScore = 100 - ((landData.barrenPct + landData.waterPct) * 2);
      
      const score = (nightScore * 0.35) + (densityScore * 0.35) + (landAvailScore * 0.3);
      
      if (score > 40) {
        results.push({
          district: nightData.district,
          score: Math.round(score),
          reason: `High nightlight (${nightData.meanNTLRadiance.toFixed(1)}), density ${popData.densityPerSqKm.toFixed(0)}/km², urban ${urbanData.urbanExtentPct.toFixed(1)}%`
        });
      }
    }
  });
  
  return results.sort((a, b) => b.score - a.score).slice(0, 15);
}

// Agricultural Potential: high cropland, low elevation, adequate water
export function calculateAgriculturalPotential(): FocusResult[] {
  const results: FocusResult[] = [];
  
  landCoverData.forEach(landData => {
    const elevData = elevationData.find(e => e.district === landData.district);
    
    if (elevData && elevData.meanElevation < 1500) {
      const cropScore = (landData.croplandPct / 60) * 100;
      const elevScore = 100 - ((elevData.meanElevation / 1500) * 100);
      const waterScore = Math.min(100, landData.waterPct * 20);
      
      const score = (cropScore * 0.5) + (elevScore * 0.3) + (waterScore * 0.2);
      
      if (score > 40) {
        results.push({
          district: landData.district,
          score: Math.round(score),
          reason: `High cropland (${landData.croplandPct.toFixed(1)}%), low elevation (${elevData.meanElevation}m), water ${landData.waterPct.toFixed(1)}%`
        });
      }
    }
  });
  
  return results.sort((a, b) => b.score - a.score).slice(0, 15);
}

export function getFocusResults(focusArea: FocusArea): FocusResult[] {
  switch (focusArea) {
    case "healthcare":
      return calculateHealthcareNeed();
    case "airQuality":
      return calculateAirQualityConcern();
    case "deforestation":
      return calculateDeforestationRisk();
    case "urbanGrowth":
      return calculateUrbanGrowthPressure();
    case "agricultural":
      return calculateAgriculturalPotential();
    default:
      return [];
  }
}