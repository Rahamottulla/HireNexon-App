import axios from "axios";

export const getDashboard = async () => {
  const res = await axios.get("/api/university/dashboard");
  return res.data;
};