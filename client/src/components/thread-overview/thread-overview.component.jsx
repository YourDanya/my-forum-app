import React from 'react';
import './thread-overview.styles.sass'
import {withRouter} from "react-router-dom";

const ThreadOverview= ({thread, history, match})=>{
    const {name, postsCount, id}=thread
    return <div className={'thread-overview'} onClick={()=> history.push(`threads/${id}`)}>
        <div className={'thread-name'}>{name}</div>
        <div className={'thread-posts-count'}>Ответов: {postsCount}</div>
    </div>
}

export default withRouter(ThreadOverview)

