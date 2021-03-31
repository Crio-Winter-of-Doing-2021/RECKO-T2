import React from 'react'
import{useState,useEffect} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TableHeader from '../components/TableHeader'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Container, Box  ,TextField , CircularProgress, Button} from "@material-ui/core"
import { Redirect, useHistory ,Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Home, Add , PowerSettingsNew , Edit,Delete} from "@material-ui/icons"
import ThirdPartyLogin from '../components/ThirdPartyLogin'
import TableData from '../components/TableData'

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



function descendingComparator(a,b,orderBy){
    if(b[orderBy]<a[orderBy]){
        return -1
    }

    if(b[orderBy]>a[orderBy]){
        return 1
    }
    return 0

}

function getComparator(order,orderBy){
    return order==="desc"
    ?(a,b) => descendingComparator(a,b,orderBy)
    :(a,b) => -descendingComparator(a,b,orderBy)
}

const sortedRowInformation =(rowArray,comparator)=>{
    const stabilizedRowArray = rowArray.map((el,index) => [el,index])
    stabilizedRowArray.sort((a,b) =>{
        const order = comparator(a[0],b[0])
        if(order!==0)return order
        return a[1]-b[1]
    })
    return stabilizedRowArray.map((el)=>el[0])
}


export default function TableContent({logout}) {
    const classes = useStyles();
    
  let history = useHistory();
  //console.log(row);
    const [rows,setRows]=useState([])
    const [query,UseQuery]=useState('')
    const [columnToQuery,UseColumnToQuery]=useState('AccountName')
    const [orderDirection,setOrderDirection]=React.useState('')
    const [valueToOrderBy, setValueToOrderBy]=React.useState('')
    const [page, setPage]=React.useState(0)
    const [rowsPerPage, setRowsPerPage]=React.useState(10)

    
    useEffect(()=>{
        console.log(query);
        console.log(columnToQuery);
        console.log(rowsPerPage);
        console.log(page);
      
       const GetRow = async () => {    
        const body={query,columnToQuery,rowsPerPage,page,orderDirection,valueToOrderBy}
      const response=await fetch("http://localhost:8080/all", {
    method: "POST",
    headers: {
        "Content-Type": "application/json" ,
      Authorization : "Bearer " +localStorage.token
    },
    body: JSON.stringify(body)
  });
  const result = await response.json();
    setRows(result);
  console.log(result);
    }
    GetRow();  
    },[]);





    return(
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
                   //logout(false)
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

        <TableData row={rows}/>

        </main>
    </div>
    )
}
