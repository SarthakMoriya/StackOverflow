const postReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'FETCH_ALL_POSTS':
            return { ...state, data: action.payload }
        case 'CREATE_POST':
            return { ...state }
        default:
            return { ...state }
    }
}

export default postReducer