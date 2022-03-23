import React, {useEffect, useState} from "react"
import {connect} from "react-redux";

import './sign-in.styles.sass'
import {AiFillEye, AiFillEyeInvisible, AiOutlineLock, HiOutlineMail} from "react-icons/all";
import {ClearSuccessMessages, SignInStart} from "../../redux/user/user.actions";
import {createStructuredSelector} from "reselect";
import {selectErrorMessages, selectSuccessMessages} from "../../redux/user/user.selector";


const SignIn= ({signIn, successMessages, errorMessages, clearSuccessMessages})=>{
    const [signInData, setSignInData]= useState({email:'', password:''})
    const {email, password}= signInData
    const [eye, setEye]= useState(true)

    const handleChange= event => {
        const {value, name}= event.target
        setSignInData({...signInData, [name]:value})
    }

    const handleSubmit= async event =>{
        event.preventDefault()
        signIn(signInData)
    }

    const onBlur = (event) => {
        const elements=event.target.parentElement.querySelectorAll('svg')
        elements[0].style.color='rgb(194,194,194)'
        if (elements.length>1) elements[1].style.color='rgb(129,129,129)'
    }

    const onFocus = (event) => {
        event.target.parentElement.querySelectorAll('svg')
            .forEach(elem => elem.style.color='#9c0068')
    }

    const onEye= () =>{
        setEye(!eye)
    }

    useEffect(() => {
        if(Object.keys(successMessages).length===0) return
        clearSuccessMessages()
    }, [successMessages])

    return <div className={'sign-in'}>
        <form onSubmit={handleSubmit}>
            <div className={'title'}>ВХОД</div>
            <div className={'input-container'}>
                <HiOutlineMail/>
                <input
                    name={'email'}
                    type={'email'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={email}
                    placeholder={'Email'}
                    required
                />
            </div>
            <div className={'input-container'}>
                <AiOutlineLock/>
                <input
                    type={eye? 'password': 'text'}
                    name={'password'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={password}
                    placeholder={'Пароль'}
                    required
                />
                {eye? <AiFillEyeInvisible onClick={()=> setEye(!eye)}/> : <AiFillEye onClick={onEye}/>}
            </div>
            <div className={'input-message'}>
                {successMessages.login ?
                    <span className={'input-message-success'}>successMessages.login?</span>
                    : errorMessages.login ?
                        <span className={'input-message-error'}>
                            {errorMessages.login}
                        </span>
                        : ''
                }
            </div>
            <button type={'submit'} >Войти</button>
        </form>
    </div>
}

const mapDispatchToProps= dispatch => ({
    signIn: data => dispatch(SignInStart(data)),
    clearSuccessMessages: () => dispatch(ClearSuccessMessages())
})

const mapStateToProps= createStructuredSelector({
    successMessages: selectSuccessMessages,
    errorMessages: selectErrorMessages,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)