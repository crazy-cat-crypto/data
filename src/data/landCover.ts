export interface LandCoverData {
  district: string;
  forestPct: number;
  croplandPct: number;
  grasslandPct: number;
  urbanPct: number;
  waterPct: number;
  barrenPct: number;
}

export const landCoverData: LandCoverData[] = [
  { district: "Taplejung", forestPct: 40.58, croplandPct: 16.89, grasslandPct: 16.5, urbanPct: 8.69, waterPct: 5.5, barrenPct: 11.84 },
  { district: "Sankhuwasabha", forestPct: 53.35, croplandPct: 13.66, grasslandPct: 8.14, urbanPct: 7.63, waterPct: 5.52, barrenPct: 11.7 },
  { district: "Solukhumbu", forestPct: 48.86, croplandPct: 13.29, grasslandPct: 15.54, urbanPct: 5.24, waterPct: 2.99, barrenPct: 14.07 },
  { district: "Okhaldhunga", forestPct: 39.95, croplandPct: 29.97, grasslandPct: 7.58, urbanPct: 5.81, waterPct: 2.98, barrenPct: 13.71 },
  { district: "Khotang", forestPct: 47.21, croplandPct: 16.83, grasslandPct: 9.07, urbanPct: 7.84, waterPct: 5.02, barrenPct: 14.04 },
  { district: "Bhojpur", forestPct: 57.21, croplandPct: 18.4, grasslandPct: 7.26, urbanPct: 4.21, waterPct: 1.58, barrenPct: 11.33 },
  { district: "Dhankuta", forestPct: 42.16, croplandPct: 26.28, grasslandPct: 7.33, urbanPct: 5.69, waterPct: 3.81, barrenPct: 14.74 },
  { district: "Terhathum", forestPct: 44.77, croplandPct: 15.45, grasslandPct: 12.76, urbanPct: 7.41, waterPct: 4.99, barrenPct: 14.62 },
  { district: "Panchthar", forestPct: 53.65, croplandPct: 19.73, grasslandPct: 13.57, urbanPct: 3.18, waterPct: 1.97, barrenPct: 7.9 },
  { district: "Ilam", forestPct: 45.17, croplandPct: 32.38, grasslandPct: 6.57, urbanPct: 4.39, waterPct: 2, barrenPct: 9.49 },
  { district: "Jhapa", forestPct: 29.78, croplandPct: 46.51, grasslandPct: 7.7, urbanPct: 6.9, waterPct: 4.89, barrenPct: 4.22 },
  { district: "Morang", forestPct: 25.12, croplandPct: 51.91, grasslandPct: 7.52, urbanPct: 8.76, waterPct: 4.23, barrenPct: 2.46 },
  { district: "Sunsari", forestPct: 18.97, croplandPct: 53.14, grasslandPct: 8.56, urbanPct: 13.79, waterPct: 3.34, barrenPct: 2.2 },
  { district: "Udayapur", forestPct: 44.12, croplandPct: 20.84, grasslandPct: 10.67, urbanPct: 8.2, waterPct: 4.98, barrenPct: 11.19 },
  { district: "Saptari", forestPct: 17.48, croplandPct: 54.79, grasslandPct: 9.3, urbanPct: 11.59, waterPct: 2.61, barrenPct: 4.23 },
  { district: "Siraha", forestPct: 24.12, croplandPct: 50.21, grasslandPct: 8, urbanPct: 10.78, waterPct: 3.65, barrenPct: 3.24 },
  { district: "Dhanusa", forestPct: 18.21, croplandPct: 53.22, grasslandPct: 9.58, urbanPct: 14.6, waterPct: 2.52, barrenPct: 1.87 },
  { district: "Mahottari", forestPct: 29.97, croplandPct: 45.88, grasslandPct: 9.55, urbanPct: 9.51, waterPct: 3.08, barrenPct: 2.01 },
  { district: "Sarlahi", forestPct: 23.39, croplandPct: 52.88, grasslandPct: 9.65, urbanPct: 6.09, waterPct: 3.39, barrenPct: 4.6 },
  { district: "Rautahat", forestPct: 27.94, croplandPct: 49.66, grasslandPct: 9.39, urbanPct: 6.94, waterPct: 3.56, barrenPct: 2.51 },
  { district: "Bara", forestPct: 27.16, croplandPct: 52.83, grasslandPct: 5.5, urbanPct: 9.76, waterPct: 3.58, barrenPct: 1.17 },
  { district: "Parsa", forestPct: 33.08, croplandPct: 46.72, grasslandPct: 7.52, urbanPct: 8.66, waterPct: 2.35, barrenPct: 1.67 },
  { district: "Dolakha", forestPct: 38.24, croplandPct: 24.09, grasslandPct: 9.41, urbanPct: 7.42, waterPct: 3.63, barrenPct: 17.2 },
  { district: "Sindhupalchok", forestPct: 45.94, croplandPct: 21.69, grasslandPct: 7.19, urbanPct: 9.51, waterPct: 1.37, barrenPct: 14.3 },
  { district: "Rasuwa", forestPct: 37.6, croplandPct: 30.61, grasslandPct: 13.5, urbanPct: 6.26, waterPct: 2.88, barrenPct: 9.16 },
  { district: "Nuwakot", forestPct: 42.32, croplandPct: 25.63, grasslandPct: 13.85, urbanPct: 4.73, waterPct: 3.8, barrenPct: 9.68 },
  { district: "Dhading", forestPct: 56.6, croplandPct: 22.32, grasslandPct: 11.04, urbanPct: 3.07, waterPct: 1.74, barrenPct: 5.23 },
  { district: "Kavrepalanchok", forestPct: 48.27, croplandPct: 13.56, grasslandPct: 16.78, urbanPct: 4.19, waterPct: 4.96, barrenPct: 12.24 },
  { district: "Bhaktapur", forestPct: 26.26, croplandPct: 27.29, grasslandPct: 3.96, urbanPct: 37.15, waterPct: 1.45, barrenPct: 3.9 },
  { district: "Lalitpur", forestPct: 27.01, croplandPct: 28.16, grasslandPct: 6.96, urbanPct: 34.2, waterPct: 2.07, barrenPct: 1.59 },
  { district: "Kathmandu", forestPct: 32.24, croplandPct: 25.47, grasslandPct: 5.54, urbanPct: 32.83, waterPct: 2.33, barrenPct: 1.59 },
  { district: "Chitwan", forestPct: 46.4, croplandPct: 21.39, grasslandPct: 11.1, urbanPct: 4.66, waterPct: 1.76, barrenPct: 14.69 },
  { district: "Makwanpur", forestPct: 51.09, croplandPct: 26.94, grasslandPct: 6.47, urbanPct: 2.74, waterPct: 2.02, barrenPct: 10.73 },
  { district: "Sindhuli", forestPct: 50.45, croplandPct: 26.27, grasslandPct: 7.72, urbanPct: 6.75, waterPct: 2.96, barrenPct: 5.85 },
  { district: "Ramechhap", forestPct: 46.68, croplandPct: 28.55, grasslandPct: 9.28, urbanPct: 4.92, waterPct: 2.18, barrenPct: 8.39 },
  { district: "Gorkha", forestPct: 45.82, croplandPct: 25.09, grasslandPct: 11.5, urbanPct: 4.89, waterPct: 2.24, barrenPct: 10.45 },
  { district: "Lamjung", forestPct: 55.44, croplandPct: 21.13, grasslandPct: 5.64, urbanPct: 2.27, waterPct: 3.62, barrenPct: 11.9 },
  { district: "Tanahun", forestPct: 47.88, croplandPct: 16.19, grasslandPct: 10.88, urbanPct: 7.99, waterPct: 4.04, barrenPct: 13.02 },
  { district: "Syangja", forestPct: 50.23, croplandPct: 22.62, grasslandPct: 10.45, urbanPct: 2.86, waterPct: 2.77, barrenPct: 11.07 },
  { district: "Kaski", forestPct: 51.55, croplandPct: 24.52, grasslandPct: 12.26, urbanPct: 1.97, waterPct: 2.05, barrenPct: 7.64 },
  { district: "Manang", forestPct: 13.44, croplandPct: 2.15, grasslandPct: 17.59, urbanPct: 1.9, waterPct: 3.41, barrenPct: 61.5 },
  { district: "Mustang", forestPct: 12.92, croplandPct: 4.13, grasslandPct: 22.85, urbanPct: 1.72, waterPct: 1.62, barrenPct: 56.75 },
  { district: "Myagdi", forestPct: 44.58, croplandPct: 16.95, grasslandPct: 14.2, urbanPct: 7.17, waterPct: 2.63, barrenPct: 14.46 },
  { district: "Parbat", forestPct: 51.79, croplandPct: 21.67, grasslandPct: 10.24, urbanPct: 1.99, waterPct: 1.05, barrenPct: 13.26 },
  { district: "Baglung", forestPct: 47.09, croplandPct: 18.6, grasslandPct: 15.78, urbanPct: 6.2, waterPct: 3.54, barrenPct: 8.79 },
  { district: "Nawalpur", forestPct: 56.42, croplandPct: 16.13, grasslandPct: 5.77, urbanPct: 4.96, waterPct: 3.72, barrenPct: 12.99 },
  { district: "Gulmi", forestPct: 49.79, croplandPct: 19.89, grasslandPct: 11.74, urbanPct: 3.82, waterPct: 1.23, barrenPct: 13.54 },
  { district: "Palpa", forestPct: 55.78, croplandPct: 16.95, grasslandPct: 12.59, urbanPct: 4.34, waterPct: 3.17, barrenPct: 7.17 },
  { district: "Nawalparasi (Bardaghat Susta East)", forestPct: 53.77, croplandPct: 19.24, grasslandPct: 9.75, urbanPct: 5.22, waterPct: 2.43, barrenPct: 9.59 },
  { district: "Nawalparasi (Bardaghat Susta West)", forestPct: 48.99, croplandPct: 24.69, grasslandPct: 8.72, urbanPct: 6.18, waterPct: 3.78, barrenPct: 7.64 },
  { district: "Rupandehi", forestPct: 21.25, croplandPct: 53.49, grasslandPct: 5.84, urbanPct: 13.26, waterPct: 3.91, barrenPct: 2.24 },
  { district: "Kapilvastu", forestPct: 15.17, croplandPct: 57.32, grasslandPct: 6.12, urbanPct: 13.8, waterPct: 3.7, barrenPct: 3.89 },
  { district: "Arghakhanchi", forestPct: 60.51, croplandPct: 15.3, grasslandPct: 7.87, urbanPct: 2.89, waterPct: 1.74, barrenPct: 11.69 },
  { district: "Dang", forestPct: 56.12, croplandPct: 10.82, grasslandPct: 15.11, urbanPct: 2.41, waterPct: 1.59, barrenPct: 13.95 },
  { district: "Pyuthan", forestPct: 64.83, croplandPct: 11.27, grasslandPct: 9.16, urbanPct: 2.64, waterPct: 3.52, barrenPct: 8.58 },
  { district: "Rolpa", forestPct: 45.07, croplandPct: 29.11, grasslandPct: 7.92, urbanPct: 5.89, waterPct: 3, barrenPct: 9.01 },
  { district: "Rukum East", forestPct: 53.08, croplandPct: 26.07, grasslandPct: 8.74, urbanPct: 2.07, waterPct: 3.01, barrenPct: 7.03 },
  { district: "Rukum West", forestPct: 37.79, croplandPct: 28.75, grasslandPct: 15.92, urbanPct: 5.34, waterPct: 5.46, barrenPct: 6.75 },
  { district: "Salyan", forestPct: 47.96, croplandPct: 24.91, grasslandPct: 8.45, urbanPct: 2.49, waterPct: 1.99, barrenPct: 14.2 },
  { district: "Banke", forestPct: 39.14, croplandPct: 25.06, grasslandPct: 14.82, urbanPct: 4.99, waterPct: 4.01, barrenPct: 11.97 },
  { district: "Bardiya", forestPct: 37.17, croplandPct: 24.37, grasslandPct: 15.84, urbanPct: 8.28, waterPct: 1.72, barrenPct: 12.62 },
  { district: "Surkhet", forestPct: 38.34, croplandPct: 26.48, grasslandPct: 15.31, urbanPct: 8.67, waterPct: 2.54, barrenPct: 8.66 },
  { district: "Dailekh", forestPct: 40.98, croplandPct: 29.06, grasslandPct: 13.11, urbanPct: 3.26, waterPct: 2.44, barrenPct: 11.15 },
  { district: "Jajarkot", forestPct: 45.78, croplandPct: 21.4, grasslandPct: 14.59, urbanPct: 4.24, waterPct: 1.6, barrenPct: 12.39 },
  { district: "Dolpa", forestPct: 13.16, croplandPct: 3.27, grasslandPct: 21.05, urbanPct: 1.87, waterPct: 4.82, barrenPct: 55.84 },
  { district: "Jumla", forestPct: 47.2, croplandPct: 28.01, grasslandPct: 13.45, urbanPct: 5.22, waterPct: 1.17, barrenPct: 4.95 },
  { district: "Kalikot", forestPct: 38.63, croplandPct: 26.14, grasslandPct: 14.21, urbanPct: 4.32, waterPct: 3.28, barrenPct: 13.41 },
  { district: "Mugu", forestPct: 13.33, croplandPct: 2.47, grasslandPct: 14.72, urbanPct: 1.38, waterPct: 4.19, barrenPct: 63.91 },
  { district: "Humla", forestPct: 8.24, croplandPct: 1.85, grasslandPct: 25.18, urbanPct: 1.63, waterPct: 1.95, barrenPct: 61.15 },
  { district: "Kailali", forestPct: 39.02, croplandPct: 26.67, grasslandPct: 15.93, urbanPct: 5.96, waterPct: 4.54, barrenPct: 7.88 },
  { district: "Achham", forestPct: 50.05, croplandPct: 23.72, grasslandPct: 7.38, urbanPct: 4.37, waterPct: 4.61, barrenPct: 9.87 },
  { district: "Doti", forestPct: 60.26, croplandPct: 17.16, grasslandPct: 12.46, urbanPct: 2.28, waterPct: 1.61, barrenPct: 6.23 },
  { district: "Bajhang", forestPct: 49.3, croplandPct: 25.52, grasslandPct: 5.29, urbanPct: 6.63, waterPct: 3.68, barrenPct: 9.58 },
  { district: "Bajura", forestPct: 52.55, croplandPct: 26.05, grasslandPct: 6.23, urbanPct: 4.07, waterPct: 2.41, barrenPct: 8.69 },
  { district: "Kanchanpur", forestPct: 47.48, croplandPct: 18.86, grasslandPct: 9.87, urbanPct: 7.1, waterPct: 1.8, barrenPct: 14.89 },
  { district: "Dadeldhura", forestPct: 45.58, croplandPct: 19.08, grasslandPct: 6.91, urbanPct: 8.7, waterPct: 2.75, barrenPct: 16.99 },
  { district: "Baitadi", forestPct: 56.97, croplandPct: 23.65, grasslandPct: 5.76, urbanPct: 3.64, waterPct: 3.29, barrenPct: 6.71 },
  { district: "Darchula", forestPct: 38.12, croplandPct: 25.11, grasslandPct: 12.72, urbanPct: 6.57, waterPct: 4.21, barrenPct: 13.27 },
];

export const getTopForestDistricts = (count: number = 10): LandCoverData[] => {
  return [...landCoverData].sort((a, b) => b.forestPct - a.forestPct).slice(0, count);
};

export const getTopUrbanDistricts = (count: number = 10): LandCoverData[] => {
  return [...landCoverData].sort((a, b) => b.urbanPct - a.urbanPct).slice(0, count);
};

export const getTopCroplandDistricts = (count: number = 10): LandCoverData[] => {
  return [...landCoverData].sort((a, b) => b.croplandPct - a.croplandPct).slice(0, count);
};

export const getTopBarrenDistricts = (count: number = 10): LandCoverData[] => {
  return [...landCoverData].sort((a, b) => b.barrenPct - a.barrenPct).slice(0, count);
};
