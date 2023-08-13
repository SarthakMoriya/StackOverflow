import * as api from "../api";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllUsers();
    dispatch({ type: "FETCH_ALL_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    console.log("actions");
    const { data } = await api.updateProfile(id, updateData);
    console.log(data);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFriendOp = (userId, friendId) => async (dispatch) => {
  try {
    console.log("Trying to add friend...");
    const { data } = await api.addFriend(userId, friendId);
    //data contains updated user with friend added
    // console.log(data);
    // console.log(data?.data?.friends);
    dispatch({ type: "UPDATE_FRIENDS", payload: data?.data?.friends });
    // dispatch(fetchAllUsers());
  } catch (error) {
    console.log(error);
  }
};
export const removeFriendOp = (userId, friendId) => async (dispatch) => {
  try {
    console.log("Trying to remove friend...");
    const { data } = await api.removeFriend(userId, friendId);
    // console.log(data);
    dispatch({ type: "REMOVE_FRIENDS", payload: friendId });
    // dispatch(fetchAllUsers());
  } catch (error) {
    console.log(error);
  }
};

export const setNewSubscription = (userId, type) => async (dispatch) => {
  try {
    const { data } = await api.setSubscription(userId, type);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const setQuestionsLeft = (userId, quesLeft) => async (dispatch) => {
  try {
    const { data } = await api.updateQuestionsLeft(userId, quesLeft);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
