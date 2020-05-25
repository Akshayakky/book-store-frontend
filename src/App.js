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
            // paddingLeft: '36.5%',
            // horizontalAlign:'Middle',
            position: 'absolute',
            left: '50%',
            transform: 'translate(-50%, -50%)'


        },
    },
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
export default function () {
    const [data, setData] = useState()
    const [request] = useState('get-books')
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        axios.get('http://localhost:8080/book/' + request)
            .then((results) => {
                setData(results.data);
                console.log("done")
            });
    }, [request]);

    if (data !== undefined)
        var records = (data.length)
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <PrimarySearchAppBar/>
            <main>
                <Typography variant="h6" color="inherit" noWrap>
                    Books
                </Typography>
                <CardGrid data={data} cards={cards} pagenumber={page}/>
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

