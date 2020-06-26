import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Modal,ModalBody,ModalFooter } from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../../support/ApiUrl';
import { Redirect } from 'react-router-dom';
import { changetoRupiah } from '../../support/changeToRp'
import { connect } from 'react-redux'
import { MDBTable, MDBTableBody, MDBCard, MDBCardImage, MDBRow, MDBCol, MDBContainer, MDBBtn } from 'mdbreact';
import Swal from 'sweetalert2';
import { GetCart } from '../../redux/actions'


const ProductDetail = (props) => {

    const [data, setData] = useState({});
    const [qty, setQty] = useState(1);
    const [modalOpen, setModalOpen] = useState(false)
    const [redirectToLogin, setRedirectToLogin] = useState(false)

    // let sql = `select * from products where id=${id}`

    useEffect(() => {
        Axios.get(`${API_URL}/product/productdetail/${props.match.params.idprod}`)
        .then(response => {
            setData(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const qtyOnChange = (event) => {
        // const { value } = event.target
        if (event.target.value === '') {
            setQty(0)
        }
        if (Number (event.target.value)) {
            if (qty === 0) {
                setQty(event.target.value[1])
            } else {
                if (event.target.value > stock) {
                    setQty(stock)
                } else if (event.target.value < 1) {
                    setQty(1)
                } else {
                    setQty(event.target.value)
                }
            }
        }
    }

    const sendToCart = () => {
        if (props.USER.islogin && props.USER.role === 1) {
            let objTransaction = {
                userid: props.USER.id,
                productid: props.match.params.idprod,
                qty,
                username: props.USER.username
            }
            Axios.post(`${API_URL}/transactions/sendtocart`, objTransaction)
            .then( response => {
                console.log(response)
                Swal.fire({
                    icon: 'success',
                    title: 'added to cart!'
                })
                props.GetCart()
            }).catch( error => {
                console.log(error.message)
            })
        } else {
            setModalOpen(true)
        }
    }

    const onToLoginClick = () => {
        if (props.USER.role === 2) {
            setModalOpen(false)
        } else {
            setModalOpen(false)
            setRedirectToLogin(true)
        }
    }

    const { name, image, stock, price, description } = data
    if (redirectToLogin) {
        return <Redirect to="/login" />
    }

    if (data) {
        return (
            <div className='paddingatas'>
                <Modal centered toggle={()=>setModalOpen(false)} isOpen={modalOpen}>
                    <ModalBody>
                        {
                            props.USER.role=== 2 ?
                            'maaf anda admin'
                            :
                            'Maaf Anda harus login dahulu'
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={onToLoginClick}>OK</button>
                    </ModalFooter>
                </Modal>
                
                <div>
                    <div>
                        
                <MDBContainer>
                    <MDBRow className="col-md-12">
                        <MDBCol className="col-md-5 p-1">
                            <MDBCard>
                                <MDBCardImage
                                    top
                                    src={API_URL + image}
                                    overlay='white-slight'
                                    hover
                                    waves
                                    alt={name}
                                />
                            </MDBCard>
                        </MDBCol>

                        <MDBCol className="col-md-7 col-12 p-1">
                        <MDBCol className="p-3">
                            <h2>{name}</h2>
                        </MDBCol>

                            <MDBTable>
                            <MDBTableBody>
                                <tr>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <td>Stock &nbsp; &nbsp; {stock}</td>
                                </tr>
                                <tr>
                                    <td>Price &nbsp; &nbsp; {changetoRupiah(price*qty)}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Quantity
                                        &nbsp; &nbsp;
                                        <MDBRow>
                                        <MDBBtn 
                                            className='btn-sm px-3 py-2 rounded-pill' 
                                            color="brown" 
                                            disabled={ qty <= 1 ? true : false }
                                            onClick={()=> setQty(qty - 1)}
                                            // onClick={console.log('kurang')}
                                            > &#10134; </MDBBtn>
                                        <div className='rounded' style={{border:'1px black solid'}} >
                                                    <input 
                                                        type="text" 
                                                        style={{width:'40px',height:'40px',textAlign:'center',backgroundColor:'transparent',border:'0px'}} 
                                                        value={qty} 
                                                        onChange={qtyOnChange}
                                                        // name={qty}
                                                    />
                                        </div>
                                        <MDBBtn 
                                            className='btn-sm px-3 py-2 rounded-pill' 
                                            color="brown" 
                                            disabled={ qty >= stock ? true : false }
                                            onClick={()=> setQty(qty + 1)}
                                            // onClick={console.log('tambah')}
                                            > &#10133; </MDBBtn>
                                        </MDBRow>
                                    
                                    </td>
                                </tr>
                            </MDBTableBody>
                            </MDBTable>
                            <MDBRow className="pl-2">
                                <MDBBtn 
                                    className='btn rounded-pill' 
                                    color="brown" 
                                    onClick={sendToCart}
                                    > Add to cart </MDBBtn>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>


                    </div>
                </div>
            </div>
        )
    }

    return <div>Loading....</div>
}

const mapStateToProps = (state) => {
    return {
        USER: state.Auth
    }
}

export default connect (mapStateToProps, {GetCart}) (ProductDetail)
