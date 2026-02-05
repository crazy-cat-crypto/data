export interface NightlightsData {
  district: string;
  meanNTLRadiance: number;
}

export const nightlightsData: NightlightsData[] = [
  { district: "Achham", meanNTLRadiance: 5.55 },
  { district: "Arghakhanchi", meanNTLRadiance: 13.73 },
  { district: "Baglung", meanNTLRadiance: 1.91 },
  { district: "Baitadi", meanNTLRadiance: 8.6 },
  { district: "Bajhang", meanNTLRadiance: 6.44 },
  { district: "Bajura", meanNTLRadiance: 4.8 },
  { district: "Banke", meanNTLRadiance: 23.7 },
  { district: "Bara", meanNTLRadiance: 3.55 },
  { district: "Bardiya", meanNTLRadiance: 14.57 },
  { district: "Bhaktapur", meanNTLRadiance: 45.84 },
  { district: "Bhojpur", meanNTLRadiance: 6.24 },
  { district: "Chitwan", meanNTLRadiance: 32.15 },
  { district: "Dadeldhura", meanNTLRadiance: 4.93 },
  { district: "Dailekh", meanNTLRadiance: 11.85 },
  { district: "Dang", meanNTLRadiance: 15.08 },
  { district: "Darchula", meanNTLRadiance: 2.97 },
  { district: "Dhading", meanNTLRadiance: 6.13 },
  { district: "Dhankuta", meanNTLRadiance: 14.31 },
  { district: "Dhanusa", meanNTLRadiance: 21.48 },
  { district: "Dolakha", meanNTLRadiance: 11.96 },
  { district: "Dolpa", meanNTLRadiance: 9.37 },
  { district: "Doti", meanNTLRadiance: 12.6 },
  { district: "Gorkha", meanNTLRadiance: 14.52 },
  { district: "Gulmi", meanNTLRadiance: 4.62 },
  { district: "Humla", meanNTLRadiance: 13.91 },
  { district: "Ilam", meanNTLRadiance: 11.25 },
  { district: "Jajarkot", meanNTLRadiance: 14.15 },
  { district: "Jhapa", meanNTLRadiance: 31.97 },
  { district: "Jumla", meanNTLRadiance: 2.24 },
  { district: "Kailali", meanNTLRadiance: 20.35 },
  { district: "Kalikot", meanNTLRadiance: 3.74 },
  { district: "Kanchanpur", meanNTLRadiance: 12.23 },
  { district: "Kapilvastu", meanNTLRadiance: 10.28 },
  { district: "Kaski", meanNTLRadiance: 36.17 },
  { district: "Kathmandu", meanNTLRadiance: 49.12 },
  { district: "Kavrepalanchok", meanNTLRadiance: 11.99 },
  { district: "Khotang", meanNTLRadiance: 3.18 },
  { district: "Lalitpur", meanNTLRadiance: 43.99 },
  { district: "Lamjung", meanNTLRadiance: 5.26 },
  { district: "Mahottari", meanNTLRadiance: 5.08 },
  { district: "Makwanpur", meanNTLRadiance: 17.56 },
  { district: "Manang", meanNTLRadiance: 2.37 },
  { district: "Morang", meanNTLRadiance: 23.12 },
  { district: "Mugu", meanNTLRadiance: 1.63 },
  { district: "Mustang", meanNTLRadiance: 10.58 },
  { district: "Myagdi", meanNTLRadiance: 7.16 },
  { district: "Nawalparasi", meanNTLRadiance: 8.28 },
  { district: "Nawalparasi (Bardaghat Susta East)", meanNTLRadiance: 23.27 },
  { district: "Nawalparasi (Bardaghat Susta West)", meanNTLRadiance: 25.79 },
  { district: "Nawalpur", meanNTLRadiance: 2.71 },
  { district: "Nuwakot", meanNTLRadiance: 8.2 },
  { district: "Okhaldhunga", meanNTLRadiance: 1.81 },
  { district: "Palpa", meanNTLRadiance: 5.36 },
  { district: "Panchthar", meanNTLRadiance: 13.13 },
  { district: "Parbat", meanNTLRadiance: 14.28 },
  { district: "Parsa", meanNTLRadiance: 17.75 },
  { district: "Pyuthan", meanNTLRadiance: 3.78 },
  { district: "Ramechhap", meanNTLRadiance: 7.27 },
  { district: "Rasuwa", meanNTLRadiance: 9.29 },
  { district: "Rautahat", meanNTLRadiance: 5.26 },
  { district: "Rolpa", meanNTLRadiance: 11.81 },
  { district: "Rukum East", meanNTLRadiance: 2.04 },
  { district: "Rukum West", meanNTLRadiance: 14.82 },
  { district: "Rupandehi", meanNTLRadiance: 30.93 },
  { district: "Salyan", meanNTLRadiance: 12.42 },
  { district: "Sankhuwasabha", meanNTLRadiance: 9.42 },
  { district: "Saptari", meanNTLRadiance: 2.95 },
  { district: "Sarlahi", meanNTLRadiance: 8.35 },
  { district: "Sindhuli", meanNTLRadiance: 7.86 },
  { district: "Sindhupalchok", meanNTLRadiance: 1.65 },
  { district: "Siraha", meanNTLRadiance: 9.57 },
  { district: "Solukhumbu", meanNTLRadiance: 10.91 },
  { district: "Sunsari", meanNTLRadiance: 20.41 },
  { district: "Surkhet", meanNTLRadiance: 13.53 },
  { district: "Syangja", meanNTLRadiance: 7.93 },
  { district: "Tanahun", meanNTLRadiance: 1.48 },
  { district: "Taplejung", meanNTLRadiance: 14.58 },
  { district: "Terhathum", meanNTLRadiance: 12.65 },
  { district: "Udayapur", meanNTLRadiance: 3.97 },
];

export const getBrightestDistricts = (count: number = 10): NightlightsData[] => {
  return [...nightlightsData].sort((a, b) => b.meanNTLRadiance - a.meanNTLRadiance).slice(0, count);
};

export const getDimmestDistricts = (count: number = 10): NightlightsData[] => {
  return [...nightlightsData].sort((a, b) => a.meanNTLRadiance - b.meanNTLRadiance).slice(0, count);
};

export const getNationalAvgNTL = (): number => {
  const sum = nightlightsData.reduce((acc, d) => acc + d.meanNTLRadiance, 0);
  return sum / nightlightsData.length;
};
