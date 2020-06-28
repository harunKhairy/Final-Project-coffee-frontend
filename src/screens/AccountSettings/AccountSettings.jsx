import React, { Component } from 'react';
import '../../screens/AccountSettings/AccountSettings.css'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { PasswordChange } from '../../redux/actions/AuthAction';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../../support/ApiUrl';
import { connect } from 'react-redux';
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
const MySwal = withReactContent(Swal)

class UserSettings extends Component {
    state = {
        kehome: false
      }
    
    componentDidMount() {
        console.log(this.props.usernamelog);
    }

    handleChangePassClick = () => {
        var passwordlama = this.refs.passwordlama.value;
        var passwordbaru = this.refs.passwordbaru.value;
        var password = this.refs.konfirmasipassword.value;
        var updatePass = {
            password,
            username: this.props.usernamelog,
            role: this.props.role
        };
        console.log(updatePass);
        if (passwordlama === "" || passwordbaru === "" || password === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password is empty!"
            });
        } else if (passwordlama === passwordbaru) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Enter ANOTHER new password plz "
            });
        } else if (passwordlama !== this.props.passuser) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Current password didn't match"
            });
        } else if (passwordbaru !== password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "New password didn't match"
            });
        } else {
            Axios.put(`${API_URL}/users/${this.props.userid}`, updatePass)
                .then(res => {
                    Swal.fire({
                        title: "Confirm change password?",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        cancelButtonText: "Cancel",
                        confirmButtonText: "Yes"
                    }).then(result => {
                        if (result.value) {
                            this.props.PasswordChange(res.data);
                            window.location.reload()
                            this.setState({ kehome: true });
                            Swal.fire({
                                title: "Your password has been updated.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

render(){
    if (this.state.kehome || this.props.userlog === false) {
        return <Redirect to="/" />;
    }
    return (
        <div className='fontsemua'>
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
            <form>
                <p className="h3 text-center mb-4"> 
                <div className='penekanan'>
                Your Username is {this.props.usernamelog}
                </div>
                </p>
                
                <input type="password" placeholder="Your Current Password" ref='passwordlama' size='40' />
                <br />
                <br />

                <input type="password" placeholder="Your New Password" ref='passwordbaru' size='40' />
                <br />
                <br />

                <input type="password" placeholder="Confirm Your New Password!" ref='konfirmasipassword' size='40' />
                
                <div className="text-center mt-4">
                <MDBBtn color="unique" className='btn btn-primary' onClick={this.handleChangePassClick}>
                    Submit
                </MDBBtn>
                </div>
            </form>
            </div>
        </div>
    );
    }
}

const mapStateToProps = state => {
    return {
        usernamelog: state.Auth.username,
        userlog: state.Auth.login,
        userid: state.Auth.id,
        passuser: state.Auth.password,
        role: state.Auth.role
    };
};

export default connect(mapStateToProps, { PasswordChange })(UserSettings);