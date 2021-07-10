import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { RouteComponentProps } from "react-router-dom";
import {SimpleCallbackType} from "app-types";
import Button from '@material-ui/core/Button';

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
              <Button onClick={handleGoBack}>Cancel</Button>
              <div className="app-grow-space"/>
              <Button variant="contained" color="primary" onClick={props.OnOKClick} >OK</Button>
          </Toolbar>
      </AppBar>

    );
}
