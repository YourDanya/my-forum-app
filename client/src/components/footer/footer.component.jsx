import React from "react"
import './footer.styles.sass'

import {FaFacebook, FaTelegram, FaViber, FiInstagram, IoLogoWhatsapp} from "react-icons/all";

const Footer= () =>{
    return <div className={'footer'}>
        <div className={'container'}>
            <div className={'footerSocials'}>
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
            <div className={'footerCopyright'}>© Danya FORUM. COPYRIGHT</div>
        </div>
    </div>
}


export default Footer