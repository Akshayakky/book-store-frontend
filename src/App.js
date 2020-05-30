import React, {useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import Cart from './component/Cart'
import CardGrid from './component/CardGrid'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },

}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function () {
    const [page, setPage] = React.useState(1);
    const [cartCount, setCartCount] = useState(0)
    const [cartData, setCartData] = useState()
    const [request, setRequest] = useState("")

    const handleCart = (value) => {
        setCartCount(value.length);
        // setCartData(value);
    };

    const handleSearch = (value) => {
        // console.log("changing")
        setRequest(value);
        setPage(1)
    };

    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <PrimarySearchAppBar cartCount={cartCount} onChange={handleSearch}/>
                <main>
                    <Switch>
                        <Route path="/" exact component={() => (
                            <CardGrid request={request} onChange={handleCart} cards={cards} pageNumber={page}/>)}/>
                        <Route path="/cart" exact component={() => (<Cart cartCount={cartCount} data={cartData}/>)}/>
                    </Switch>
                </main>
            </Router>
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

