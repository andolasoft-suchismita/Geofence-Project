// import { userActions } from "./actions/userAction";
import instance from "./api";
import TokenService from "./tokenService";

 
const setup = (store, router) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  const { dispatch } = store;
 
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err?.config;
      if (originalConfig?.url !== "/" && err?.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
        //   dispatch(userActions.logout());
          // router.push("/signin");
          // const rs = await instance.post("users/refresh", {
          //   refresh_token: TokenService.getLocalRefreshToken(),
          // });
          // const { access_token, refresh_token } = rs?.data;
          // if (rs?.data?.detail === "Token has expired") {
 
          //   dispatch(userActions.logout());
          // } else {
          //   TokenService?.updateLocalAccessToken(access_token);
          //   return instance(originalConfig);
          // }
        }
      }
      return Promise.reject(err);
    },
  );
};
export default setup;
 
 