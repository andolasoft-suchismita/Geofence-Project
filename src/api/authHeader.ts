import store from '../redux/store';

export function authHeader() {
  // return authorization header with jwt token
  const state = store.getState();

  let accessToken = state?.authSlice?.token;

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    return {};
  }
}
