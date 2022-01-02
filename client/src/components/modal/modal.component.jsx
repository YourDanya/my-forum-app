import React, {useState} from 'react'
import './modal.styles.sass'
import imgUrl from './../../assets/avatars/avatar1.png'
import {ImCross} from "react-icons/all";

const Modal = ({isActive, setActive, isPost, threadName, authorName, text}) => {

    const initialTextValue= text? text :''
    const [textValue, setTextValue] = useState(initialTextValue)

    const handleTextChange = event => {
        setTextValue(event.target.value)
    }

    return <div className={`modal ${isActive? 'active': ''}`} onClick={()=>setActive(false)}>

        <form className={'modal-form'} onClick={event => event.stopPropagation()}>
            <div className={'modal-form-nav'}>
                <div className={'modal-form-title'}>Добавить ответ</div>
                <div className={'modal-form-cross'} onClick={()=>setActive(false)}>
                    <ImCross/>
                </div>
            </div>

            <div className={'modal-form-content'}>

                {
                    isPost?
                        <div className={'modal-form-label'}>
                            {threadName}
                        </div> :
                        <input className={'modal-form-input'}>

                        </input>
                }

                <textarea className={'modal-form-text'}
                          value={textValue}
                          onChange={handleTextChange}
                />

                <div className={'modal-form-author'}>
                    <img className={'modal-form-author-img'} src={imgUrl}/>
                    <div className={'modal-form-author-name'}>
                        Автор <br/>
                        <span>
                            {authorName}
                        </span>
                    </div>
                </div>
                <div className={'modal-form-button-wrapper'}>
                    <button className={'modal-form-button'}>Добавить {isPost? 'ответ': 'тему'}</button>
                </div>
            </div>
        </form>
    </div>
}

export default Modal