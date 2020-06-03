import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import CardData from "./CardData";
import Typography from "@material-ui/core/Typography";
import CustomerDetails from "./CustomerDetails";

export default function Cart() {
    const [cartData, setCartData] = useState()
    const [bookData, setBookData] = useState()
    const [trick, setTrick] = useState(true)
    const [showResults, setShowResults] = React.useState(false)
    const [showSummary, setShowSummary] = React.useState(false)
    const [amount, setAmount] = useState(0)

    const style = {
        padding: 40,
        height: 125,
        width: 75,
    }

    useEffect(() => {
        axios.get("http://localhost:8080/cart/get-books/").then((result) => {
            setCartData(result)
        })
    }, [trick])

    var result = [];
    var carts = [];
    if (cartData !== undefined) {
        for (let i = 0; i < cartData.data.length; i++) {
            (result.push(cartData.data[i].bookId))
            carts.push(cartData.data[i])
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/book/get-books-by-id?ids=" + result).then((result) => {
            setBookData(result.data)
        })
    }, [cartData])

    const useStyles = makeStyles((theme) => ({
        cardGrid: {
            padding: 0,
            margin: 0,
        },
        card: {
            height: '100%',
            width: 200,
            boxShadow: 'none',
            display: "flex"
        },
        buttons: {
            backgroundColor: "blue",
            borderRadius: 0,
            height: 30,
            [theme.breakpoints.up('sm')]: {
                marginLeft: '78%',
            },
            marginBottom: '5%',
            width: 115,
            border: "none"
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
                marginLeft: theme.spacing(4.5),
            },
        },
        cart: {
            border: "thin solid #d9d9d9",
            margin: "50px",
            [theme.breakpoints.up('md')]: {
                margin: "50px 200px"
            }
        }
    }));

    const removeBook = (bookIds) => {
        if (bookIds !== undefined) {
            axios.delete("http://localhost:8080/cart/delete-book/" + bookIds).then((results) => {
                setTrick(!trick)
            })
        }
    }

    const updateQuantity = (quantity, bookId) => {
        axios.put("http://localhost:8080/cart/update-book-quantity/" + quantity + "?book_id=" + bookId).then((results) => {
            setTrick(!trick)
        })
    }

    const classes = useStyles()

    let sum = 0
    return (
        <>
            <div className={classes.cart}>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    My Cart({result.length})
                </Typography>
                {bookData !== undefined ?
                    carts.map((cart, i) =>
                        <div key={i} style={{height: "100%", width: "100%"}}>
                            <CardData quantity={cart.quantity} updateQuantity={(event) => {
                                updateQuantity(event.target.value, cart.bookId)
                            }} book={bookData[i]} onChange={() => removeBook(cart.bookId)} backgroundcolor="none"
                                      style={style} display="flex" page="cart"/>
                        </div>
                    )
                    : <h1> Data Not Available </h1>
                }
                {!showResults && result.length > 0 ?
                    <button onClick={() => {
                        setShowResults(true)
                    }} className={classes.buttons}>
                        PLACE ORDER
                    </button>
                    : null
                }
            </div>
            {showResults ?
                <div>
                    <CustomerDetails onClick={() => {
                        setShowSummary(true)
                    }}/>
                </div>
                : null
            }

            {showSummary ?
                <div className={classes.cart}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                        Order Summary
                    </Typography>
                    {bookData !== undefined ?
                        carts.map((cart, i) =>
                            <div key={i} style={{height: "100%", width: "100%"}}>
                                <CardData quantity={cart.quantity} book={bookData[i]}
                                          onChange={() => removeBook(cart.bookId)} backgroundcolor="none"
                                          style={style} display="flex" page="summary"/>
                                <div style={{display: "none"}}>
                                    {sum = sum + cart.quantity * bookData[i].bookPrice}
                                </div>
                            </div>
                        )
                        : <h1> Data Not Available </h1>
                    }
                    <div style={{}}>
                        <Typography variant="h4" color="inherit" noWrap className={classes.title}>
                            Total Amount<br/>
                            Rs. {sum}
                        </Typography>
                    </div>
                    <button className={classes.buttons}>CHECKOUT</button>
                </div>
                : null
            }
        </>
    )
}