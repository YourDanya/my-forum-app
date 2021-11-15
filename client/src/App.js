import React from 'react'
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router-dom";

import Header from "./components/header/header.component";
import ThreadCollection from "./components/thread-collection/thread-collection.component";
import Footer from "./components/footer/footer.component";
import MyThreads from "./components/my-threads/my-threads.component";
import MyReplies from "./components/my-replies/my-replies.component";

function App() {
  return <div className={'App'}>
    <Header/>
    <BrowserRouter>
      <Route path={'/'} exact component={ThreadCollection}/>
      <Route path={'/myThreads'} component={MyThreads}/>
      <Route path={'/myReplies'} component={MyReplies}/>
    </BrowserRouter>
    <Footer/>
  </div>
}

export default App;
