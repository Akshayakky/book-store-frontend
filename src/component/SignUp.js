import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import * as Yup from 'yup'
import {useFormik} from "formik";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 500
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = Yup.object().shape({
    firstName: Yup.string().min(3, "Minimum 3 characters"),
    lastName: Yup.string().min(3, "Minimum 3 characters"),
    email: Yup.string().email("Invalid"),
    password: Yup.string()
        .matches(
            "^(?=.{4,})(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]*$",
            "Must Contain 4 Characters, at least One Uppercase and One Number"
        ),
    confirmedPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'password must match')
})


export default function SignUp(props) {
    const [visible, setVisible] = useState(false)
    const [register, setRegister] = useState();
    const headers = {
        headers: {
            "Authorization": "Bearer " + props.token
        }
    }
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmedPassword: ""
        },
        validationSchema,
        onSubmit(values) {
            Axios.all([
                Axios.post("http://localhost:8080/user/register", values),
                Axios.post("http://localhost:8080/mail-sender/send-mail", {
                    name: values.firstName,
                    email: values.email
                })
            ])
                .then(Axios.spread((registration, email) => {
                    console.log(registration.data)
                    console.log(email.data)
                    setRegister(registration.data)
                }))
                .catch(error => {
                    // if (error.response) {
                    setRegister(error.response.data + '!');
                    // }
                })
        }
    })

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Paper className={classes.paper} variant="elevation">
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Typography component="h4" variant="h5" color={"secondary"}>
                    {register}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                size="small"
                                onChange={handleChange}
                                value={values.firstName}

                            />
                            {errors.firstName ? errors.firstName : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                size="small"
                                onChange={handleChange}
                                value={values.lastName}
                            />
                            {errors.lastName ? errors.lastName : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                size="small"
                                onChange={handleChange}
                                value={values.email}
                            />
                            {errors.email ? errors.email : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                size="small"
                                onChange={handleChange}
                                value={values.password}
                            />
                            {errors.password ? errors.password : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmedPassword"
                                label="Confirmed Password"
                                type="password"
                                id="confirmedPassword"
                                autoComplete="current-password"
                                size="small"
                                onChange={handleChange}
                                value={values.confirmedPassword}
                            />
                            {errors.confirmedPassword ? errors.confirmedPassword : null}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <h1></h1>{}
            </Paper>
        </Container>
    );
}