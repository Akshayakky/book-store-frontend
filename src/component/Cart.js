import React, {useEffect, useState} from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import CardData from "./CardData";
import Typography from "@material-ui/core/Typography";
import CustomerDetails from "./CustomerDetails";
import {Link} from "react-router-dom";

export default function Cart(props) {
    const [cartData, setCartData] = useState()
    const [bookData, setBookData] = useState()
    const [trick, setTrick] = useState(true)
    const [showResults, setShowResults] = React.useState(false)
    const [showSummary, setShowSummary] = React.useState(false)
    const [amount, setAmount] = useState(0)
    const [token, setToken] = useState()

    const style = {
        padding: 40,
        height: 125,
        width: 75,
    }

    useEffect(() => {
        if (props.token !== "") {
            console.log("set" + props.token)

            localStorage.setItem('key', props.token)
        }
        setToken(localStorage.getItem('key'))
    }, [props.token])


    const headers = {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('key')
        }
    }

    console.log(headers.headers)
    useEffect(() => {
        axios.get("http://localhost:8080/cart/get-books/", headers).then((result) => {
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
        axios.get("http://localhost:8080/book/get-books-by-id?ids=" + result, headers).then((result) => {
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
            backgroundColor: "#990033",
            color: "white",
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
            axios.delete("http://localhost:8080/cart/delete-book/" + bookIds, headers).then((results) => {
                setTrick(!trick)
            })
        }
    }

    const updateQuantity = (quantity, bookId) => {
        axios.put("http://localhost:8080/cart/update-book-quantity/" + quantity + "?book_id=" + bookId, {}, headers).then((results) => {
            setTrick(!trick)
        })
    }

    const emptyCart = () => {
        axios.delete("http://localhost:8080/cart/empty-cart/", headers);
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
                    <CustomerDetails token={props.token} onClick={() => {
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
                    <Link to={"/order-confirm"}>
                        <button className={classes.buttons} onClick={emptyCart}>CHECKOUT</button>
                    </Link>
                </div>
                : null
            }
        </>
    )
}


// import React from "react";
// import {makeStyles} from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Button from "@material-ui/core/Button";
// import Increment from "./Increment";
// import {Link} from "react-router-dom";
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         margin: 'auto',
//         maxWidth: 600,
//         marginTop: theme.spacing(6)
//     },
//     image: {
//         width: 128,
//         height: 128
//     },
//     img: {
//         margin: 'auto',
//         display: 'block',
//         maxWidth: '100%',
//         maxHeight: '100%',
//     },
// }));
//
// export default function ComplexGrid() {
//     const classes = useStyles();
//
//     return (
//         <div className={classes.root}>
//             <Paper className={classes.paper}>
//                 <Grid container>
//                     <Grid item>
//                         <ButtonBase className={classes.image}>
//                             <img className={classes.img} alt="complex"
//                                  src="http://books.google.com/books/content?id=GHt_uwEACAAJ&printsec=frontcover&img=1&zoom=5"/>
//                         </ButtonBase>
//                     </Grid>
//                     <Grid item xs={12} sm container>
//                         <Grid item xs container direction="column" spacing={2}>
//                             <Grid item xs justify={"flex-start"}>
//                                 <Typography variant="body2" component="h2" align={"left"}>
//                                     The Girl In Room
//                                 </Typography>
//                                 <Typography variant={"caption"} color="textSecondary" display="block" align={"left"}>
//                                     Chetan Bhagat
//                                 </Typography>
//                                 <Typography variant={"caption"} color="textSecondary" display="block" align={"left"}>
//                                     Rs 193
//                                 </Typography>
//                                 <br/>
//                                 <Grid item direction={"row"} justify={"flex-start"} spacing={10}>
//                                     <Typography align={"left"} variant="body2">
//                                         <Increment/>
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                             <Grid>
//                                 <Typography align={"right"}>
//                                     <Link to={"/customerDetails"}>
//                                         <Button variant="contained" color="secondary" href="#contained-buttons">
//                                             place order
//                                         </Button>
//                                     </Link>
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Paper>
//             <br/><br/>
//         </div>
//     );
// }
//
//
//
//
//
//
//
//
//
//
// import React, { Component } from 'react';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
//
// export default class Increment extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             clicks: 1,
//             show: true
//         };
//     }
//
//     IncrementItem = () => {
//         this.setState({ clicks: this.state.clicks + 1 });
//     }
//     DecreaseItem = () => {
//         this.setState({ clicks: this.state.clicks - 1 });
//     }
//
//     render() {
//         return (
//             <div>
//                 { this.state.show ? <h2>{ this.state.clicks }</h2> : '' }
//                 <AddCircleOutlineIcon fontSize={"large"} color={"primary"} onClick={this.IncrementItem}/>
//                 <RemoveCircleOutlineIcon fontSize={"large"} color={"secondary"} onClick={this.DecreaseItem}/>
//             </div>
//         );
//     }
// }