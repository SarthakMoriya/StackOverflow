const authReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            // action.data is result of fetching data from api backend failed-->{message:"Email already exists, etc.."} success:{data,token,user,message}
            localStorage.setItem('Profile', JSON.stringify({ ...action?.data }))
            localStorage.setItem('quesLeft', action?.data?.user?.noOfQuestions)
            console.log(action.data.user.noOfQuestions)
            return { ...state, data: action?.data }
        case "LOGOUT":
            localStorage.clear();
            return { ...state, data: null }
        default:
            return state;
    }
}

export default authReducer