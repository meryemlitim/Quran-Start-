import api from "./axios"

export const getHizbs = async() => {
    const hizbs = await api.get("/quran/hizbs");
    console.log(hizbs.data);
    return hizbs.data;
}
export const getSorats = async(hizb:number) => {
    const sorats = await api.get(`http://localhost:3000/quran/sorats/${hizb}`);
    console.log(sorats.data);
    return sorats.data;
}
export const getAyats = async (sorat: number) => {
  const res = await api.get(`/quran/ayats/${sorat}`);
  return res.data;
};

export const getAudioUrl = (soratNumber: number): string => {
  return `https://server8.mp3quran.net/afs/${String(soratNumber).padStart(3, "0")}.mp3`;
};