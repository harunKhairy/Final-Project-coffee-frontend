import React from 'react'

import videoSource from '../../assets/kopi.mp4'
import './HomePage.css'




class HomePage extends React.Component {

    render () {
        return (
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
        )
    }
}

export default HomePage