import React, {useEffect, useState} from 'react'

import './profile.styles.sass'
import {Link, Route} from "react-router-dom";
import Settings from "../settings/settings.component";
import MyReplies from "../my-replies/my-replies.component";
import MyThreads from "../my-threads/my-threads.component";
import MyBillings from "../my-billings/my-billings.component";
import {AiOutlineHome, FaRegMoneyBillAlt, FiSettings, RiFileList3Line, RiQuestionAnswerLine} from "react-icons/all";

const Profile = ({history, match}) => {

    const [links, setLinks] = useState({
        settings: false,
        myReplies: false,
        myThreads: false,
        myBillings: false,
        tempLink: 'settings'
    })

    const [active, setActive] = useState(false)

    const handleClick = event => {
        setActive(!active)
    }

    return (
        <div className={`profile ${active? 'active' : ''}`}>
            <div className={`profile-sidebar`}>
                <div className={`hamburger`}
                     onClick={handleClick}
                >
                    <span className={'hamburger-line'}/>
                    <span className={'hamburger-line'}/>
                    <span className={'hamburger-line'}/>
                </div>
                <div className={'profile-sidebar-links'}>
                    <div className="profile-sidebar-overlay">
                        <Link to='/' className={`profile-sidebar-link ${links.myBillings ? 'select' : ''}`}>
                            <AiOutlineHome/>
                            Домой
                        </Link>
                        <Link to={'/profile/my-threads'} className={`profile-sidebar-link ${links.myThreads ? 'select' : ''}`}>
                            <RiFileList3Line/>
                            Мои темы
                        </Link>
                        <Link to={'/profile/my-replies'} className={`profile-sidebar-link ${links.myReplies ? 'select' : ''}`}>
                            <RiQuestionAnswerLine/>
                            Мои ответы
                        </Link>
                        <Link to={'/profile/my-settings'} className={`profile-sidebar-link ${links.settings ? 'select' : ''}`}>
                            <FiSettings/>
                            Мои настройки
                        </Link>
                    </div>
                </div>
            </div>
            <div className={'profile-main'}>
                <Route path={`${match.url}/my-settings`} exact component={Settings}/>
                <Route path={`${match.url}/my-replies`} exact component={MyReplies}/>
                <Route path={`${match.url}/my-threads`} exact component={MyThreads}/>
                <Route path={`${match.url}/my-billings`} exact component={MyBillings}/>
            </div>
        </div>
    )
}

export default Profile