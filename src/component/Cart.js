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
    if (cartData !== undefined) {
        for (let i = 0; i < cartData.data.length; i++) {
            (result.push(cartData.data[i].bookId))
        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/book/get-books-by-id?ids=" + result).then((result) => {
            setBookData(result.data)
        })
    }, [cartData])

    const butt = <div style={{marginLeft: 110}}>
        <input style={{width: "50px", marginRight: 30}} type="number" defaultValue={1}
               min={1}></input>
        <button> Remove</button>
    </div>
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

    const classes = useStyles()

    return (
        <>
            <div className={classes.cart}>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    My Cart({result.length})
                </Typography>
                {bookData !== undefined ?
                    result.map((cart, i) =>
                        <div key={i} style={{height: "100%", width: "100%"}}>
                            <CardData book={bookData[i]} onChange={() => removeBook(cart)} backgroundcolor="none"
                                      style={style} display="flex" page="cart"/>
                        </div>
                    )
                    : <h1> Data Not Available </h1>
                }
            </div>
            <CustomerDetails className={classes.cart}/>
        </>
    )
}