import threadTypes from "./threads.types";

const INITIAL_STATE= {
    threads: null,
    currentThread: null,
    isFetching: false,
    errorMessage: undefined,
}

const threadsReducer= (state= INITIAL_STATE, action) => {
    switch(action.type){
        case threadTypes.FETCH_THREADS_START:
            return{
                ...state,
                isFetching: true
            }
        case threadTypes.FETCH_THREADS_SUCCESS:
            const res= Array.isArray(action.payload)? 'threads' : 'currentThread'
            return{
                ...state,
                isFetching: false,
                [res]: action.payload
            }
        case threadTypes.FETCH_THREADS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default threadsReducer