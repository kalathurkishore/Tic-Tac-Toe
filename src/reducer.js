const reducer=(state={}, action) => {
    switch(action.type){
        case 'tokens':
            return {
                ...state, 
                ...action.payload}
        default:
            return{
                ...state
            }
    }
}

export default reducer