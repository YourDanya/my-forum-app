import React, {useEffect} from 'react'
import './App.css';
import {BrowserRouter, Switch} from "react-router-dom";
import {Route} from "react-router-dom";

import Header from "./components/header/header.component";
import ThreadCollectionContainer from "./components/thread-collection/thread-collection.container";
import Footer from "./components/footer/footer.component";
import MyThreads from "./components/my-threads/my-threads.component";
import MyReplies from "./components/my-replies/my-replies.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import {useDispatch} from "react-redux";
import {fetchThreadsStart} from "./redux/threads/threads.actions";

function App() {
    const dispatch=useDispatch()
    dispatch(fetchThreadsStart())
    return <div className={'App'}>
        <Header/>
        <Switch>
            <Route path={'/'} exact component={ThreadCollectionContainer}/>
            <Route path={'/myThreads'} component={MyThreads}/>
            <Route path={'/myReplies'} component={MyReplies}/>
            <Route path={'/sign-in'} component={SignIn}/>
            <Route path={'/sign-up'} component={SignUp}/>
        </Switch>
        <Footer/>
    </div>
}

export default App;
