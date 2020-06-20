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
import { API_URL } from '../../support/ApiUrl'
import Axios from 'axios'

export const RegisterUser = ({ username, email, password, confirmPassword }) => {
    return (dispatch) => {
        dispatch ({ type: USER_REGISTER_START })
        
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            dispatch ({ 
                type: USER_REGISTER_FAILED,
                payload: 'Mohon di isi semua'
            })

        } else if (password !== confirmPassword) {
            dispatch ({
                type: USER_REGISTER_FAILED,
                payload: 'password dan confirm password tidak sama'
            })

        } else {
            let data = {username, email, password}
            Axios.post(`${API_URL}/auth/register`, data)
            .then ( response => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token)
                    dispatch ({
                        type: USER_REGISTER_SUCCESS,
                        payload: response.data
                    })
                } else {
                    dispatch ({
                        type: USER_REGISTER_FAILED,
                        payload: 'username' + username + 'sudah ada'
                    })
                }
            })
            .catch ( error => {
                dispatch({
                    type: USER_REGISTER_FAILED,
                    payload: error.message
                })
            })
        }
    }
}

export const LoginUser = ({ username, password }) => {
    return (dispatch) => {
        dispatch ({ type: USER_LOGIN_START })

        if (username === '' || password === '') {
            dispatch ({
                type: USER_LOGIN_FAILED,
                payload: 'username atau password tidak terisi'
            })
        
        } else {
            Axios.get(`${API_URL}/auth/login`, {
                params: {
                    username: username,
                    password: password
                }
            })
            .then( response => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token)
                    dispatch ({
                        type: USER_LOGIN_SUCCESS,
                        payload: response.data,
                        jumlahCart: response.data.jumlahCart
                    })
                
                } else {
                    dispatch ({
                        type: USER_LOGIN_FAILED,
                        payload: 'username atau password tidak terdaftar'
                    })
                }
            })
            .catch( error => {
                dispatch ({
                    type: USER_LOGIN_FAILED,
                    payload: error.message
                })
            })
        }
    }
}

export const KeepLogin = (data, jumlahCart) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data,
        jumlahCart: jumlahCart
    }
}

export const AfterVerified = (data) => {
    return {
        type: 'AFTER_VERIFIED',
        payload: data
    }
}

export const CartChange = (data) => {
    return {
        type: 'ADD_CART',
        payload: data,
    }
}

export const ErrorMessageClear = () => {
    return {
        type: 'ERROR_MESSAGE_CLEAR'
    }
}