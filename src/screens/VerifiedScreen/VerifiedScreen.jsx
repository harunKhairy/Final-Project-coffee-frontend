import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../support/ApiUrl'
import { connect } from 'react-redux'
import { AfterVerified } from '../../redux/actions'
import querystring from 'query-string'



class VerifiedScreen extends React.Component {

    state = { success: 0}

    componentDidMount() {
        let obj = querystring.parse(this.props.location.search)
        Axios.get(`${API_URL}/users/verified`, {
            headers: {
                'Authorization' : `Bearer ${obj.token}`
            }
        }).then(response => {
            this.props.AfterVerified(response.data)
            this.setState({ success: 1 })
        }).catch(error => {
            console.log(error)
            this.setState({ success: 2 })
        })

    }

    render () {

        if (this.state.success === 1) {
            return (
                <div>
                    <center>
                        <h1>Berhasil Verified</h1>
                    </center>
                </div>
            )
        } else if (this.state.success === 2) {
            return (
                <div>
                    <center>
                        <h1>Gagal Verified</h1>
                    </center>
                </div>
            )
        }

        return (
            <div>
                <center>
                    <h1>Sedang Menunggu Verified</h1>
                </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(mapStateToProps, { AfterVerified }) (VerifiedScreen)


