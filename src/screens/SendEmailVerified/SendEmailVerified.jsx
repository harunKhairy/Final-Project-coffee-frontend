import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl'
import { connect } from 'react-redux'

class SendEmailVerified extends React.Component {

    state = {loading: false}

    handlerClick = () => {
        this.setState({ loading: true });
        let obj = {
            username: this.props.Auth.username,
            email: this.props.Auth.email,
            userid: this.props.Auth.id
        }
        Axios.post(`${API_URL}/auth/sendemailverified`, obj)
        // Axios.post(`${API_URL}/users/sendemailverified`, obj)
        .then( response => {
            if (response.data.pesan) {
                // sweet alert guys nanti di ganti
                alert('yeah email berhasil dikirim')
            }
        }).catch(error => {
            console.log(error)
        }).finally(()=> {
            this.setState({ loading: false })
        })
    }

    render () {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>
                    apakah anda telah mendapatkan surat verified dari hokage, di email kalian ,
                    kalo belum silahkan klik tombo dibawah ini
                </h1>
                {
                    this.state.loading ?
                    <div>Loading .....</div> :
                    <button onClick={this.handlerClick}> Klik donk</button>
                }
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect (mapStateToProps) (SendEmailVerified)
