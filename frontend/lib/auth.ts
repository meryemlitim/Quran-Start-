import api from "./axios";

export const registerUser = async (data: {
  parentName: string;
  email: string;
  password: string;
  phoneNumber: string;
  childName: string;
  childAge: number;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

