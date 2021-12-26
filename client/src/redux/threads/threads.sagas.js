import {takeLatest, call, put, all} from'redux-saga/effects'

import threadTypes from "./threads.types";
import {fetchThreadsFailure, fetchThreadsSuccess} from "./threads.actions";
import axios from "axios";

export function* fetchThreadsAsync({payload}){
    try{
        let threadsRes
        if(payload){
            threadsRes= yield axios.get(`http://127.0.0.1:3000/api/v1/threads/${payload}`)
        } else{
            threadsRes= yield axios.get('http://127.0.0.1:3000/api/v1/threads')
        }

        const threads=threadsRes.data.data.data
        yield put(fetchThreadsSuccess(threads))
    } catch(error){
        yield put(fetchThreadsFailure(error.message))
    }
}

export function* fetchThreadStart() {
    yield takeLatest(threadTypes.FETCH_THREADS_START, fetchThreadsAsync)
}

export function* threadSagas(){
    yield all([call(fetchThreadStart)])
}