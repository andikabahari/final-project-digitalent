import actionType from "./actionType.js";
import axios from "axios";

export const fetchUserAuth = () => (dispatch, getState) => {
  dispatch(authLoading());

  const config = {
    headers: {
      "x-auth-token": getState().auth.token
    }
  };

  axios
    .post("/api/auth/user", {}, config)
    .then(response => {
      const { data } = response.data;
      dispatch(fetchUserAuthSuccess(data));
    })
    .catch(error => dispatch(fetchUserAuthFailure(error.message)));
};

export const fetchUserAuthSuccess = user => ({
  type: actionType.FETCH_USER_AUTH_SUCCESS,
  payload: user
});

export const fetchUserAuthFailure = error => ({
  type: actionType.FETCH_USER_AUTH_FAILURE,
  payload: error
});

export const register = newUser => dispatch => {
  dispatch(authLoading());

  axios
    .post("/api/auth/register", newUser)
    .then(response => {
      const { data } = response.data;
      dispatch(registerSuccess(data));
    })
    .catch(error => dispatch(registerFailure(error.message)));
};

export const registerSuccess = user => ({
  type: actionType.REGISTER_SUCCESS,
  payload: user
});

export const registerFailure = error => ({
  type: actionType.REGISTER_FAILURE,
  payload: error
});

export const login = credentials => dispatch => {
  dispatch(authLoading());

  axios
    .post("/api/auth/login", credentials)
    .then(response => {
      const { data } = response.data;
      dispatch(loginSuccess(data));
    })
    .catch(error => dispatch(loginFailure(error.message)));
};

export const loginSuccess = auth => ({
  type: actionType.LOGIN_SUCCESS,
  payload: auth
});

export const loginFailure = error => ({
  type: actionType.LOGIN_FAILURE,
  payload: error
});

export const logout = () => dispatch =>
  dispatch({
    type: actionType.LOGOUT
  });

export const authLoading = () => ({
  type: actionType.AUTH_LOADING
});
