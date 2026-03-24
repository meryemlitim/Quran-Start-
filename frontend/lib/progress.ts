import api from "./axios"

export const getMyProgress = async() => {
    const myProgress = await api.get("/progress/me");
    console.log(myProgress.data);
    return myProgress.data;
}