import React, {useState} from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const CardExample = () => {

    const [qty, setQty] = useState(0)

    const qtyOnChange = (event) => {
        if (event.target.value === '') {
            setQty(0)
        }
        if (Number (event.target.value)) {
            if (qty === 0) {
                setQty(event.target.value[1])
            } else {
                // if (event.target.value > stock) {
                //     setQty(stock)
                // } else if (event.target.value < 1) {
                //     setQty(1)
                // } else {
                    setQty(event.target.value)
                // }
            }
        }
    } 

  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make
            up the bulk of the card&apos;s content.
          </MDBCardText>


          {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
          {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}

                                        <MDBBtn 
                                            className='btn-sm px-3 py-2 rounded-pill' 
                                            color="brown" 
                                            // disabled={ qty <= 1 ? true : false }
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
                                            // disabled={ qty <= stock ? true : false }
                                            onClick={()=> setQty(qty + 1)}
                                            // onClick={console.log('tambah')}
                                            > &#10133; </MDBBtn>

        
        
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default CardExample;

                                        // <MDBBtn 
                                        //     className='btn-sm px-3 py-2 rounded-pill' 
                                        //     color="brown" 
                                        //     disabled={ qty <= 1 ? true : false }
                                        //     onClick={()=> setQty(qty - 1)}
                                        //     // onClick={console.log('kurang')}
                                        //     > &#10134; </MDBBtn>
                                        // <div className='rounded' style={{border:'1px black solid'}} >
                                        //             <input 
                                        //                 type="text" 
                                        //                 style={{width:'40px',height:'40px',textAlign:'center',backgroundColor:'transparent',border:'0px'}} 
                                        //                 value={qty} 
                                        //                 onChange={qtyOnChange}
                                        //                 name={qty}
                                        //             />
                                        // </div>
                                        // <MDBBtn 
                                        //     className='btn-sm px-3 py-2 rounded-pill' 
                                        //     color="brown" 
                                        //     disabled={ qty <= stock ? true : false }
                                        //     onClick={()=> setQty(qty + 1)}
                                        //     // onClick={console.log('tambah')}
                                        //     > &#10133; </MDBBtn>