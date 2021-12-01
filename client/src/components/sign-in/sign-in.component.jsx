import React, {useEffect, useState} from "react"

import './sign-in.styles.sass'
import {AiFillEye, AiFillEyeInvisible, AiOutlineLock, HiOutlineMail} from "react-icons/all";


const SignIn= ()=>{

    const [signInData, setSignInData]= useState({email:'', password:''})
    const {email, password}= signInData
    const [eye, setEye]= useState(true)

    const handleChange= event=>{
        const {value, name}= event.target
        setSignInData({...signInData, [name]:value})
    }

    const handleSubmit= async event =>{

    }

    const onFocus = (event) => {
        event.target.parentElement.querySelectorAll('svg')
            .forEach(elem => elem.style.color='#9c0068')
    }

    const onBlur = (event) => {
        const elements=event.target.parentElement.querySelectorAll('svg')
        elements[0].style.color='rgb(194,194,194)'
        if (elements.length>1) elements[1].style.color='rgb(129,129,129)'
    }

    const onEye= () =>{
        setEye(!eye)
    }

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
            <button type={'submit'} >Войти</button>
        </form>
    </div>
}

export default SignIn