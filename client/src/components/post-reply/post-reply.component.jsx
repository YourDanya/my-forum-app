import React from "react";

import './post-reply.styles.sass'

const PostReply = ({author, post, styles}) =>{
   return <div className={'post-reply'} style={styles}>
       <div className={'post-reply-author'}>{author}</div>
       <div className={'post-reply-text'}>{post}</div>
   </div>
}

export default PostReply