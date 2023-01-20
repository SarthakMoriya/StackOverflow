import * as api from '../api'

export const fetchAllPosts = () => async (dispatch) => {
    try {

        const { data } = await api.fetchAllPosts();
        console.log(data);
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const fetchAllBlogs = () => async (dispatch) => {
    try {

        const { data } = await api.fetchAllBlogs();
        console.log(data);
        dispatch({ type: 'FETCH_ALL_BLOGS', payload: data });
    } catch (err) {
        console.log(err);
    }
}
export const createNewPost = (postData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData);
        dispatch({ type: 'CREATE_POST', payload: data });
        dispatch(fetchAllPosts())
        navigate('/posts')
    } catch (err) {
        console.log(err);
    }
}

export const likeAPost = (userId, postId) => async (dispatch) => {
    const { data } = await api.updatePostLikes(userId, postId);
    dispatch(fetchAllPosts());
    console.log(data)

}
export const likeABlog = (userId, postId) => async (dispatch) => {
    const { data } = await api.updateBlogLikes(userId, postId);
    dispatch(fetchAllBlogs());

    console.log(data)

}

export const createNewBlogPost = (postData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createBlogPost(postData);
        dispatch({ type: 'CREATE_BLOG', payload: data });
        dispatch(fetchAllPosts())
        dispatch(fetchAllBlogs())
        navigate('/posts')
    } catch (err) {
        console.log(err);
    }
}