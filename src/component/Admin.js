import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import {useFormik} from "formik";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
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

const headers = {
    headers: {
        "Authorization": "Bearer " + localStorage.getItem('key')
    }
}

export default function Admin() {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            bookTitle: '',
            bookAuthor: '',
            bookDescription: '',
            bookQuantity: '',
            bookPrice: '',
            bookImage: '',
        },
        onSubmit: values => {
            Axios.post("http://localhost:8080/book", formik.values, headers)
        },
        validate: values => {
            let error = {}
            if (values.bookTitle.length < 3)
                error.bookTitle = 'title at least have 3 character'
            if (values.bookAuthor.length < 3)
                error.bookAuthor = 'title at least have 3 character'
            if (values.bookDescription.length < 3)
                error.bookDescription = 'title at least have 3 character'
            if (values.bookQuantity < 1)
                error.bookQuantity = 'minimum book quantity is 1'
            return error
        }
    })
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    <b>ADD BOOK</b>
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                name="bookTitle"
                                variant="outlined"
                                type="text"
                                fullWidth
                                id="bookTitle"
                                label="Book Title"
                                value={formik.values.bookTitle}
                                onChange={formik.handleChange}
                                autoComplete="locality"
                            />
                            {formik.errors.bookTitle ?
                                <error style={{color: "red"}}>{formik.errors.bookTitle}</error> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                type="text"
                                id="bookAuthor"
                                label="Book Author"
                                name="bookAuthor"
                                value={formik.values.bookAuthor}
                                onChange={formik.handleChange}
                                autoComplete="locality"
                            />
                            {formik.errors.bookAuthor && !formik.errors.bookTitle ?
                                <error style={{color: "red"}}>{formik.errors.bookAuthor}</error> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                type="text"
                                id="bookDescription"
                                label="Book Description"
                                name="bookDescription"
                                value={formik.values.bookDescription}
                                onChange={formik.handleChange}
                                autoComplete="locality"
                            />
                            {formik.errors.bookDescription && !formik.errors.bookAuthor
                            && !formik.errors.bookTitle ?
                                <error style={{color: "red"}}>{formik.errors.bookDescription}</error> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="bookQuantity"
                                label="Quantity"
                                id="bookQuantity"
                                minimumValue="1"
                                value={formik.values.bookQuantity}
                                onChange={formik.handleChange}
                                autoComplete="locality"
                            />
                            {formik.errors.bookQuantity && !formik.errors.bookDescription && !formik.errors.bookAuthor
                            && !formik.errors.bookTitle ?
                                <error style={{color: "red"}}>{formik.errors.bookQuantity}</error> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="bookPrice"
                                label="Price"
                                id="bookPrice"
                                value={formik.values.bookPrice}
                                onChange={formik.handleChange}
                                autoComplete="locality"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="url"
                                variant="outlined"
                                fullWidth
                                type="text"
                                id="bookImage"
                                label="Book Image Url"
                                name="bookImage"
                                value={formik.values.bookImage}
                                onChange={formik.handleChange}

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