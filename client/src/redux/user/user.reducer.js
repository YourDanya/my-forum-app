import UserActionTypes from './user.types'

const INITIAL_STATE= {
    user: null,
    error: null
}

const userReducer= (state= INITIAL_STATE, action) =>{
    switch(action.type){
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null
            }
        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                user: null,
                error: action.payload
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
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer