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

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};


