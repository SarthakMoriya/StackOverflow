import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllUsers();
        dispatch({ type: "FETCH_ALL_USERS", payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        console.log("actions");
        const { data } = await api.updateProfile(id, updateData);
        console.log(data);
        dispatch({ type: 'UPDATE_CURRENT_USER', payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const addFriendOp = (userId, friendId) => async (dispatch) => {
    try {
        const { data } = await api.addFriend(userId, friendId)
        console.log(data)
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}
export const removeFriendOp = (userId, friendId) => async (dispatch) => {
    try {
        const { data } = await api.removeFriend(userId, friendId)
        console.log(data)
        dispatch(fetchAllUsers())
    } catch (error) {
        console.log(error)
    }
}

export const setNewSubscription=(userId,type)=>async (dispatch) => {
    try{
        const  {data} =await api.setSubscription(userId, type)
        console.log(data);
    }catch(error){
        console.log(error);
    }
}