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

