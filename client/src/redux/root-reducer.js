import {combineReducers} from "redux";
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import threadsReducer from "./threads/threads.reducer";
import userReducer from "./user/user.reducer";

// const persistConfig= {
//     key: 'root',
//     storage,
//     whitelist: ['cart']
// }

const rootReducer= combineReducers({
    threadsStore: threadsReducer,
    userStore: userReducer
})

export default rootReducer