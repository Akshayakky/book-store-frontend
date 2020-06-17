
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import img from "../images/cracker3.png";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from '@material-ui/core/TableBody';

const useStyle = makeStyles((theme) => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    table: {
        minWidth: 500,
        marginTop: 20,
        marginBottom: 40
    },
    media: {
        width: 450,
        maxWidth: '100%',
    }

}));


export default function OrderConfirm() {

    const classes = useStyle();

    return (
        <main className={classes.layout}>
            <img className={classes.media} alt="complex" src={img}/>
            <div>
                <Typography variant="h6" color="inherit">Order Placed Successfully</Typography>
            </div>
            <Typography variant="subtitle1" color="primary">
                Hurray!!! your order is confirmed.<br/>
                The order id is #1234 save the order is for further communication
            </Typography>
            <TableContainer>
                <Table className={classes.table} size="small" border={1.5}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Email us</TableCell>
                            <TableCell align="center">Contact</TableCell>
                            <TableCell align="center">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">admin@bookstore.com </TableCell>
                            <TableCell align="center">+919876543210</TableCell>
                            <TableCell align="left">cross,sector 4,opp to BDA complex,near Swagat hotel,
                                Pune 400120
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button style={{marginBottom : 50}} variant="contained" color="primary">Continue Shopping</Button>
        </main>
    );
}