import {
    USER_REGISTER_START,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    // CHANGE_PASSWORD_START,
    // CHANGE_PASSWORD_FAILED,
    // CHANGE_PASSWORD_SUCCESS
} from '../types'


const INITIAL_STATE = {
    username: '',
    id: 0,
    isloading: false,
    islogin: false,
    errormess: '',
    // cart: 0,
    role: '',
    token: '',
    password: '',
    isverified: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_REGISTER_START:
            return {
                ...state,
                isloading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                ...action.payload,
                islogin: true,
                // cart: action.jumlahcart
            }
        case USER_REGISTER_FAILED:
            return {
                ...state,
                isloading: false,
                errormess: action.payload
            }
        case USER_LOGIN_START:
            return {
                ...state,
                isloading: true
            }
        case USER_LOGIN_FAILED:
            return {
                ...state,
                isloading: false,
                errormess: action.payload
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isloading: false,
                ...action.payload,
                islogin: true,
                // cart: action.jumlahcart
            }
        // case 'ADD_CART':
        //     return {
        //         ...state,
        //         cart: action.payload
        //     }
        case 'AFTER_VERIFIED':
            return {
                ...state,
                ...action.payload
            }
        case 'ERROR_MESSAGE_CLEAR':
            return INITIAL_STATE
        default:
            return state
    }
}

