import React from 'react'
import './post.styles.sass'
import './../thread-collection/thread-collection.styles.sass'
import {dateFormat} from "../../utils/date";
import avatar from './../../assets/avatars/avatar1.png'
import {AiOutlineDislike, AiOutlineLike} from "react-icons/all";

const Post = ({author:{name}, createdAt, number, post, likes, dislikes}) =>{
    return <div className={'threads post'}>
        <div className={'post-author'}>
            <img className={'img'} src={avatar} alt={'avatar'}/>
            <div className={'name'}> <span>Автор</span> <br/> {name}</div>
        </div>
        <div className={'post-content'}>
            <div className={'block'}>
                <div className={'date'}>{dateFormat(createdAt)}</div>
                <div className={'number'}>#{number}</div>
            </div>
            <div className={'text'}>{post}</div>
        </div>
        <div className={'post-footer'}>
            <div className={'stats'}>
                <div className={'like'}>
                    <AiOutlineLike onClick={()=> console.log('iiiiii')}/>
                    <span>{likes.count}</span>
                </div>
                <div className={'like dislike'}>
                    <AiOutlineDislike/>
                    <span>{dislikes.count}</span>
                </div>
            </div>
            <div className={'reply'}>Ответить</div>
        </div>
    </div>
}

export default Post