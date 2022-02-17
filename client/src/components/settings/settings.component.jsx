import React, {useState} from 'react'
import './settings.styles.sass'

const Settings= ({name, email}) =>{

    const [values, setValues]= useState({
        newName: '',
        newEmail: '',
        newPassword: '',
        currentPassword: '',
        passwordConfirm: '',
        email: ''
    })

    const hideEmail= email =>{
        let hiddenEmail=''
        const length=email.length
        for(let i=0; i<length ; i++){
           hiddenEmail+= i===0 || i===1 || i===length-2 || i===length-1 ? i: '*'
        }
        return hiddenEmail
    }

    const onChange= event =>{
        setValues({...values, [event.target.name]:event.target.value})
    }

    const onSubmit= event =>{
        event.preventDefault()
    }

    return <div className={'settings'}>
        <div className={'settings-title main'}>Измините ваши настройки здесь</div>

        <form onSubmit={onSubmit} className={'settings-form'}>

            <div className={'settings-form-title'}>Настройки имени и почты</div>

            <div className={'settings-form-label'}>Имя</div>
            <input
                placeholder={'name'}
                type={'text'}
                name={'email'}
                value={values.newName}
                onChange={onChange}
                className={'settings-form-input'}
            />
            <div className={'settings-form-label'}>Почта</div>
            <input
                placeholder={'email'}
                type={'email'}
                name={'email'}
                value={values.email}
                onChange={onChange}
                className={'settings-form-input'}
            />
            <div className={'settings-form-button-wrapper'}>
                <button className={'settings-form-button'}>сохранить изменения</button>
            </div>
        </form>

        <form onSubmit={onSubmit} className={'settings-form'}>
            <div className={'settings-form-title'}>Изменение пароля</div>
            <div className={'settings-form-label'}>Ваш текущий пароль</div>
            <input
                placeholder={'**********'}
                type={'password'}
                name={'currentPassword'}
                value={values.currentPassword}
                onChange={onChange}
                required
                className={'settings-form-input'}
            />
            <div className={'settings-form-label'}>Ваш новый пароль</div>
            <input
                placeholder={'**********'}
                type={'password'}
                name={'newPassword'}
                value={values.newPassword}
                onChange={onChange}
                required
                className={'settings-form-input'}
            />
            <div className={'settings-form-label'}>Подтвердите ваш новый пароль</div>
            <input
                placeholder={'**********'}
                type={'passwordConfirm'}
                name={'email'}
                value={values.passwordConfirm}
                onChange={onChange}
                required
                className={'settings-form-input'}
            />
            <div className={'settings-form-button-wrapper'}>
                <button className={'settings-form-button second'}>сменить пароль</button>
            </div>
        </form>
    </div>
}

export default Settings