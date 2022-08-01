import actionType from "./actionType.js";
import axios from "axios";

export const fetchTasks = () => (dispatch, getState) => {
  dispatch(taskLoading());

  const config = {
    headers: {
      "x-auth-token": getState().auth.token
    }
  };

  axios
    .get("/api/tasks", config)
    .then(response => {
      const { data } = response.data;
      dispatch(fetchTasksSuccess(data));
    })
    .catch(error => dispatch(fetchTasksFailure(error.message)));
};

export const fetchTasksSuccess = tasks => ({
  type: actionType.FETCH_TASKS_SUCCESS,
  payload: tasks
});

export const fetchTasksFailure = error => ({
  type: actionType.FETCH_TASKS_FAILURE,
  payload: error
});

export const addTask = newTask => dispatch => {
  dispatch(taskLoading());

  axios
    .post("/api/tasks", newTask)
    .then(response => {
      const { data } = response.data;
      dispatch(addTaskSuccess(data));
    })
    .catch(error => dispatch(addTaskFailure(error.message)));
};

export const addTaskSuccess = task => ({
  type: actionType.ADD_TASK_SUCCESS,
  payload: task
});

export const addTaskFailure = error => ({
  type: actionType.ADD_TASK_FAILURE,
  payload: error
});

export const updateTask = task => dispatch => {
  dispatch(taskLoading());

  axios
    .put("/api/tasks", task)
    .then(response => {
      const { data } = response.data;
      dispatch(updateTaskSuccess(data));
    })
    .catch(error => dispatch(updateTaskFailure(error.message)));
};

export const updateTaskSuccess = taskId => ({
  type: actionType.UPDATE_TASK_SUCCESS,
  payload: taskId
});

export const updateTaskFailure = error => ({
  type: actionType.UPDATE_TASK_FAILURE,
  payload: error
});

export const deleteTask = taskId => dispatch => {
  dispatch(taskLoading());

  axios
    .delete("/api/tasks", { data: { _id: taskId } })
    .then(response => {
      const { data } = response.data;
      dispatch(deleteTaskSuccess(data._id));
    })
    .catch(error => dispatch(deleteTaskFailure(error.message)));
};

export const deleteTaskSuccess = taskId => ({
  type: actionType.DELETE_TASK_SUCCESS,
  payload: taskId
});

export const deleteTaskFailure = error => ({
  type: actionType.DELETE_TASK_FAILURE,
  payload: error
});

export const taskLoading = () => ({
  type: actionType.TASK_LOADING
});
