import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask} from "mdbreact";
import Numeral from 'numeral'
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';
  import {FaArrowAltCircleRight} from 'react-icons/fa'
  import {NotHome,IsHome} from '../../redux/actions'
  import {FaCartPlus} from 'react-icons/fa'
  import {Link} from 'react-router-dom'
  import {API_URL} from '../../support/ApiUrl'
import videoSource from '../../assets/kopi.mp4'
import './HomePage.css'




class HomePage extends React.Component {

    state = {
        products:[],
        categories:[],
        searchProduct: [],
        allCategories: 'All Category'
    }

    async componentDidMount() {
        try {
            let response = await Axios.get(`${API_URL}/product/getprod`)
            this.setState({
                categories: response.data.category,
                products: response.data.product,
                searchProduct: response.data.product
            })
        } catch (error) {
            console.log(error)
        }
    }
    renderProducts = () => {
        return this.state.products.map((val, index) => {
            return (
                <div key={index} className='p-3' style={{width:'30%'}}>
                    <Card>
                    <Link to={'/productdetail/' + val.id}>
                        <div style={{height:300,width:'100%'}} >
                            <img src={API_URL + val.image} height='70%' width='100%' alt=""/>
                            <div className='kotakhitam'>
                                {/* <Link to={`/productdetail/${val.id}`} className='tombolebuynow'> */}
                                <Link to={'/productdetail/' + val.id} className='tombolebuynow'>
                                    <button className='tomboldalam'><FaCartPlus/></button>
                                </Link>
                            </div>  
                        </div>
                        <CardBody style={{height:150}}>
                            <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                            <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.price).format(0.0)}</CardSubtitle>
                            <button disabled className='rounded-pill px-2 btn-primary' >{val.categoryid.name}</button>
                        </CardBody>
                        </Link>
                    </Card>
                </div>

                )
            })
        }

    
    render () {
        return (
        <div>

            <div className='Container' >
                <video autoPlay="autoplay" loop="loop" muted className='Video'>
                    <source src={videoSource} type="video/mp4" />
                </video>

                <div className='Content'>
                    <div className='SubContent'>
                        <h1>Selamat datang di Kopikopiko (KKK)</h1>
                        <p>'Kami tidak menjual kopi hitam'</p>
                        <button 
                            type="button" 
                            className="btn btn-outline-white"
                            >
                                Shop now
                        </button>
                    </div>
                </div> 
            </div>
        
            <div className='d-flex flex-wrap justify-content-start widthmaxcontent' >
                            {this.renderProducts()}

                </div>
        </div>
           

        )
    }
}
// const MapstatetoProps=({Auth})=>{
//     return{
//         islogin:Auth.KeepLogin
//     }
// }

export default HomePage