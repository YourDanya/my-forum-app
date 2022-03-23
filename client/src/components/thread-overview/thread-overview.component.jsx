import React, {useEffect, useState} from 'react';
import './thread-overview.styles.sass'
import {withRouter} from "react-router-dom";

const ThreadOverview = ({thread, history, match}) => {
    const {name, postsCount, id} = thread

    const updateString = (string, end) => {
        for (let i= end; i>=0; i--) {
            if(string[i] === ' ') {
                while(!string[i-1].match(/[а-я]/i)){
                    i--
                }
                return `${string.slice(0, i)}...`
            }
        }
    }

    const addWhiteSpaces = num => {
        if (num>=100) return num
        if (num>=10) return `${num}`
        return `${num}  `
    }

    return (
        <div className={'thread-overview'} onClick={() => history.push(`threads/${id}`)}>
            <div className={'thread-name'}>
                {
                    name.length>70 ? updateString(name, 70) : name
                }
            </div>
            <div className={'thread-posts-count'}>
                Ответов: {addWhiteSpaces(postsCount)}
                <div className="threads-posts-link">Открыть</div>
            </div>
        </div>
    )
}

export default withRouter(ThreadOverview)

