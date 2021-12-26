import React, {useEffect} from 'react'
import ThreadItem from "./thread-item.component";
import {connect, useDispatch} from "react-redux";
import {fetchThreadsStart} from "../../redux/threads/threads.actions";
import {selectCurrentThread} from "../../redux/threads/threads.selector";
import {createStructuredSelector} from "reselect";
import Spinner from "../spinner/spinner.component";

const ThreadItemContainer = ({match:{params:{threadId}}, data}) =>{
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(fetchThreadsStart(threadId))
    }, [dispatch, threadId])

    return !data? <Spinner/> : <ThreadItem {...data}/>
}

const mapStateToProps=createStructuredSelector({
    data: selectCurrentThread
})

export default connect(mapStateToProps)(ThreadItemContainer)