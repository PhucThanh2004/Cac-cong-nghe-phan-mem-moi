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

// Thêm hàm tìm kiếm sản phẩm mới
// Cập nhật hàm này để nhận params
const searchProductsApi = (params) => {
    const URL_API = "/v1/api/products/search";
    return axios.get(URL_API, { params });
};

// Toggle yêu thích
const toggleFavoriteApi = (productId) => {
  return axios.post(`/v1/api/products/${productId}/favorite`);
};

// Sản phẩm tương tự
const getSimilarProductsApi = (productId) => {
  return axios.get(`/v1/api/products/${productId}/similar`);
};

// Thêm vào sản phẩm đã xem
const addRecentlyViewedApi = async (id) => {
  const token = localStorage.getItem("access_token");
  const res = await axios.post(
    `/v1/api/products/${id}/view`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};


// Lấy thống kê sản phẩm
const getProductStatsApi = (productId) => {
  return axios.get(`/v1/api/products/${productId}/stats`);
};
const getProductByIdApi = async (id) => {
  const res = await axios.get(`/v1/api/products/${id}`);
  return res;
};
const getRecentlyViewedApi = async () => {
  const token = localStorage.getItem("access_token");
  const res = await axios.get(`/v1/api/products/recently-viewed`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export { createUserApi, loginApi, getUserApi, getCategoriesApi, getProductsApi, searchProductsApi, toggleFavoriteApi,
  getSimilarProductsApi,
  addRecentlyViewedApi,
  getProductStatsApi,
getProductByIdApi,
getRecentlyViewedApi};