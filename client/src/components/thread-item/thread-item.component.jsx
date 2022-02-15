import React, {useEffect, useRef, useState} from 'react'
import '../thread-collection/thread-collection.styles.sass'
import './thread-item.styles.sass'
import avatarPath from '../../assets/avatars/avatar1.png'
import {dateFormat} from "../../utils/date";
import Post from "../post/post.component";
import Pagination from "../pagination/pagination.component";
import {pageCalc} from "../../utils/pages";
import Modal from "../modal/modal.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../redux/user/user.selector";
import LikesDislikes from "../likes-dislikes/LikesDislikes.component";

const ThreadItem = (
    {
        name, description, createdAt, likes, dislikes, author, posts, id,
        userId
    }) => {

    const [isModalActive, setModalActive] = useState(false)

    const [textValue, setTextValue] = useState('')
    const [reply, setReply] = useState(null)

    const [currentPage, setPage] = useState(1)

    const {pagesCount, itemsOnPage} = pageCalc(posts, currentPage)

    const handleModal = reply => {
        setModalActive(true)
        if (reply) setReply(reply)
    }

    const ref = useRef()

    const [sticky, setSticky] = useState(false)

    useEffect(() => {

        if (pagesCount > 1) {
            const cachedRef = ref.current
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.intersectionRatio > 0) {
                        setSticky(true)
                    } else {
                        setSticky(false)
                    }
                },
                {
                    threshold: 0,
                    rootMargin: `0px 0px -${window.innerHeight-1}px 0px`
                }
            )

            observer.observe(cachedRef)

            return () => observer.unobserve(cachedRef)
        }

    }, [pagesCount])

    return <div className={'main'}>

        <div className={'threads item'}>
            <div className={'name'}>{name}</div>
            <div className={'description'}>{description}</div>
            <div className={'date'}>{dateFormat(createdAt)}</div>
            <div className={'info'}>

                <div className={'author'}>
                    <img src={avatarPath} alt={'avatar'}/>
                    <div className={'author-name'}><span>Автор</span> <br/> {author.name}</div>
                </div>

                <LikesDislikes
                    likes={likes}
                    dislikes={dislikes}
                    userId={userId}
                    threadId={id}
                />

                <div className={'reply'}>
                    <div className={'reply-title'}>
                        Оставьте свой ответ
                    </div>
                    <textarea placeholder="Ваш ответ автору"
                              value={textValue}
                              onChange={event => setTextValue(event.target.value)}
                    />
                    <div className={'reply-button'} onClick={() => handleModal()}>
                        Ответить
                    </div>
                </div>
            </div>
            {
                posts.length > 1 ?
                    <div className={'replies'}>
                        <div className={'replies-wrapper'}>
                            <div className={'replies-count'}>
                                ответов {posts.length}
                            </div>
                            <div className={'replies-last'}>
                                Последний - {dateFormat(posts[posts.length - 1].createdAt)}
                            </div>
                        </div>
                    </div> : null
            }
        </div>

        <div className={'posts'} ref={ref}>
            {
                itemsOnPage.map((post) =>

                    <Post
                        {...post}
                        key={post.number}
                        handleModal={handleModal}
                        threadId={id}
                        userId
                    />
                )
            }
        </div>

        {
            pagesCount > 1 ?
                <div className={`threads posts-pagination ${sticky? 'sticky' : ''}`}>
                    <Pagination
                        pagesCount={pagesCount}
                        setPage={setPage}
                        currentPage={currentPage}
                        styles={{top: '50%', transform: 'translateY(-50%) translateX(-50%)'}}
                    />
                </div> : null
        }

        <Modal
            isActive={isModalActive}
            setActive={setModalActive}
            isPost
            threadName={name}
            threadId={id}
            authorName={author.name}
            reply={reply}
            text={textValue}
        />

    </div>
}

const mapStateToProps = createStructuredSelector({
    userId: selectUserId
})

export default connect(mapStateToProps)(ThreadItem)