import api from "./axios"

export const getMyProgress = async() => {
    const myProgress = await api.get("/progress/me");
    console.log(myProgress.data);
    return myProgress.data;
}

export const updateStep = async (step: string) => {
  const res = await api.patch("/progress/step", { step });
  return res.data;
};

export const nextAya = async () => {
  const res = await api.patch("/progress/aya");
  return res.data;
};