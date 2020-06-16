import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const LoginScreen = () => {

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const dataOnChange = (event) => {
        setData ({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        //////
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
                    value={data.username}
                />
                        
                <MDBInput 
                    icon="lock"
                    label="Password"
                    type="password"
                    onChange={dataOnChange}
                    value={data.password}
                />

                </div>
                <div className="text-center">
                <MDBBtn>Login</MDBBtn>
                </div>
            </form>
        </div>
    );
};

export default LoginScreen;