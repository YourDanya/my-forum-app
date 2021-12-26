import React from "react"
import './footer.styles.sass'

import {FaFacebook, FaTelegram, FaViber, FiInstagram, IoLogoWhatsapp} from "react-icons/all";

const Footer= () =>{
    return <div className={'footer'}>
        <div className={'container'}>
            <div className={'footerSocials'}>
                <a href="https://www.facebook.com/profile.php?id=100069601987597">
                    <FaFacebook/>
                </a>
                <a href="https://www.instagram.com/abn.bud/">
                    <FiInstagram/>
                </a>
                <a href="https://t.me/abnbud">
                    <FaTelegram/>
                </a>
                <a href="viber://chat?number=%2B380999115738">
                    <FaViber/>
                </a>
                <a href="https://wa.me/380735925381">
                    <IoLogoWhatsapp/>
                </a>
            </div>
            <div className={'footerCopyright'}>Danya Forum. COPYRIGHT</div>
        </div>
    </div>
}


export default Footer