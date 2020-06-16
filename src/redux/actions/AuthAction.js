import Axios from 'axios'
import {
    USER_REGISTER_START,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    CHANGE_PASSWORD_START,
    CHANGE_PASSWORD_FAILED,
    CHANGE_PASSWORD_SUCCESS
} from '../types'

export const registerUser = ({ newUsername, newEmail, newPassword, newConfirmPassword }) => {
    return (dispatch) => {
        dispatch ({ type: USER_REGISTER_START })
        
        if (newUsername === '' || newEmail === '' || newPassword === '' || newConfirmPassword === '') {
            dispatch ({ 
                type: USER_REGISTER_FAILED,
                payload: 'Mohon di isi semua'
            })
        } else if (newPassword !== newConfirmPassword) {
            dispatch ({
                type: USER_REGISTER_FAILED,
                payload: 'password dan confirm password tidak sama'
            })
        } else {
            // ///////////////
        }
    }
}