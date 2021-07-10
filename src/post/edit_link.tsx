import React, {useEffect} from "react";
import { RouteComponentProps } from "react-router-dom";
import {
    Container,
    Tabs,
    Tab,
    Typography,
    InputBase,
    IconButton,
    Divider,
    Button
} from '@material-ui/core';
import "./edit_link.scss";
import {LinkPostData} from "app-types";
import {api} from "api";
import {appAlert} from "lib/stdlib";
import DefaultTopbar from "components/DefaultTopBar";
import SwipeableViews from 'react-swipeable-views';
import SearchIcon from '@material-ui/icons/Search';
import LinkOffIcon from '@material-ui/icons/LinkOff';




function TabPanel(props : any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}


interface RouterProps { // type for `match.params`
    postId: string; // must be type `string` since value comes from the URL
}

export default function EditLinkPage(props : RouteComponentProps<RouterProps>) {
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [postLinkList, setPostLinkList] = React.useState<Array<LinkPostData> | null>(null);
  const [linkTagetPostId, setLinkTargetPostId] = React.useState<string>("") ;

  let postId : number | null = null;
  postId = parseInt(props.match.params.postId);


  useEffect(() => {
    (async ()=> {
      if( postId && tabIndex === 0) {
        const list = await api.getPostLinkList(postId);
        setPostLinkList(list);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex]);



  if( isNaN(postId) || postLinkList === null )
    return <></>;

  const handleChange = (event : any, newIndex : number) => {
    setTabIndex(newIndex);
  };

  const handleChangeIndex = (index : number) => {
    setTabIndex(index);
  };

  function onChangeTagetPostId (e : any) {
    setLinkTargetPostId(e.target.value);

  }

  async function connectPost(postId : number) {
    const targetPostId = parseInt(linkTagetPostId);
    await api.connectPost(postId, targetPostId);
    setLinkTargetPostId("");
  }

  async function disconnectPost(postId : number, linkId:number) {
    await api.disconnectPost(postId, linkId);
    const newPostListList = postLinkList!.filter((post)=>{
      if( post.linkId !== linkId )
        return post;
    });
    setPostLinkList(newPostListList);
  }



  return (
      <Container className="post-dir edit-link-file edit-link-page app-page-with-top-bar">
          <DefaultTopbar {...props} OnOKClick={()=>{}} />

          <Tabs value={tabIndex} onChange={handleChange} variant="fullWidth">
              <Tab label="연결된 글" />
              <Tab label="글 연결하기"  />
          </Tabs>
          <SwipeableViews
            index={tabIndex}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={tabIndex} index={0} className="tab-connected-post">

              {0 <postLinkList.length &&
                postLinkList.map((post)=>{
                  return (
                    <div className="link-container" key={post.linkId}>
                      <div className="link-post-card">
                        <Typography className="title app-one-line-ellipsis">{post.targetPostTitle}</Typography>
                        <Typography className="description app-number-of-text-lines">{post.targetPostContent}</Typography>
                      </div>
                      <IconButton onClick={()=>disconnectPost(postId!, post.linkId)}><LinkOffIcon/></IconButton>
                    </div>
                  );
                })
              }
              { 0 === postLinkList.length &&
                <Typography variant="h5" className="no-linked-post">연결된 글이 없습니다.</Typography>
              }


            </TabPanel>



            <TabPanel value={tabIndex} index={1}  >
              <Container className="search-bar">
                <InputBase
                  className="txt-search"
                  placeholder="Search"
                  disabled={true}
                />
                <IconButton type="submit" aria-label="search" disabled={true}>
                  <SearchIcon />
                </IconButton>
              </Container>
              <Divider style={{background : "red"}}/>
              <h3>Temp</h3>
              <InputBase
                value={linkTagetPostId}
                onChange={onChangeTagetPostId}
                placeholder="post id"
                style={{borderBottom : "1px solid"}}
              />
              <Button onClick={()=>connectPost(postId!)}>연결</Button>


            </TabPanel>
          </SwipeableViews>
      </Container>
  );
}
