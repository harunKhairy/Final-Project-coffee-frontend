import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

const RegisterScreen = () => {
return (


    <div className='d-flex justify-content-center align-items-center' style={{paddingTop:"150px"}}>
      <form style={{width: '40%'}} >
        <p className="h5 text-center mb-4">RegisterScreen</p>
        <div className="grey-text">
          
        <MDBInput 
            icon="envelope" 
            label="Email" 
            type="email" 
            // onChange={(event) => console.log(event)}
            // value={}
            />

          <MDBInput 
            icon="user" 
            label="Name" 
            type="text" 
            // onChange={}
            // value={}
            />

            <MDBInput 
                icon="lock" 
                label="Password" 
                type="password"
                // onChange={}
                // value={}
                />
          
          <MDBInput 
            icon="lock" 
            label="Confirm Password" 
            type="password" 
            // onChange={}
            // value={}
            />

        </div>
        <div className="text-center">
          <MDBBtn color="primary">Register</MDBBtn>
        </div>
      </form>
    </div>
    );
};

export default RegisterScreen;