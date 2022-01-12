import {createSelector} from "reselect";

export const getUserStore = state => state.userStore

export const getUser = createSelector(
    [getUserStore],
    userStore => userStore.user
)