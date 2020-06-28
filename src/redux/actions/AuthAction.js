import {
    USER_REGISTER_START,
    USER_REGISTER_FAILED,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_START,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    // CHANGE_PASSWORD_START,
    // CHANGE_PASSWORD_FAILED,
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
            Axios.post(`${API_URL}/users/register`, data)
            // Axios.post(`${API_URL}/auth/register`, data)
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
            Axios.get(`${API_URL}/users/login`, {
            // Axios.get(`${API_URL}/users/login`, {
                params: {
                    username: username,
                    password: password
                }
            })
            .then( response => {
                if (response.data.status) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('iduser', response.data.id)
                    dispatch ({
                        type: USER_LOGIN_SUCCESS,
                        payload: response.data,
                        // totalqty: response.data.totalqty
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

export const KeepLogin = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data,
        // totalqty: totalqty
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

export const PasswordChange = () => {
    return {
        type: 'CHANGE_PASSWORD_SUCCESS',
    }
}

// export const ChangePassword=(data)=>{
//     return (dispatch)=>{
//         dispatch({type:CHANGE_PASSWORD_START})
//         if(data.currentpasswordinput === '' || data.newpassword === '' || data.newpasswordconf === ''){//kalo ada input yang kosong
//             dispatch({type:CHANGE_PASSWORD_FAILED,payload:'lengkapi form yang ada'})
//         }else if (data.newpassword===data.currentpassword){
//             dispatch({type:CHANGE_PASSWORD_FAILED,payload:'password anda sama, tidak berubah'})
//         }else if (data.newpassword !== data.newpasswordconf){
//             dispatch({type:CHANGE_PASSWORD_FAILED,payload:'konfirmasi password tidak sesuai'})
//         }else if(data.currentpasswordinput !== data.currentpassword){
//             dispatch({type:CHANGE_PASSWORD_FAILED,payload:'password yang anda ketikkan salah'})
//         }else{
//             let role = localStorage.getItem('role')
//             Axios.put(`${API_URL}/users/${data.id}`,{username:data.username,password:data.newpassword,role:role})
//             .then((res)=>{
//                 var usernewdata ={
//                     message:'password berhasil diganti',
//                     password:data.newpassword,
//                     username:data.username,
//                     role:role
//                 }
//                 dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:usernewdata})
//             }).catch((err)=>{
//                 console.log(err)
//             })
//         }
//     }
// }

// export const changepasswordclear=()=>{
//     return{
//         type:'PasswordChangeClear'
//     }
// }




// export const getdata=()=>{
//     Axios.get(`${API_URL}/transactions/?_embed=transactiondetails&userId=${id}&status=oncart`)
//     .then((res)=>{
//         if(res.data.length){
//             return res.data[0].transactiondetails.length
//         }else{
//             return 0
//         }
//     }).catch((err)=>{
//         console.log(err)
//     })
// }
// export const getdata=()=>{
//     Axios.get(`${API_URL}/transactions/?_embed=transactiondetails&userId=${id}&status=oncart`)
//     .then((res)=>{
//         if(res.data.length){
//             return res.data[0].transactiondetails.length
//         }else{
//             return 0
//         }
//     }).catch((err)=>{
//         console.log(err)
//     })
// }