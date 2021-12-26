import {combineReducers} from "redux";
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import threadsReducer from "./threads/threads.reducer";

const persistConfig= {
    key: 'root',
    storage,
    // whitelist: ['user']
}

const rootReducer= combineReducers({
    threadsStore: threadsReducer
})

export default persistReducer(persistConfig, rootReducer)