export const setCurrentUser=(data)=>{
    return{
        type:'FETCH_CURRENT_USER',
        payload:data
    }
}
//here data is key value pair of Profile and Data

export default setCurrentUser;