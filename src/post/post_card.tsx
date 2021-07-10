///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Imports                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {myInfo} from "my_account/MyInfo";

// Import Material UI
import {
  Avatar,
  IconButton,
  Typography,
  Container,
  Menu,
  MenuItem
} from '@material-ui/core';

// for post card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// Import Images
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';


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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMyPost = myInfo.isLogin() === true && post.userAccountId === myInfo.getId();

  const handleClick = (event:any) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };





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
            <div className="app-grow-space"/>
            {isMyPost &&
              <React.Fragment>
                <IconButton className="more-option" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                  <MoreVertIcon/>
                </IconButton>
                <Menu id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <Link to={`/posts/${post.id}/edit-link`}>
                    <MenuItem>EditLink</MenuItem>
                  </Link>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </React.Fragment>

            }
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
