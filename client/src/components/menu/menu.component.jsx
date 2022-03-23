import React from "react"
import './menu.styles.sass'
import {Link} from "react-router-dom";
import {AiFillHome, IoSettings, RiFileList3Fill, RiQuestionAnswerFill} from "react-icons/all";

const Menu = () => {
    return (
        <div className={'menu'}>
            <div className={'menu-items'}>
                <Link className="menu-item first" to={'/'}>
                    <AiFillHome/>
                    <a className={'menu-item-text'} >Домой</a>
                </Link>
                <Link className="menu-item first" to={'/profile/my-threads'}>
                    <RiFileList3Fill/>
                    <a className={'menu-item-text'} >Мои темы</a>
                </Link>
                <Link className="menu-item" to={'/profile/my-replies'}>
                    <RiQuestionAnswerFill/>
                    <a className={'menu-item-text'} >Мои ответы</a>
                </Link>
                <Link className="menu-item" to={'/profile/my-settings'}>
                    <IoSettings/>
                    <a className={'menu-item-text'} >Мои настройки</a>
                </Link>
            </div>
        </div>
    )
}

export default Menu