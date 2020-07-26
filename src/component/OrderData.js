import React, {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularIndeterminate from "./CircularLoader";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "blue",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    layout: {
        margin: "20px",
        [theme.breakpoints.up('md')]: {
            margin: "50px 200px"
        },
        marginBottom: 40
    },
    table: {
        minWidth: 650,
    },
}));

function createData(orderId, email, book, address, quantity, price, orderDate) {
    return {orderId, email, book, address, quantity, price, orderDate};
}

export default function OrderData() {
    const classes = useStyles();
    const [orderData, setOrderData] = useState();
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }
    const rows = [];
    console.log(orderData)
    if (orderData !== undefined) {
        for (let i = orderData.length - 1; i >= 0; i--) {
            rows.push(createData(orderData[i].orderId, orderData[i].user.email, orderData[i].book.bookTitle, orderData[i].customer.name + ", " + orderData[i].customer.address
                + ", " + orderData[i].customer.city + ", " +
                orderData[i].customer.landmark + ", " +
                orderData[i].customer.locality, orderData[i].bookQuantity, orderData[i].totalPrice, orderData[i].date))
        }
    }
    useEffect(() => {
        axios.get("https://d-bookstore.herokuapp.com/order/all", headers).then((response) => {
                setOrderData(response.data)
                setLoading(false)
            }
        )
    }, [])

    return (
        <>
            {loading ?
                <div style={{paddingTop: 100}}>
                    <Grid container justify="center">
                        <Grid justify="center" item>
                            <CircularIndeterminate/>
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Typography component="h3" variant="h7">Loading Orders...</Typography>
                    </Grid>
                </div>
                :
                <main className={classes.layout}>
                    {console.log(loading)}
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        Orders({rows.length} items)
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{whiteSpace: "nowrap"}}>Id</StyledTableCell>
                                    <StyledTableCell>User Email</StyledTableCell>
                                    <StyledTableCell align="right">BookName</StyledTableCell>
                                    <StyledTableCell align="right">Deliver To</StyledTableCell>
                                    <StyledTableCell align="right">Quantity</StyledTableCell>
                                    <StyledTableCell style={{whiteSpace: "nowrap"}} align="right">Total
                                        Price</StyledTableCell>
                                    <StyledTableCell align="right">Order Date</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, i) => (
                                    <TableRow key={row.orderId}>
                                        <TableCell align="right">{row.orderId}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell align="right">{row.book}</TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell align="right">{row.price}</TableCell>
                                        <TableCell style={{whiteSpace: "nowrap"}}
                                                   align="right">{row.orderDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </main>
            }
        </>
    );
}