import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { 
    TextField,
    Container,
    FormControl
 } from '@material-ui/core';
 import "./write_post.scss";

export default function WritePostPage(props : any) {
    return (
        <Container className="post-dir write-post-file write-post-page">
            <TopBar history={props.history} />

            <FormControl className="form-container">
                <TextField label="title" />
                <TextField className="desctiption" label="description"  multiline/>                
            </FormControl>

            
        </Container>
    );
}



function TopBar(props : any) {
    const history = props.history;
  
    function handleGoBack() {
      history.goBack();    
    }
  
    return (
        <AppBar className="app-topbar" position="fixed">
            <Toolbar>            
                <Button onClick={handleGoBack}>Cancel</Button>
                <div className="app-grow-space"/>
                <Button variant="contained" color="primary" >Write</Button>
            </Toolbar>
        </AppBar>
    ); 
  }
  