import { combineReducers } from 'redux'
import HeaderReducers from './HeaderReducers'
import AuthReducers from './AuthReducers'

export default combineReducers ({
    Auth: AuthReducers,
    Header: HeaderReducers,
})
