export interface InfrastructureData {
  district: string;
  roadDensity: number;
  electricityAccess: number;
  internetPenetration: number;
  hospitals: number;
  schools: number;
  waterSupply: number;
}

export const infrastructureData: InfrastructureData[] = [
  { district: "Taplejung", roadDensity: 1.39, electricityAccess: 57, internetPenetration: 11, hospitals: 4, schools: 137, waterSupply: 41 },
  { district: "Sankhuwasabha", roadDensity: 1.78, electricityAccess: 53, internetPenetration: 9, hospitals: 4, schools: 110, waterSupply: 58 },
  { district: "Solukhumbu", roadDensity: 0.64, electricityAccess: 45, internetPenetration: 17, hospitals: 2, schools: 90, waterSupply: 49 },
  { district: "Okhaldhunga", roadDensity: 2.01, electricityAccess: 48, internetPenetration: 34, hospitals: 4, schools: 109, waterSupply: 64 },
  { district: "Khotang", roadDensity: 1.59, electricityAccess: 59, internetPenetration: 15, hospitals: 1, schools: 157, waterSupply: 53 },
  { district: "Bhojpur", roadDensity: 0.31, electricityAccess: 49, internetPenetration: 13, hospitals: 3, schools: 149, waterSupply: 58 },
  { district: "Dhankuta", roadDensity: 1.22, electricityAccess: 50, internetPenetration: 14, hospitals: 1, schools: 196, waterSupply: 37 },
  { district: "Terhathum", roadDensity: 2.39, electricityAccess: 84, internetPenetration: 5, hospitals: 1, schools: 156, waterSupply: 42 },
  { district: "Panchthar", roadDensity: 0.52, electricityAccess: 51, internetPenetration: 20, hospitals: 2, schools: 174, waterSupply: 49 },
  { district: "Ilam", roadDensity: 2.19, electricityAccess: 70, internetPenetration: 15, hospitals: 4, schools: 153, waterSupply: 50 },
  { district: "Jhapa", roadDensity: 2.52, electricityAccess: 91, internetPenetration: 66, hospitals: 7, schools: 387, waterSupply: 84 },
  { district: "Morang", roadDensity: 3.33, electricityAccess: 90, internetPenetration: 62, hospitals: 6, schools: 473, waterSupply: 72 },
  { district: "Sunsari", roadDensity: 2.97, electricityAccess: 86, internetPenetration: 43, hospitals: 1, schools: 53, waterSupply: 89 },
  { district: "Udayapur", roadDensity: 2.38, electricityAccess: 54, internetPenetration: 10, hospitals: 2, schools: 170, waterSupply: 36 },
  { district: "Saptari", roadDensity: 1.37, electricityAccess: 77, internetPenetration: 12, hospitals: 2, schools: 132, waterSupply: 43 },
  { district: "Siraha", roadDensity: 1.72, electricityAccess: 86, internetPenetration: 68, hospitals: 2, schools: 79, waterSupply: 87 },
  { district: "Dhanusa", roadDensity: 1.8, electricityAccess: 70, internetPenetration: 12, hospitals: 1, schools: 77, waterSupply: 41 },
  { district: "Mahottari", roadDensity: 0.72, electricityAccess: 62, internetPenetration: 30, hospitals: 4, schools: 132, waterSupply: 43 },
  { district: "Sarlahi", roadDensity: 2.42, electricityAccess: 54, internetPenetration: 28, hospitals: 1, schools: 191, waterSupply: 54 },
  { district: "Rautahat", roadDensity: 0.99, electricityAccess: 87, internetPenetration: 58, hospitals: 2, schools: 110, waterSupply: 81 },
  { district: "Bara", roadDensity: 1.36, electricityAccess: 85, internetPenetration: 38, hospitals: 1, schools: 86, waterSupply: 68 },
  { district: "Parsa", roadDensity: 2.42, electricityAccess: 43, internetPenetration: 6, hospitals: 4, schools: 118, waterSupply: 34 },
  { district: "Dolakha", roadDensity: 2.3, electricityAccess: 58, internetPenetration: 19, hospitals: 1, schools: 195, waterSupply: 53 },
  { district: "Sindhupalchok", roadDensity: 1.89, electricityAccess: 56, internetPenetration: 11, hospitals: 4, schools: 134, waterSupply: 40 },
  { district: "Rasuwa", roadDensity: 1.35, electricityAccess: 72, internetPenetration: 28, hospitals: 3, schools: 76, waterSupply: 42 },
  { district: "Nuwakot", roadDensity: 0.75, electricityAccess: 57, internetPenetration: 6, hospitals: 2, schools: 52, waterSupply: 46 },
  { district: "Dhading", roadDensity: 1.65, electricityAccess: 64, internetPenetration: 20, hospitals: 2, schools: 143, waterSupply: 36 },
  { district: "Kavrepalanchok", roadDensity: 0.25, electricityAccess: 62, internetPenetration: 25, hospitals: 2, schools: 177, waterSupply: 63 },
  { district: "Bhaktapur", roadDensity: 4.67, electricityAccess: 98, internetPenetration: 83, hospitals: 5, schools: 392, waterSupply: 98 },
  { district: "Lalitpur", roadDensity: 4.71, electricityAccess: 99, internetPenetration: 78, hospitals: 6, schools: 275, waterSupply: 98 },
  { district: "Kathmandu", roadDensity: 5.39, electricityAccess: 96, internetPenetration: 86, hospitals: 12, schools: 450, waterSupply: 95 },
  { district: "Chitwan", roadDensity: 3.66, electricityAccess: 91, internetPenetration: 50, hospitals: 7, schools: 301, waterSupply: 72 },
  { district: "Makwanpur", roadDensity: 0.72, electricityAccess: 75, internetPenetration: 36, hospitals: 4, schools: 135, waterSupply: 33 },
  { district: "Sindhuli", roadDensity: 0.22, electricityAccess: 69, internetPenetration: 35, hospitals: 4, schools: 90, waterSupply: 54 },
  { district: "Ramechhap", roadDensity: 0.92, electricityAccess: 62, internetPenetration: 22, hospitals: 2, schools: 118, waterSupply: 47 },
  { district: "Gorkha", roadDensity: 0.4, electricityAccess: 59, internetPenetration: 23, hospitals: 4, schools: 117, waterSupply: 64 },
  { district: "Lamjung", roadDensity: 2.25, electricityAccess: 70, internetPenetration: 25, hospitals: 2, schools: 123, waterSupply: 64 },
  { district: "Tanahun", roadDensity: 0.71, electricityAccess: 65, internetPenetration: 19, hospitals: 1, schools: 124, waterSupply: 41 },
  { district: "Syangja", roadDensity: 2.31, electricityAccess: 83, internetPenetration: 25, hospitals: 3, schools: 53, waterSupply: 59 },
  { district: "Kaski", roadDensity: 3.87, electricityAccess: 86, internetPenetration: 47, hospitals: 2, schools: 294, waterSupply: 76 },
  { district: "Manang", roadDensity: 1.26, electricityAccess: 69, internetPenetration: 11, hospitals: 3, schools: 97, waterSupply: 36 },
  { district: "Mustang", roadDensity: 0.24, electricityAccess: 84, internetPenetration: 39, hospitals: 4, schools: 174, waterSupply: 62 },
  { district: "Myagdi", roadDensity: 1.18, electricityAccess: 88, internetPenetration: 61, hospitals: 3, schools: 192, waterSupply: 86 },
  { district: "Parbat", roadDensity: 1.93, electricityAccess: 46, internetPenetration: 30, hospitals: 2, schools: 146, waterSupply: 62 },
  { district: "Baglung", roadDensity: 1.04, electricityAccess: 81, internetPenetration: 20, hospitals: 4, schools: 72, waterSupply: 60 },
  { district: "Nawalpur", roadDensity: 1.88, electricityAccess: 47, internetPenetration: 29, hospitals: 2, schools: 66, waterSupply: 53 },
  { district: "Gulmi", roadDensity: 2.04, electricityAccess: 43, internetPenetration: 17, hospitals: 3, schools: 121, waterSupply: 39 },
  { district: "Palpa", roadDensity: 0.59, electricityAccess: 71, internetPenetration: 5, hospitals: 3, schools: 138, waterSupply: 42 },
  { district: "Nawalparasi (Bardaghat Susta East)", roadDensity: 1.83, electricityAccess: 71, internetPenetration: 9, hospitals: 2, schools: 159, waterSupply: 37 },
  { district: "Nawalparasi (Bardaghat Susta West)", roadDensity: 1.79, electricityAccess: 89, internetPenetration: 49, hospitals: 3, schools: 64, waterSupply: 87 },
  { district: "Rupandehi", roadDensity: 3.54, electricityAccess: 94, internetPenetration: 65, hospitals: 5, schools: 317, waterSupply: 82 },
  { district: "Kapilvastu", roadDensity: 0.79, electricityAccess: 73, internetPenetration: 32, hospitals: 4, schools: 63, waterSupply: 36 },
  { district: "Arghakhanchi", roadDensity: 1.81, electricityAccess: 58, internetPenetration: 35, hospitals: 1, schools: 132, waterSupply: 64 },
  { district: "Dang", roadDensity: 1.88, electricityAccess: 86, internetPenetration: 59, hospitals: 4, schools: 198, waterSupply: 89 },
  { district: "Pyuthan", roadDensity: 2.19, electricityAccess: 57, internetPenetration: 5, hospitals: 2, schools: 94, waterSupply: 34 },
  { district: "Rolpa", roadDensity: 0.85, electricityAccess: 50, internetPenetration: 23, hospitals: 2, schools: 103, waterSupply: 59 },
  { district: "Rukum East", roadDensity: 1.83, electricityAccess: 77, internetPenetration: 20, hospitals: 1, schools: 121, waterSupply: 67 },
  { district: "Rukum West", roadDensity: 1.74, electricityAccess: 67, internetPenetration: 38, hospitals: 2, schools: 86, waterSupply: 57 },
  { district: "Salyan", roadDensity: 0.35, electricityAccess: 43, internetPenetration: 11, hospitals: 2, schools: 138, waterSupply: 33 },
  { district: "Banke", roadDensity: 2.53, electricityAccess: 90, internetPenetration: 68, hospitals: 1, schools: 155, waterSupply: 85 },
  { district: "Bardiya", roadDensity: 1.53, electricityAccess: 45, internetPenetration: 38, hospitals: 4, schools: 104, waterSupply: 68 },
  { district: "Surkhet", roadDensity: 1.95, electricityAccess: 82, internetPenetration: 13, hospitals: 4, schools: 138, waterSupply: 38 },
  { district: "Dailekh", roadDensity: 1.06, electricityAccess: 64, internetPenetration: 34, hospitals: 1, schools: 145, waterSupply: 35 },
  { district: "Jajarkot", roadDensity: 0.47, electricityAccess: 58, internetPenetration: 7, hospitals: 1, schools: 128, waterSupply: 44 },
  { district: "Dolpa", roadDensity: 1.82, electricityAccess: 54, internetPenetration: 32, hospitals: 1, schools: 71, waterSupply: 68 },
  { district: "Jumla", roadDensity: 1.6, electricityAccess: 64, internetPenetration: 20, hospitals: 1, schools: 115, waterSupply: 59 },
  { district: "Kalikot", roadDensity: 0.85, electricityAccess: 63, internetPenetration: 7, hospitals: 1, schools: 163, waterSupply: 55 },
  { district: "Mugu", roadDensity: 2.24, electricityAccess: 70, internetPenetration: 13, hospitals: 2, schools: 76, waterSupply: 53 },
  { district: "Humla", roadDensity: 2.09, electricityAccess: 65, internetPenetration: 11, hospitals: 2, schools: 109, waterSupply: 58 },
  { district: "Kailali", roadDensity: 1.7, electricityAccess: 71, internetPenetration: 16, hospitals: 3, schools: 193, waterSupply: 61 },
  { district: "Achham", roadDensity: 1.78, electricityAccess: 45, internetPenetration: 6, hospitals: 2, schools: 162, waterSupply: 53 },
  { district: "Doti", roadDensity: 0.43, electricityAccess: 45, internetPenetration: 8, hospitals: 2, schools: 190, waterSupply: 56 },
  { district: "Bajhang", roadDensity: 0.49, electricityAccess: 63, internetPenetration: 15, hospitals: 4, schools: 154, waterSupply: 63 },
  { district: "Bajura", roadDensity: 0.66, electricityAccess: 71, internetPenetration: 8, hospitals: 1, schools: 109, waterSupply: 68 },
  { district: "Kanchanpur", roadDensity: 0.3, electricityAccess: 64, internetPenetration: 14, hospitals: 3, schools: 191, waterSupply: 65 },
  { district: "Dadeldhura", roadDensity: 2.4, electricityAccess: 87, internetPenetration: 63, hospitals: 3, schools: 195, waterSupply: 88 },
  { district: "Baitadi", roadDensity: 0.22, electricityAccess: 76, internetPenetration: 27, hospitals: 2, schools: 101, waterSupply: 68 },
  { district: "Darchula", roadDensity: 2.14, electricityAccess: 84, internetPenetration: 5, hospitals: 1, schools: 180, waterSupply: 37 },
];

export const getTopRoadDensityDistricts = (count: number = 10): InfrastructureData[] => {
  return [...infrastructureData].sort((a, b) => b.roadDensity - a.roadDensity).slice(0, count);
};

export const getTopInternetPenetrationDistricts = (count: number = 10): InfrastructureData[] => {
  return [...infrastructureData].sort((a, b) => b.internetPenetration - a.internetPenetration).slice(0, count);
};

export const getLowestElectricityAccessDistricts = (count: number = 10): InfrastructureData[] => {
  return [...infrastructureData].sort((a, b) => a.electricityAccess - b.electricityAccess).slice(0, count);
};

export const getMostHospitalsPerCapitaDistricts = (count: number = 10): InfrastructureData[] => {
  return [...infrastructureData].sort((a, b) => b.hospitals - a.hospitals).slice(0, count);
};
