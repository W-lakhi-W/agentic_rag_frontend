const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/profile",
  },

  CHAT: {
    LIST: "api/chats",
    CREATE: "api/chat",
    MESSAGE: (id) => `api/chat/${id}`,
    DELETE: (id) => `api/chat/${id}`,
    MESSAGES: (id) => `api/chat/${id}`,
  },

  DOCUMENT: {
    LIST: "api/documents",
    UPLOAD: "api/ingest",
    DELETE: (id) => `api/documents/${id}`,
    DETAILS: (id) => `api/documents/${id}`,
  },
  USER: {
    PROFILE: "/users/profile",
    UPDATE: "/users/profile",
  },
};

export default API;
