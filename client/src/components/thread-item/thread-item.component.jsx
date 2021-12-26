import React, {useEffect, useState} from 'react'
import '../thread-collection/thread-collection.styles.sass'
import './thread-item.styles.sass'
import avatarPath from '../../assets/avatars/avatar1.png'
import {AiOutlineDislike, AiOutlineLike} from "react-icons/all";
import {dateFormat} from "../../utils/date";
import Post from "../post/post.component";
import Pagination from "../pagination/pagination.component";
import {pageCalc} from "../../utils/pages";

const ThreadItem = ({name, description, createdAt, likes, dislikes, author, posts}) =>{

    const [currentPage, setPage]=useState(1)

    const {pagesCount, itemsOnPage} = pageCalc(posts, currentPage)

    useEffect(() => {
        const handleScroll = () => {
            // code here will be executed on the scroll event
        }
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const iterate = () => {
        console.log("scrolled");
    }

    return <div className={'main'}>
        <div className={'threads item'}>
            <div className={'name'}>{name}</div>
            <div className={'description'}>{description}</div>
            <div className={'date'}>{dateFormat(createdAt)}</div>
            <div className={'info'}>
                <div className={'author'}>
                    <img src={avatarPath} alt={'avatar'}/>
                    <div className={'author-name'}> <span>Автор</span> <br/> {author.name}</div>
                </div>

                <div className={'stats'}>
                    <div className={'like'}>
                        <AiOutlineLike/>
                        <span>{likes.count}</span>
                    </div>
                    <div className={'like dislike'}>
                        <AiOutlineDislike/>
                        <span>{dislikes.count}</span>
                    </div>
                </div>

                <div className={'reply'}>
                    <div className={'reply-title'}>
                        Оставьте свой ответ
                    </div>
                    <textarea placeholder="Ваш ответ автору">

                    </textarea>
                    <div className={'reply-button'}>
                        Ответить
                    </div>
                </div>
            </div>
            {
                posts.length>1 ?
                    <div className={'replies'}>
                        <div className={'replies-wrapper'}>
                            <div className={'replies-count'}>
                                ответов {posts.length}
                            </div>
                            <div className={'replies-last'}>
                                Последний - {dateFormat(posts[posts.length-1].createdAt)}
                            </div>
                        </div>
                    </div> : null
            }
        </div>

        <div className={'posts'} onScroll={iterate}>
            {itemsOnPage.map((post, idx) => <Post {...post} key={idx}/>)}
        </div>

        <div className={'threads posts-pagination'}>
            <Pagination
                pagesCount={pagesCount}
                setPage={setPage}
                currentPage={currentPage}
                styles={{top: '50%', transform: 'translateY(-50%) translateX(-50%)'}}
            />
        </div>

    </div>
}

export default ThreadItem