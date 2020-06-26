import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl'
import Numeral from 'numeral'
import { Link } from 'react-router-dom'
// import { MDBBtn, MDBIcon } from 'mdbreact'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg, Button } from 'reactstrap'
import Zoom from 'react-reveal/Zoom'
import {FaCartPlus} from 'react-icons/fa'
import { MDBNavLink,  MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol} from 'mdbreact'



class AllProduct extends React.Component {

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
        return this.state.searchProduct.map((val, index) => {
            return (
                
                <div className="py-5">
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

    onInputSearch = (event) => {
        let productdata = this.state.products
        if (event.target.value === '') {
            this.setState ({ searchProduct: productdata })
        } else {
            let productdata = this.state.products
            let productfilter = productdata.filter((val) => val.name.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
            this.setState({ searchProduct: productfilter })
        }
    }

    onCategorySelect = (id, name) => {
        let productdata = this.state.products
        if (id === 0) {
            this.setState ({
                searchProduct: productdata,
                allCategories: name
            })
        } else {
            let productfilter = productdata.filter(val => val.categoryid === id)
            this.setState({
                searchProduct: productfilter,
                allCategories: name
            })
        }
    }


    render() {
        return (
            <div>

                {/* search bar */}
                <div className="px-5 pt-5">
                    <input type="search" placeholder='Search...' className='form-control mb-2 mx-2 ' style={{width:'20%'}} onChange={this.onInputSearch}/>
                    
                    <div >
                        <MDBBtn outline className='rounded-pill mr-2 mt-2 p-1 px-2 ' onClick={()=>this.onCategorySelect(0,'All Categories')}>All Categories</MDBBtn>
                        {
                            this.state.categories.length === 0 ?
                            null :
                            this.state.categories.map((val)=>{
                                return(
                                    <MDBBtn outline  color="" className='rounded-pill mr-2 mt-2 p-1 px-2' key={val.id} onClick={()=>this.onCategorySelect(val.id, val.name)}>{val.name}</MDBBtn>
                                )
                            })
                        }
                    </div>

                    <div className='mt-2 p-1 px-2'>
                        Category&nbsp;:&nbsp;&nbsp;{this.state.allCategories}
                    </div>


                    <div className=" pl-5 d-flex flex-wrap justify-content-start widthmaxcontent">
                        {this.renderProducts()}
                    </div>

                </div>
            </div>
        )
    }
}



export default AllProduct