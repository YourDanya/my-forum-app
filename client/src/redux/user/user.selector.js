import {createSelector} from "reselect";

export const selectUserStore = state => state.userStore

export const selectUser = createSelector(
    [selectUserStore],
    userStore => userStore.user
)

export const selectUserName = createSelector(
    [selectUser],
    user => user.name
)

export const selectUserId = createSelector(
    [selectUser],
    user => user._id
)
