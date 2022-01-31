import React, {useState} from "react"
import './LikesDislikes.styles.sass'
import {AiOutlineDislike, AiOutlineLike, AiTwotoneDislike, AiTwotoneLike} from "react-icons/all";
import {likeDislikeStart} from "../../redux/threads/threads.actions";
import {createStructuredSelector} from "reselect";
import {selectUserId} from "../../redux/user/user.selector";
import {connect} from "react-redux";

const LikesDislikes = ({styles, likes, dislikes, userId, threadId, postNum, likeDislike}) => {

    const isLikedDisliked = (likes, dislikes) => {

        let liked = false
        let disliked = false

        for (let i = 0; i < likes.users.length; i++) {
            if (likes.users[i] === userId) {
                liked = true
            }
        }

        if (!liked) {
            for (let i = 0; i < dislikes.users.length; i++) {
                if (dislikes.users[i] === userId) {
                    disliked = true
                }
            }
        }

        return {liked, disliked, likesCount: likes.users.length, dislikesCount: dislikes.users.length}
    }

    const [likedDislikedInfo, setLikedDislikedInfo] = useState(isLikedDisliked(likes, dislikes))

    const handleLikesDislikes = (option, likedDislikedInfo) => {

        let res = {}

        switch (option) {

            case 'like' : {
                res = likedDislikedInfo.liked ?
                    {
                        liked: false,
                        likesCount: likedDislikedInfo.likesCount - 1
                    } :
                    likedDislikedInfo.disliked ?
                        {
                            liked: true,
                            disliked: false,
                            likesCount: likedDislikedInfo.likesCount + 1,
                            dislikesCount: likedDislikedInfo.dislikesCount - 1
                        } :
                        {
                            liked: true,
                            likesCount: likedDislikedInfo.likesCount + 1,
                        }
                break
            }

            case 'dislike' : {
                res = likedDislikedInfo.disliked ?
                    {
                        disliked: false,
                        dislikesCount: likedDislikedInfo.dislikesCount - 1
                    } :
                    likedDislikedInfo.liked ?
                        {
                            disliked: true,
                            liked: false,
                            dislikesCount: likedDislikedInfo.dislikesCount + 1,
                            likesCount: likedDislikedInfo.likesCount - 1,
                        } :
                        {
                            disliked: true,
                            dislikesCount: likedDislikedInfo.dislikesCount + 1,
                        }
                break
            }
        }

        setLikedDislikedInfo({...likedDislikedInfo, ...res})

        likeDislike({
            threadId,
            option,
            postNum
        })

    }

    return <div className={'stats'}>

        <div
            className={`like ${likedDislikedInfo.liked ? 'liked' : ''}`}
            onClick={
                () => handleLikesDislikes('like', likedDislikedInfo)
            }
        >
            {
                likedDislikedInfo.liked ?
                    <AiTwotoneLike/> :
                    <AiOutlineLike/>
            }
            <span>{likedDislikedInfo.likesCount}</span>
        </div>

        <div
            className={`like dislike ${likedDislikedInfo.disliked ? 'disliked' : ''}`}
            onClick={
                () => handleLikesDislikes('dislike', likedDislikedInfo)
            }
        >
            {
                likedDislikedInfo.disliked ?
                    <AiTwotoneDislike/> :
                    <AiOutlineDislike/>
            }

            <span>{likedDislikedInfo.dislikesCount}</span>
        </div>

    </div>

}

const mapDispatchToProps = dispatch => ({
    likeDislike: data => dispatch(likeDislikeStart(data))
})

const mapStateToProps = createStructuredSelector({
    userId: selectUserId
})

export default connect(mapStateToProps, mapDispatchToProps)(LikesDislikes)