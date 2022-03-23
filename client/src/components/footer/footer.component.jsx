import React from "react"
import './footer.styles.sass'

import {FaFacebook, FaTelegram, FaViber, FiInstagram, IoLogoWhatsapp} from "react-icons/all";

const Footer= () =>{
    return <div className={'footer'}>
            <div className={'footer-socials'}>
                <div>
                    <FaFacebook/>
                </div>
                <div>
                    <FiInstagram/>
                </div>
                <div>
                    <FaTelegram/>
                </div>
                <div>
                    <FaViber/>
                </div>
                <div>
                    <IoLogoWhatsapp/>
                </div>
            </div>
            <div className={'footer-copyright'}>© Danya FORUM. COPYRIGHT</div>
    </div>
}

export default Footer