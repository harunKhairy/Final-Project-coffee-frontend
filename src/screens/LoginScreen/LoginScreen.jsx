import React, {useState} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './Login.styles.css'

const LoginScreen = () => {

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value })
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     props.   (data)
    // }

    return (
        <div className="container">
                <form>
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

                    <div className="text-center">
                        <MDBBtn>Login</MDBBtn>
                    </div>
                </form>
            </div>
    )
}



export default LoginScreen;