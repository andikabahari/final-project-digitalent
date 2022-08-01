import actionType from "./actionType";

const initialState = {
  isLoading: false,
  users: [],
  error: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionType.FETCH_USERS_SUCCESS:
      return {
        isLoading: false,
        users: action.payload,
        error: ""
      };
    case actionType.FETCH_USERS_FAILURE:
      return {
        isLoading: false,
        users: [],
        error: action.payload
      };
    case actionType.ADD_USER_SUCCESS:
      return {
        isLoading: false,
        users: [action.payload, ...state.users],
        error: ""
      };
    case actionType.ADD_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.UPDATE_USER_SUCCESS:
      const index = state.users.findIndex(
        user => user._id === action.payload._id
      );
      if (index !== -1) state.users[index] = action.payload;
      return {
        ...state,
        isLoading: false,
        error: ""
      };
    case actionType.UPDATE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.DELETE_USER_SUCCESS:
      return {
        isLoading: false,
        users: state.users.filter(user => user._id !== action.payload),
        error: ""
      };
    case actionType.DELETE_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default user;
