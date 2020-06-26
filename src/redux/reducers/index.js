import { combineReducers } from 'redux'
import HeaderReducers from './HeaderReducers'
import AuthReducers from './AuthReducers'
import CartReducers from './CartReducers'

export default combineReducers ({
    Auth: AuthReducers,
    Header: HeaderReducers,
    Cart: CartReducers
})
