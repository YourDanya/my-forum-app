import {createSelector} from 'reselect'

const selectThreadStore= state => state.threadsStore

export const selectThreads= createSelector(
    [selectThreadStore],
    threadsStore => threadsStore.threads
)

export const selectCurrentThread = createSelector(
    [selectThreadStore],
    threadStore => threadStore.currentThread
)

export const selectUploadMessage =createSelector(
    [selectThreadStore],
    threadStore => threadStore.uploadMessage
)

export const selectIsUploading =createSelector(
    [selectThreadStore],
    threadStore => threadStore.isUploading
)

export const selectErrorMessage =createSelector(
    [selectThreadStore],
    threadStore => threadStore.errorMessage
)