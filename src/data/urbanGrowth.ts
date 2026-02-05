export interface UrbanGrowthData {
  district: string;
  urbanExtentPct: number;
}

export const urbanGrowthData: UrbanGrowthData[] = [
  { district: "Taplejung", urbanExtentPct: 7.71 },
  { district: "Sankhuwasabha", urbanExtentPct: 6.42 },
  { district: "Solukhumbu", urbanExtentPct: 8.78 },
  { district: "Okhaldhunga", urbanExtentPct: 3.22 },
  { district: "Khotang", urbanExtentPct: 8.66 },
  { district: "Bhojpur", urbanExtentPct: 6.96 },
  { district: "Dhankuta", urbanExtentPct: 5.08 },
  { district: "Terhathum", urbanExtentPct: 3.33 },
  { district: "Panchthar", urbanExtentPct: 9.93 },
  { district: "Ilam", urbanExtentPct: 3.05 },
  { district: "Jhapa", urbanExtentPct: 21.55 },
  { district: "Morang", urbanExtentPct: 21.2 },
  { district: "Sunsari", urbanExtentPct: 15.66 },
  { district: "Udayapur", urbanExtentPct: 6.46 },
  { district: "Saptari", urbanExtentPct: 23.93 },
  { district: "Siraha", urbanExtentPct: 15.93 },
  { district: "Dhanusa", urbanExtentPct: 24.61 },
  { district: "Mahottari", urbanExtentPct: 17.87 },
  { district: "Sarlahi", urbanExtentPct: 11.4 },
  { district: "Rautahat", urbanExtentPct: 22.2 },
  { district: "Bara", urbanExtentPct: 13.18 },
  { district: "Parsa", urbanExtentPct: 18.32 },
  { district: "Dolakha", urbanExtentPct: 5.05 },
  { district: "Sindhupalchok", urbanExtentPct: 8.71 },
  { district: "Rasuwa", urbanExtentPct: 8.8 },
  { district: "Nuwakot", urbanExtentPct: 4.55 },
  { district: "Dhading", urbanExtentPct: 7.51 },
  { district: "Kavrepalanchok", urbanExtentPct: 3.67 },
  { district: "Bhaktapur", urbanExtentPct: 38.23 },
  { district: "Lalitpur", urbanExtentPct: 31.94 },
  { district: "Kathmandu", urbanExtentPct: 32.88 },
  { district: "Chitwan", urbanExtentPct: 10.12 },
  { district: "Makwanpur", urbanExtentPct: 6.34 },
  { district: "Sindhuli", urbanExtentPct: 3.54 },
  { district: "Ramechhap", urbanExtentPct: 4.65 },
  { district: "Gorkha", urbanExtentPct: 3.05 },
  { district: "Lamjung", urbanExtentPct: 9.29 },
  { district: "Tanahun", urbanExtentPct: 6.87 },
  { district: "Syangja", urbanExtentPct: 4.17 },
  { district: "Kaski", urbanExtentPct: 17.29 },
  { district: "Manang", urbanExtentPct: 1.86 },
  { district: "Mustang", urbanExtentPct: 0.6 },
  { district: "Myagdi", urbanExtentPct: 6.67 },
  { district: "Parbat", urbanExtentPct: 7.48 },
  { district: "Baglung", urbanExtentPct: 8.6 },
  { district: "Nawalpur", urbanExtentPct: 8.84 },
  { district: "Gulmi", urbanExtentPct: 4.77 },
  { district: "Palpa", urbanExtentPct: 9.78 },
  { district: "Nawalparasi (Bardaghat Susta East)", urbanExtentPct: 6.26 },
  { district: "Nawalparasi (Bardaghat Susta West)", urbanExtentPct: 4.85 },
  { district: "Rupandehi", urbanExtentPct: 18.24 },
  { district: "Kapilvastu", urbanExtentPct: 15.66 },
  { district: "Arghakhanchi", urbanExtentPct: 4.43 },
  { district: "Dang", urbanExtentPct: 17.15 },
  { district: "Pyuthan", urbanExtentPct: 9.57 },
  { district: "Rolpa", urbanExtentPct: 8.86 },
  { district: "Rukum East", urbanExtentPct: 6.03 },
  { district: "Rukum West", urbanExtentPct: 8.01 },
  { district: "Salyan", urbanExtentPct: 8.96 },
  { district: "Banke", urbanExtentPct: 3.55 },
  { district: "Bardiya", urbanExtentPct: 5.87 },
  { district: "Surkhet", urbanExtentPct: 7.49 },
  { district: "Dailekh", urbanExtentPct: 9.84 },
  { district: "Jajarkot", urbanExtentPct: 7.94 },
  { district: "Dolpa", urbanExtentPct: 2.09 },
  { district: "Jumla", urbanExtentPct: 4.44 },
  { district: "Kalikot", urbanExtentPct: 5.05 },
  { district: "Mugu", urbanExtentPct: 0.9 },
  { district: "Humla", urbanExtentPct: 1.26 },
  { district: "Kailali", urbanExtentPct: 15.19 },
  { district: "Achham", urbanExtentPct: 9.71 },
  { district: "Doti", urbanExtentPct: 3.11 },
  { district: "Bajhang", urbanExtentPct: 5.19 },
  { district: "Bajura", urbanExtentPct: 3.34 },
  { district: "Kanchanpur", urbanExtentPct: 9.12 },
  { district: "Dadeldhura", urbanExtentPct: 7.86 },
  { district: "Baitadi", urbanExtentPct: 8.79 },
  { district: "Darchula", urbanExtentPct: 9.43 },
];

export const getTopUrbanDistricts = (count: number = 10): UrbanGrowthData[] => {
  return [...urbanGrowthData].sort((a, b) => b.urbanExtentPct - a.urbanExtentPct).slice(0, count);
};

export const getLowUrbanDistricts = (count: number = 10): UrbanGrowthData[] => {
  return [...urbanGrowthData].sort((a, b) => a.urbanExtentPct - b.urbanExtentPct).slice(0, count);
};

export const getNationalAvgUrbanExtent = (): number => {
  const total = urbanGrowthData.reduce((sum, d) => sum + d.urbanExtentPct, 0);
  return total / urbanGrowthData.length;
};
