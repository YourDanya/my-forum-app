import React, {useEffect, useState} from 'react'

import './profile.styles.sass'
import {Route} from "react-router-dom";
import Settings from "../settings/settings.component";
import MyReplies from "../my-replies/my-replies.component";
import MyThreads from "../my-threads/my-threads.component";
import MyBillings from "../my-billings/my-billings.component";
import {FaRegMoneyBillAlt, FiSettings, RiFileList3Line, RiQuestionAnswerLine} from "react-icons/all";

const Profile = ({history, match}) => {

    const [links, setLinks] = useState({
        settings: false,
        myReplies: false,
        myThreads: false,
        myBillings: false,
        tempLink: 'settings'
    })


    return <div className={'profile'}>
        <div className={'profile-sidebar'}>

            <div className={`profile-sidebar-link ${links.settings ? 'select' : ''}`}
                 onClick={() => {
                     history.push(`${match.url}/settings`)
                     setLinks({...links, [links.tempLink]: false, settings: true, tempLink: 'settings'})
                 }}>
                <FiSettings/>
                НАСТРОЙКИ
            </div>
            <div className={`profile-sidebar-link ${links.myReplies ? 'select' : ''}`}
                 onClick={() => {
                     history.push(`${match.url}/my-replies`)
                     setLinks({...links, [links.tempLink]: false, myReplies: true, tempLink: 'myReplies'})
                 }}>
                <RiQuestionAnswerLine/>
                МОИ ОТВЕТЫ
            </div>
            <div className={`profile-sidebar-link ${links.myThreads ? 'select' : ''}`}
                 onClick={() => {
                     history.push(`${match.url}/my-threads`)
                     setLinks({...links, [links.tempLink]: false, myThreads: true, tempLink: 'myThreads'})
                 }}>
                <RiFileList3Line/>
                МОИ ТЕМЫ
            </div>
            <div className={`profile-sidebar-link ${links.myBillings ? 'select' : ''}`}
                 onClick={() => {
                     history.push(`${match.url}/my-billings`)
                     setLinks({...links, [links.tempLink]: false, myBillings: true, tempLink: 'myBillings'})
                 }}>
                <FaRegMoneyBillAlt/>
                МОИ ПОКУПКИ
            </div>
        </div>
        <div className={'profile-main'}>
            <Route path={`${match.url}/settings`} exact component={Settings}/>
            <Route path={`${match.url}/my-replies`} exact component={MyReplies}/>
            <Route path={`${match.url}/my-threads`} exact component={MyThreads}/>
            <Route path={`${match.url}/my-billings`} exact component={MyBillings}/>
        </div>
    </div>
}

export default Profile