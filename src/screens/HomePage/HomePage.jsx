import React from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import { MDBCarousel,  MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBNavLink,  MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol} from "mdbreact";
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
import Zoom from 'react-reveal/Zoom'




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
                <div className="pt-1 pb-5 pl-5 pr-5" key={index}>
                    <Zoom  bottom cascade>
                        <MDBCol style={{ maxWidth: "22rem",}}>
                            <MDBCard >
                                <MDBCardImage 
                                    className="img-fluid rounded mx-auto d-block" 
                                    src={API_URL + val.image} 
                                    style={{maxHeight: "322px", minWidth: "322px"}}
                                    waves/>

                                <MDBCardBody>
                                    {/* <MDBCardTitle>{val.name}</MDBCardTitle> */}
                                    <MDBCardText className="font-weight-bolder">{val.name}</MDBCardText>
                                    <MDBCardText>{val.catname}</MDBCardText>
                                    <MDBCardText>{'Rp.'+Numeral(val.price).format(0.0)}</MDBCardText>
                                    <MDBBtn href={'/productdetail/' + val.id}>Detail</MDBBtn>
                                    <MDBBtn href="#"> Buy Now</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </Zoom>
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