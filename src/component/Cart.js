import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

export default function Cart() {
    const [cartData, setCartData] = useState()
    const [bookData, setBookData] = useState()

    useEffect(() => {
        axios.get("http://localhost:8080/cart/get-books/").then((result) => {
            setCartData(result)
        })
    }, [])

    var result = [];
    if (cartData !== undefined) {
        for (let i = 0; i < cartData.data.length; i++) {
            (result.push(cartData.data[i].bookId))
        }
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
            paddingBottom: theme.spacing(0),
        },
        card: {
            height: '100%',
            boxShadow: 'none',
            display: "flex",
        },
        button: {
            width: '50%',
            border: "thin solid #d5cccc",
            padding: 0,
            boxShadow: 'none',
            height: 30,
            textAlign: 'center',
            marginLeft: '50%'
        },
        cardMedia: {
            paddingTop: '100%',
        },
        mediaContainer: {
            padding: 100,
        }
    }));
    const classes = useStyles()
    return (
        <>
            <cart style={{padding: 0, margin: 0, border: "thin solid #d9d9d9"}}>
                {result.map((cart, i) =>
                    <Container key={i} className={classes.cardGrid} maxWidth="md">
                        <Card className={classes.card}>
                            {bookData !== undefined && bookData[i] !== undefined ?
                                <div style={{display: "flex"}}>
                                    <Card className={classes.mediaContainer}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={bookData[i].bookImage}
                                            title="Image title"
                                        />
                                    </Card>
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="body2" component="h2">
                                            {bookData[i].bookTitle}
                                        </Typography>
                                        <Typography variant={"caption"} color="textSecondary" display="block">
                                            {bookData[i].bookAuthor}
                                        </Typography>
                                        <Typography variant={"caption"} className={classes.price}>
                                            {bookData[i].bookPrice}
                                        </Typography>
                                    </CardContent>
                                </div>
                                :
                                <h1>Hello </h1>
                            }
                        </Card>
                    </Container>
                )}
            </cart>

            <Link to={"/customer"} className={classes.button}>
                <button>
                    <Typography variant={"caption"}>
                        CHECKOUT
                    </Typography>
                </button>
            </Link>
        </>
    )
}