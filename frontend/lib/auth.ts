import api from "./axios";
import Cookies from "js-cookie";

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

export const saveSession = (token: string, user: object) => {
  Cookies.set("token", token, { expires: 7 });
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
};

