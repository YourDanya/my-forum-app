import React, {useState} from "react"

import './sign-up.styles.sass'
import {
    AiFillEye,
    AiFillEyeInvisible,
    AiOutlineLock,
    BsPerson,
    GiConfirmed,
    HiOutlineMail
} from "react-icons/all";

const SignUp= ()=>{

    const [signInData, setSignInData]= useState({name:'', email:'', password:'', passwordConfirm: ''})
    const {name, email, password, passwordConfirm}= signInData
    const [eye, setEye]= useState({one: true, two: true})

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


    return <div className={'sign-in sign-up'}>
        <form onSubmit={handleSubmit}>
            <div className={'title'}>РЕГИСТРАЦИЯ</div>
            <div className={'input-container'} >
                <BsPerson />
                <input
                    name={'name'}
                    type={'text'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={name}
                    placeholder={'Имя'}
                    required
                />
            </div>

            <div className={'input-container'} >
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
                    type={eye.one? 'password': 'text'}
                    name={'password'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={password}
                    placeholder={'Пароль'}
                    required
                />

                {eye.one? <AiFillEyeInvisible onClick={()=> setEye({...eye, one: !eye.one})}/>
                : <AiFillEye onClick={()=> setEye({...eye, one: !eye.one})}/>}
            </div>

            <div className={'input-container'}>
                <GiConfirmed/>
                <input
                    type={eye.two? 'password': 'text'}
                    name={'passwordConfirm'}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={handleChange}
                    value={passwordConfirm}
                    placeholder={'Подтверждение пароля'}
                    required
                />

                {eye.two? <AiFillEyeInvisible onClick={()=> setEye({...eye, two: !eye.two})}/>
                : <AiFillEye onClick={()=> setEye({...eye, two: !eye.two})}/>}

            </div>

            <button type={'submit'} >Регистрация</button>
        </form>
    </div>
}

export default SignUp