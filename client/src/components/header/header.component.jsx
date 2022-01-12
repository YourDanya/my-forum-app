import React from "react";
import './header.component.styles.sass'
import pathLogo from '../../assets/logo.jpg'
import defaultUser from '../../assets/avatars/avatar1.png'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {SignOutStart} from "../../redux/user/user.actions";

const Header = ({history, user, signOut}) => {
    return <div className={'header'}>
        <img src={pathLogo} alt={'logo'} className={'logo'}/>
        <div className={'forum-name'} onClick={() => history.push('/')}>Danya FORUM</div>
        <div className={'entered-user'}>
            <img src={defaultUser} alt={'user-ava'} className={'user-image'}/>
            <div className={'label'}>вы вошли как <br/> <span>анонимный пользователь №1</span></div>
        </div>

        {
            user ?
                <div className={'sign-in-up'}>
                    <div className={'sign-container sign-in'} onClick={() => signOut()}>Выйти</div>
                </div> :
                <div className={'sign-in-up'}>
                    <div className={'sign-container sign-up'} onClick={() => history.push('/sign-up')}>Регистрация</div>
                    <div className={'sign-container sign-in'} onClick={() => history.push('/sign-in')}>Вход</div>
                </div>
        }

    </div>
}

const mapDispatchToProps = dispatch => ({
   signOut : () => dispatch(SignOutStart())
})

export default withRouter(connect(null, mapDispatchToProps)(Header))