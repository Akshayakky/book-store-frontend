import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "blue",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme)=>({
    layout: {
        margin: "20px",
            [theme.breakpoints.up('md')]: {
            margin: "50px 200px"
        }
    },
    table: {
        minWidth: 650,
    },
}));

function createData(orderId , name, calories, fat, carbs, protein, orderDate) {
    return {orderId ,name, calories, fat, carbs, protein, orderDate};
}

// const rows = [
// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Gingerbread', 356, 16.0, 49, 3.9),
// ]

export default function OrderData() {
    const classes = useStyles();
    // const [rows, setRows] = useState([createData('Frozen yoghurt', 159, 6.0, 24, 4.0)]);
    const [orderData, setOrderData] = useState();
    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }
    const rows = [];
    console.log(orderData)
    if (orderData !== undefined) {
        for (let i = orderData.length-1; i >= 0; i--) {
            rows.push(createData(orderData[i].orderId, orderData[i].user.email, orderData[i].book.bookTitle, orderData[i].customer.name + ", " + orderData[i].customer.address
                + ", " + orderData[i].customer.city + ", " +
                orderData[i].customer.landmark + ", " +
                orderData[i].customer.locality, orderData[i].bookQuantity, orderData[i].totalPrice, orderData[i].date))
        }
    }
    // rows.push(createData('Frozen yoghurt', 159, 6.0, 24, 4.0))
    // address: "ksdnflkdsfn"
    // addressType: "work"
    // city: "sdf"
    // customerId: 5
    // landmark: "dsf"
    // locality: "Nerul"
    // name: "Akshaya"
    useEffect(() => {
        axios.get("http://localhost:8080/order/all", headers).then((response) =>
                setOrderData(response.data),
            // console.log(response.data[4].date),
            // rows.push(createData(response.data[0].user.email, response.data[0].book.bookTitle,response.data[0]
            //         .customer.name + ", " + response.data[0].customer.address
            // + ", " + response.data[0].customer.city + ", " +
            // response.data[0].customer.landmark + ", " +
            // response.data[0].customer.locality, response.data[0].bookQuantity, response.data[0].totalPrice, response.data[0].date))
        )
    },[])

    return (
        <>
            <main className={classes.layout}>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    Orders({rows.length} items)
                </Typography>
        <TableContainer component={Paper}>
            {/*<h1>Orders</h1>*/}
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{whiteSpace: "nowrap"}}>Id</StyledTableCell>
                        <StyledTableCell>User Email</StyledTableCell>
                        <StyledTableCell align="right">BookName</StyledTableCell>
                        <StyledTableCell align="right">Deliver To</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell style={{whiteSpace: "nowrap"}} align="right">Total Price</StyledTableCell>
                        <StyledTableCell align="right">Order Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,i) => (
                        <TableRow key={row.orderId}>
                            <TableCell align="right">{row.orderId}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                            <TableCell style={{whiteSpace: "nowrap"}} align="right">{row.orderDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </main>
        </>
    );
}
