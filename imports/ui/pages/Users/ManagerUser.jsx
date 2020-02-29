import React, {useState, useEffect} from 'react';
import MUIDataTable from "mui-datatables";


import {withStyles} from '@material-ui/core/styles';
import {useTracker} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import {Users} from '../../../../db/index';

const styles = theme => ({});
const columns = [
    {
        name: "_id",
        label: "ID"
    },
    {
        name: "email",
        label: "Email"
    },
    {
        name: "profile.firstName",
        label: "First Name"
    },
    {
        name: "profile.lastName",
        label: "Last Name"
    }
];

const options = {
    filterType: 'checkbox'
};

function ManagerUser(props) {
    const {classes, children, content} = props;
    const currentUser = useTracker(() => {
        const checkSub = Meteor.subscribe("Users");
        const listUsers = Users.find({}).fetch();
        const UserID = Meteor.userId();

        return {
            isLoading: !checkSub.ready(),
            listUsers,
            UserID
        }
    });

    currentUser.listUsers.map((first, indexFirst) => {
        first.email = first.emails[0].address;
        return first;
    });

    return (
        <>
            <MUIDataTable
                title={"Danh sách User"}
                data={currentUser.listUsers}
                columns={columns}
                options={options}
            />
        </>
    )
}

export default withStyles(styles)(ManagerUser);
