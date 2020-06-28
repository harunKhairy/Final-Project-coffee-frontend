import React, { useState, useEffect } from 'react'
import { KeepLogin } from './redux/actions'

import Header from './components/Header/Header.component'
import HomePage from './screens/HomePage/HomePage'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import VerifiedScreen from './screens/VerifiedScreen/VerifiedScreen'
import SendEmailVerified from './screens/SendEmailVerified/SendEmailVerified'
import ManageAdmin from './screens/ManageAdmin/ManageAdminScreen'
import ManageTransaction from './screens/ManageTransaction/ManageTransactionScreen'
import NotFound from './components/notfound/notFound'
import AllProduct from './components/all-product/AllProduct'
import ProductDetail from './components/product-detail/ProductDetail'
import Cart from './components/cart/Cart.component'
import AccountSettings from './screens/AccountSettings/AccountSettings'
import Footer from './components/footer/footer.component'
// import TestTing from './screens/testting/testting'

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

  if (loading) return <div className="d-flex ">Loading.....</div>

  return (
    <div>
      {/* <TestTing /> */}
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/verified" component={VerifiedScreen} />
        <Route exact path="/sendemailverified" component={SendEmailVerified} />
        <Route exact path="/manageadmin" component={ManageAdmin} />
        <Route exact path="/managetransaksi" component={ManageTransaction} />
        <Route exact path="/allproduct" component={AllProduct} />
        <Route exact path="/productdetail/:idprod" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/accountsettings" component={AccountSettings} />
        <Route path='/*' exact component={NotFound} />
      </Switch>
      <Footer/>
    </div>
  )
}

export default connect(null, { KeepLogin }) (App);