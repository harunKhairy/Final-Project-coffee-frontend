import Axios from 'axios'
import { GET_CART_DATA } from '../types'
import { API_URL } from '../../support/ApiUrl'

export const GetCart = () => {
    return (dispatch) => {
        let userid = window.localStorage.getItem('iduser')
        Axios.get(`${API_URL}/cart/totalcart/${userid}`)
        .then( response => {
            console.log(response.data[0])
            dispatch({
                type: GET_CART_DATA,
                payload: response.data[0].totalqty
            })
        })
    }
}
