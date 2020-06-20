import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from 'mdbreact';
import './Login.styles.css'
import { LoginUser, KeepLogin, ErrorMessageClear} from '../../redux/actions'
import { Redirect } from "react-router-dom";
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
        <div className="container">
                <form onSubmit={handleSubmit}>
                    <p className="h5 text-center mb-4">Login</p>
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
                            label="password"
                            type="password"
                            icon="lock"
                            onChange={handleChange}
                            value={data.password}
                            required
                            name="password"
                            />

                    </div>
                    {
                        props.errormes ?
                        <MDBAlert color="danger" >
                            {props.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.ErrorMessageClear()}>X</span>
                        </MDBAlert> :
                        null
                    }

                    <div className="text-center">
                        <MDBBtn type='submit' disabled={props.loading} >Login</MDBBtn>
                    </div>
                </form>
            </div>
    )
}

const mapStateToProps = (state) => {
    return state.Auth
}

export default connect(mapStateToProps, {LoginUser, ErrorMessageClear, KeepLogin }) (LoginScreen);