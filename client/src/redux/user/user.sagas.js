import UserActionTypes from "./user.types";
import {takeLatest, put, all} from 'redux-saga/effects'
import {
    GetUserFromCookieFailure, GetUserFromCookieStart,
    GetUserFromCookieSuccess, SendTokenFailure, SendTokenSuccess,
    SignInFailure,
    SignInSuccess, SignOutFailure,
    SignOutSuccess, UpdateUserDataFailure, UpdateUserDataSuccess,
} from "./user.actions";
import axios from "axios";

const BASE_URL = 'http://localhost:3000/api/v1/users'

export function* SignInSaga({payload}) {
    try {
        let res = yield axios({
            url: `${BASE_URL}/login`,
            withCredentials: true,
            method: "POST",
            data: payload,
        })
        yield put(SignInSuccess(res.data.user))
    } catch (error) {
        const errorMessage = error.response.data.message
        console.log(errorMessage)
        yield put(SignInFailure({login: errorMessage}))
    }
}

export function* GetUserFromCookieSaga() {
    try {
        let userData = yield axios({
            url: `${BASE_URL}`,
            withCredentials: true,
            method: "GET"
        })
        yield put(GetUserFromCookieSuccess(userData.data.data.user))
    } catch (error) {
        yield put(GetUserFromCookieFailure(error))
    }
}

export function* SignOutSaga() {
    try {
        let res = yield axios({
            url: `${BASE_URL}/logout`,
            withCredentials: true,
            method: "GET"
        })
        yield put(SignOutSuccess(res))
    } catch (error) {
        yield put(SignOutFailure(error))
    }
}

export function* UpdateUserDataSaga({payload}) {
    try {
        const res = yield axios({
            url: `${BASE_URL}/updateMe`,
            withCredentials: true,
            method: 'PATCH',
            data: payload
        })
        yield put(UpdateUserDataSuccess(res.data.updateSuccess))
        yield put(GetUserFromCookieStart())
    } catch (error) {
        const updateError = error?.response?.data?.errorFields
        console.log(error.response.data.message)
        if(updateError) {
            yield put(UpdateUserDataFailure(updateError))
        }
        else{
            const message = 'Упс... Что-то пошло не так. Попробуйте снова через время.'
            let field
            if ('newName' in payload) field = 'name'
            if ('newEmail' in payload) field = 'email'
            if ('newPassword' in payload) field = 'password'
            if ('email' in payload) field = 'forget'
            yield put(UpdateUserDataFailure({[field] : message}))
        }
    }
}

export function* SendTokenSaga({payload}) {
    try {
        const res = yield axios({
            url: `${BASE_URL}/${payload}`,
            withCredentials: true,
            method: 'POST'
        })
        yield put(SendTokenSuccess('confirm'))
    } catch (error) {
        const token = error.response.data.status
        yield put(SendTokenFailure(token))
    }
}

export function* userSagas() {
    yield all([
        yield takeLatest(UserActionTypes.SIGN_IN_START, SignInSaga),
        yield takeLatest(UserActionTypes.GET_USER_FROM_COOKIE_START, GetUserFromCookieSaga),
        yield takeLatest(UserActionTypes.SIGN_OUT_START, SignOutSaga),
        yield takeLatest(UserActionTypes.UPDATE_USER_DATA_START, UpdateUserDataSaga),
        yield takeLatest(UserActionTypes.SEND_TOKEN_START, SendTokenSaga)
    ])
}
