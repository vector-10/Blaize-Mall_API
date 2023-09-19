import axios from "axios";

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_ERRORS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  //UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
} from "../constants/authContants";

const url = "http://localhost:5000";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `${url}/api/v3/register`,
      userData,
      config
    );
    console.log(userData);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${url}/api/v3/login`,
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${url}/api/v3/me`, {
      withCredentials: true,
      credentials: "include",
    });
    //console.log(data);

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
    //console.log(data.user);
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${url}/api/v3/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(
      `${url}/api/v3/me/update`,
      userData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
