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


export const UpdateUserDataStart= data =>({
    type: UserActionTypes.UPDATE_USER_DATA_START,
    payload: data
})
export const UpdateUserDataSuccess= message =>({
    type: UserActionTypes.UPDATE_USER_DATA_SUCCESS,
    payload: message
})
export const UpdateUserDataFailure= message =>({
    type: UserActionTypes.UPDATE_USER_DATA_FAILURE,
    payload: message
})


export const ForgetUserPasswordStart= data =>({
    type: UserActionTypes.FORGOT_USER_PASSWORD_START,
    payload: data
})
export const ForgetUserPasswordSuccess= message =>({
    type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
    payload: message
})
export const ForgetUserPasswordFailure= message =>({
    type: UserActionTypes.FORGOT_USER_PASSWORD_FAILURE,
    payload: message
})


export const ResetUserPasswordStart= data =>({
    type: UserActionTypes.RESET_USER_PASSWORD_START,
    payload: data
})
export const ResetUserPasswordSuccess= message =>({
    type: UserActionTypes.RESET_USER_PASSWORD_SUCCESS,
    payload: message
})
export const ResetUserPasswordFailure= message =>({
    type: UserActionTypes.RESET_USER_PASSWORD_FAILURE,
    payload: message
})

export const ClearSuccessMessages = () =>({
    type: UserActionTypes.CLEAR_SUCCESS_MESSAGES,
})
export const ClearErrorMessages = () =>({
    type: UserActionTypes.CLEAR_ERROR_MESSAGES,
})

export const SendTokenStart = data => ({
    type: UserActionTypes.SEND_TOKEN_START,
    payload: data
})
export const SendTokenSuccess = data => ({
    type: UserActionTypes.SEND_TOKEN_SUCCESS,
    payload: data
})
export const SendTokenFailure = data => ({
    type: UserActionTypes.SEND_TOKEN_FAILURE,
    payload: data
})
export const CLearToken = () => ({
    type: UserActionTypes.CLEAR_TOKEN
})

