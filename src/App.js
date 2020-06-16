import React from 'react';
import logo from './logo.svg';
// import './App.css';
import { Route, Switch } from 'react-router-dom'
// import Header from './components/header/Header'
import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/register/RegisterScreen'


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <LoginScreen />
      <RegisterScreen />
    </div>
  );
}

export default App;
