import {createSelector} from 'reselect'

const selectThreadStore= state => state.threadsStore

export const selectThreads= createSelector(
    [selectThreadStore],
    threadsStore => threadsStore.threads
)

export const selectIsThreadFetching = createSelector(
    [selectThreadStore],
    threadStore => threadStore.isFetched
)

export const selectCurrentThread = createSelector(
    [selectThreadStore],
    threadStore => threadStore.currentThread
)
