import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { RouteComponentProps } from "react-router-dom";
import {SimpleCallbackType} from "app-types";
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


interface DefaultTopBarProps extends RouteComponentProps {
    OnOKClick : SimpleCallbackType
}

export default function DefaultTopBar(props : DefaultTopBarProps) {
    const history = props.history;

    function handleGoBack() {
        history.goBack();
    }

    return (
      <AppBar className="app-topbar" position="fixed">
          <Toolbar>
              <IconButton onClick={handleGoBack}><ArrowBackIcon/></IconButton>
          </Toolbar>
      </AppBar>

    );
}
