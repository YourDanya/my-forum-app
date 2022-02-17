import React, {useEffect, useState} from 'react'
import {connect, useDispatch} from 'react-redux'
import ThreadCollection from "./thread-collection.component";
import {selectThreads} from "../../redux/threads/threads.selector";
import Spinner from "../spinner/spinner.component";
import {createStructuredSelector} from "reselect";
import {fetchThreadsStart} from "../../redux/threads/threads.actions";
import {pageCalc} from "../../utils/pages";

const ThreadCollectionContainer= ({threads}) =>{

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchThreadsStart())
    }, [dispatch])

    const [currentPage, setPage]=useState(1)

    if(!threads) {
        return <Spinner overlayStyles={{width: '70%'}}/>
    }

    else {
        const {pagesCount, itemsOnPage} = pageCalc(threads, currentPage)
        return (
            <>
                <ThreadCollection
                    threads={itemsOnPage}
                    currentPage={currentPage}
                    setPage={setPage}
                    pagesCount={pagesCount}
                />
            </>
        )
    }

}

const mapStateToProps=createStructuredSelector({
    threads: selectThreads
})

export default connect(mapStateToProps)(ThreadCollectionContainer)