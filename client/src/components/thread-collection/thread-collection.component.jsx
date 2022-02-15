import React, {useState} from 'react'
import './thread-collection.styles.sass'
import ThreadOverview from "../thread-overview/thread-overview.component";
import Pagination from "../pagination/pagination.component";
import {HiPencilAlt} from "react-icons/all";
import Modal from "../modal/modal.component";

const ThreadCollection= ({threads, ...otherProps})=>{

    const [isModalActive, setModalActive] = useState(false)

    const handleClick = () => {
        setModalActive(true)
    }

    return <div className={'threads'}>
        {
            threads.map((thread, idx) => <ThreadOverview key={idx} thread={thread}/>)
        }
        <Pagination {...otherProps} styles={{
            bottom: '13px',
        }}/>

        <div className={'add-thread-cover'}>
            <button className={'add-thread-button'} onClick={handleClick}>
                <HiPencilAlt/>Добавить тему
            </button>
        </div>

        <Modal isActive={isModalActive} setActive={setModalActive}/>
    </div>
}

export default ThreadCollection