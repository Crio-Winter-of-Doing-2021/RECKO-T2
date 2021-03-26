import React from 'react'
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


export default function TableContent({rowInformation}) {

    const [orderDirection,setOrderDirection]=React.useState('asc')
    const [valueToOrderBy, setValueToOrderBy]=React.useState('id')
    const [page, setPage]=React.useState(0)
    const [rowsPerPage, setRowsPerPage]=React.useState(10)

    const handleRequestSort = (event,property) =>{
        const isAscending =(valueToOrderBy===property&&orderDirection==='asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending?'desc':'asc')
    }

    const handleChangePage =(event, newPage) =>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) =>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

    return (
       <>
       <h1 align="center">ALL JOURNALS</h1>
        <TableContainer>
            <Table>
                <TableHeader 
                
                valueToOrderBy={valueToOrderBy}
                orderDirection={orderDirection}
                handleRequestSort={handleRequestSort}
                />

                {
                    sortedRowInformation(rowInformation,getComparator(orderDirection,valueToOrderBy))
                    .slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
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
        count={rowInformation.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}

        />


       </>
    )
}
