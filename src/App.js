import React, {useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import Cart from './component/Cart'
import CardGrid from './component/CardGrid'
import Login from './component/Login'
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

export default function () {
    const [cartCount, setCartCount] = useState(0)
    const [latestCartCount, setLatestCartCount] = useState(0)
    const [request, setRequest] = useState("")
    //
    // const handleCart = (value) => {
    //     console.log(value)
    //     setCartCount(value);
    // };

    const handleSearch = (value) => {
        setRequest(value);
    };

    const updateCart = (value) => {
        console.log(value)
        setLatestCartCount(value)
    }

    const classes = useStyles();
    console.log(cartCount)
    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <PrimarySearchAppBar cartCount={latestCartCount} onChange={handleSearch}/>
                <main>
                    <Switch>
                        <Route path="/" exact
                               component={() => (<Login/>)}/>
                        <Route path="/home" exact component={() => (
                            <CardGrid request={request} onChange={(value) => setCartCount(value)}/>)}/>
                        <Route path="/cart" exact
                               component={() => (<Cart cartCount={cartCount}/>)}/>
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

