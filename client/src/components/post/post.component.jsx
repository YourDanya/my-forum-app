import React, {useEffect, useState} from 'react'
import './post.styles.sass'
import './../thread-collection/thread-collection.styles.sass'
import {dateFormat} from "../../utils/date";
import avatar from './../../assets/avatars/avatar1.png'
import {AiOutlineDislike, AiOutlineLike, AiTwotoneDislike, AiTwotoneLike} from "react-icons/all";
import PostReply from "../post-reply/post-reply.component";
import {likeDislikeStart} from "../../redux/threads/threads.actions";
import {connect} from "react-redux";
import LikesDislikes from "../likes-dislikes/LikesDislikes.component";

const Post = ({
                  author, createdAt, number, post, likes, dislikes, handleModal, reply, _id,
                  threadId
              }) => {

    const name= author.name
    const userId = author.id

    return <div className={'post'}>

        <div className={'post-author'}>
            <img className={'img'} src={avatar} alt={'avatar'}/>
            <div className={'name'}><span>Автор</span> <br/> {name}</div>
        </div>

        <div className={'post-content'}>
            <div className={'block'}>
                <div className={'date'}>{dateFormat(createdAt)}</div>
                <div className={'number'}>#{number}</div>
            </div>
            {
                reply ?
                    <PostReply
                        author={reply.author.name}
                        post={reply.post}
                        styles={{
                            marginTop: '10px'
                        }}
                    /> : null
            }
            <div className={'text'}>{post}</div>
        </div>

        <div className={'post-footer'}>

            <LikesDislikes
                likes={likes}
                dislikes={dislikes}
                userId={userId}
                threadId={threadId}
                postNum={number}
            />

            <div className={'reply'} onClick={() => {
                handleModal({author: name, post, postId: _id})
            }}>
                Ответить
            </div>
        </div>
    </div>
}

export default Post