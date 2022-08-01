import actionType from "./actionType.js";

const initialState = {
  token: localStorage.getItem("token"),
  user: {},
  isLoading: false,
  isAuthenticated: false,
  error: ""
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionType.FETCH_USER_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: ""
      };
    case actionType.FETCH_USER_AUTH_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: ""
      };
    case actionType.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.LOGIN_SUCCESS:
      const { token, user } = action.payload;
      localStorage.setItem("token", token);
      return {
        token,
        user,
        isLoading: false,
        isAuthenticated: true,
        error: ""
      };
    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        token: "",
        user: {},
        isLoading: false,
        isAuthenticated: false,
        error: ""
      };
    default:
      return state;
  }
};

export default auth;
