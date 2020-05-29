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
            transform: 'translate(-50%,-50%)'
        },
    },
    title: {
        marginTop: 15,
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(24),
        },
    }
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default function () {
    const [data, setData] = useState()
    const [cartCount, setCartCount] = useState(0)
    const [request, setRequest] = useState("")
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleCart = (value) => {
        console.log(value)
        setCartCount(value);
    };

    useEffect(() => {
        console.log(cartCount)
    }, [cartCount])

    const handleSearch = (value) => {
        console.log(value)
        setRequest(value);
        setPage(1)
    };

    useEffect(() => {
        setTimeout(() => axios.get('http://localhost:8080/book/get-books/' + request)
            .then((results) => {
                setData(results.data);
                console.log('http://localhost:8080/book/get-books/' + request)
                console.log(results.data)
            }), 1000);
    }, [request]);

    var records;
    if (data !== undefined)
        records = (data.length)
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <PrimarySearchAppBar cartItems={cartCount} onChange={handleSearch}/>
            <main>
                <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                    Books({records} books)
                </Typography>
                <CardGrid onChange={handleCart} data={data} cards={cards} pagenumber={page}/>
            </main>
            <div className={classes.root}>
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

