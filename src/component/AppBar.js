import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            marginLeft: theme.spacing(2),
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: 500,
        marginLeft: theme.spacing(2),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },
    bookIcon: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(20),
        },
    },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const [state, setState] = useState("");

    const handleChange = (event) => {
        setState(event.target.value)
    }

    useEffect(() => {
        props.onChange(state)
    }, [state])

    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{background: '#990033'}}>
                <Toolbar>
                    <MenuBookIcon className={classes.bookIcon}/>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Bookstore
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <div>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={props.cartCount} className={classes.cartIcon} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}