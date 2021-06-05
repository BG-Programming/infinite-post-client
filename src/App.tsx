import React, {useEffect} from 'react';
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
import WritePostPage from "./post/write_post";



function App() {

  useEffect(() => {
    (async()=>{
      await auth.init();
    })();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (    
    <div className="App">            
      <Router>       
        <Switch>          
          <Route path={`/posts/:postId`} render={(props) => <PostDetailPage {...props}/>}/>
          <Route path={`/write`} component={WritePostPage}/>
          <Route path={`/login`} component={LoginPage}/>
          <Route path="/">
            <PostListPage />
          </Route>
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
