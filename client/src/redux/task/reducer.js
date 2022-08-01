import actionType from "./actionType";

const initialState = {
  isLoading: false,
  tasks: [],
  error: ""
};

const task = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TASK_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case actionType.FETCH_TASKS_SUCCESS:
      return {
        isLoading: false,
        tasks: action.payload,
        error: ""
      };
    case actionType.FETCH_TASKS_FAILURE:
      return {
        isLoading: false,
        tasks: [],
        error: action.payload
      };
    case actionType.ADD_TASK_SUCCESS:
      return {
        isLoading: false,
        tasks: [action.payload, ...state.tasks],
        error: ""
      };
    case actionType.ADD_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.UPDATE_TASK_SUCCESS:
      const index = state.tasks.findIndex(
        task => task._id === action.payload._id
      );
      if (index !== -1) state.tasks[index] = action.payload;
      return {
        ...state,
        isLoading: false,
        error: ""
      };
    case actionType.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionType.DELETE_TASK_SUCCESS:
      return {
        isLoading: false,
        tasks: state.tasks.filter(task => task._id !== action.payload),
        error: ""
      };
    case actionType.DELETE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default task;
