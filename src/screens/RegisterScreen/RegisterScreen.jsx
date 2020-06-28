import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import './Register.styles.css'
import GambarRegister from '../../assets/kopiregister.png'
import { connect } from 'react-redux'
import { RegisterUser, ErrorMessageClear } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

const RegisterScreen = (props) => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.RegisterUser(data)
    }

    if (props.islogin) {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
        <div className="row mt-5 align-items-center">
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img src={GambarRegister}  alt="" className="img-fluid mb-3 d-none d-md-block" />
          </div>
          
          <div className="col-md-7 col-lg-6 ml-auto">
          <form onSubmit={handleSubmit}>
              <div className="row">

                {/* Username */}
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-user text-muted" />
                    </span>
                  </div>
                  <input
                //   id="username" 
                  label="Username" 
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  onChange={handleChange}
                  value={data.username}
                  required
                  className="form-control bg-white border-left-0 border-md" />
                </div>
                
                {/* Email */}
                <div className="input-group col-lg-12 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-envelope text-muted" />
                    </span>
                  </div>
                  <input
                //   id="email"
                  label="Email"  
                  type="email" 
                  name="email" 
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className="form-control bg-white border-left-0 border-md" />
                </div>

                {/* Password */}
                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-lock text-muted" />
                    </span>
                  </div>
                  <input 
                //   id="password"
                  label="Password"  
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                  required 
                  className="form-control bg-white border-left-0 border-md" />
                </div>

                {/* Password Confirmation */}
                <div className="input-group col-lg-6 mb-4">
                  <div className="input-group-prepend">
                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                      <i className="fa fa-lock text-muted" />
                    </span>
                  </div>
                  <input 
                //   id="passwordConfirmation"
                  label="Confirm password" 
                  type="password" 
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={data.confirmPassword}
                  required 
                  className="form-control bg-white border-left-0 border-md" />
                </div>

                {
                    props.errormess ?
                    <MDBAlert>
                        {props.errormess}
                        <span onClick={() => props.ErrorMessageClear()}> x </span>
                        </MDBAlert> :
                        null
                }
                
                {/* Submit Button */}
                <div className="form-group col-lg-12 mx-auto mb-0">
                  <button 
                  className="btn btn-primary btn-block py-2"
                  type="submit"
                  disabled={props.isloading}
                  >
                    <span className="font-weight-bold">Create your account</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => {
    return state.Auth
}

export default connect(mapStateToProps, {RegisterUser, ErrorMessageClear}) (RegisterScreen);