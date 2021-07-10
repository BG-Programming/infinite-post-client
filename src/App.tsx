import React, {useEffect, useState} from 'react';
import './base.scss';
import './project.scss';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import Third party library css
import 'alertifyjs/build/css/alertify.css';

import {auth} from "auth";


import PostListPage from "./post/post_list_page";
import PostDetailPage from "./post/post_detail_page";
import LoginPage from "./login/login";
import SignupPage from "./login/signup";
import WritePostPage from "./post/write_post";
import EditLinkPage from "./post/edit_link";



function App() {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    (async()=>{
      await auth.init();
      setUpdateCount(updateCount+1);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if( auth.isInit() === false )
    return <></>

  return (
    <div className="App">
      <Router>
        <Switch>          
          <Route path={`/write`} component={WritePostPage}/>
          <Route path={`/login`} component={LoginPage}/>
          <Route path={`/signup`} component={SignupPage}/>
          <Route path={`/posts/:postId/edit-link`} component={EditLinkPage}/>
          <Route path={`/posts/:postId`} render={(props) => <PostDetailPage {...props}/>}/>
          <Route path="/">
            <PostListPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
