import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContent from '../components/TableContent'


export default function TableHeader(props) {


    const {valueToOrderBy, orderDirection, handleRequestSort}=props

    const createSortHandler =(property) => (event) =>{
        handleRequestSort(event,property)
    }

    return (
        <TableHead>
            <TableRow>

                <TableCell key="id">
                    <TableSortLabel
                    active={"id"==="id"}
                    direction={valueToOrderBy==="id"? orderDirection:'asc'}
                  onClick={createSortHandler("id")}
                    >
                        ID
                    </TableSortLabel>
                </TableCell>

                <TableCell key="name">
                    <TableSortLabel
                     active={"name"==="name"}
                     direction={valueToOrderBy==="name"? orderDirection:'name'}
                     onClick={createSortHandler("name")}
                    >
                        NAME
                    </TableSortLabel>
                </TableCell>




                <TableCell key="amount">
                    <TableSortLabel
                     active={"amount"==="amount"}
                     direction={valueToOrderBy==="amount"? orderDirection:'amount'}
                     onClick={createSortHandler("amount")}
                    >
                        AMOUNT
                    </TableSortLabel>
                </TableCell>

                <TableCell key="date">
                    <TableSortLabel
                     active={"date"==="date"}
                     direction={valueToOrderBy==="date"? orderDirection:'date'}
                     onClick={createSortHandler("date")}
                    >
                        DATE
                    </TableSortLabel>
                </TableCell>

                <TableCell key="type">
                    <TableSortLabel
                     active={"type"==="type"}
                     direction={valueToOrderBy==="type"? orderDirection:'type'}
                     onClick={createSortHandler("type")}
                    >
                        TYPE
                    </TableSortLabel>
                </TableCell>


            </TableRow>
        </TableHead>
    )
}
