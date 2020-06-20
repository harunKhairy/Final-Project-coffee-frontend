import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { RegisterUser, ErrorMessageClear } from '../../redux/actions'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

const RegisterScreen = (props) => {

  const [data, setData] = useState({
    username:'',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const dataOnChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    props.RegisterUser(data)
  }

  if (props.isLogin) {
        return <Redirect to='/' />
    }

return (


    <div className='d-flex justify-content-center align-items-center' style={{paddingTop:"150px"}}>
      <form style={{width: '40%'}} onSubmit={onFormSubmit} >
        <p className="h5 text-center mb-4">RegisterScreen</p>
        <div className="grey-text">
          
        <MDBInput 
            icon="envelope" 
            label="Email" 
            type="email" 
            onChange={dataOnChange}
            value={data.email}
            />

          <MDBInput 
            icon="user" 
            label="Username" 
            type="text" 
            onChange={dataOnChange}
            value={data.username}
            />

            <MDBInput 
                icon="lock" 
                label="Password" 
                type="password"
                onChange={dataOnChange}
                value={data.password}
                />
          
          <MDBInput 
            icon="lock" 
            label="Confirm Password" 
            type="password" 
            onChange={dataOnChange}
            value={data.confirmPassword}
            />

        </div>
        <div className="text-center">
          <MDBBtn color="primary">Register</MDBBtn>
        </div>
      </form>
    </div>
    );
};

const mapStateToProps = (state) => {
  return state.AuthReducers
}

export default connect(mapStateToProps, {ErrorMessageClear, RegisterUser})  (RegisterScreen);