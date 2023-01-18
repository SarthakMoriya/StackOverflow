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