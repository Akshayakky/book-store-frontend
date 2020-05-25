import React from 'react';
import PrimarySearchAppBar from './component/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

export default function () {
    return (
        <React.Fragment>
            <CssBaseline/>
            <PrimarySearchAppBar/>
            <footer>
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