const blogReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'FETCH_ALL_BLOGS':
            return { ...state, data: action.payload }
        
        default:
            return { ...state }
    }
}

export default blogReducer