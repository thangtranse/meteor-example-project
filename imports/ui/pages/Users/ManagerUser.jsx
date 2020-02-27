import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

const styles = theme => ({});

function ManagerUser(props) {
    const {classes, children, content} = props;

    const listUser = useTracker(() => {

        Meteor.subscribe('Users')

    }, []);

    console.log(listUser);
    return (
        <div>
            manager User
            {listUser}
        </div>
    )
}

export default withStyles(styles)(ManagerUser);
