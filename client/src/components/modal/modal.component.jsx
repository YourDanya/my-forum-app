import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import './modal.styles.sass'
import imgUrl from './../../assets/avatars/avatar1.png'
import {ImCross} from "react-icons/all";
import {clearUploadMessage, createPostStart, createThreadStart} from "../../redux/threads/threads.actions";
import {createStructuredSelector} from "reselect";
import {selectErrorMessage, selectIsUploading, selectUploadMessage} from "../../redux/threads/threads.selector";
import Spinner from "../spinner/spinner.component";
import {sleep} from "../../utils/other";
import PostReply from "../post-reply/post-reply.component";

const Modal = ({
                   isActive, setActive, isPost, threadName, authorName, text, createPost,
                   createThread, isUploading, uploadMessage, clearUploadMessage,
                   errorMessage, reply, threadId
               }) => {

    const [textValue, setTextValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    useEffect(() => setTextValue(text), [text])

    console.log(textValue)

    const handleTextChange = event => {
        setTextValue(event.target.value)
    }

    const handleInputValue = event => {
        setInputValue(event.target.value)
    }

    useEffect(async () => {
        await sleep(3000)
        if (uploadMessage && errorMessage) {
            clearUploadMessage()
        } else if (uploadMessage) {
            clearUploadMessage()
            setTextValue('')
            setInputValue('')
            setActive(false)
        }
    }, [uploadMessage])

    const handleSubmit = async event => {
        event.preventDefault()
        isPost ?
            createPost({
                threadId,
                post: textValue,
                postId: reply.postId
            }) :
            createThread({
                name: inputValue,
                description: textValue
            })
    }


    return <div className={`modal ${isActive ? 'active' : ''}`} onClick={() => {
        setActive(false)
        setTextValue(text)
    }}>

        <form className={'modal-form'} onClick={event => event.stopPropagation()} onSubmit={handleSubmit}>
            <div className={'modal-form-nav'}>
                <div className={'modal-form-title'}>
                    Добавить {isPost ? 'ответ' : 'тему'}
                </div>

                <div className={'modal-form-cross'} onClick={() => setActive(false)}>
                    <ImCross/>
                </div>
            </div>

            <div className={'modal-form-content'}>

                {
                    reply ? <PostReply {...reply}
                                       styles={{
                                           marginBottom: '10px'
                                       }}
                        />
                        : null
                }

                {
                    isPost ?
                        <div className={'modal-form-label'}>
                            {threadName}
                        </div> :
                        <input
                            className={'modal-form-input'}
                            value={inputValue}
                            onChange={handleInputValue}
                            placeholder={'Название темы'}
                            required
                        />

                }

                <textarea className={'modal-form-text'}
                          value={textValue}
                          onChange={handleTextChange}
                          placeholder={isPost ? 'Текст ответа' : 'Текст темы'}
                          required
                />

                <div className={'modal-form-author'}>
                    <img className={'modal-form-author-img'} src={imgUrl} alt={'post author'}/>
                    <div className={'modal-form-author-name'}>
                        Автор <br/>
                        <span>
                            {authorName}
                        </span>
                    </div>
                </div>

                <div className={'modal-form-footer'}>
                    {
                        isUploading ?
                            <Spinner overlayStyles={{
                                height: '40px',
                                width: '40px',
                                marginLeft: '8.28px'
                            }} containerStyles={{
                                height: '40px',
                                width: '40px'
                            }}/> :
                            uploadMessage ? uploadMessage :
                                <button className={'modal-form-button'}>Добавить {isPost ? 'ответ' : 'тему'}</button>
                    }
                    {
                        errorMessage ? <div className={'modal-form-error'}>
                            {errorMessage}
                        </div> : null
                    }
                </div>

            </div>
        </form>
    </div>
}

const mapDispatchToProps = dispatch => ({
    createPost: data => dispatch(createPostStart(data)),
    createThread: data => dispatch(createThreadStart(data)),
    clearUploadMessage: () => dispatch(clearUploadMessage())
})

const mapStateToProps = createStructuredSelector({
    isUploading: selectIsUploading,
    uploadMessage: selectUploadMessage,
    errorMessage: selectErrorMessage
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)