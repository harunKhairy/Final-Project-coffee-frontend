import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom';
import { ErrorMessageClear, GetCart } from '../../redux/actions'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import { connect } from 'react-redux'

import {FiLogOut} from "react-icons/fi"
import {FaRegListAlt} from "react-icons/fa"
import {FiHeart} from "react-icons/fi"
import {FiSettings} from "react-icons/fi"
import './Header.styles.css'




class Header extends Component {
state = {
  isOpen: false,
  shoppingBag: 0
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logoutHandler = () => {
  localStorage.removeItem("iduser")
  localStorage.removeItem('token')
  this.props.ErrorMessageClear()
}

componentDidMount() {
  this.props.GetCart()
}

render() {
  return (
    
      <MDBNavbar color=" blue-grey darken-1" dark expand="md" sticky='top'>
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

            <MDBNavItem>
              {
                this.props.USER.role === 2 ?
                <MDBNavLink to="/managetransaksi">manage transaksi</MDBNavLink> :
                null
              }
            </MDBNavItem>
            
            <MDBNavItem>
            {
                // this.props.USER.role.islogin && this.props.USER.role === 1 ?
                // <MDBNavItem>
                //   {this.props.USER.cart} <FiShoppingCart style={{fontSize:20}}/> Cart
                // </MDBNavItem> :
                // null
                this.props.USER.role.islogin && this.props.USER.role === 1 ?
                  <MDBNavLink to='/cart' style={{color:"black"}}>
                    <div className="quick-btn">
                      <FiShoppingCart style={{fontSize:20}}/>
                      {this.props.QTY !== 0 ? <span className="badge badge-danger label ml-2 text-center" >{this.props.QTY}</span> : null }
                    </div>
                  </MDBNavLink> :
                null
              }
            </MDBNavItem>

            <MDBNavItem>
              {
                this.props.USER.username ?
                <MDBDropdown className="black-text">
                    <MDBDropdownToggle nav caret className="black-text text-uppercase" >
                      <FaUserCircle style={{color:'#f07474'}}/> HI, {this.props.USER.username} !
                    </MDBDropdownToggle>
                      {this.props.USER.role === 1 ?
                        <MDBDropdownMenu className="right black-text">
                          <MDBDropdownItem href="#!"> <FiHeart /> Wishlist</MDBDropdownItem>
                          <MDBDropdownItem href={`/transactionssummary/${this.props.USER.id}`}> <FaRegListAlt /> Transaction History</MDBDropdownItem>
                          <MDBDropdownItem href="/accountsetting"> <FiSettings /> Account Setting</MDBDropdownItem>
                          <MDBDropdownItem href="/" onClick={this.logoutHandler}><FiLogOut /> Logout</MDBDropdownItem>
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
                        </MDBDropdownMenu>
                      :
                        <MDBDropdownMenu className="right black-text">
                          <MDBDropdownItem href="/accountsetting"> <FiSettings /> Account Setting</MDBDropdownItem>
                          <MDBDropdownItem href="/" onClick={this.logoutHandler}><FiLogOut /> Logout</MDBDropdownItem>
                        </MDBDropdownMenu>
                    }
                </MDBDropdown>
                :
                null
              }
            </MDBNavItem>


              
                {/* {
                  this.props.USER.islogin && this.props.USER.role === 1 ?
                  <MDBNavItem>
                    <MDBNavLink to="/history">
                      history
                    </MDBNavLink>
                  </MDBNavItem> :
                  null
                } */}

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

           

            {/* <MDBNavItem>
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
            </MDBNavItem> */}
            

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
    USER: state.Auth,
    QTY: state.Cart.qty
  }
}

export default connect (mapStateToProps,{ ErrorMessageClear, GetCart }) (Header);