import store from '../redux/store';

export function authHeader() {
  // return authorization header with jwt token
  const state = store.getState();

  let accessToken = state?.authSlice?.token;

  console.log("Token from Redux:", accessToken);
  
  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
}
