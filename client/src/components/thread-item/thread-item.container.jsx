import React, {useEffect} from 'react'
import ThreadItem from "./thread-item.component";
import {connect, useDispatch} from "react-redux";
import {clearCurrentThread, fetchThreadsStart} from "../../redux/threads/threads.actions";
import {createStructuredSelector} from "reselect";
import Spinner from "../spinner/spinner.component";
import {selectCurrentThread} from "../../redux/threads/threads.selector";

const ThreadItemContainer = ({match: {params: {threadId}}, data, clearThread}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchThreadsStart(threadId))
        return () => {
            clearThread()
        }
    }, [dispatch, threadId])

    return(
        <>
            {
                !data ?
                    <Spinner overlayStyles={{width: '70%'}}/>
                    : <ThreadItem {...data}/>
            }
        </>
    )

}

const mapStateToProps = createStructuredSelector({
    data: selectCurrentThread
})

const mapDispatchToProps = dispatch => ({
    clearThread: () => dispatch(clearCurrentThread())
})

export default connect(mapStateToProps, mapDispatchToProps)(ThreadItemContainer)