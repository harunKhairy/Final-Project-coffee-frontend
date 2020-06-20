import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert, MDBIcon } from 'mdbreact';
import { LoginUser, ErrorMessageClear, KeepLogin } from '../../redux/actions'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const LoginScreen = (props) => {

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const dataOnChange=(event)=>{
        const { name, value } = event.target
        setLogin({ ...login, [name]: value})
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        props.LoginScreen(login)
    }

    if (props.isLogin) {
        return <Redirect to="/" />
    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{paddingTop:"150px"}}>

            <form style={{width: '40%'}} onSubmit={onFormSubmit}>
                <p className="h5 text-center mb-4">LoginScreen</p>
                <div className="grey-text">

                <MDBInput 
                    icon="user" 
                    label="Username" 
                    type="text"
                    onChange={dataOnChange}
                    value={login.username}
                    // group type="text" validate error="wrong" success="right"
                />
                        
                <MDBInput 
                    icon="lock"
                    label="Password"
                    type="password"
                    onChange={dataOnChange}
                    value={login.password}

                />

                </div>
                <div className="text-center">
                    {
                        props.ErrorMessageClear ?
                        <MDBAlert color="danger">
                            {props.ErrorMessageClear} <MDBIcon onClick={() => {props.ErrorMessageClear()}} className="float-right hoverErrorLogin mt-1" icon="times" />
                        </MDBAlert> :
                        null
                    }

                    <div className="d-flex justify-content-center">
                        <p style={{textAlign:"center"}}>Not a member yet? <a href="/register" style={{color:"grey"}}>Register here.</a></p>
                    </div>
                <MDBBtn type="submit" disabled={props.isLoading} color="black" className="rounded-pill">Login</MDBBtn>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.AuthReducers
}

export default connect(mapStateToProps, {LoginUser, ErrorMessageClear, KeepLogin}) (LoginScreen);