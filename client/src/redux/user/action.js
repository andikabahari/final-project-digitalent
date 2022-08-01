import actionType from "./actionType.js";
import axios from "axios";

export const fetchUsers = () => dispatch => {
  dispatch(userLoading());

  axios
    .get("/api/users")
    .then(response => {
      const { data } = response.data;
      dispatch(fetchUsersSuccess(data));
    })
    .catch(error => dispatch(fetchUsersFailure(error.message)));
};

export const fetchUsersSuccess = users => ({
  type: actionType.FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = error => ({
  type: actionType.FETCH_USERS_FAILURE,
  payload: error
});

export const addUser = newUser => dispatch => {
  dispatch(userLoading());

  axios
    .post("/api/users", newUser)
    .then(response => {
      const { data } = response.data;
      dispatch(addUserSuccess(data));
    })
    .catch(error => dispatch(addUserFailure(error.message)));
};

export const addUserSuccess = user => ({
  type: actionType.ADD_USER_SUCCESS,
  payload: user
});

export const addUserFailure = error => ({
  type: actionType.ADD_USER_FAILURE,
  payload: error
});

export const updateUser = user => dispatch => {
  dispatch(userLoading());

  axios
    .put("/api/users", user)
    .then(response => {
      const { data } = response.data;
      dispatch(updateUserSuccess(data));
    })
    .catch(error => dispatch(updateUserFailure(error.message)));
};

export const updateUserSuccess = userId => ({
  type: actionType.UPDATE_USER_SUCCESS,
  payload: userId
});

export const updateUserFailure = error => ({
  type: actionType.UPDATE_USER_FAILURE,
  payload: error
});

export const deleteUser = userId => dispatch => {
  dispatch(userLoading());

  axios
    .delete("/api/users", { data: { _id: userId } })
    .then(response => {
      const { data } = response.data;
      dispatch(deleteUserSuccess(data._id));
    })
    .catch(error => dispatch(deleteUserFailure(error.message)));
};

export const deleteUserSuccess = userId => ({
  type: actionType.DELETE_USER_SUCCESS,
  payload: userId
});

export const deleteUserFailure = error => ({
  type: actionType.DELETE_USER_FAILURE,
  payload: error
});

export const userLoading = () => ({
  type: actionType.USER_LOADING
});
