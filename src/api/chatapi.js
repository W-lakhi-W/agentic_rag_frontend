import api from "./api";
import API from "./endpoints";

export const getChats = () => api.get(API.CHAT.LIST);

export const createChat = (title) =>
  api.post(API.CHAT.CREATE, null, {
    params: { title },
  });

export const getMessages = (id) => api.get(API.CHAT.MESSAGES(id));

export const deleteChat = (id) => api.delete(API.CHAT.DELETE(id));

export const sendMessage = (id, message) =>
  api.post(API.CHAT.MESSAGE(id), {
    message,
  });
