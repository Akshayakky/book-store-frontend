import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import img from '../images/cracker3.png'
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({

    layout: {
        width: 700,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {

            marginTop: theme.spacing(3),
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 40
        },
    },
    div: {
        marginTop: 50
    },

    img: {
        width: 550,
        height: 300,
    },

}));

export default function OrderConfirm() {
    const classes = useStyles();

    function handleClick() {

    }

    return (
        <div>
            <img className={classes.img} alt="complex" src={img}/>
            <div>
                <Typography variant="h6" color="inherit">Order Placed Successfully</Typography>
            </div>
            <Typography variant="subtitle1" color="primary">
                Hurray!!! your order is confirmed.<br/>
                The order id is #1234 save the order is for further communication
            </Typography>
            <TableContainer>
                <Table className={classes.layout} size="small" border={1.5}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Email us</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <tbody>
                    <TableRow>
                        <TableCell align="center">admin@bookstore.com </TableCell>
                        <TableCell align="center">+919876543210</TableCell>
                        <TableCell align="left">cross,sector 4,opp to BDA complex,near Swagat hotel,
                            Pune 400120
                        </TableCell>
                    </TableRow>
                    </tbody>
                </Table>
            </TableContainer>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Continue Shopping</Button>
        </div>
    );
}
