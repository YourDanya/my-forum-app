import threadTypes from "./threads.types";

const INITIAL_STATE= {
    threads: null,
    currentThread: null,
    isFetching: false,
    errorMessage: undefined,
    isUploading: false,
    uploadMessage: null
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


        case threadTypes.CREATE_THREAD_START:
            return{
                ...state,
                isUploading: true
            }
        case threadTypes.CREATE_THREAD_SUCCESS:
            return{
                ...state,
                isUploading: false,
                errorMessage: null,
                uploadMessage: 'Тема успешно создана'
            }
        case threadTypes.CREATE_THREAD_FAILURE:
            return{
                ...state,
                isUploading: false,
                errorMessage: action.payload,
                uploadMessage: 'Что-то пошло не так...'
            }

        case threadTypes.CREATE_POST_START:
            return{
                ...state,
                isUploading: true
            }
        case threadTypes.CREATE_POST_SUCCESS:
            return{
                ...state,
                isUploading: false,
                errorMessage: null,
                uploadMessage: 'Ответ успешно добавлен'
            }
        case threadTypes.CREATE_POST_FAILURE:
            return{
                ...state,
                isUploading: false,
                errorMessage: action.payload,
                uploadMessage: 'Что-то пошло не так...'
            }
        case threadTypes.CLEAR_UPLOAD_MESSAGE:
            return{
                ...state,
                uploadMessage: null
            }
            
        default:
            return {
                ...state
            }
    }
}

export default threadsReducer