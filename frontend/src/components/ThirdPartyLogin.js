import React from 'react';
import { Redirect, useHistory ,Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableContent from './TableContent'
import {Home, Add , PowerSettingsNew , Edit,Delete} from "@material-ui/icons"
import { useState, useEffect } from 'react'  
import ThirdPartyLogin from './ThirdPartyLogin.js'
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
    
  let history = useHistory();
  const [rows,setRow]=useState([]);


  

  return (
     <>
      <h1>PLEASE LOGIN FIRST </h1>
      <Button  variant="contained" 
        color="primary" 
        >Login to XERO</Button>
        <br/>
        <br/>
        <br/>
      <Button
       variant="contained" 
       color="primary" 
       >Login to QUICKBOOKS</Button>

     </>


  )
}
