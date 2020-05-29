import React, {useEffect, useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import CardGrid from './component/CardGrid'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },
    },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function () {
    const [bookData, setBookData] = useState()
    const [page, setPage] = React.useState(1);
    const [cartCount, setCartCount] = useState(0)
    const [request, setRequest] = useState("")

    const handleCart = (value) => {
        setCartCount(value);
    };

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleSearch = (value) => {
        setRequest(value);
        setPage(1)
    };

    useEffect(() => {
        setTimeout(() => axios.get('http://localhost:8080/book/get-books/' + request)
            .then((results) => {
                setBookData(results.data);
            }), 1000);
    }, [request]);

    if (bookData !== undefined)
        var records = (bookData.length)
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <PrimarySearchAppBar cartCount={cartCount} onChange={handleSearch}/>
            <main>
                <Typography variant="h6" color="inherit" noWrap>
                    Books
                </Typography>
                <CardGrid onChange={handleCart} data={bookData} cards={cards} pageNumber={page}/>
            </main>
            <div className={classes.root}>
                {/*    /!*<Typography>Page: {page}</Typography>*!/*/}
                <Pagination count={Math.ceil(records / cards.length)} color="secondary" page={page}
                            onChange={handleChange}/>
            </div>
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

