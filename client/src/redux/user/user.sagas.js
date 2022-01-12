import UserActionTypes from "./user.types";
import {takeLatest, put, all, call} from 'redux-saga/effects'
import {
    GetUserFromCookieFailure,
    GetUserFromCookieSuccess,
    SignInFailure,
    SignInSuccess, SignOutFailure,
    SignOutSuccess, UpdateUserPasswordFailure
} from "./user.actions";
import axios from "axios";

export function* SignInSaga({payload}) {
    try {
        // axios.defaults.withCredentials = true
        let userData = yield axios({
            url: 'http://localhost:3000/api/v1/users/login',
            withCredentials: true,
            method: "POST",
            data: payload,
        })

        yield put(SignInSuccess(userData.data.data.user))
    } catch (error) {
        yield put(SignInFailure(error))
    }
}


export function* GetUserFromCookieSaga() {
    console.log('inside get user from cookie')
    try {
        let userData = yield axios({
            url: 'http://localhost:3000/api/v1/users/',
            withCredentials: true,
            method: "GET"
        })
        console.log(userData)
        yield put(GetUserFromCookieSuccess(userData.data.data.user))
    } catch (error) {
        yield put(GetUserFromCookieFailure(error))
    }
}

export function* SignOutSaga() {
    console.log('inside sign out saga')
    try {
        let res = yield axios({
            url: 'http://localhost:3000/api/v1/users/logout',
            withCredentials: true,
            method: "GET"
        })
        yield put(SignOutSuccess(res))
    } catch (error) {
        yield put(SignOutFailure(error))
    }
}

export function* UpdateUserPasswordSaga({payload}) {
    try {
        let res = yield axios({
            url: 'http://localhost:3000/api/v1/users/logout',
            withCredentials: true,
            method: 'POST'
        })
    } catch (error) {
        yield put(UpdateUserPasswordFailure(error))
    }
}

export function* userSagas() {
    yield all([
        yield takeLatest(UserActionTypes.SIGN_IN_START, SignInSaga),
        yield takeLatest(UserActionTypes.GET_USER_FROM_COOKIE_START, GetUserFromCookieSaga),
        yield takeLatest(UserActionTypes.SIGN_OUT_START, SignOutSaga),
        yield takeLatest(UserActionTypes.UPDATE_USER_PASSWORD_START, UpdateUserPasswordSaga)
    ])
}
