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
