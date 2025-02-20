const getLocalRefreshToken = () => {
    const refresh_token = JSON.parse(localStorage.getItem("refreshToken"));
    return refresh_token;
  };
  const getLocalAccessToken = () => {
    const access_token = JSON.parse(localStorage.getItem("authToken"));
    return access_token.token;
  };
  const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("authToken"));
    user = token;
    localStorage.setItem("accessToken", JSON.stringify(user));
  };
   
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
  };
  export default TokenService;