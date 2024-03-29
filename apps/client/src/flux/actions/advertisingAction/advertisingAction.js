import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import {
  AD_LIST_FAIL,
  AD_LIST_REQUEST,
  AD_LIST_SUCCESS,
  AD_PROFILE_FAIL,
  AD_PROFILE_REQUEST,
  AD_PROFILE_SUCCESS,
  DELETE_AD_PROFILE_FAIL,
  DELETE_AD_PROFILE_REQUEST,
  DELETE_AD_PROFILE_SUCCESS,
  FETCH_MESSAGE_FAIL,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FILTER_BUSINESS_FAIL,
  FILTER_BUSINESS_REQUEST,
  FILTER_BUSINESS_SUCCESS,
  OPEN_MESSAGE_REQUEST,
  OPEN_MESSAGE_SUCCESS,
  USER_ADS_FAIL,
  USER_ADS_REQUEST,
  USER_ADS_SUCCESS,
} from "../../constants/advertising";
import { logout } from "../userAction";

export const clearCardAd = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ALL_CARD_SERVICE",
  });
  localStorage.removeItem("cardDataImage");
};

export const saveServiceInfo = (data) => (dispatch) => {
  dispatch({
    type: "SAVE_SERVICE_INFO_SUCCESS",
    payload: data,
  });
};

export const freeSubscription = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "SERVICE_REGISTER_SUCCESS",
      payload: body,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post("/api/advertising/free", body, config);
    // if (res.data) {
    //   useHistory().push("/advertising/thank", { data: res.data });
    //   console.log(res)
    // }
  } catch (error) {
    console.log(error);
  }
};

export const PremiumSubscription = (id, cartData) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.put(
      `/api/advertising/premium/${id}`,
      cartData,
      config
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdService = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/advertising", config);
    dispatch({
      type: AD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterByTypeBusiness = (typeBusiness) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: FILTER_BUSINESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(
      "/api/advertising/filter-type-business",
      { typeBusiness },
      config
    );

    dispatch({
      type: FILTER_BUSINESS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILTER_BUSINESS_FAIL,
      payload: error,
    });
  }
};

export const searchCompanyName = (companyName) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: FILTER_BUSINESS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.post(
      "/api/advertising/search",
      { companyName },
      config
    );

    dispatch({
      type: FILTER_BUSINESS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILTER_BUSINESS_FAIL,
      payload: error,
    });
  }
};

export const filterBusiness = (typeBusiness) => async (dispatch) => {
  try {
    dispatch({
      type: FILTER_BUSINESS_REQUEST,
    });

    const config = {
      headers: {
        accept: "application/json",
      },
    };
    const res = await axios.post(
      "/api/advertising/filter-business",
      { typeBusiness },
      config
    );

    dispatch({
      type: FILTER_BUSINESS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FILTER_BUSINESS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAdvertisingProfileByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AD_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        accept: "application/json",
      },
    };
    const res = await axios.get(`/api/advertising/profile/${id}`, config);
    dispatch({
      type: AD_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AD_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMessageById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OPEN_MESSAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(
      `/api/advertising/message/view`,
      { id },
      config
    );
    console.log(res.data);
    dispatch({
      type: OPEN_MESSAGE_SUCCESS,
      payload: res.data,
    });
    // dispatch({
    //   type: OPEN_MESSAGE_SUCCESS,
    //   payload: res.data,
    // });
  } catch (error) {
    // dispatch({
    //   type: OPEN_MESSAGE_FAIL,
    //   payload: error,
    // });
  }
};

export const fetchAllClientMessage = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_MESSAGE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`/api/advertising/message`, config);

    dispatch({
      type: FETCH_MESSAGE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAllowService = (id, allow) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.put(`/api/advertising`, { id, allow }, config);
    if (res.data) {
      console.log("Service updated");
    }

    // dispatch({
    //   type: SERVICE_UPDATE_SUCCESS,
    //   // payload: res.data,
    // });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "SERVICE_UPDATE_FAIL",
    });
  }
};

export const deleteAdService = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_AD_PROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/advertising/profile/${id}`, config);
    dispatch({
      type: DELETE_AD_PROFILE_SUCCESS,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: DELETE_AD_PROFILE_FAIL,
    });
  }
};

export const getUserAdsService = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const res = await axios.get(`/api/advertising/user/${id}`, config);
    dispatch({
      type: USER_ADS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response;
    dispatch({
      type: USER_ADS_FAIL,
      payload: message,
    });
    console.error(error);
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
  }
};
