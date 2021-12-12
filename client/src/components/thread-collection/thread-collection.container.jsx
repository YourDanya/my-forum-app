import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import ThreadCollection from "./thread-collection.component";
import {selectIsThreadFetching, selectThreads} from "../../redux/threads/threads.selector";
import Spinner from "../spinner/spinner.component";
import {createStructuredSelector} from "reselect";

const ThreadCollectionContainer= ({isLoading, threads}) =>{
    let pagesCount
    let threadsOnPage=[]
    const [currentPage, setPage]=useState(1)

    if(isLoading) {
        return <Spinner/>
    }
    else {
        pagesCount=Math.ceil(threads.length/10)

        const start= (currentPage-1)*10
        const end= threads.length>currentPage*10? currentPage*10: threads.length

        for(let i=start; i<end; i++){
            threadsOnPage.push(threads[i])
        }

    }

    const onSetPage= page =>{
        console.log('yes')
        setPage(page)
    }

    return <ThreadCollection threads={threadsOnPage} currentPage={currentPage} setPage={onSetPage} pagesCount={pagesCount}/>

}

const mapStateToProps=createStructuredSelector({
    isLoading: selectIsThreadFetching,
    threads: selectThreads,
})

export default connect(mapStateToProps)(ThreadCollectionContainer)