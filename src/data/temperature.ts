export interface TemperatureData {
  district: string;
  temp: number;
  lstDay: number;
  lstNight: number;
  uhiIndex: number;
}

export const temperatureData: TemperatureData[] = [
  { district: "Taplejung", temp: 22.9, lstDay: 24.8, lstNight: 21.3, uhiIndex: 3.5 },
  { district: "Sankhuwasabha", temp: 24.2, lstDay: 29.6, lstNight: 18.7, uhiIndex: 10.9 },
  { district: "Solukhumbu", temp: 21.9, lstDay: 26.3, lstNight: 17.5, uhiIndex: 8.8 },
  { district: "Okhaldhunga", temp: 23.5, lstDay: 27.9, lstNight: 19, uhiIndex: 9 },
  { district: "Khotang", temp: 25.3, lstDay: 29.8, lstNight: 20.8, uhiIndex: 9 },
  { district: "Bhojpur", temp: 23.8, lstDay: 26.7, lstNight: 20.8, uhiIndex: 5.9 },
  { district: "Dhankuta", temp: 22.5, lstDay: 24.3, lstNight: 20.6, uhiIndex: 3.6 },
  { district: "Terhathum", temp: 20.9, lstDay: 24.0, lstNight: 17.8, uhiIndex: 6.3 },
  { district: "Panchthar", temp: 24.6, lstDay: 27.7, lstNight: 21.5, uhiIndex: 6.2 },
  { district: "Ilam", temp: 21.7, lstDay: 25.8, lstNight: 17.5, uhiIndex: 8.3 },
  { district: "Jhapa", temp: 28.0, lstDay: 32.0, lstNight: 24, uhiIndex: 8 },
  { district: "Morang", temp: 25.7, lstDay: 30.8, lstNight: 20.5, uhiIndex: 10.3 },
  { district: "Sunsari", temp: 28.7, lstDay: 33.5, lstNight: 23.8, uhiIndex: 9.7 },
  { district: "Udayapur", temp: 22.4, lstDay: 25.7, lstNight: 19.1, uhiIndex: 6.5 },
  { district: "Saptari", temp: 24.5, lstDay: 28.9, lstNight: 20.1, uhiIndex: 8.9 },
  { district: "Siraha", temp: 27.0, lstDay: 29.9, lstNight: 24, uhiIndex: 6 },
  { district: "Dhanusa", temp: 27.3, lstDay: 31.1, lstNight: 23.5, uhiIndex: 7.6 },
  { district: "Mahottari", temp: 24.8, lstDay: 28.4, lstNight: 21.1, uhiIndex: 7.3 },
  { district: "Sarlahi", temp: 26.9, lstDay: 30.8, lstNight: 23, uhiIndex: 7.8 },
  { district: "Rautahat", temp: 27.6, lstDay: 33.5, lstNight: 21.6, uhiIndex: 12 },
  { district: "Bara", temp: 27.8, lstDay: 33.6, lstNight: 22, uhiIndex: 11.6 },
  { district: "Parsa", temp: 28.2, lstDay: 32.8, lstNight: 23.6, uhiIndex: 9.2 },
  { district: "Dolakha", temp: 24.0, lstDay: 26.9, lstNight: 21.1, uhiIndex: 5.8 },
  { district: "Sindhupalchok", temp: 21.9, lstDay: 25.7, lstNight: 18, uhiIndex: 7.6 },
  { district: "Rasuwa", temp: 21.9, lstDay: 24.6, lstNight: 19.1, uhiIndex: 5.5 },
  { district: "Nuwakot", temp: 24.7, lstDay: 27.9, lstNight: 21.4, uhiIndex: 6.5 },
  { district: "Dhading", temp: 21.3, lstDay: 24.6, lstNight: 17.9, uhiIndex: 6.8 },
  { district: "Kavrepalanchok", temp: 23.1, lstDay: 24.5, lstNight: 21.6, uhiIndex: 2.8 },
  { district: "Bhaktapur", temp: 28.8, lstDay: 34.8, lstNight: 22.8, uhiIndex: 12 },
  { district: "Lalitpur", temp: 29.3, lstDay: 34.8, lstNight: 23.8, uhiIndex: 11 },
  { district: "Kathmandu", temp: 28.0, lstDay: 31.3, lstNight: 24.7, uhiIndex: 6.6 },
  { district: "Chitwan", temp: 24.1, lstDay: 26.3, lstNight: 21.9, uhiIndex: 4.3 },
  { district: "Makwanpur", temp: 25.0, lstDay: 28.0, lstNight: 21.9, uhiIndex: 6.1 },
  { district: "Sindhuli", temp: 23.5, lstDay: 29.8, lstNight: 17.1, uhiIndex: 12.8 },
  { district: "Ramechhap", temp: 23.3, lstDay: 26.6, lstNight: 20, uhiIndex: 6.6 },
  { district: "Gorkha", temp: 23.1, lstDay: 27.9, lstNight: 18.3, uhiIndex: 9.6 },
  { district: "Lamjung", temp: 24.2, lstDay: 28.0, lstNight: 20.3, uhiIndex: 7.7 },
  { district: "Tanahun", temp: 23.3, lstDay: 28.7, lstNight: 17.9, uhiIndex: 10.8 },
  { district: "Syangja", temp: 22.8, lstDay: 24.6, lstNight: 21, uhiIndex: 3.6 },
  { district: "Kaski", temp: 20.8, lstDay: 24.2, lstNight: 17.4, uhiIndex: 6.7 },
  { district: "Manang", temp: 14.6, lstDay: 23.6, lstNight: 5.5, uhiIndex: 18.1 },
  { district: "Mustang", temp: 13.4, lstDay: 16.9, lstNight: 9.8, uhiIndex: 7.2 },
  { district: "Myagdi", temp: 21.8, lstDay: 25.4, lstNight: 18.2, uhiIndex: 7.3 },
  { district: "Parbat", temp: 20.9, lstDay: 24.9, lstNight: 16.8, uhiIndex: 8.1 },
  { district: "Baglung", temp: 20.8, lstDay: 24.6, lstNight: 16.9, uhiIndex: 7.7 },
  { district: "Nawalpur", temp: 20.6, lstDay: 24.9, lstNight: 16.2, uhiIndex: 8.7 },
  { district: "Gulmi", temp: 24.3, lstDay: 28.4, lstNight: 20.1, uhiIndex: 8.3 },
  { district: "Palpa", temp: 21.7, lstDay: 26.7, lstNight: 16.7, uhiIndex: 9.9 },
  { district: "Nawalparasi (Bardaghat Susta East)", temp: 22.4, lstDay: 25.1, lstNight: 19.7, uhiIndex: 5.4 },
  { district: "Nawalparasi (Bardaghat Susta West)", temp: 23.0, lstDay: 25.6, lstNight: 20.3, uhiIndex: 5.4 },
  { district: "Rupandehi", temp: 25.7, lstDay: 30.2, lstNight: 21.1, uhiIndex: 9.1 },
  { district: "Kapilvastu", temp: 27.0, lstDay: 33.3, lstNight: 20.7, uhiIndex: 12.6 },
  { district: "Arghakhanchi", temp: 22.9, lstDay: 24.6, lstNight: 21.8, uhiIndex: 2.8 },
  { district: "Dang", temp: 23.3, lstDay: 29.7, lstNight: 16.8, uhiIndex: 13 },
  { district: "Pyuthan", temp: 21.4, lstDay: 24.8, lstNight: 18, uhiIndex: 6.7 },
  { district: "Rolpa", temp: 24.1, lstDay: 27.0, lstNight: 21.1, uhiIndex: 5.9 },
  { district: "Rukum East", temp: 22.4, lstDay: 27.4, lstNight: 17.3, uhiIndex: 10.1 },
  { district: "Rukum West", temp: 23.0, lstDay: 27.7, lstNight: 18.3, uhiIndex: 9.4 },
  { district: "Salyan", temp: 21.7, lstDay: 26.3, lstNight: 17.1, uhiIndex: 9.2 },
  { district: "Banke", temp: 23.2, lstDay: 29.7, lstNight: 16.7, uhiIndex: 13 },
  { district: "Bardiya", temp: 22.1, lstDay: 24.5, lstNight: 19.6, uhiIndex: 4.9 },
  { district: "Surkhet", temp: 22.2, lstDay: 27.6, lstNight: 16.8, uhiIndex: 10.8 },
  { district: "Dailekh", temp: 22.9, lstDay: 27.7, lstNight: 18, uhiIndex: 9.7 },
  { district: "Jajarkot", temp: 22.1, lstDay: 26.1, lstNight: 18, uhiIndex: 8 },
  { district: "Dolpa", temp: 15.4, lstDay: 16.2, lstNight: 14.5, uhiIndex: 1.7 },
  { district: "Jumla", temp: 22.5, lstDay: 26.1, lstNight: 18.9, uhiIndex: 7.2 },
  { district: "Kalikot", temp: 21.7, lstDay: 24.4, lstNight: 18.9, uhiIndex: 5.4 },
  { district: "Mugu", temp: 16.6, lstDay: 18.5, lstNight: 14.6, uhiIndex: 3.9 },
  { district: "Humla", temp: 15.0, lstDay: 17.6, lstNight: 12.4, uhiIndex: 5.3 },
  { district: "Kailali", temp: 24.3, lstDay: 27.0, lstNight: 21.6, uhiIndex: 5.4 },
  { district: "Achham", temp: 22.3, lstDay: 28.1, lstNight: 16.4, uhiIndex: 11.6 },
  { district: "Doti", temp: 21.4, lstDay: 25.6, lstNight: 17.1, uhiIndex: 8.4 },
  { district: "Bajhang", temp: 22.2, lstDay: 27.9, lstNight: 16.4, uhiIndex: 11.5 },
  { district: "Bajura", temp: 22.5, lstDay: 26.0, lstNight: 18.9, uhiIndex: 7.1 },
  { district: "Kanchanpur", temp: 22.5, lstDay: 28.7, lstNight: 16.2, uhiIndex: 12.5 },
  { district: "Dadeldhura", temp: 23.6, lstDay: 27.7, lstNight: 19.5, uhiIndex: 8.1 },
  { district: "Baitadi", temp: 20.7, lstDay: 24.3, lstNight: 17.1, uhiIndex: 7.2 },
  { district: "Darchula", temp: 23.2, lstDay: 28.8, lstNight: 17.6, uhiIndex: 11.2 },
];

export const getHottestDistricts = (count: number = 10): TemperatureData[] => {
  return [...temperatureData].sort((a, b) => b.lstDay - a.lstDay).slice(0, count);
};

export const getCoolestDistricts = (count: number = 10): TemperatureData[] => {
  return [...temperatureData].sort((a, b) => a.lstDay - b.lstDay).slice(0, count);
};

export const getHighestUHIDistricts = (count: number = 10): TemperatureData[] => {
  return [...temperatureData].sort((a, b) => b.uhiIndex - a.uhiIndex).slice(0, count);
};
