import {takeLatest, call, put, all} from 'redux-saga/effects'
import threadTypes from "./threads.types";
import {
    createPostSuccess,
    createThreadFailure,
    createThreadSuccess,
    fetchThreadsFailure,
    fetchThreadsStart,
    fetchThreadsSuccess, likeDislikeFailure, likeDislikeSuccess
} from "./threads.actions";
import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/v1/threads'

export function* fetchThreadsSaga({payload}) {
    try {
        let threadsRes = payload ?
            yield axios.get(`${BASE_URL}/${payload}`) :
            yield axios.get(BASE_URL)

        const threads = threadsRes.data.data.data
        yield put(fetchThreadsSuccess(threads))
    } catch (error) {
        const errorMessage = error.response.data.message
        yield put(fetchThreadsFailure(errorMessage))
    }
}

export function* createThreadSaga({payload}) {
    try {
        yield axios({
            url: `${BASE_URL}`,
            withCredentials: true,
            method: "POST",
            data: payload
        })
        yield put(createThreadSuccess())
        yield put(fetchThreadsStart())
    } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
        yield put(createThreadFailure(errorMessage))
    }
}

export function* createPostSaga({payload}) {
    try {
        yield axios({
            url: `${BASE_URL}/${payload.threadId}/createPost/${payload.postId}`,
            withCredentials: true,
            method: "POST",
            data: payload
        })
        yield put(createPostSuccess())
        yield put(fetchThreadsStart(payload.threadId))
    } catch (error) {
        const errorMessage = error.response.data.message
        yield put(createThreadFailure(errorMessage))
    }
}

export function* likeDislikeSaga({payload : {threadId, postNum, option}}) {
    try {
        yield axios({
            url: `${BASE_URL}/${threadId}/${option}/${postNum? postNum : ''}`,
            withCredentials: true,
            method: "POST"
        })
        yield put(likeDislikeSuccess())
        yield put(fetchThreadsStart(threadId))
    } catch (error) {
        const errorMessage = error.response.data.message
        yield put(likeDislikeFailure(errorMessage))
    }
}

export function* threadSagas() {
    yield all([
        yield takeLatest(threadTypes.FETCH_THREADS_START, fetchThreadsSaga),
        yield takeLatest(threadTypes.CREATE_THREAD_START, createThreadSaga),
        yield takeLatest(threadTypes.CREATE_POST_START, createPostSaga),
        yield takeLatest(threadTypes.LIKE_DISLIKE_START, likeDislikeSaga)
    ])
}