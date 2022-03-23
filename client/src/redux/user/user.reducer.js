import UserActionTypes from './user.types'

const INITIAL_STATE= {
    user: null,
    errorMessages: {},
    successMessages: {},
    updating: false,
    token: null,
}

const userReducer= (state= INITIAL_STATE, action) =>{
    switch(action.type){

        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                successMessages: {login: 'Вы успешно авторизованы'},
                errorMessages: {}
            }
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                user: null,
                errorMessages: action.payload
            }

        case UserActionTypes.GET_USER_FROM_COOKIE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case UserActionTypes.GET_USER_FROM_COOKIE_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload
            }

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                user: null,
                error: null
            }
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                errorMessages: action.payload
            }

        case UserActionTypes.UPDATE_USER_DATA_START:
            return {
                ...state,
                updating: true
            }
        case UserActionTypes.UPDATE_USER_DATA_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                successMessages: action.payload,
                errorMessages: {},
                updating: false
            }
        case UserActionTypes.UPDATE_USER_DATA_FAILURE:
            return {
                ...state,
                errorMessages: action.payload,
                updating: false
            }

        case UserActionTypes.CLEAR_SUCCESS_MESSAGES:
            return {
                ...state,
                successMessages: {},
            }
        case UserActionTypes.CLEAR_ERROR_MESSAGES:
            return {
                ...state,
                errorMessages: {}
            }
        case UserActionTypes.SEND_TOKEN_SUCCESS:
            return {
                ...state,
                token: action.payload
            }
        case UserActionTypes.SEND_TOKEN_FAILURE:
            return {
                ...state,
                token: action.payload
            }
        case UserActionTypes.CLEAR_TOKEN:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}

export default userReducer