import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import img from "../images/cracker3.png";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'flex',
        justify: 'center',
    },
    item: {
        justify: 'centre'
    },
    media: {
// height: 140,
        width: 400,
        height: 300,
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    table: {
        width :'50%'
    }
});

export default function MediaCard() {
    const classes = useStyles();

    return (
// <div className={classes.grow}>
        <Card className={classes.root}>
            <CardActionArea>
                <Grid>
                    <Typography variant="h6" color="inherit" align={"center"}> Your Order Has Been Placed
                        Successfully
                    </Typography>
                </Grid>
                <CardMedia
                    className={classes.media}
                    // image="https://cdn.winknews.com/wp-content/uploads/2019/07/fireworks4.jpg"
                    // image={"src/Asset/images/B+ook+Storefireworks-removebg-preview.png"}
                    image={img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography align={"center"}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Hurray!!!
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Your order number is #2001539. We have emailed your order confirmation, and will
                            send you an update when your order has shipped.
                        </Typography>
                        <TableContainer>
                            <Typography align="center"  className={classes.table}>
                            <Table size="small" border={1} style={{width : 300, flex:"center"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Email us</TableCell>
                                        <TableCell align="center">Contact</TableCell>
                                        <TableCell align="center">Address</TableCell>
                                    </TableRow>
                                </TableHead>
                                <tbody>
                                <TableRow>
                                    <TableCell align="center">abc@bridgelabz.com </TableCell>
                                    <TableCell align="center">+911234567890</TableCell>
                                    <TableCell align="left">Malhotra Complex,sector 23,RM marg,mumbai 40001
                                    </TableCell>
                                </TableRow>
                                </tbody>
                            </Table>
                            </Typography>
                        </TableContainer>
                        <br/>
                        <Typography align={"center"}>
                            <Link to={"/"}>
                            <Button variant="contained" color="secondary" size={"medium"} >
                                Continue Shopping
                            </Button>
                            </Link>
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}