import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import Axios from "axios";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useFormik} from "formik";
import LinearIndeterminate from "./loading";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const [register, setRegister] = useState("")
    const [loading, setLoading] = useState(false)
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            setLoading(true)
            formik.values.email = formik.values.email.split(" ")[0]
            Axios.post('https://d-bookstore.herokuapp.com/authenticate', formik.values)
                .then(response => {
                    // eslint-disable-next-line no-restricted-globals
                    location.assign("/")
                    localStorage.setItem('key', response.data.jwt)
                    localStorage.setItem('userEmail', formik.values.email.split(" ")[0])
                }).catch(error => {
                if (error.response.data.status === 403)
                    setRegister("Invalid Username Or Password!");
                setLoading(false)
            })
        }
    })

    return (
        <main>
            {loading ?
                <LinearIndeterminate/>
                :
                " "
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Grid item>
                    </Grid>
                    <Typography component="h3" variant="h6" style={{color: "#e60000"}}>
                        {register}
                        {register !== "" ?
                            <Link href={"/sign-up"} variant="body2">
                                {" New User?"}
                            </Link>
                            :
                            null
                        }
                    </Typography>
                    <form className={classes.form} onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={formik.values.email}
                            autoComplete="email"
                            autoFocus
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formik.values.password}
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot-password" variant="body2">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/sign-up" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </main>
    );
}