import React, {useEffect} from 'react'
import './App.sass';
import {Redirect, Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Header from "./components/header/header.component";
import ThreadCollectionContainer from "./components/thread-collection/thread-collection.container";
import Footer from "./components/footer/footer.component";
import MyThreads from "./components/my-threads/my-threads.component";
import MyReplies from "./components/my-replies/my-replies.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import ThreadItemContainer from "./components/thread-item/thread-item.container";
import Profile from "./components/profile/profile.component";
import {createStructuredSelector} from "reselect";
import {selectUser} from "./redux/user/user.selector";
import {connect} from "react-redux";
import {GetUserFromCookieStart} from "./redux/user/user.actions";
import Menu from "./components/menu/menu.component";

const App = ({user, isLoggedIn}) => {

    useEffect(() => {
        isLoggedIn()
    }, [])

    console.log(user)

    return <div className={'App'}>
        <div className={'App-content'}>
            <Header user={user}/>
            {/*<Switch>*/}
                <Route path={'/'} exact component={ThreadCollectionContainer}/>
                <Route path={'/threads/:threadId'} exact component={ThreadItemContainer}/>
                <Route
                    path={'/sign-in'}
                    render={() => (
                        user ? <Redirect to={'/'}/>
                            : <SignIn/>
                    )}/>
                <Route path={["/", "/threads/:threadId"]}  exact component={Menu}/>
                <Route path={'/sign-up'} component={SignUp}/>
                <Route path={'/profile'} component={Profile}/>
            {/*</Switch>*/}
        </div>
        <Footer/>
    </div>
}

const mapStateToProps = createStructuredSelector({
    user: selectUser
})

const mapDispatchToProps = dispatch => ({
    isLoggedIn: () => dispatch(GetUserFromCookieStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
