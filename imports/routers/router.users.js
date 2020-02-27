import React from 'react'
import {FlowRouter} from 'meteor/kadira:flow-router'
import {mount} from 'react-mounter'
import TemplateUser from '../ui/layouts/TemplateUser'
import ManagerUser from '../ui/pages/Users/ManagerUser'

const trackRouteEntry = (context, redirect) => {
    if (!Meteor.userId()) {
        redirect("/login");
    }
};

const routerUser = FlowRouter.group({
    prefix: "/user",
    name: "User",
    triggersEnter: [trackRouteEntry],
});

routerUser.route('/management', {
    action() {
        mount(TemplateUser, {
            content: <ManagerUser/>
        })
    }
});
