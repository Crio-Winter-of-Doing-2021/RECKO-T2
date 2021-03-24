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
import Table from './Table'
import Table1 from './HomePage';
import {Home, Add , PowerSettingsNew , Edit,Delete} from "@material-ui/icons"
import EditForm from './EditForm'
import EditForm1 from './EditForm1'
import {useState,useEffect} from 'react'

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

export default function ClippedDrawer({setAuth}) {
  const classes = useStyles();
  const [check,onCheck]=useState(false)
    
  let history = useHistory();

  const createAccount = async (account) => {
    await fetch("http://localhost:8080/new", {
     method: "POST",
     headers: {
       "Content-type": "application/json",
       Authorization : "Bearer " +localStorage.token
     },
     body: JSON.stringify(account),
   })
   .then(result =>{
     console.log(check)
  }
   )
   .catch((err)=> {
     console.log("gfgdf");
   });
 }
 

  return (

     

    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
          {/* <img src={logo} height="40px"></img> */}
            <Typography variant="h4" display="inline">DASHBOARD</Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button
             onClick={
              e=>{
                console.log("hi");
               // <Link to ="/addForm" />
               history.push("/homepage")
              }
             }
            >
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button
               onClick={
                e=>{
                  console.log("hi");
                 // <Link to ="/addForm" />
                 history.push("/addForm")
                }
               }
              >
                <ListItemIcon>
                    <Add />
                </ListItemIcon>
                <ListItemText primary="Add" />
              </ListItem>



              <ListItem button
               onClick={
                e=>{
                  console.log("hi");
                 // <Link to ="/addForm" />
                 history.push("/editForm")
                }
               }
              >
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItem>


              <ListItem button
               onClick={
                e=>{
                  console.log("hi");
                 // <Link to ="/addForm" />
                 history.push("/deleteForm")
                }
               }
              >
                <ListItemIcon>
                    <Delete />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItem>


            

                <Divider />


              <ListItem button onClick={
                
                  e=>{
                    console.log("hi");
                   localStorage.removeItem('token')
                   setAuth(false)
                  }
              }>
                <ListItemIcon>
                    <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>


          </List>
          <Divider />
         

        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

       {check===false?
       <EditForm onCreate={createAccount} onCheck={onCheck}/>
       : <EditForm1 onCreate={createAccount} />}
      </main>
    </div>
  );
}
