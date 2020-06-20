// import React, {useState, useEffect} from 'react';
// // import logo from './logo.svg';
// // import './App.css';
// import { Route, Switch } from 'react-router-dom'

// import LoginScreen from './screens/login/LoginScreen'
// import RegisterScreen from './screens/register/RegisterScreen'
// import Header from './components/header/Header'
// import Axios from 'axios';
// import { API_URL } from './support/ApiUrl';
// import HomeScreen from './screens/HomePage/HomePage'
// import { connect } from 'react-redux';
// import { KeepLogin } from './redux/actions'




// function App({KeepLogin}) {

//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     let id=localStorage.getItem('idUser')

//     if (id) {
//       Axios.get(`${API_URL}/users/${id}`)
//       .then (response => {
//         KeepLogin(response.data)
//       }).catch(error => {
//         console.log(error)
//       }).finally(() => {
//         setIsLoading(false)
//       })
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   if (isLoading) {
//     return <div>LOADING...</div>
//   }
//   return (
//     <div className="App">
//       <Header />
//       <Switch>
//         <Route path='/' exact component={HomeScreen} />
//         <Route path='/login' exact component={LoginScreen} />
//         <Route path='/register' exact component={RegisterScreen} />
//       </Switch>

//     </div>
//   );
// }

// export default connect(null, {KeepLogin})  (App);

import React from 'react'
import Header from './components/Header/Header.component'
import HomePage from './screens/HomePage/HomePage'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'

import { Switch, Route } from 'react-router-dom'

function App () {

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />

      </Switch>
    </div>
  )
}

export default App