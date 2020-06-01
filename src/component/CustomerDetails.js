import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import {useFormik} from "formik";
import Axios from "axios";

const useStyle = makeStyles((theme) => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));


export default function CustomerDetails() {
    const formik = useFormik({
        initialValues: {
            name: '',
            pinCode: '',
            locality: '',
            address: '',
            landmark: '',
            city: '',
            type: 'work'
        },
        onSubmit: values => {
            Axios.post('http://localhost:8080/customer/add-customer', formik.values)
                .then(response => {
                    console.log(response)
                })
        },
        validate: values => {
            let error = {}
            if (values.name.length < 3)
                error.name = 'name at least have 3 character'
            if (!/^[0-9]{10}$/i.test(values.phoneNumber))
                error.phoneNumber = 'Must have 10 digit'
            if (!/^[0-9]{6}$/i.test(values.pinCode))
                error.pincode = 'Must have 6 digit'
            return error
        }
    })

    const classes = useStyle();
    return (
        <form onSubmit={formik.handleSubmit}>
            <main className={classes.layout}>
                <Paper className={classes.paper} variant="outlined">
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom align="left">
                            Customer Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    value={formik.values.name}
                                    variant="outlined"
                                    onChange={formik.handleChange}

                                />
                                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    fullWidth
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.phoneNumber ? <div>{formik.errors.phoneNumber}</div> : null}

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="pincode"
                                    name="pinCode"
                                    label="Pincode"
                                    value={formik.values.pinCode}
                                    fullWidth
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.pincode ? <div>{formik.errors.pincode}</div> : null}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="locality"
                                    name="locality"
                                    label="Locality"
                                    value={formik.values.locality}
                                    fullWidth
                                    autoComplete="locality"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address"
                                    name="address"
                                    label="Address"
                                    value={formik.values.address}
                                    fullWidth
                                    multiline
                                    rows={2}
                                    autoComplete="shipping address"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="city"
                                    name="city"
                                    label="City"
                                    value={formik.values.city}
                                    fullWidth
                                    autoComplete="shipping address-city"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="landmark"
                                    name="landmark"
                                    label="Landmark"
                                    value={formik.values.landmark}
                                    fullWidth
                                    autoComplete="address-landmark"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="left">
                                    Type
                                </Typography>
                            </Grid>
                            <FormControl component="fieldset">
                                <RadioGroup name="type" value={formik.values.type} onChange={formik.handleChange}>
                                    <div>
                                        <FormControlLabel value="work" control={<Radio/>} label="Work"/>
                                        <FormControlLabel value="home" control={<Radio/>} label="Home"/>
                                        <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <div className={classes.buttons}>

                            <Button
                                type="submit"
                                variant="outlined"
                                color="primary"
                            >
                                Continue
                            </Button>
                        </div>
                    </React.Fragment>
                </Paper>
            </main>
        </form>
    );
}