import React, {useState} from 'react'
import './thread-collection.styles.sass'
import ThreadOverview from "../thread-overview/thread-overview.component";
import Pagination from "../pagination/pagination.component";
import Modal from "../modal/modal.component";

const ThreadCollection = ({threads, ...otherProps}) => {

    const [isModalActive, setModalActive] = useState(false)

    const handleClick = () => {
        setModalActive(true)
    }

    return (
        <div className={'threads'}>
            <div className="threads-collection">
                {
                    threads.map((thread) => <ThreadOverview key={thread.id} thread={thread}/>)
                }
            </div>
            <Pagination {...otherProps} className={'thread-collection-pagination'}/>
            <div className={'add-thread-cover'}>
                <button className={'add-thread-button'} onClick={handleClick}>
                    Добавить тему
                </button>
            </div>
            <Modal isActive={isModalActive} setActive={setModalActive}/>
        </div>
    )
}

export default ThreadCollection