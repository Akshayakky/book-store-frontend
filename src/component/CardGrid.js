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
    const [bookData, setBookData] = useState()
    const classes = useStyles();
    const [cart, setCart] = useState()
    const [page, setPage] = React.useState(1);

    const addBook = (value) => {
        axios.post('http://localhost:8080/cart/add-book/', {bookId: value, quantity: 1})
            .then((results) => {
                setCart(cart + 1)
            });
    }

    useEffect(() => {
        // console.log("star5t"+props.request+"end")
        setTimeout(() => axios.get('http://localhost:8080/book/get-books/' + props.request)
            .then((results) => {
                setBookData(results.data);
                // console.log(results.data)
            }), 1000);
        setPage(1);
    }, [props.request]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect((cart) => {
        axios.get('http://localhost:8080/cart/get-books/')
            .then((results) => {
                props.onChange(results.data)
            });
    }, [cart])

    if (bookData !== undefined) {
        var records = (bookData.length)
    }
    return (
        <>
            <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                Books({records} books)
            </Typography>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={3}>
                    {props.cards.map((card, i) => <Grid item key={card} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardData num={card + props.cards.length * (page - 1) - 1} data={bookData}/>
                            <CardActions>
                                <MuiThemeProvider theme={theme}>
                                    <Button size={"large"} variant={"contained"} color={"secondary"} className={classes
                                        .button} onClick={addBook.bind(this, card + props.cards.length * (props
                                        .pageNumber - 1))}>
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
                            </CardActions>
                        </Card>
                    </Grid>)}
                </Grid>
            </Container>
            <div className={classes.root}>
                <Pagination count={Math.ceil(records / props.cards.length)} color="secondary" page={page}
                            onChange={handleChange}/>
            </div>
        </>
    )
}