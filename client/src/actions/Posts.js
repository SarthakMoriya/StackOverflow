import * as api from '../api'

export const fetchAllPosts = () => async (dispatch) => {
    try{

        const { data } = await api.fetchAllPosts();
        console.log(data);
        dispatch({ type: 'FETCH_ALL_POSTS', payload: data });
    }catch(err){
        console.log(err);
    }
}
export const createNewPost = (postData,navigate) => async (dispatch) => {
    try{
        // localStorage.setItem('post', postData)
        const { data } = await api.createPost(postData);
        // console.log(data);
        dispatch({ type: 'CREATE_POST', payload: data });
        navigate('/posts')
    }catch(err){
        console.log(err);
    }
}

export const likeAPost =(userId,postId)=> async (dispatch)=>{
    const {data} = await api.updatePostLikes(userId,postId);
    dispatch(fetchAllPosts());
    console.log(data)

}