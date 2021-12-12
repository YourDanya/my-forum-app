import threadTypes from "./threads.types";

const INITIAL_STATE= {
    threads: null,
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
            return{
                ...state,
                isFetching: false,
                threads: action.payload
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