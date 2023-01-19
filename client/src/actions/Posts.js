import * as api from '../api'

export const getAllPosts = () => async (dispatch) => {
    const { data } = await api.getPosts();
    console.log(data);
    dispatch({ type: "FETCH_ALL_POSTS", payload: data });
}