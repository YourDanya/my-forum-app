import {all, call} from 'redux-saga/effects'
import {threadSagas} from "./threads/threads.sagas";
import {userSagas} from "./user/user.sagas";

export default function *rootSaga(){
    yield all([
        call(threadSagas),
        call(userSagas)
    ])
}

