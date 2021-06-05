import React, {useState} from "react";
import { RouteComponentProps } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { 
    TextField,
    Container,
    FormControl
 } from '@material-ui/core';
 import "./write_post.scss";
 import {SimpleCallbackType} from "app-types";
 import {api} from "api";
 import {appAlert} from "lib/stdlib";


export default function WritePostPage(props : RouteComponentProps) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    function onTitleChange(event : React.ChangeEvent<HTMLInputElement>){
        setTitle(event.target.value);
    }

    function onDescripotionChange(event : React.ChangeEvent<HTMLInputElement>){
        setDescription(event.target.value);
    }

    async function handelWritePost() {
        if( title.trim().length === 0 ) {
            appAlert.error("제목을 입력해 주십시오.");
            return ;
        }

        try {
            await api.writePost(title, description);
            appAlert.success("새 글을 작성했습니다.");
            props.history.goBack();            
        } catch(err) {
            appAlert.error(err.getMessage());
        }
        
    }

    return (
        <Container className="post-dir write-post-file write-post-page">
            <TopBar {...props} OnWriteClick={handelWritePost} />

            <FormControl className="form-container">
                <TextField label="title" value={title} onChange={onTitleChange} />
                <TextField className="desctiption" label="description"  value={description} onChange={onDescripotionChange}  multiline/>
            </FormControl>
        </Container>
    );
}


interface TopBarProps extends RouteComponentProps {
    OnWriteClick : SimpleCallbackType
}

function TopBar(props : TopBarProps) {
    const history = props.history;    
  
    function handleGoBack() {
      history.goBack();    
    }
  
    return (
        <AppBar className="app-topbar" position="fixed">
            <Toolbar>            
                <Button onClick={handleGoBack}>Cancel</Button>
                <div className="app-grow-space"/>
                <Button variant="contained" color="primary" onClick={props.OnWriteClick} >글쓰기</Button>
            </Toolbar>
        </AppBar>
    ); 
  }
  