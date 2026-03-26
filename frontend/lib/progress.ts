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

export const nextAya = async (soratNumber:number) => {
  const res = await api.patch(`/progress/aya/${soratNumber}`);
  return res.data;
};

export const completeSorah = async (soratNumber:number) => {
  const res = await api.put(`/progress/complete-sorah/${soratNumber}`);
  console.log("lasta soraaaaaaaaaaaaaah");
  return res.data;
}