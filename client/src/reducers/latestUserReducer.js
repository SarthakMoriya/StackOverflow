const latestUserReducer=(state=null,action)=>{
    switch (action.type) {
        case 'GET_LATEST_USER':
            return action.payload
    
        default:
            return state;
    }
}

export default latestUserReducer;