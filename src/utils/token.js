export const token = {
  getAccessToken: () => localStorage.getItem("access_token"),

  getRefreshToken: () => localStorage.getItem("refresh_token"),

  setTokens: (accessToken, refreshToken, tokenType) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("token_type", tokenType);
  },

  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
  },
};
