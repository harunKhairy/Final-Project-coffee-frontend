const INITIAL_STATE = { isHome: true }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'IS_HOME':
            return {
                ...state,
                isHome: true
            }
        case 'NOT_HOME':
            return {
                ...state,
                isHome: false
            }
        default :
            return state
    }
}