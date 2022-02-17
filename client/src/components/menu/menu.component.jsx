import React from "react"
import './menu.styles.sass'
import {Link} from "react-router-dom";
import {FiSettings, IoSettings, RiFileList3Fill, RiQuestionAnswerFill} from "react-icons/all";

const Menu = () => {
    return (
        <div className={'menu'}>
            <div className={'menu-items'}>
                <Link className="menu-item first" to={'/profile/my-threads'}>
                    <IoSettings/>
                    <a className={'menu-item-text'} >Мои темы</a>
                </Link>
                <Link className="menu-item" to={'/profile/my-replies'}>
                    <RiQuestionAnswerFill/>
                    <a className={'menu-item-text'} >Мои ответы</a>
                </Link>
                <Link className="menu-item" to={'/profile/my-settings'}>
                    <RiFileList3Fill/>
                    <a className={'menu-item-text'} >Мои настройки</a>
                </Link>
            </div>
        </div>
    )
}

export default Menu