import Typography from "@material-ui/core/Typography";
import React from "react";
import {withStyles} from "@material-ui/core";

const styles = {

};

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            Thangtm13
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default withStyles(styles)(Copyright)
