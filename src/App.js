import React, { useState, useEffect } from 'react'
import { KeepLogin } from './redux/actions'

import Header from './components/Header/Header.component'
import HomePage from './screens/HomePage/HomePage'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import VerifiedScreen from './screens/VerifiedScreen/VerifiedScreen'

import { Switch, Route } from 'react-router-dom'
import Axios from 'axios'
import { API_URL } from './support/ApiUrl'
import { connect } from 'react-redux'

function App ({ KeepLogin }) {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      Axios.get(`${API_URL}/users/keeplogin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then (response => {
        KeepLogin(response.data, response.data.jumlahcart)
      }).catch (error => {
        console.log(error)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [KeepLogin])

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/verified" component={VerifiedScreen} />

      </Switch>
    </div>
  )
}

export default connect(null, { KeepLogin }) (App);