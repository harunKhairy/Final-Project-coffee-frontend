import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import './Login.styles.css'
import GambarRegister from '../../assets/kopiregister.png'
import { LoginUser, KeepLogin, ErrorMessageClear} from '../../redux/actions'
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

const LoginScreen = (props) => {

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        props.LoginUser(data)
    }

    if (props.islogin) {
        return <Redirect to="/" />
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src={GambarRegister} className="image" /> </div>
                        </div>
                    </div>
                    
            <div className="col-lg-6">
              <div className="card2 card border-0 px-4 py-5">
                    <div className="row px-3"> 
                    <label className="mb-1">
                        <h6 className="mb-0 text-sm">Enter Username</h6>
                    </label> 
                    <input className="mb-4" 
                    label="Username"
                    type="text" 
                    placeholder="Enter a valid username" 
                    onChange={handleChange}
                    value={data.username}
                    required
                    name="username" 
                    /> 
                    </div>

                    <div className="row px-3"> <label className="mb-1">
                        <h6 className="mb-0 text-sm">Password</h6>
                    </label> <input 
                    label="password"
                    type="password" 
                    placeholder="Enter password"
                    onChange={handleChange}
                    value={data.password} 
                    required
                    name="password" 
                    /> 
                    </div>
                </div>
                {
                    props.errormes ?
                    <MDBAlert color="danger" >
                        {props.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.ErrorMessageClear()}>X</span>
                    </MDBAlert> :
                    null
                }
                    
                {/* <div className="row px-3 mb-4">
                    <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" className="custom-control-input" />
                     <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> </div> 
                     <a href="#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                </div> */}

                <div className="row mb-3 px-3"> 
                <button 
                type="submit" 
                className="btn btn-blue text-center"
                disabled={props.isloading}>
                    Login
                </button> 
                </div>

                <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <Link to='/register'><a className="text-danger ">Register</a></Link></small> </div>
                </div>
            </div>
            </div>
        </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return state.Auth
}
// test

export default connect(mapStateToProps, {LoginUser, ErrorMessageClear, KeepLogin }) (LoginScreen);