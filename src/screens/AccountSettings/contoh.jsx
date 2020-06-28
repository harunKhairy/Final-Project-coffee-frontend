import React, { Component, useState } from 'react';
import '../AccountSettings/AccountSettings.css'
import { MDBAlert, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import {ErrorMessageClear,changepasswordclear,ChangePassword} from '../../redux/actions'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)

const UserSettings = (props) => {
    
    const [data,setdata]=useState({
        currentpasswordinput:'',
        newpassword:'',
        newpasswordconf:'',
        currentpassword:props.User.password,
        id:props.User.id,
        username:props.User.username
    })

    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.ChangePassword(data)
    }

    if(props.islogin==='false'){
        return <Redirect to='/'/>
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
            <form onSubmit={onFormSubmit}>
                <p className="h3 text-center mb-4"> 
                <div className='penekanan'>
                KONTOL
                </div>
                </p>
                
                <input 
                type="password"
                name='currentpasswordinput'
                value= {data.currentpasswordinput}
                onChange={dataOnChange}
                validate
                placeholder="Your Current Password" 
                ref='passwordlama' 
                size='40' />
                <br />
                <br />

                <input 
                type="password"
                name='newpassword'
                value= {data.newpassword}
                onChange={dataOnChange}
                validate 
                placeholder="Your New Password" 
                ref='passwordbaru' 
                size='40' />
                <br />
                <br />

                <input 
                type="password"
                name='newpasswordconf'
                value= {data.newpasswordconf}
                onChange={dataOnChange}
                validate 
                placeholder="Confirm Your New Password!" 
                ref='konfirmasipassword' 
                size='40' />

                    {
                        props.User.errormes?
                        <MDBAlert color="danger" >
                            {props.User.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.ErrorMessageClear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }

                    {
                        props.User.changepasssuccess?
                        <MDBAlert color="success" >
                            {props.User.changepasssuccess} <span className='float-right hovererr font-weight-bold' onClick={()=>props.changepasswordclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }
                
                <div className="text-center mt-4">
                <MDBBtn
                type='submit'
                disabled={props.isloading} 
                color="unique" 
                className='btn btn-primary' 
                >
                    Submit
                </MDBBtn>
                </div>

            </form>
        </div>
    );
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header
    }
}

export default connect(MapstatetoProps,{ErrorMessageClear,changepasswordclear,ChangePassword}) (UserSettings);