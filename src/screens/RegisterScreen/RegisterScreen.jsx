import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import './Register.styles.css'
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
        <>
            <>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4">Register</p>
                        <div className="grey-text">
                        <MDBInput
                            label="Username" 
                            type="text" 
                            icon="user" 
                            onChange={handleChange}
                            value={data.username}
                            required
                            name="username"
                            />

                        <MDBInput 
                            label="Email" 
                            type="email" 
                            icon="envelope"
                            onChange={handleChange}
                            value={data.email}
                            required
                            name="email" 
                            />

                        <MDBInput 
                            label="Password" 
                            type="password" 
                            icon="lock"
                            onChange={handleChange}
                            value={data.password}
                            required
                            name="password"
                            />

                        <MDBInput 
                            label="Confirm password" 
                            type="password" 
                            icon="lock" 
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            name="confirmPassword"
                            />

                        </div>
                        {
                            props.errormess ?
                            <MDBAlert>
                                {props.errormess}
                                <span onClick={() => props.ErrorMessageClear()}> x </span>
                            </MDBAlert> :
                            null
                        }
                        <div className="text-center">
                        <MDBBtn color="primary" type="submit" disabled={props.isloading}>Register</MDBBtn>
                        </div>
                    </form>

                </div>
            </>
        </>
    );
};

const mapStateToProps = (state) => {
    return state.Auth
}

export default connect(mapStateToProps, {RegisterUser, ErrorMessageClear}) (RegisterScreen);