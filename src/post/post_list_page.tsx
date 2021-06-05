///////////////////////////////////////////////////////////////////////////////////////////////////
//  Imports
///////////////////////////////////////////////////////////////////////////////////////////////////
// Import Basic
import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
// import App Types
import {PostData} from "app-types";
// import App Basic
// import {api} from "test-api";
import {api} from "api";
import "./post_list_page.scss";
// Import Material UI
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
// Import Images
// import LogoImage from 'assets/images/logo.png';
import LogoImage from 'assets/images/programming.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
// for user menu
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import PostCard from "./post_card";
import {myInfo} from "my_account/MyInfo";



///////////////////////////////////////////////////////////////////////////////////////////////////
//  PostListPage
///////////////////////////////////////////////////////////////////////////////////////////////////
export default function PostListPage(props : any) {    
  const [postList, setPostList] = useState<Array<PostData> | null>(null);
  
  useEffect(() => {
    (async ()=> {      
      try {
        const responseData = await api.getPostList();
        const postList = responseData;
        setPostList(postList);
      } catch(e) {
        console.error(e);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(postList === null )
    return <></>;  

  return (
    <div className="post-dir post-list-page">       
      <Topbar/>

      <PostList postList={postList}/>

      <Link to="/write">
        <Fab color="primary" aria-label="edit" className="btn-write">
            <EditIcon />
        </Fab>
      </Link>
    </div>
  );
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//  Topbar
///////////////////////////////////////////////////////////////////////////////////////////////////
function Topbar() {
  //const [auth, setAuth] = React.useState(true);
  const auth = myInfo.isLogin();
  const [anchorEl, setAnchorEl] = React.useState(null);    
  const open = Boolean(anchorEl);

  const handleMenu = (event : any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 
  return (
    <AppBar position="static" className="topbar app-topbar">
        <Toolbar >
          <div style={{flexGrow:1}}></div>

          <Container className="app-title">
            <Link to="/login">
              <img className="logo" src={LogoImage} alt="logo"/>
            </Link>
          </Container>
          {!auth && (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                edge="end"
                className="btn-account"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>                
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
  );
}




///////////////////////////////////////////////////////////////////////////////////////////////////
//  Post List 
///////////////////////////////////////////////////////////////////////////////////////////////////
// Post List Param interface
interface PostListParams {
  postList : Array<PostData>
}

// Post List Eelemnt
function PostList(props : PostListParams) {
  const postList = props.postList;

  return (
    <div className="post-list">
      {postList.map((post, index)=>{
        return <PostCard post={post} key={post.id}  />

      })}
    </div>
  );
}



