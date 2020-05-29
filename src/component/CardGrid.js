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
    }
}));

export default function CardGrid(data) {
    const classes = useStyles();
    const [cart, setCart] = useState(0)

    const addBook = (value) => {
        axios.post('http://localhost:8080/cart/add-book/', {bookId: value, quantity: 1})
            .then((results) => {
                // console.log(results)
                setCart(cart+1)
            });
    }

    useEffect(() => {
        axios.get('http://localhost:8080/cart/get-books/')
            .then((results) => {
                data.onChange(results.data.length)
            });
    }, [cart])

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={3}>
                {data.cards.map((card) => <Grid item key={card} xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                        <CardData num={card + data.cards.length * (data.pagenumber - 1) - 1} data={data.data}/>
                        <CardActions>
                            <MuiThemeProvider theme={theme}>
                                <Button size={"large"} variant={"contained"} color={"secondary"}
                                        className={classes.button}
                                        onClick={addBook.bind(this, card + data.cards.length * (data.pagenumber - 1))}>
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
    )
}