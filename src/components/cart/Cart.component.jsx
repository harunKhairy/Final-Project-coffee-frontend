// import React from 'react'


// class CartComponent extends React.Component {

//     state = {
//         isicart: [],
//         qty: 0
//     }



//     render() {
//         return (
//             <div>
//                 Cart
//             </div>
//         )
//     }
// }

// export default CartComponent

import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import {API_URL} from '../../support/ApiUrl'
import {Table} from 'reactstrap'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {changetoRupiah} from '../../support/changeToRp'
import { AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom'
// import SquareButton  from '../components/button'
import {GetCart} from '../../redux/actions'
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
        Axios.get(`${API_URL}/cart/getcartdata/${this.props.User.id}`)
        .then((res)=>{
            console.log(res.data)
            this.setState({isicart:res.data})
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
              Axios.get(`${API_URL}/cart/deletecart/${id}`)
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
        Axios.get(`${API_URL}/cart/decreaseqty/${id}`)
        .then((res)=>{
            this.getdata()
            this.props.GetCart()
        })
    }

    onplusqty=(index,id)=>{
        Axios.get(`${API_URL}/cart/increaseqty/${id}`)
        .then((res)=>{
            this.getdata()
            this.props.GetCart()
        })
    }

    renderisidata=()=>{
        return this.state.isicart.map((val,index)=>{
            return (
                <tr key={index} style={index === this.state.isicart.length-1?{borderBottom:'1px #DEE2E6 solid'}:{}}>
                    <td>{val.name}</td>
                    <td className='text-center'><img src={API_URL+val.image} height='100' alt=''></img></td>
                    <td className='text-center'>{changetoRupiah(val.price)}</td>
                    <td className="d-flex justify-content-center" style={index===0?{borderTop:'none'}:{}}>
                        <div className="d-flex" style={{border:'1px lightgrey solid', width:"160px"}}>
                        <button className='btn btn-link btn-sm m-0 text-center' 
                                style={{fontSize:"20px", textDecoration:"none"}} 
                                disabled={val.qty<=1?true:false} 
                                onClick={()=>this.onminqty(index,val.transactiondetailsid)}>-</button>
                        <div>
                            <input 
                                type="text" 
                                style={{width:'40px',height:'100%',textAlign:'center',backgroundColor:'transparent', border:"none"}} 
                                value={val.qty} 
                                readOnly
                            />
                        </div>
                        <button className='btn btn-link btn-sm m-0' 
                                style={{fontSize:"20px", textDecoration:"none"}} 
                                disabled={val.qty>=val.stock?true:false} 
                                onClick={()=>this.onplusqty(index,val.transactiondetailsid)}>+</button>
                        </div>
                    </td>
                    <td className='text-center'>{changetoRupiah(val.price*val.qty)}</td>
                    <td className="text-right"><button style={{width:'20px', fontSize:'1.2em', color:'gray'}} className="btn btn-link hoverblack p-0 m-0" onClick={()=>this.deleteconfirm(index,val.transactiondetailsid)}><AiOutlineDelete/></button></td>
                </tr>
            )
        })
    }

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


    render() { 
        return ( 
            <div className="m-5 p-5 ">
                <div> 
                    <h3 className="text-center my-5 text-uppercase"> Cart </h3>
                </div>
                {this.state.isicart===''?
                <div className="text-center">
                    <div className="m-5">Your cart is empty</div>
                    <Link to="/productpage">
                    {/* <div><SquareButton text="shop now" isfunction={false}/></div> */}
                    </Link>
                </div>
                :
                <div>
                <Table striped>
                    <thead>
                        <th>Name</th>
                        <th className='text-center'>Product</th>
                        <th className='text-center'>Price</th>
                        <th className='text-center'>Qty</th>
                        <th className='text-center'>Total</th>
                        <th className='text-center'></th>
                    </thead>
                    <tbody> 
                        {this.renderisidata()}
                    </tbody>
                </Table>

                    <div>{this.rendertotalcart()}</div>
                    <div className="text-right" >
                        <Link to={'/checkout'}>
                            {/* <SquareButton isfunction={false} text="checkout"/> */}
                        </Link>
                    </div>
                </div>
                }
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