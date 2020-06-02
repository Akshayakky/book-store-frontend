import React, {useEffect, useState} from 'react';
import CardData from './CardData'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#990033'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        boxShadow: 'none',
        border: "thin solid #d9d9d9",
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

export default function CardGrid(props) {
    const [bookData, setBookData] = useState();
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const [page, setPage] = React.useState(1);
    var addedToCart = true;

    const addBook = (value) => {
        axios.post('http://localhost:8080/cart/add-book/', {bookId: value, quantity: 1})
            .then((results) => {
                setCart(() => cart.concat(results.data))
            });
    }

    useEffect(() => {
        axios.get('http://localhost:8080/book/get-books/' + props.request)
            .then((results) => {
                setBookData(results.data);
                console.log("once")
            });
        setPage(1);
    }, [props.request]);

    useEffect(() => {
        axios.get('http://localhost:8080/cart/get-books/')
            .then((results) => {
                setCart(() => cart.concat(results.data))
            });
        setPage(1);
    }, []);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const updateCart = () => {
        addedToCart = false
    }

    var cards = [];
    const itemsPerPage = 12;
    if (bookData !== undefined) {
        var records = (bookData.length)
        for (let bookId = 1 + itemsPerPage * (page - 1); bookId <= itemsPerPage * page && bookId <= bookData.length; bookId++) {
            (cards.push(bookId));
        }
    }

    return (
        <>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                Books({records} books)
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    {cards.map((card, i) => <Grid item key={card} xs={12} sm={6} md={3}>
                        {addedToCart = true}
                        <Card className={classes.card}>
                            {
                                cart.map(num => {
                                    if (num.bookId === bookData[card - 1].bookId)
                                        updateCart();
                                })}
                            <CardData book={bookData[card - 1]}/>
                            <CardActions>
                                {addedToCart ?
                                    <MuiThemeProvider theme={theme}>
                                        <Button size={"large"} variant={"contained"} color={"secondary"}
                                                className={classes
                                                    .button} onClick={addBook.bind(this, bookData[card - 1].bookId)}>
                                            <Typography variant={"caption"}>
                                                ADD TO BAG
                                            </Typography>
                                        </Button>
                                        <Button size={"large"} className={classes.button}>
                                            <Typography variant={"caption"}>
                                                WISHLIST
                                            </Typography>
                                        </Button>
                                    </MuiThemeProvider>
                                    :
                                    <button className={classes.button} style={{width: "100%", backgroundColor: "blue"}}>
                                        <Typography variant={"caption"}>
                                            ADDED TO BAG
                                        </Typography>
                                    </button>
                                }
                            </CardActions>
                        </Card>
                    </Grid>)}
                </Grid>
            </Container>
            <div className={classes.root}>
                <Pagination count={Math.ceil(records / itemsPerPage)} color="secondary" page={page}
                            onChange={handleChange}/>
            </div>
        </>
    )
}