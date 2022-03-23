import React, {useEffect, useState} from "react";
import './token.styles.sass'
import {SendTokenStart} from "../../redux/user/user.actions";
import {connect} from 'react-redux'
import Spinner from "../spinner/spinner.component";
import {createStructuredSelector} from "reselect";
import {selectToken} from "../../redux/user/user.selector";
import {sleep} from "../../utils/other";


const TokenComponent = ({location, token, sendToken, history}) => {

    const [value, setValue] = useState(null)

    useEffect(() => {
        // if(location.pathname.startsWith('/confirm')) {
        //     setValue('confirm')
        // }
        // else if (location.pathname.startsWith('/reset')) {
        //     setValue('reset')
        // }
        sendToken(location.pathname.substr(1))
    }, [])

    useEffect(async () => {
        if (token) {
            await sleep(10000)
            history.push('/')
        }
    }, [token])

    return (
        <div className={'token-component'}>
            <div className={'token-component-header'}>
                {
                    !token ? <Spinner/> :
                        token === 'confirm' ? 'Ваша почта успешно подвтерждена' :
                            token === 'reset' ? 'Введите новый пароль и подвтерждение' :
                                token === 'fail' ? 'Ваш токен неверен или истек' : ''
                }
            </div>
        </div>
    )

}

const mapDispatchToProps = (dispatch) => ({
    sendToken: data => dispatch(SendTokenStart(data))
})

const mapStateToProps = createStructuredSelector({
    token: selectToken
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenComponent)