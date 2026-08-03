import api from "./api";
import API from "./endpoints";

export const login = (data) => api.post(API.AUTH.LOGIN, data);

export const register = (data) => api.post(API.AUTH.REGISTER, data);

export const logout = () => api.post(API.AUTH.LOGOUT);
