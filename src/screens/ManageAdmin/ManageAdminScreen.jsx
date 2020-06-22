import React from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

class ManageAdmin extends React.Component {
    
    state = {
        products:[],
        isModaladdOpen:false,
        isModaleditopen:false,
        indexedit:0,
        indexdelete:-1,
        addimagefile:undefined,
        editimagefile:undefined,
        categories:[]
    }

    async componentDidMount() {
        try {
            let response = await Axios.get(`${API_URL}/product/getprod`)
            this.setState({
                categories: response.data.category,
                products: response.data.product
            })
        } catch (error) {
            console.log(error)
        }
    }

    toogleAdd = () => {
        this.setState({ isModaladdOpen: !this.state.isModaladdOpen })
    }

    toogleEdit = () => {
        this.setState({ isModaleditopen: !this.setState.isModaleditopen })
    }

    handlerAddImageChange = (event) => {
        if (event.target.files[0]) {
            this.setState({ addimagefile: event.target.files[0] })
        } else {
            this.setState({ addimagefile: undefined })
        }
    }

    handlerEditImageChange = (event) => {
        if (event.target.files[0]) {
            this.setState({ editimagefile: event.target.files[0] })
        } else {
            this.setState({ editimagefile: undefined })
        }
    }

    btnSaveAddDataClick = () => {
        let formdata = new FormData()
        let addName = this.refs.addName.value
        let addStok = parseInt(this.refs.addStok.value)
        let addCategory = this.refs.addCategory.value
        let addHarga = parseInt(this.refs.addHarga.value)
        let addDeskripsi = this.refs.addDeskripsi.value
        
        let obj = {
            name: addName,
            stock: addStok,
            categoryid: addCategory,
            price: addHarga,
            description: addDeskripsi
        }

        let token = this.props.USER.token
        let Headers = {
            headers: 
            {
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${token}`
            },
        }

        formdata.append('image', this.state.addimagefile)
        formdata.append('data', JSON.stringify(obj))
        Axios.post(`${API_URL}/product/addprod`, formdata, Headers)
        .then(response => {
            this.setState({
                products: response.data,
                isModaladdOpen: false
            })
        }).catch(error => {
            console.log(error)
        })
    }

    btnDeleteDataClick = (index, id) => {
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.products[index].name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(result => {
            if (result.value) {
              Axios.delete(`${API_URL}/product/deleteprod/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then(result => {
                      if (result.value) {
                        this.setState({products:res.data})
                      }
                  })
              }).catch( err => {
                  console.log(err)
              }) 
            }
          })
    }

    btnSaveEditClick = () => {
        let formdata = new FormData()
        let editName = this.refs.editName.value
        let editStok = parseInt(this.refs.editStok.value)
        let editCategory = this.refs.editCategory.value
        let editHarga = parseInt(this.refs.editHarga.value)
        let editDeskripsi = this.refs.editDeskripsi.value
        
        let obj = {
            name: editName,
            stock: editStok,
            categoryid: editCategory,
            price: editHarga,
            description: editDeskripsi
        }

        let token = this.props.USER.token
        let Headers = {
            headers: 
            {
                'Content-Type':'multipart/form-data',
                'Authorization':`Bearer ${token}`
            },
        }

        formdata.append('image', this.state.editimagefile)
        formdata.append('data', JSON.stringify(obj))
        let id = this.state.products[this.state.indexedit].id
        Axios.put(`${API_URL}/product/editprod/${id}`, formdata, Headers)
        .then(response => {
            this.setState({
                products: response.data,
                isModaleditopen: false
            })
        }).catch(error => {
            console.log(error)
        })
    }

    handlerEditClick = (index) => {
        this.setState({
            indexedit: index,
            isModaleditopen: true
        })
    }

    renderProducts = () => {
        const { products } = this.state
        return products.map((val, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.name}</td>
                    <td><img 
                            src={API_URL + val.image} 
                            alt={val.name} 
                            width="150px" 
                            height="150px"
                        /></td>
                    <td>{val.stock}</td>
                    <td>{val.catname}</td>
                    <td>{val.price}</td>
                    <td>{val.description}</td>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.handlerEditClick(index)}
                            >
                                edit
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={() => this.btnDeleteDataClick(index, val.id)}
                            >
                                Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderCategoryToAdd = () => {
        return this.state.categories.map((val, index) => {
            return <option key={index} value={val.id}>{val.name}</option>
        })
    }

    render () {
        const { indexedit, products } = this.state
        if (this.props.USER.role == 2) {
            return (
                <div className="pt-10">

                    <Modal isOpen={this.state.isModaladdOpen} toggle={this.toogleAdd}>
                        <ModalHeader toggle={this.toogleAdd}>Add data</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='addName' placeholder='Product name' className='form-control mt-2 '/>
                            <input type="file"  placeholder='Url Image' onChange={this.handlerAddImageChange} className='form-control mt-2'/>
                            {
                                this.state.addimagefile ?
                                <img src={URL.createObjectURL(this.state.addimagefile)} alt=""/> :
                                null
                            }
                            <input type="number" ref='addStok' placeholder='jumlah stok' className='form-control mt-2'/>
                            <select ref='addCategory' className='form-control mt-2'>
                                <option value="name" hidden>Pilih category</option>
                                {this.renderCategoryToAdd()}
                            </select>
                            <input type="number" ref='addHarga' placeholder='Harga ' className='form-control mt-2'/>
                            <textarea cols="20" rows="5" ref='addDeskripsi' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.btnSaveAddDataClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleAdd}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    {
                    this.state.products.length ?
                    <Modal isOpen={this.state.isModaleditopen} toggle={this.toogleEdit}>
                        <ModalHeader toggle={this.toogleEdit}>edit data {products[indexedit].name}</ModalHeader>
                        <ModalBody>
                            <input type="text" ref='editName' defaultValue={products[indexedit].name} placeholder='Product name' className='form-control mt-2 '/>
                            <input type="file"  placeholder='Url Image' onChange={this.handlerEditImageChange} className='form-control mt-2'/>
                            <input type="number" ref='editStok' defaultValue={products[indexedit].stock} placeholder='jumlah stok' className='form-control mt-2'/>
                            <select ref='editCategory' defaultValue={products[indexedit].idcat} className='form-control mt-2'>
                                <option value="" hidden>Pilih category</option>
                                {this.renderCategoryToAdd()}
                            </select>
                            <input type="number" defaultValue={products[indexedit].price} ref='editHarga' placeholder='Harga ' className='form-control mt-2'/>
                            <textarea cols="20" rows="5" defaultValue={products[indexedit].description} ref='editDeskripsi' className='form-control mt-2' placeholder='deskripsi' ></textarea>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.btnSaveEditClick}>Save</Button>
                            <Button color="secondary" onClick={this.toogleEdit}>Cancel</Button>
                        </ModalFooter>
                    </Modal> :
                    null
                    }

                    <button className='btn btn-primary mt-4' onClick={this.toogleAdd}>Add data</button>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>image</th>
                                <th>stok</th>
                                <th>Category</th>
                                <th>Harga</th>
                                <th>Deskripsi</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.renderProducts()}
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return <Redirect to="/notfound" />
        }

    }
}

const mapStateToProps = (state) => {
    return {
        USER: state.Auth
    }
}

export default connect(mapStateToProps) (ManageAdmin)