import {all, call} from 'redux-saga/effects'
import {threadSagas} from "./threads/threads.sagas";

export default function *rootSaga(){
    yield all([
        call(threadSagas)
    ])
}

