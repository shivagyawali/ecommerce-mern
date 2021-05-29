import axios from "axios";

export const createProduct = async (data) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post("/api/product", data, config);
  return response;
};
