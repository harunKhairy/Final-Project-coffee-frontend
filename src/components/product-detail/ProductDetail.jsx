import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../../support/ApiUrl';


const ProductDetail = (props) => {

    const [data, setData] = useState({});
    const [qty, setQty] = useState(1);
    const [modalOpen, setModalOpen] = useState(false)
    const [redirectToLogin, setRedirectToLogin] = useState(false)

    useEffect(() => {
        Axios.get(`${API_URL}/product/${props.match.params.idprod}`)
        .then(response => {
            setData(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [props.match.params.idprod])

    const qtyOnChange = (event) => {
        const { value } = event.target
        if (value === '') {
            setQty(0)
        }
        if (Number (value)) {
            if (qty === 0) {
                setQty(value[1])
            } else {
                if (value > stock) {
                    setQty(stock)
                } else if (value < 1) {
                    setQty(1)
                } else {
                    setQty(value)
                }
            }
        }
    }

    const sendToCart = () => {
        if (props.USER.islogin && props.USER.role === '1') {
            let objTransaction = {
                status: 'oncart',
                userid: props.USER.id
            }
            // Axios.get(`${API_URL}/transactions?status=oncart&userId=${props.User.id}`)
            // .then((res1)=>{
            //     if(res1.data.length){
            //         var objdetails={
            //             transactionId:res1.data[0].id,
            //             productId:data.id,
            //             qty:qty
            //         }
            //         Axios.get(`${API_URL}/transactiondetails?transactionId=${res1.data[0].id}&&productId=${data.id}`)
            //         .then((res4)=>{
            //             if(res4.data.length){
            //                 Axios.patch(`${API_URL}/transactiondetails/${res4.data[0].id}`,{
            //                     qty:res4.data[0].qty+qty
            //                 }).then((res5)=>{
            //                     Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
            //                     .then((res2)=>{//gunanya untuk mennentukan jumlah dari cartnya
            //                         props.CartChange(res2.data[0].transactiondetails.length)  
            //                         MySwal.fire({
            //                             icon: 'success',
            //                             title: 'Berhasil masuk cart',
            //                             // text: 'barang masuk ke cart',
            //                         })
            //                     }).catch((err)=>{
            //                         console.log(err)
            //                     })
            //                 })
            //             }else{
            //                 Axios.post(`${API_URL}/transactiondetails`,objdetails)
            //                 .then((res3)=>{
            //                     console.log(res3.data)
            //                     Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
            //                     .then((res2)=>{//gunanya untuk mennentukan jumlah dari cartnya
            //                         props.CartChange(res2.data[0].transactiondetails.length)  
            //                         MySwal.fire({
            //                             icon: 'success',
            //                             title: 'Berhasil masuk cart',
            //                             // text: 'barang masuk ke cart',
            //                         })
            //                     }).catch((err)=>{
            //                         console.log(err)
            //                     })
            //                 })
            //             }
            //         })
            //     }else{
            //         Axios.post(`${API_URL}/transactions`,objtransaction)
            //         .then((res2)=>{
            //             var objdetails={
            //                 transactionId:res2.data.id,
            //                 productId:data.id,
            //                 qty:qty
            //             }
            //             Axios.post(`${API_URL}/transactiondetails`,objdetails)
            //             .then((res3)=>{
            //                 Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${props.User.id}&status=oncart`)
            //                 .then((res2)=>{
            //                     props.CartChange(res2.data[0].transactiondetails.length)  
            //                     MySwal.fire({
            //                         icon: 'success',
            //                         title: 'Berhasil masuk cart',
            //                         // text: 'barang masuk ke cart',
            //                     })
            //                 }).catch((err)=>{
            //                     console.log(err)
            //                 })
            //             })
            //         })
            //     }
            // }).catch((err)=>{
            //     console.log(err)
            // })
        }
    }

    return (
        <div>
            <Container>
                <Row classname="col-md-12">
                    <Col classname="col-md-4 p-4">
                        <img src={image} alt={name} width="100%" classname="rounded" />
                    </Col>

                    <Col classname="col-md-8 p-4">
                        <Row classname="p-4">
                            <h2>{name}</h2>
                        </Row>

                        <Table responsive>
                            <tr>
                                <td>{description}</td>
                            </tr>

                            <tr>
                                <td>Stock {stock}</td>
                            </tr>

                            <tr>
                                <td>Price {ChangeToRp(price*qty)}</td>
                            </tr>
                            
                            <tr>
                                <td>
                                    Quantity
                                    <br/>
                                    <br/>
                                    <Row>
                                        <br/>
                                        <Button
                                            classname="btn-sm px-3 py-2 rounded-pill"
                                            color="brown"
                                            disable={ qty <= 1 ? true : false }
                                            onClick={ () => setQty(qty-1) }
                                            >
                                            -
                                        </Button>
                                            <div classname="rounded" style={{border: "1px solid black"}}>
                                                <input
                                                    type="text"
                                                    style={{width: "40px", height: "40px", textAlign: "center", backgrounColor: "transparent", border:"1px"}}
                                                    value={qty}
                                                    onChange={qtyOnChange}
                                                    />
                                            </div>
                                        <Button
                                            className='btn-sm px-3 py-2 rounded-pill'
                                            color="brown"
                                            disabled={ qty >= stock ? true : false }
                                            onClick={ () => setqty(parseInt(qty) + 1)}
                                            >
                                            +
                                        </Button>

                                    </Row>
                                </td>
                            </tr>
                        </Table>

                        <Row>
                            <Button
                                classname="btn rounded-pill"
                                color="brown"
                                onClick={sendToCart}
                                >
                                Add To Cart
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}