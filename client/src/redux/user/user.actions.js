import UserActionTypes from "./user.types"

export const SignInStart = logData => ({
    type: UserActionTypes.SIGN_IN_START,
    payload: logData
})
export const SignInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})
export const SignInFailure = message => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: message
})


export const SignOutStart = logData => ({
    type: UserActionTypes.SIGN_OUT_START,
    payload: logData
})
export const SignOutSuccess = user => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
    payload: user
})
export const SignOutFailure = message => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: message
})


export const GetUserFromCookieStart= () =>({
    type: UserActionTypes.GET_USER_FROM_COOKIE_START,
})
export const GetUserFromCookieSuccess= user =>({
    type: UserActionTypes.GET_USER_FROM_COOKIE_SUCCESS,
    payload: user
})
export const GetUserFromCookieFailure= message =>({
    type: UserActionTypes.GET_USER_FROM_COOKIE_FAILURE,
    payload: message
})


export const UpdateUserPasswordStart= data =>({
    type: UserActionTypes.UPDATE_USER_PASSWORD_START,
    payload: data
})
export const UpdateUserPasswordSuccess= user =>({
    type: UserActionTypes.UPDATE_USER_PASSWORD_SUCCESS,
    payload: user
})
export const UpdateUserPasswordFailure= message =>({
    type: UserActionTypes.UPDATE_USER_NAME_FAILURE,
    payload: message
})