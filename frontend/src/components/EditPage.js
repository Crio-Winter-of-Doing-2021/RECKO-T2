import React from 'react';
import { useHistory ,Redirect } from "react-router-dom";
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
import {Home, Add , PowerSettingsNew , Edit,Delete} from "@material-ui/icons"
import EditForm from '../components/EditForm'
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

export default function ClippedDrawer({setAuth,logout}) {
  const classes = useStyles();
  const [check,onCheck]=useState(false)
  const [message,setMessage]=useState(false)
  const [message1,setMessage1]=useState('')
  const [company,setCompany]=useState('')
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  let history = useHistory();


  const editAccount = async (account) => {
    
    try{
      const company=account.company;
        console.log(company);
        if(company==='XERO')
        {
          setCompany(company)
            const response= await fetch("http://localhost:8080/xero/edit", {
            method:"POST",
           headers:{ "Content-Type": "application/json" ,
            Authorization : "Bearer " +localStorage.token
        },
            body: JSON.stringify(account)
        });
        const tmp=await response.json();
          setName(tmp.name);
          setDescription(tmp.description)
          onCheck(tmp);
          if(tmp===false){
          setMessage(false)
          setMessage1('Invalid Id')
          }
        }
        else
        {
           // const body={name,description};
            const response= await fetch("http://localhost:8080/quickbooks/edit", {
            method:"POST",
            headers:{ "Content-Type": "application/json",
            Authorization : "Bearer " +localStorage.token
        },
            body: JSON.stringify(account)
        });
        const tmp=await response.json();
        setName(tmp.name);
        setDescription(tmp.description)
        onCheck(tmp);
        if(tmp===false){
        setMessage1('Invalid Id')
        setMessage(false)
        }
        
        }
      }
      catch(err){
          console.log(err);
      }

 }


 const editAccount1 = async (account) => {
    
  try{
    const company=account.company;
      console.log(company);
      if(company==='XERO')
      {
          const response= await fetch("http://localhost:8080/xero/edit", {
          method:"POST",
          headers:{ "Content-Type": "application/json" ,
          Authorization : "Bearer " +localStorage.token
      },
          body: JSON.stringify(account)
      });
      const tmp=await response.json();
        onCheck(false);
        setMessage(true)
        setMessage1('')
      }
      else
      {
         // const body={name,description};
          const response= await fetch("http://localhost:8080/quickbooks/edit", {
          method:"POST",
          headers:{ "Content-Type": "application/json",
          Authorization : "Bearer " +localStorage.token
      },
          body: JSON.stringify(account)
      });
      const parseRes=await response.json();
        onCheck(false);
        setMessage(true)
        setMessage1('')
      }
    }
    catch(err){
        console.log(err);
    }

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
                    history.push('/logout')
                    console.log("hi");
                  // localStorage.removeItem('token')
                  // setAuth(false)
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
       
       <EditForm onEdit={editAccount} onEdit1={editAccount1} oldName={name} oldDescription={description} check={check} setcompany={company} message={message} message1={message1}/>
      </main>
    </div>
  );
}
