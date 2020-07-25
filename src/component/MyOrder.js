import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Axios from "axios";
import Button from "@material-ui/core/Button"
import OrderDetails from "./OrderDetails";
import {Link, Redirect} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CircularIndeterminate from "./CircularLoader";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 15
    },
    paper: {
        padding: theme.spacing(3),
        margin: 'auto',
        maxWidth: 700
    },
    title: {
        marginTop: 15,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(4.5),
        },
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: 100,
        height: 128,
    },
    cart: {
        border: "thin solid #d9d9d9",
        // margin: "50px",
        // paddingLeft : 20,
        [theme.breakpoints.up('md')]: {
            margin: "50px 200px"
        }
    }
}));

export default function MyOrder(props) {
    const classes = useStyles();
    const [orderDetails, setOrderDetails] = useState();
    const [books, setBooks] = useState()
    const [wait, setWait] = useState()

    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }

    useEffect(() => {
        setWait("loading orders please wait...")
        if (localStorage.getItem('key') !== null && localStorage.getItem('key') !== undefined && localStorage.getItem('key') !== "")
            Axios.get('https://d-bookstore.herokuapp.com/order', headers)
                .then((response) => {
                    setOrderDetails(response)
                    setWait("")
                })
    }, []);

    let bookId = []
    let orderData = []
    if (orderDetails !== undefined) {
        for (let i = 0; i < orderDetails.data.length; i++) {
            (bookId.push(orderDetails.data[i].book.bookId))
            orderData.push(orderDetails.data[i])
        }
    }

    const findById = (id) => {
        for (var i = 0; i < books.length; i++) {
            if (books[i].bookId == id)
                return i;
        }
        return 2;
    }

    useEffect(() => {
        Axios.get("https://d-bookstore.herokuapp.com/book/get-books-by-id?ids=" + bookId, headers).then((result) => {
            setBooks(result.data)
        })
    }, [orderDetails]);

    return (
        <div>
            {localStorage.getItem('key') === "" ?
                <Redirect to={"/login"}/>
                :
                wait === "" ?
                    <div>
                        <Grid className={classes.cart}>
                            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                                My Orders({bookId.length} items)
                            </Typography>
                            <Grid style={{marginBottom: 20}}>
                                {orderData.length !== 0 && books !== undefined ?
                                    orderData.reverse().map((data, i) =>
                                        <div key={i}>
                                            <OrderDetails book={books[findById(bookId[orderData.length - i - 1])]}
                                                          price={data.totalPrice}
                                                          orderDate={orderData[i].date}
                                                          quantity={data.bookQuantity}/>
                                        </div>
                                    )
                                    :
                                    <div>
                                        <br/>
                                        <Link to={"/"} style={{textDecoration: "none"}}>
                                            <Button
                                                variant="contained"
                                                style={{backgroundColor: "#990033", color: "white", marginLeft: 30}}
                                            >
                                                SHOP NOW
                                            </Button>
                                        </Link>
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                    :
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
            }
        </div>
    );
}