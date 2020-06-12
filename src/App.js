import React, {useState} from 'react';
import PrimarySearchAppBar from './component/AppBar';
import Cart from './component/Cart'
import CardGrid from './component/CardGrid'
import Login from './component/Login'
import SignUp from './component/SignUp'
import CustomerDetails from './component/CustomerDetails'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import OrderConfirm from "./component/OrderConfirm";

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

    const handleSearch = (value) => {
        setRequest(value);
    };

    const updateCart = (value) => {
        setLatestCartCount(value)
    }

    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <Router>
                <PrimarySearchAppBar cartCount={latestCartCount} onChange={handleSearch}/>
                <main>
                    <Switch>
                        <Route path="/" exact
                               component={() => (<SignUp/>)}/>
                        <Route path="/login" exact
                               component={() => (<Login/>)}/>
                        <Route path="/home" exact component={() => (
                            <CardGrid request={request} onChange={(value) => setCartCount(value)}/>)}/>
                        <Route path="/cart" exact
                               component={() => (<Cart cartCount={cartCount}/>)}/>
                        <Route path="/customer" exact
                               component={() => (<CustomerDetails/>)}/>
                        <Route path="/order-confirm" exact
                               component={() => (<OrderConfirm/>)}/>
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

