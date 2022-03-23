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

export const selectSuccessMessages = createSelector(
    [selectUserStore],
    userStore => userStore.successMessages
)

export const selectErrorMessages = createSelector(
    [selectUserStore],
    userStore => userStore.errorMessages
)

export const selectUpdating = createSelector(
    [selectUserStore],
    userStore => userStore.updating
)

export const selectToken = createSelector(
    [selectUserStore],
    userStore => userStore.token
)