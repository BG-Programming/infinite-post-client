///////////////////////////////////////////////////////////////////////////////////////////////////
//                                    Imports                                                    //
///////////////////////////////////////////////////////////////////////////////////////////////////
// Import Basic
import React, {useState, useEffect} from 'react';
// import App Basic
import "./post_detail_page.scss";
// import {api} from "test-api";
import {api} from "api";
// import App Types
import {PostData, LinkPostData} from "app-types";
// import types
import { Link, RouteComponentProps } from "react-router-dom";
// import material ui
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Avatar,
  Input
} from '@material-ui/core';
// import icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import LogoImage from 'assets/images/programming.png';
// import app components
import CommentCard from "./post_card";
import {bull} from "components";
// import utils
import {getDisplayDate} from "util/index";
import {gotoTop} from "util/uiUtil";





interface Props { match: {params: { postId: string; }; }; }
export default function PostDetailPage(props : RouteComponentProps & Props) {
    const [post, setPost] = useState<PostData | null>(null);
    let postId : number | null = null;
    postId = parseInt(props.match.params.postId);

    useEffect(() => {
        (async ()=> {
            if( postId ) {
                const postDetail = await api.getPostDetail(postId);
                console.info("postDetail>>>", postDetail);
                setPost(  postDetail );
                gotoTop();
            }
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.url]);

    if( postId === null )
        return <>Post ID가 없도다</>;

    if(post === null )
        return <></>;


    return (
    <div className="post-dir post-detail-page">
        <TopBar {...props} />
        <PostContent post={post} />

        <LinkPostSection history={props.history} postId={postId} />

        <div>
            {post.children && 0 < post.children.length &&
              post.children.map((post)=>{
                return (
                  <CommentCard post={post} key={post.id}/>
                );
              })
            }
        </div>
    </div>
    );
}


function TopBar(props : RouteComponentProps) {
    const history = props.history;

    function handleGoBack() {
        history.goBack();
    }

    return (
        <AppBar className="app-topbar" position="fixed">
            <Toolbar>
                <IconButton className="app-left-comp" aria-label="menu" onClick={handleGoBack}>
    		          <ArrowBackIcon />
                </IconButton>
                <Container className="app-title">
                  <Link to="/">
                    <img className="logo" src={LogoImage} alt="logo"/>
                  </Link>
                </Container>
            </Toolbar>
        </AppBar>
    );
}


interface PostContentParams {
  post : PostData
}

function PostContent(props : PostContentParams) {
    const post : PostData = props.post;
    const [postLinkList, setPostLinkList] = React.useState<Array<LinkPostData>>([]);

    useEffect(() => {
        (async ()=> {
            const linkList = await api.getPostLinkList(post.id);
            console.info("linkList>>>", linkList);
            setPostLinkList(linkList);
        })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post]);


  return (
    <Container className="post-content-container">
        {post.parentInfo &&
            <Link to={`/posts/${post.parentInfo.id}`}>
              <Container className="parent-info-container">
                  <Container className="desc-container">
                    <Typography className="app-one-line-ellipsis">{post.parentInfo.title}</Typography>
                    <Typography className="description app-one-line-ellipsis"  >{post.parentInfo.content}</Typography>
                  </Container>
                  <Avatar />
              </Container>
            </Link>
        }


        <Container className="user-info-container">
            <Avatar />
            <Typography className="user-name">{ post.userDisplayName }</Typography>
            {bull}
            <Typography>{getDisplayDate(post.createDate)}</Typography>
        </Container>


        <Typography variant="h5" className="title">{post.title}</Typography>

        <pre className="description">
          	{post.content}
        </pre>

        <LinkedPostList list={postLinkList}/>

        <div className="toolbar">
          <IconButton >
            <ThumbUpIcon />
          </IconButton>
          <Typography>0</Typography>
          <IconButton >
				    <ThumbDownIcon />
          </IconButton>

          <IconButton >
            <CommentIcon />
          </IconButton>
          <Typography >{post.numOfChildren}</Typography>
        </div>
    </Container>
  );
}

interface LinkedPostListProps {
    list : Array<LinkPostData>
}
function LinkedPostList(props:LinkedPostListProps) {
    const postLinkList = props.list;

    return (
    <React.Fragment>
        {0 < postLinkList.length &&
            <div className="linked-post-list">
            {postLinkList.map((post)=>{
                return (
                <div className="link-container" key={post.linkId}>
                    <Link to={`/posts/${post.targetPostId}`}>
                        <div className="link-post-card">
                            <Typography className="title">{post.targetPostTitle}</Typography>
                            <div className="description-fade"/>
                        </div>
                    </Link>
                </div>
                );
            })}
            </div>
        }
    </React.Fragment>
    );
}



// Title & Input
interface LinkPostSectionProps {
  history : RouteComponentProps["history"],
  postId : number
}
function LinkPostSection(props : LinkPostSectionProps) {
  function onWriteLinkedPostClick() {
    props.history.push(`/write?parentId=${props.postId}`);
  }

  return (
    <Container className="link-post-section">

      <Typography variant="h6" className="title" >
          LINKED POSTS
      </Typography>

      <Container className="input-container">
        <Avatar className="user-profile"/>
        <Input  className="txt-input" inputProps={{readOnly: true}} placeholder="Write link post..." onClick={onWriteLinkedPostClick}/>
      </Container>
    </Container>
  );
}
