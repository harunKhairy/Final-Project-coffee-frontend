import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl'
import Numeral from 'numeral'
import { Link } from 'react-router-dom'
import { MDBBtn, MDBIcon } from 'mdbreact'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg, Button } from 'reactstrap'
import Fade from 'react-reveal/Fade'
import {FaCartPlus} from 'react-icons/fa'
import { MDBNavLink } from 'mdbreact'



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
                <div key={index} className='p-3' style={{width:'20%'}}>
                    <Card>
                    <Link to={'/productdetail/' + val.id}>Login
                        <div style={{height:300,width:'100%'}} >
                            <img src={API_URL + val.image} height='100%' width='100%' alt=""/>
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




                // <div key={index}>
                //     <Fade bottom>
                //         <div className="col-md-3" style={{marginTop:"4%"}}>
                //             <Card>
                //                 <CardImg top width="100%" height="100%" src={API_URL + val.image} alt="" />
                //                 <div className="blackBox d-flex justify-content-center">
                //                     <Link to={`/productdetail/${val.id}`} className="insideButton">
                //                         <button className="buyNowButton px-5 py-2 btn-sm" style={{marginTop:"140%"}}><div style={{color:"white"}}><MDBIcon icon="cart-plus"/></div></button>
                //                     </Link>
                //                 </div>
                //                 <CardBody>
                //                 <CardTitle>{ val.name }</CardTitle>
                //                 <CardSubtitle>{ `Rp.`+ Numeral(val.price).format(0,0)}</CardSubtitle>
                //                 <Button className="rounded-pill btn-sm" color="brown"><a href={`/productdetail/${val.id}`} style={{color:"white"}}>View Product</a></Button>
                //                 </CardBody>
                //             </Card>
                //         </div>
                //         </Fade>
                // </div>
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
            // <div>
            //      <div className="row d-flex justify-content-center" style={{backgroundColor:"lightgrey"}}>
            //         <div style={{paddingTop:"20px"}}>
            //             <MDBCol md="12">
            //                 <form className="form-inline mt-4 mb-4">
            //                     <MDBIcon icon="search" />
            //                     <input onChange={this.searchOnChange} name="inputSearch" className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
            //                 </form>
            //             </MDBCol>
            //         </div>
            //     </div>

            //     <div className="row d-flex justify-content-center" style={{backgroundColor:"lightgrey", paddingBottom:"30px"}}>
            //         <div style={{paddingTop:"10px"}}>
            //             show by category:
            //         </div>

            //         <ButtonGroup>
            //             <Button className="btn-sm rounded-pill" color="black" onClick={this.clickCategoryTops}>Tops</Button>
            //             <Button className="btn-sm rounded-pill" color="black" onClick={this.clickCategoryBottoms}>Bottoms</Button>
            //             <Button className="btn-sm rounded-pill" color="black" onClick={this.clickCategoryBags}>Bags</Button>
            //             <Button className="btn-sm rounded-pill" color="black" onClick={this.clickCategoryAll}>All</Button>
            //         </ButtonGroup>
            //     </div>

            //     <div className="row" style={{paddingBottom:"5%"}}>
            //         {
            //             this.state.category==="tops"?this.renderTops()
            //             :
            //             this.state.category==="bottoms"?this.renderBottoms()
            //             :
            //             this.state.category==="bags"?this.renderBags()
            //             :
            //             this.renderProducts()
            //         }
            //             {/* {this.renderProducts()} */}
                    
            //         </div>
            // </div>

            <div className='paddingatas'>
                <div className='px-5 pt-3'>
                    <input type="search" placeholder='Search...' className='form-control mb-2 mx-2' style={{width:'20%'}} onChange={this.onInputSearch}/>
                    
                    <div>
                        <MDBBtn outline className='rounded-pill mr-2 mt-2 p-1 px-2' onClick={()=>this.onCategorySelect(0,'All Categories')}>All Categories</MDBBtn>
                        {
                            this.state.categories.length === 0 ?
                            null :
                            this.state.categories.map((val)=>{
                                return(
                                    <MDBBtn outline className='rounded-pill mr-2 mt-2 p-1 px-2' key={val.id} onClick={()=>this.onCategorySelect(val.id, val.name)}>{val.name}</MDBBtn>
                                )
                            })
                        }
                    </div>

                    <div className='mt-2 p-1 px-2'>
                        Category&nbsp;:&nbsp;&nbsp;{this.state.allCategories}
                    </div>

                    <div className="d-flex flex-wrap">
                        {this.renderProducts()}
                    </div>

                </div>
            </div>
        )
    }
}



export default AllProduct