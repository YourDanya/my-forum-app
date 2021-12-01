import React from "react";
import './header.component.styles.sass'
import pathLogo from '../../assets/logo2.jpg'
import defaultUser from '../../assets/default-avatar.jpg'
import {withRouter} from "react-router-dom";

const Header= ({history})=>{
    return <div className={'header'}>
        <img src={pathLogo} alt={'logo'} className={'logo'}/>
        <div className={'forum-name'}>Danya FORUM</div>
        <div className={'entered-user'}>
            <img src={defaultUser} alt={'user photo'} className={'user-image'}/>
            <div className={'label'}>вы вошли как <br/> <span>анонимный пользователь №1</span></div>
        </div>
        <div className={'sign-in-up'}>
            <div className={'sign-container sign-up'} onClick={()=>history.push('sign-up')}>Регистрация</div>
            <div className={'sign-container sign-in'} onClick={()=>history.push('sign-in')}>Вход</div>
        </div>
    </div>
}

export default withRouter(Header)