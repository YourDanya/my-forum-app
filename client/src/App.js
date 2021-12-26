import React from 'react'
import './App.sass';
import {Switch} from "react-router-dom";
import {Route} from "react-router-dom";
import Header from "./components/header/header.component";
import ThreadCollectionContainer from "./components/thread-collection/thread-collection.container";
import Footer from "./components/footer/footer.component";
import MyThreads from "./components/my-threads/my-threads.component";
import MyReplies from "./components/my-replies/my-replies.component";
import SignIn from "./components/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import ThreadItemContainer from "./components/thread-item/thread-item.container";

function App() {

    return <div className={'App'}>
        <div className={'App-content'}>
            <Header/>
            <Switch>
                <Route path={'/'} exact component={ThreadCollectionContainer}/>
                <Route path={'/threads/:threadId'} exact component={ThreadItemContainer}/>
                <Route path={'/myThreads'} component={MyThreads}/>
                <Route path={'/myReplies'} component={MyReplies}/>
                <Route path={'/sign-in'} component={SignIn}/>
                <Route path={'/sign-up'} component={SignUp}/>
            </Switch>
        </div>
        <Footer/>
    </div>
}

export default App;
