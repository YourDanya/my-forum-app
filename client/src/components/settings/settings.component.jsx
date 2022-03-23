import React, {useEffect, useState} from 'react'
import './settings.styles.sass'
import {createStructuredSelector} from "reselect";
import {ClearSuccessMessages, UpdateUserDataStart} from "../../redux/user/user.actions";
import {connect} from "react-redux";
import {
    selectErrorMessages,
    selectSuccessMessages,
    selectUpdating
} from "../../redux/user/user.selector";
import {sleep} from "../../utils/other";

const Settings = ({
                      updateUserData, updateSuccess, updateError, clearSuccessMessages,
                      updating
                  }) => {

    const [values, setValues] = useState({
        newName: '',
        newEmail: '',
        newPassword: '',
        currentPassword: '',
        passwordConfirm: '',
        email: ''
    })

    useEffect(async () => {
        if (Object.keys(updateSuccess).length === 0) return
        if ('name' in updateSuccess) {
            console.log('here')
            setValues({...values, newName: ''})
        }
        if ('email' in updateSuccess) {
            setValues({...values, newEmail: ''})
        } else if ('password' in updateSuccess) {
            setValues({...values, newPassword: '', currentPassword: '', passwordConfirm: ''})
        } else if ('forget' in updateSuccess) {
            setValues({...values, email: ''})
        }
        await sleep(5000)
        clearSuccessMessages()
    }, [updateSuccess])

    const onChange = event => {
        if (updating) return
        setValues({...values, [event.target.name]: event.target.value})
    }

    const filterBlankValues = (object) => {
        const filteredObject = {}
        Object.keys(object).forEach(element => {
            if (object[element] !== '') {
                filteredObject[element] = object[element]
            }
        })
        return filteredObject
    }

    const onSubmit = event => {
        event.preventDefault()
        switch (event.target.id) {
            case 'forget-password' : {
                const {email} = values
                updateUserData({email})
                return
            }
            case 'update-password' : {
                const {newPassword, currentPassword, passwordConfirm} = values
                updateUserData({newPassword, currentPassword, passwordConfirm})
                return
            }
            default : {
                const {newName, newEmail} = values
                const updateValues = filterBlankValues({newName, newEmail})
                updateUserData(updateValues)
                return
            }
        }
    }

    return (
        <div className={'settings'}>
            <div className={'settings-title'}>Измините ваши настройки здесь</div>
            <form onSubmit={onSubmit} className={'settings-form'} id={'1'}>
                <div className={'settings-form-title'}>Настройки имени и почты</div>
                <div className={'settings-form-label'}>Имя</div>
                <input
                    placeholder={'Новое имя'}
                    type={'text'}
                    name={'newName'}
                    value={values.newName}
                    onChange={onChange}
                    className={'settings-form-input'}
                />
                {/*////////////////////////////////////////*/}
                <div className={'input-message'}>
                    {updateSuccess.name ?
                        <span className={'input-message-success'}>Ваше имя успешно изменено.</span>
                        : updateError.name ?
                            <span className={'input-message-error'}>
                            {updateError.name}
                        </span>
                            : ''
                    }
                </div>
                {/*////////////////////////////////////////////////*/}
                <div className={'settings-form-label'} style={{marginTop: '0'}}>Почта</div>
                <input
                    placeholder={'Новый email'}
                    type={'email'}
                    name={'newEmail'}
                    value={values.newEmail}
                    onChange={onChange}
                    className={'settings-form-input'}
                />
                {/*//////////////////////////////////////*/}
                <div className={'input-message'}>
                    {updateSuccess.email ?
                        <span className={'input-message-success'}>Перейдите на почту для подтверждения изменения.</span>
                        : updateError.email ?
                            <span className={'input-message-error'}>
                            {updateError.email}
                        </span>
                            : ''
                    }
                </div>
                {/*/////////////////////////////////////////*/}
                <div className={'settings-form-button-wrapper'}>
                    <button className={'settings-form-button'}>Cохранить изменения</button>
                </div>
            </form>
            <form onSubmit={onSubmit} className={'settings-form'} id={'update-password'}>
                <div className={'settings-form-title'}>Изменение пароля</div>
                <div className={'settings-form-label'}>Ваш текущий пароль</div>
                <input
                    placeholder={'•••••••••'}
                    type={'password'}
                    name={'currentPassword'}
                    value={values.currentPassword}
                    onChange={onChange}
                    required
                    className={'settings-form-input'}
                />
                <div className={'settings-form-label'}>Ваш новый пароль</div>
                <input
                    placeholder={'•••••••••'}
                    type={'password'}
                    name={'newPassword'}
                    value={values.newPassword}
                    onChange={onChange}
                    required
                    className={'settings-form-input'}
                />
                <div className={'settings-form-label'}>Подтвердите ваш новый пароль</div>
                <input
                    placeholder={'•••••••••'}
                    type={'password'}
                    name={'passwordConfirm'}
                    value={values.passwordConfirm}
                    onChange={onChange}
                    required
                    className={'settings-form-input'}
                />
                {/*////////////////////////////////////////////*/}
                <div className={'input-message'}>
                    {updateSuccess.password ?
                        <span className={'input-message-success'}>Ваш пароль успешно изменен.</span>
                        : updateError.password ?
                            <span className={'input-message-error'}>
                            {updateError.password}
                        </span>
                            : ''
                    }
                </div>
                {/*//////////////////////////////////////////////*/}
                <div className={'settings-form-button-wrapper'}>
                    <button className={'settings-form-button second'}>Сменить пароль</button>
                </div>
            </form>
            <form onSubmit={onSubmit} className={'settings-form'} id={'forget-password'}>
                <div className={'settings-form-title'}>Сброс пароля</div>
                <div className={'settings-form-label'}>Ваша почта</div>
                <input
                    placeholder={'Ваш email'}
                    type={'email'}
                    name={'email'}
                    value={values.email}
                    onChange={onChange}
                    required
                    className={'settings-form-input'}
                />
                {/*////////////////////////////////////////////*/}
                <div className={'input-message'}>
                    {updateSuccess.forget ?
                        <span className={'input-message-success'}>Перейдите на почту для смены пароля.</span>
                        : updateError.forget ?
                            <span className={'input-message-error'}>
                            {updateError.forget}
                        </span>
                            : ''
                    }
                </div>
                {/*//////////////////////////////////////////////*/}
                <div className={'settings-form-button-wrapper'}>
                    <button className={'settings-form-button third'}>Cбросить пароль</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    updateSuccess: selectSuccessMessages,
    updateError: selectErrorMessages,
    updating: selectUpdating
})

const mapDispatchToProps = dispatch => ({
    updateUserData: data => dispatch(UpdateUserDataStart(data)),
    clearSuccessMessages: () => dispatch(ClearSuccessMessages())
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)