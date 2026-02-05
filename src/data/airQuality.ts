export const aqiData = [
  { year: 2017, aqi: 145, type: "actual" },
  { year: 2018, aqi: 158, type: "actual" },
  { year: 2019, aqi: 172, type: "actual" },
  { year: 2020, aqi: 89, type: "actual" },
  { year: 2021, aqi: 168, type: "actual" },
  { year: 2022, aqi: 180, type: "predicted" },
  { year: 2023, aqi: 192, type: "predicted" },
  { year: 2024, aqi: 204, type: "predicted" },
  { year: 2025, aqi: 216, type: "predicted" },
  { year: 2026, aqi: 228, type: "predicted" },
  { year: 2027, aqi: 240, type: "predicted" },
  { year: 2028, aqi: 252, type: "predicted" },
  { year: 2029, aqi: 264, type: "predicted" },
  { year: 2030, aqi: 276, type: "predicted" },
  { year: 2031, aqi: 288, type: "predicted" }
];

export const aqiHealthImpacts = [
  { range: "0-50", level: "Good", color: "hsl(120, 60%, 50%)", impact: "Air quality is satisfactory, and air pollution poses little or no risk.", action: "Enjoy outdoor activities!" },
  { range: "51-100", level: "Moderate", color: "hsl(60, 100%, 50%)", impact: "Air quality is acceptable. However, sensitive individuals may experience minor irritation.", action: "Unusually sensitive people should limit prolonged outdoor exertion." },
  { range: "101-150", level: "Unhealthy for Sensitive", color: "hsl(30, 100%, 50%)", impact: "Members of sensitive groups may experience health effects. General public less likely to be affected.", action: "Sensitive groups should reduce outdoor activities." },
  { range: "151-200", level: "Unhealthy", color: "hsl(0, 100%, 50%)", impact: "Everyone may begin to experience health effects; sensitive groups may experience more serious effects.", action: "Everyone should limit prolonged outdoor exertion." },
  { range: "200+", level: "Hazardous", color: "hsl(320, 100%, 30%)", impact: "Health alert: The risk of health effects is increased for everyone. Serious risk of respiratory diseases.", action: "Avoid outdoor activities. Use N95 masks if necessary." }
];
