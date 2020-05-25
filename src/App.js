import React, {useEffect, useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import CardGrid from './component/CardGrid'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

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
                <CardGrid data={data}/>
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

