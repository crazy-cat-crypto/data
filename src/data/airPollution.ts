export interface AirPollutionData {
  district: string;
  pm25: number;
}

export const airPollutionData: AirPollutionData[] = [
  { district: "Taplejung", pm25: 25.62 },
  { district: "Sankhuwasabha", pm25: 34.26 },
  { district: "Solukhumbu", pm25: 30.98 },
  { district: "Okhaldhunga", pm25: 28.98 },
  { district: "Khotang", pm25: 22.34 },
  { district: "Bhojpur", pm25: 22.34 },
  { district: "Dhankuta", pm25: 20.87 },
  { district: "Terhathum", pm25: 32.99 },
  { district: "Panchthar", pm25: 29.02 },
  { district: "Ilam", pm25: 30.62 },
  { district: "Jhapa", pm25: 35.41 },
  { district: "Morang", pm25: 54.4 },
  { district: "Sunsari", pm25: 51.65 },
  { district: "Udayapur", pm25: 23.19 },
  { district: "Saptari", pm25: 38.64 },
  { district: "Siraha", pm25: 38.67 },
  { district: "Dhanusa", pm25: 41.08 },
  { district: "Mahottari", pm25: 45.5 },
  { district: "Sarlahi", pm25: 43.64 },
  { district: "Rautahat", pm25: 40.82 },
  { district: "Bara", pm25: 47.24 },
  { district: "Parsa", pm25: 37.79 },
  { district: "Dolakha", pm25: 24.38 },
  { district: "Sindhupalchok", pm25: 25.5 },
  { district: "Rasuwa", pm25: 26.84 },
  { district: "Nuwakot", pm25: 31.78 },
  { district: "Dhading", pm25: 23 },
  { district: "Kavrepalanchok", pm25: 27.71 },
  { district: "Bhaktapur", pm25: 56.85 },
  { district: "Lalitpur", pm25: 45.93 },
  { district: "Kathmandu", pm25: 57.15 },
  { district: "Chitwan", pm25: 22.56 },
  { district: "Makwanpur", pm25: 20.98 },
  { district: "Sindhuli", pm25: 34.23 },
  { district: "Ramechhap", pm25: 34.48 },
  { district: "Gorkha", pm25: 32.13 },
  { district: "Lamjung", pm25: 24.57 },
  { district: "Tanahun", pm25: 21.47 },
  { district: "Syangja", pm25: 30.26 },
  { district: "Kaski", pm25: 26.6 },
  { district: "Manang", pm25: 6.22 },
  { district: "Mustang", pm25: 9.95 },
  { district: "Myagdi", pm25: 20.52 },
  { district: "Parbat", pm25: 33.64 },
  { district: "Baglung", pm25: 23.88 },
  { district: "Nawalpur", pm25: 29.94 },
  { district: "Gulmi", pm25: 24.68 },
  { district: "Palpa", pm25: 27.8 },
  { district: "Nawalparasi (Bardaghat Susta East)", pm25: 28.2 },
  { district: "Nawalparasi (Bardaghat Susta West)", pm25: 22.77 },
  { district: "Rupandehi", pm25: 54.39 },
  { district: "Kapilvastu", pm25: 50.5 },
  { district: "Arghakhanchi", pm25: 34.09 },
  { district: "Dang", pm25: 33.42 },
  { district: "Pyuthan", pm25: 28.97 },
  { district: "Rolpa", pm25: 33.83 },
  { district: "Rukum East", pm25: 21.33 },
  { district: "Rukum West", pm25: 22.94 },
  { district: "Salyan", pm25: 20.68 },
  { district: "Banke", pm25: 24.88 },
  { district: "Bardiya", pm25: 25.83 },
  { district: "Surkhet", pm25: 24.07 },
  { district: "Dailekh", pm25: 32.43 },
  { district: "Jajarkot", pm25: 25.35 },
  { district: "Dolpa", pm25: 7.81 },
  { district: "Jumla", pm25: 28.14 },
  { district: "Kalikot", pm25: 22.11 },
  { district: "Mugu", pm25: 13.02 },
  { district: "Humla", pm25: 5.75 },
  { district: "Kailali", pm25: 34.8 },
  { district: "Achham", pm25: 31.58 },
  { district: "Doti", pm25: 22.98 },
  { district: "Bajhang", pm25: 20.08 },
  { district: "Bajura", pm25: 32.23 },
  { district: "Kanchanpur", pm25: 30.6 },
  { district: "Dadeldhura", pm25: 30.94 },
  { district: "Baitadi", pm25: 31.57 },
  { district: "Darchula", pm25: 21.11 },
];

export const getMostPollutedDistricts = (count: number = 10): AirPollutionData[] => {
  return [...airPollutionData].sort((a, b) => b.pm25 - a.pm25).slice(0, count);
};

export const getCleanestDistricts = (count: number = 10): AirPollutionData[] => {
  return [...airPollutionData].sort((a, b) => a.pm25 - b.pm25).slice(0, count);
};

export const getNationalAvgPM25 = (): number => {
  const total = airPollutionData.reduce((sum, d) => sum + d.pm25, 0);
  return total / airPollutionData.length;
};
