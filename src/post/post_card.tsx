///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Imports                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
import { Link } from "react-router-dom";

// Import Material UI
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// for post card 
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Import Images
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';

import "./post_card.scss";



///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Post Card                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////
export default function PostCard(props : any) {    
  const post = props.post;
  const bull = <span className="app-bullet">•</span>;

  return (
    <Card className="post-dir post-card" raised={true}>
      <CardHeader
        avatar={ <Avatar /> }
        title={
          <Container className="title-container">
            <Typography>{ post.userDisplayName }</Typography>            
            {bull}
            <Typography>4d</Typography>            
          </Container>          
        }
      
      />       
      <CardContent>
        <Link to={`/posts/${post.id}`}>
          <Typography variant="h5" >{post.title}</Typography>        
          <pre className="app-font-sm">
            {post.content}
          </pre>      
        </Link>  
      </CardContent>
      <CardActions>
        <IconButton >
            <ThumbUpIcon />
        </IconButton>
        <Typography>0</Typography>
        <IconButton >
            <ThumbDownIcon />
        </IconButton>

        <div className="app-grow-space" />

        <IconButton >
            <CommentIcon />
        </IconButton>
        <Typography className="lbl-child-count">{post.numOfChildren}</Typography>
        
      </CardActions>
    </Card>   
  );
}
