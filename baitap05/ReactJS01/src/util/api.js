import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
  const URL_API = "/v1/api/register";
  const data = { name, email, password };
  return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = { email, password };
  return axios.post(URL_API, data);
};

const getUserApi = () => {
  const URL_API = "/v1/api/user";
  return axios.get(URL_API);
};


const getProductsApi = (category, page = 1, limit = 10) => {
  const URL_API = "/v1/api/products";
  const params = { page, limit };
  if (category) {
    params.category = category;
  }
  return axios.get(URL_API, { params });
};

const getCategoriesApi = () => {
  return axios.get("/v1/api/categories");
};

export { createUserApi, loginApi, getUserApi, getCategoriesApi, getProductsApi};