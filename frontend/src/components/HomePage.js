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
import TableContent from '../components/TableContent'
import {Home, Add , PowerSettingsNew , Edit,Delete} from "@material-ui/icons"
import { useState, useEffect } from 'react'  
import ThirdPartyLogin from './ThirdPartyLogin.js'


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

export default function ClippedDrawer({logout,val}) {
  const classes = useStyles();
    
  let history = useHistory();
  const [rows,setRows]=useState([]);
 // const [val,setVal]=useState(false)

  // useEffect(() =>{
  //   rows.splice(0,rows.length);
  //   const GetRow = async () => {    

  //     const response=await fetch("http://localhost:8080/ck", {
  //   method: "POST",
  //   headers: {
  //     Authorization : "Bearer " +localStorage.token
  //   }
  // });
  // const result = await response.json();
  //   result===true?setVal(true):setVal(false)
  //   console.log(val)
  //   }  
  //  GetRow();    

  // },[])

   


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
                    history.push('/logout')
                    console.log("hi");
                  // localStorage.removeItem('token')
                  // logout(false)
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
       {val?
       history.push('/table')
         :<ThirdPartyLogin />} 
      </main>
    </div>
  );
}










