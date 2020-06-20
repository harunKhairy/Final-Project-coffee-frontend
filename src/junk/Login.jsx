import React from 'react'


class Login extends React.Component {

    state= {
        username: '',
        password: ''
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { username, password } = this.state
        
    }

    render () {
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
                        // group type="text" validate error="wrong" success="right"
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
        )
    }
}