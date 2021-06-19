///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Imports                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useRef, useEffect, useState } from "react";
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
import {getDisplayDate} from "util/index";

import "./post_card.scss";



///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Post Card                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////
export default function PostCard(props : any) {    
  const refDescriptionContainer = useRef<HTMLDivElement>(null);
  const post = props.post;
  const bull = <span className="app-bullet">•</span>;
  const [updateCount, setUpdateCount] = useState<number>(0);

  
  useEffect(() => {    
      if( refDescriptionContainer.current )
        setUpdateCount(updateCount+1);    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refDescriptionContainer]);


  return (
    <Card className="post-dir post-card" raised={true}>
      <CardHeader
        avatar={ <Avatar /> }
        title={
          <Container className="title-container">
            <Typography>{ post.userDisplayName }</Typography>
            {bull}
            <Typography>{getDisplayDate(post.createDate)}</Typography>
          </Container>
        }
      />       
      <CardContent>

          <Link to={`/posts/${post.id}`}>
            <Typography variant="h5" >{post.title}</Typography>
          </Link>
          
          <div className="description-container" ref={refDescriptionContainer}>
            <pre className="app-font-sm">
              {post.content}
            </pre>
            {refDescriptionContainer && refDescriptionContainer.current && refDescriptionContainer.current.clientHeight === 200 &&
              <div className="description-fade"/>
            }
          </div>            
        
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
