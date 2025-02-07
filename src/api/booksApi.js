import axios from "axios";

export const fetchBooks = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await axios.get("http://localhost:3010/api/books", {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log("API Response:", response.data); // مقدار دریافتی را ببین

  return response.data;
};
