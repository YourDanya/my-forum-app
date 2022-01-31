import threadTypes from "./threads.types";

export const fetchThreadsStart= (threadId)=>({
    type: threadTypes.FETCH_THREADS_START,
    payload: threadId
})
export const fetchThreadsSuccess= threads =>({
    type: threadTypes.FETCH_THREADS_SUCCESS,
    payload: threads
})
export const fetchThreadsFailure= errorMessage =>({
    type: threadTypes.FETCH_THREADS_FAILURE,
    payload: errorMessage
})


export const createThreadStart= postData =>({
    type: threadTypes.CREATE_THREAD_START,
    payload: postData
})
export const createThreadSuccess= () =>({
    type: threadTypes.CREATE_THREAD_SUCCESS,
})
export const createThreadFailure= errorMessage =>({
    type: threadTypes.CREATE_THREAD_FAILURE,
    payload: errorMessage
})


export const createPostStart= (data)=>({
    type: threadTypes.CREATE_POST_START,
    payload: data
})
export const createPostSuccess= () =>({
    type: threadTypes.CREATE_POST_SUCCESS,
})
export const createPostFailure= errorMessage =>({
    type: threadTypes.CREATE_POST_FAILURE,
    payload: errorMessage
})

export const clearUploadMessage = () =>({
    type: threadTypes.CLEAR_UPLOAD_MESSAGE
})

export const likeDislikeStart = data =>({
    type: threadTypes.LIKE_DISLIKE_START,
    payload: data
})
export const likeDislikeSuccess = () =>({
    type: threadTypes.LIKE_DISLIKE_SUCCESS
})
export const likeDislikeFailure = errorMessage =>({
    type: threadTypes.LIKE_DISLIKE_FAILURE,
    payload: errorMessage
})
