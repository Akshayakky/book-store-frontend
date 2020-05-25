import React, {useEffect, useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {MuiThemeProvider} from "@material-ui/core";
import axios from 'axios';

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#990033'
        }
    },
});

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        boxShadow: 'none',
        border: "thin solid #d9d9d9",
    },
    cardMedia: {
        paddingTop: '60%',
        width: '40%',
        marginTop: 15,
        marginBottom: 15,
        marginLeft: '50%',
        transform: 'translate(-50%)',
    },
    mediaContainer: {
        backgroundColor: '#f2f2f2',
        boxShadow: 'none',
        borderRadius: 0
    },
    cardContent: {
        height: 70,
        flexGrow: 0,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    button: {
        width: '50%',
        border: "thin solid #d5cccc",
        padding: 0,
        boxShadow: 'none',
        height: 30,
        textAlign: 'center',
    },
    price: {
        padding: 0,
        margin: 0,
        fontWeight: 'bold',
    }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function () {
    const [data, setData] = useState()
    const [request] = useState('get-books')
    useEffect(() => {
        axios.get('http://localhost:8080/book/' + request)
            .then((results) => {
                setData(results.data);
                console.log("done")
            });
    }, [request]);

    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <PrimarySearchAppBar/>
            <main>
                <Typography variant="h6" color="inherit" noWrap>
                    Books
                </Typography>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={3}>
                        {cards.map((card, i) => <Grid item key={card} xs={12} sm={6} md={3}>
                            <Card className={classes.card}>
                                <CardData data={data}/>
                                <CardActions>
                                    <MuiThemeProvider theme={theme}>
                                        <Button size={"large"} variant={"contained"} color={"secondary"}
                                                className={classes.button}>
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
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
        </React.Fragment>
    );
}

function CardData(data) {
    const classes = useStyles();
    let bookTitle;
    let bookAuthor;
    let bookPrice;
    let bookImage;
    if (data.data !== undefined) {
        bookAuthor = data.data[0].bookAuthor
        bookTitle = data.data[0].bookTitle
        bookPrice = "Rs. " + data.data[0].bookPrice
        bookImage = data.data[0].bookImage
    }
    return (
        <>
            <Card className={classes.mediaContainer}>
                <CardMedia
                    className={classes.cardMedia}
                    image={bookImage}
                    title="Image title"
                />
            </Card>
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" component="h2">
                    {bookTitle}
                </Typography>
                <Typography variant={"caption"} color="textSecondary" display="block">
                    {bookAuthor}
                </Typography>
                <Typography variant={"caption"} className={classes.price}>
                    {bookPrice}
                </Typography>
            </CardContent>
        </>
    );
}