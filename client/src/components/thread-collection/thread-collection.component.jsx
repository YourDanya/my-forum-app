import React from 'react'
import './thread-collection.styles.sass'
import ThreadOverview from "../thread-overview/thread-overview.component";
import Pagination from "../pagination/pagination.component";

const ThreadCollection= ({threads, ...otherProps})=>{
    return <div className={'threads'}>
        {
            threads.map((thread, idx) => <ThreadOverview key={idx} thread={thread}/>)
        }
        <Pagination {...otherProps} styles={{bottom: '13px'}}/>
    </div>
}

export default ThreadCollection