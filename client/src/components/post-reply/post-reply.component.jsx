import React, {useEffect, useRef} from "react";

import './post-reply.styles.sass'

const PostReply = ({author, post, styles}) =>{

   const ref = useRef()

    if(ref.current){
        console.log(ref.current.clientHeight)
    }

   return <div className={'post-reply'} style={styles} ref={ref}>
       <div className={'post-reply-author'}>{author}</div>
       <div className={'post-reply-text'}>{post}</div>
   </div>

}

export default PostReply