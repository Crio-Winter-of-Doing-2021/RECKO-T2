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


export default function TableContent({row}) {
    
  let history = useHistory();
  //console.log(row);
   const [rows,setRows]=useState(row)
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
    },[query,columnToQuery,orderDirection,valueToOrderBy,page,rowsPerPage]);

           
       
      
     console.log(rows);


    const handleRequestSort = (event,property) =>{
        const isAscending =(valueToOrderBy===property&&orderDirection==='asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending?'desc':'asc')
       // GetRow();

    }

    const handleChangePage =(event, newPage) =>{
        setPage(newPage)
       // GetRow();
    }

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
       // GetRow();
    }

    const handleChange= e => {
        UseColumnToQuery(e.target.value)
       // GetRow();
    }

    const handleQuery= e =>{
        UseQuery(e.target.value)
       // GetRow();
    }

    return(
        
        <>
       { rows!==undefined ?
       <>
       {/* <div style={{display: "flex"}}> */}
       <div style={{display: "flex" , margin: "auto"}}>

        <Box width="40%" m={0,2}>
       <TextField
          label="Search"
          id="outlined-size-small"
          type="text"
          variant="outlined"
          name="Query"
          fullWidth
          onChange={handleQuery}
          color="secondary"
          size="small"
          margin="normal"
        />
        </Box>
       
       <Select
          style={{marginLeft: "1em"}}
          floatingLabelText="Select a column"
          id="demo-simple-select"
          value={columnToQuery}
          onChange={handleChange}
        >
          <MenuItem value={'AccountName'}>AcccountName</MenuItem>
          <MenuItem value={'Date'}>Date</MenuItem>
          <MenuItem value={'Type'}>Type</MenuItem>
        </Select>
        
        </div>
        {/* </div> */}

       <Paper >
        <TableContainer>
            <Table>
                <TableHeader 
                
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />

                {
                
                    sortedRowInformation(rows,getComparator(orderDirection,valueToOrderBy))
                    // .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
                    .map((account,id) =>(
                        <TableRow key={id}>
                            <TableCell>
                                {account.id}
                            </TableCell>
                            <TableCell>
                                {account.name}
                            </TableCell>
                            <TableCell>
                                {account.amount}
                            </TableCell>
                            <TableCell>
                                {account.date}
                            </TableCell>
                            <TableCell>
                                {account.type}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </Table>
        </TableContainer>
        
        <TablePagination 
        rowsPerPage={[5,10,50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}

        />
        </Paper>
        </>
        :null
            }
            </>
      
    )
}
