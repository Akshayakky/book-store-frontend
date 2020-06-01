import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardData from "./CardData";
import Container from "@material-ui/core/Container";


export default function Cart() {
    const [cartData, setCartData] = useState()
    const [bookData, setBookData] = useState()

    useEffect(() => {
        axios.get("http://localhost:8080/cart/get-books/").then((result) => {
            console.log(result)
            setCartData(result)
        })
    }, [])

    var result = [];
    if (cartData !== undefined) {
        console.log(cartData)
        for (let i = 0; i < cartData.data.length; i++) {
            (result.push(cartData.data[i].bookId))
        }
        console.log("hi" + result)
    }

    useEffect(() => {
        axios.get("http://localhost:8080/book/get-books-by-id?ids=" + result).then((result) => {
            console.log(result)
            setBookData(result.data)
        })
    }, [cartData])

    console.log(bookData)
    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            boxShadow: 'none',
            border: "thin solid #d9d9d9",
            display: "flex"
        },
        button: {
            width: '50%',
            border: "thin solid #d5cccc",
            padding: 0,
            boxShadow: 'none',
            height: 30,
            textAlign: 'center',
        },
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            },
        },
        title: {
            marginTop: 15,
            [theme.breakpoints.up('md')]: {
                marginLeft: theme.spacing(24),
            },
        }
    }));
    const classes = useStyles()

    return (
        result.map((cart, i) =>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    <Grid item key={i} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardData num={i} data={bookData} width="50%" style="flex"/>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    )
}