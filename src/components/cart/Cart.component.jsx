import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URL} from '../../support/ApiUrl'
// import {Table} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {changetoRupiah} from '../../support/changeToRp'
// import { AiOutlineDelete } from 'react-icons/ai';
// import { Link } from 'react-router-dom'
// import SquareButton  from '../components/button'
import { GetCart } from '../../redux/actions/CartAction'
import {Table,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap'
import '../cart/Cart.css'

const MySwal = withReactContent(Swal)



class Cart extends Component {
    state = { 
        isicart:[],
        qty:0
     }

    componentDidMount(){
        this.getdata()
    }

    getdata=()=>{
        console.log('masuk get data')
        Axios.get(`${API_URL}/transactions/getcartdata/${this.props.User.id}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({isicart:res.data.length})
        })
    }

    deleteconfirm=(index,id)=>{
        console.log(id)
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.isicart[index].name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.get(`${API_URL}/transactions/deletecart/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                        this.getdata()
                        this.props.GetCart()
                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    onminqty=(index,id)=>{
        Axios.get(`${API_URL}/transactions/minqty/${id}`)
        .then((res)=>{
            this.getdata()
            this.props.GetCart()
        })
    }

    onplusqty=(index,id)=>{
        Axios.get(`${API_URL}/transaction/plusqty/${id}`)
        .then((res)=>{
            this.getdata()
            this.props.GetCart()
        })
    }

    renderisidata=()=>{
        if(this.state.isicart.length === 0 ) {
            return null
        }
        return this.state.isicart[0].map((val,index)=>{
        // return this.state.isicart[0].transactiondetails.map((val,index)=>{
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.name}</td>
                    <td ><img src={ API_URL + val.image} height='200' alt=""/></td>
                    <td >{changetoRupiah(val.price)}</td>
                    <td >{val.qty}</td>
                    <td><button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button></td>
                </tr>
            )
        })
    }

    // renderisidata=()=>{
    //     return this.state.isicart.map((val,index)=>{
    //         return (
    //             <tr key={index} style={index === this.state.isicart.length-1?{borderBottom:'1px #DEE2E6 solid'}:{}}>
    //                 <td>{val.name}</td>
    //                 <td className='text-center'><img src={API_URL+val.image} height='100' alt=''></img></td>
    //                 <td className='text-center'>{changetoRupiah(val.price)}</td>
    //                 <td className="d-flex justify-content-center" style={index===0?{borderTop:'none'}:{}}>
    //                     <div className="d-flex" style={{border:'1px lightgrey solid', width:"160px"}}>
    //                     <button className='btn btn-link btn-sm m-0 text-center' 
    //                             style={{fontSize:"20px", textDecoration:"none"}} 
    //                             disabled={val.qty<=1?true:false} 
    //                             onClick={()=>this.onminqty(index,val.transactiondetailsid)}>-</button>
    //                     <div>
    //                         <input 
    //                             type="text" 
    //                             style={{width:'40px',height:'100%',textAlign:'center',backgroundColor:'transparent', border:"none"}} 
    //                             value={val.qty} 
    //                             readOnly
    //                         />
    //                     </div>
    //                     <button className='btn btn-link btn-sm m-0' 
    //                             style={{fontSize:"20px", textDecoration:"none"}} 
    //                             disabled={val.qty>=val.stock?true:false} 
    //                             onClick={()=>this.onplusqty(index,val.transactiondetailsid)}>+</button>
    //                     </div>
    //                 </td>
    //                 <td className='text-center'>{changetoRupiah(val.price*val.qty)}</td>
    //                 <td className="text-right"><button style={{width:'20px', fontSize:'1.2em', color:'gray'}} className="btn btn-link hoverblack p-0 m-0" onClick={()=>this.deleteconfirm(index,val.transactiondetailsid)}><AiOutlineDelete/></button></td>
    //             </tr>
    //         )
    //     })
    // }

    rendertotalcart =()=>{
        var total=0
        this.state.isicart.forEach((val)=>{
            var output= val.price*val.qty
            total+=output
        })
        return (
            <div className='text-right mb-3'>
                Total {changetoRupiah(total)}
            </div>
        )
    }

    onCheckoutClick =()=>{
        return (
            this.props.history.push({
                pathname: `/checkout/transaction/${this.props.User.id}`,
            })
        )
    }


    // render() { 
    //     return ( 
    //         <div className="m-5 p-5 ">
    //             <div> 
    //                 <h3 className="text-center my-5 text-uppercase"> Cart </h3>
    //             </div>
    //             {this.state.isicart===''?
    //             <div className="text-center">
    //                 <div className="m-5">Your cart is empty</div>
    //                 <Link to="/productpage">
    //                 {/* <div><SquareButton text="shop now" isfunction={false}/></div> */}
    //                 </Link>
    //             </div>
    //             :
    //             <div>
    //             <Table striped>
    //                 <thead>
    //                     <th>Name</th>
    //                     <th className='text-center'>Product</th>
    //                     <th className='text-center'>Price</th>
    //                     <th className='text-center'>Qty</th>
    //                     <th className='text-center'>Total</th>
    //                     <th className='text-center'></th>
    //                 </thead>
    //                 <tbody> 
    //                     {this.renderisidata()}
    //                 </tbody>
    //             </Table>

    //                 <div>{this.rendertotalcart()}</div>
    //                 <div className="text-right" >
    //                     <Link to={'/checkout'}>
    //                         {/* <SquareButton isfunction={false} text="checkout"/> */}
    //                     </Link>
    //                 </div>
    //             </div>
    //             }
    //         </div>
    //      );
    // }

    render() { 
        console.log(this.state.isicart)
        return (
            <div className='paddingatas'>
                <Modal toggle={()=>this.setState({modalOpen:false})} isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={()=>this.setState({modalOpen:false})}>
                        Pembayaran            
                    </ModalHeader>
                    <ModalBody>
                        <select className='form-control mb-2' onChange={(e)=>this.setState({selectedoption:e.target.value})}>
                            <option value="" hidden>Pilih pembayaran</option>
                            <option value="1" className='form-control mb-2'>Credit Card</option>
                            <option value="2" className='form-control'>Konvensional</option>
                        </select>
                        {
                            this.state.selectedoption==='1'?
                            <input type="text" className='form-control' value={this.state.cc} onChange={(e)=>this.setState({cc:e.target.value})} placeholder='masukkan No. Kartu Credit'/>
                            :
                            this.state.selectedoption==='2'?
                            <input type="text" className='form-control' placeholder='masukkan bukti pembayaran'/>
                            :
                            null
                        }
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-danger'>Cancel</button>
                        <button className='btn btn-success' onClick={this.onBayarClick}>Bayar</button>
                    </ModalFooter>
                </Modal>
                <Table striped>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>foto</th>
                            <th>Harga</th>
                            <th>qty</th>
                            <th>Hapus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderisidata()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='font-weight-bold'>
                                Total Belanja
                            </td>
                            <td className='font-weight-bold'>
                                {
                                    this.rendertotalcart()
                                }
                            </td>
                            <td>
                                <button className='btn btn-default' onClick={()=>this.setState({modalOpen:true})}>Checkout</button>
                            </td>

                        </tr>
                    </tfoot>
                </Table>
            </div>
          );
    }
}

const MapstatetoProps=(state)=>{
    return{
      User:state.Auth,
    }
  }
 
export default connect(MapstatetoProps, {GetCart}) (Cart);