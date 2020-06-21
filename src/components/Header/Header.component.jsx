import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom';
import { ErrorMessageClear } from '../../redux/actions'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import { connect } from 'react-redux'




class Header extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logoutHandler = () => {
  localStorage.removeItem("iduser")
  this.props.ErrorMessageClear()
}

render() {
  return (
    
      <MDBNavbar color="indigo" dark expand="md" sticky='top'>
        <MDBNavbarBrand href="/">
          <strong className="white-text">LOGO</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          
          <MDBNavbarNav right>

            <MDBNavItem>
              {
                this.props.USER.role === 2 ?
                <MDBNavLink to="/manageadmin">
                  Manage Admin
                </MDBNavLink> :
                null
              }
            </MDBNavItem>
            
              {
                this.props.USER.role.islogin && this.props.USER.role === 1 ?
                <MDBNavItem>
                  {this.props.USER.cart} <FiShoppingCart style={{fontSize:20}}/> Cart
                </MDBNavItem> :
                null
              }
                {
                  this.props.USER.islogin && this.props.USER.role === 1 ?
                  <MDBNavItem>
                    <MDBNavLink to="/history">
                      history
                    </MDBNavLink>
                  </MDBNavItem> :
                  null
                }

            <MDBNavItem>
              {
                this.props.USER.islogin ?
                null :
                <MDBNavLink to="/login">Login</MDBNavLink>
              }
            </MDBNavItem>

            <MDBNavItem>
              {
                this.props.USER.islogin ?
                null :
                <MDBNavLink to="/register">Register</MDBNavLink>
              }
            </MDBNavItem>

            <MDBNavItem>
              {
                this.props.USER.role === 2 ?
                <MDBNavLink to="/managetransaksi">manage transaksi</MDBNavLink> :
                null
              }
            </MDBNavItem>

            <MDBNavItem>
              {
                this.props.USER.username ?
                <MDBDropdown >
                  <MDBDropdownToggle nav >
                      <FaUserCircle/> hallo, {this.props.USER.username}
                  </MDBDropdownToggle>
                  <MDBDropdownMenu >
                  {
                      this.props.USER.islogin?
                      <MDBDropdownItem onClick={this.logoutHandler}>
                          <Link to='/'>
                              Logout
                          </Link>
                      </MDBDropdownItem>
                      :
                      null
                  }
                    <MDBDropdownItem>
                          {
                              this.props.USER.isverified === 0 ?
                              <Link to='/sendemailverified'>
                                  <span style={{color:'red'}}>Unverified</span> 
                              </Link>
                              :
                              <span style={{color:'green'}}>verified</span>
                                           
                          }
                      </MDBDropdownItem>
                      <MDBDropdownItem href="#!"></MDBDropdownItem>

                  </MDBDropdownMenu>
              </MDBDropdown>
              :
              null
              }
            </MDBNavItem>
            

            {/* <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    
    );
  }
}

const mapStateToProps = (state) => {
  return {
    USER: state.Auth
  }
}

export default connect (mapStateToProps,{ ErrorMessageClear }) (Header);