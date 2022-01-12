import {takeLatest, call, put, all} from'redux-saga/effects'
import threadTypes from "./threads.types";
import {
    createThreadFailure,
    createThreadSuccess,
    fetchThreadsFailure,
    fetchThreadsStart,
    fetchThreadsSuccess
} from "./threads.actions";
import axios from "axios";

export function* fetchThreadsSaga({payload}){
    try{
        let threadsRes = payload?
             yield axios.get(`http://127.0.0.1:3000/api/v1/threads/${payload}`) :
             yield axios.get('http://127.0.0.1:3000/api/v1/threads')

        const threads=threadsRes.data.data.data
        yield put(fetchThreadsSuccess(threads))
    } catch(error){
        const errorMessage=error.response.data.message
        yield put(fetchThreadsFailure(errorMessage))
    }
}

export function* createThreadSaga({payload}){
    try{
         yield axios({
            url: 'http://localhost:3000/api/v1/threads/',
            withCredentials: true,
            method: "POST",
            data: payload
        })
        yield put(createThreadSuccess())
        yield put(fetchThreadsStart())
    } catch(error){
        const errorMessage=error.response.data.message
        console.log(errorMessage)
        yield put(createThreadFailure(errorMessage))
    }
}

export function* threadSagas(){
    yield all([
        yield takeLatest(threadTypes.FETCH_THREADS_START, fetchThreadsSaga),
        yield takeLatest(threadTypes.CREATE_THREAD_START, createThreadSaga)
    ])
}