import React from 'react'
import './pagination.styles.sass'

const Pagination= ({currentPage, setPage, pagesCount, styles}) => {
    if(pagesCount===1){
        return null
    }
    const arr=[]
    arr.push('<')
    if(pagesCount<=6){
        for(let i=1; i<=pagesCount; i++){
            arr.push(i)
        }
    }
    else if(currentPage<5){
        for(let i=1; i<=5; i++){
            arr.push(i)
        }
        arr.push('...')
        arr.push(pagesCount)
    }
    else if(currentPage>=pagesCount-3){
        arr.push(1)
        arr.push('...')
        for(let i=pagesCount-4; i<=pagesCount; i++) {
            arr.push(i)
        }
    }
    else {
        arr.push(1)
        arr.push('...')
        for(let i=currentPage-1; i<=currentPage+1; i++){
            arr.push(i)
        }
        arr.push('...')
        arr.push(pagesCount)
    }
    arr.push('>')

    const onClick = elem =>{
        if(elem==='...' || elem===currentPage){
            return
        }
        if(!isNaN(elem)){
            setPage(elem)
        }
        else if(elem==='<' && currentPage!==1){
            setPage(currentPage-1)
        }
        else if(elem==='>' && currentPage!==pagesCount){
            setPage(currentPage+1)
        }
    }

    const setClass= elem =>{
        switch(elem){
            case '<':
            case '>':
                return 'arrow'
            case '...':
                return 'ellipsis'
            case currentPage:
                return 'page current'
            default:
                return 'page'
        }
    }

    return <div className={'pagination'} style={styles}>
        {
            arr.map((elem, idx) =>
                <div key={idx} className={'elem '+setClass(elem)} onClick={()=>onClick(elem)}>{elem}</div>
            )
        }
    </div>

}

export default Pagination