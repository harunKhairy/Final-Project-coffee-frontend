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
import { Switch } from 'react-router-dom'

const INITIAL_STATE = {
    role: '',
    username: '',

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}

