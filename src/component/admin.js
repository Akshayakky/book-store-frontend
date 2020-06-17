import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const addBookToStore = () => {
    Axios.post("http://localhost:8080/book")
}

export default function Admin() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    <b>ADD BOOK</b>
                </Typography>
                <form className={classes.form} noValidate onSubmit={addBookToStore}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="title"
                                variant="outlined"
                                fullWidth
                                id="title"
                                label="Book Title"

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Book Author"
                                name="author"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="description"
                                label="Book Description"
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="quantity"
                                label="Quantity"
                                id="quantity"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="price"
                                label="Price"
                                id="price"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="url"
                                variant="outlined"
                                fullWidth
                                id="book image"
                                label="Book Image Url"
                                name="book image"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="reset"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}